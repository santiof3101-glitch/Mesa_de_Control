// Feria Automundo 2026: modulos temporales para pedir liquidaciones durante el evento.
// Flujo del asesor: Consulta ANT -> fotos de la matricula -> ficha vehicular -> mesa de control.
// Usa app.js (sesion, Datacil, avisos) y guarda cada solicitud en REGISTROS
// (modulo "feria", tipo "tarea"); las fotos y la liquidacion van a Storage.
(function () {
  "use strict";

  // El modulo se oculta solo despues de esta fecha (lunes 19 de octubre, hora de Ecuador).
  const FERIA_HASTA = new Date("2026-10-20T05:00:00Z");
  const FERIA_MODULO = "feria";
  const FERIA_TIPO = "tarea";
  const STATUS_LABELS = {
    pendiente: "Pendiente",
    en_revision: "En revisión",
    observada: "Con observación",
    finalizada: "Realizada"
  };
  const FICHA_FIELDS = [
    ["propietario", "Propietario"],
    ["cedula", "Cédula / RUC"],
    ["marca", "Marca"],
    ["modelo", "Modelo"],
    ["anio", "Año"],
    ["color", "Color"],
    ["clase", "Clase"],
    ["servicio", "Servicio"],
    ["chasis", "Chasis"],
    ["motor", "Motor"]
  ];

  let feriaTasks = [];
  let feriaLoadedAt = 0;
  let feriaLoading = null;
  let legalFilter = "activas";
  const pendingPhotos = { anverso: null, reverso: null };
  let pendingLookup = null;
  let refreshTimer = 0;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => (typeof escapeHtml === "function" ? escapeHtml(value) : String(value ?? ""));
  const toast = (message, type) => (typeof showToast === "function" ? showToast(message, type) : window.alert(message));
  const plateOf = (value) => String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const money = (value) => {
    const amount = Number(value);
    return Number.isFinite(amount) && amount > 0
      ? amount.toLocaleString("es-EC", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
      : "-";
  };
  const when = (value) => (value && typeof formatDateTime === "function" ? formatDateTime(value) : "-");

  function isFeriaActive() {
    return Date.now() < FERIA_HASTA.getTime();
  }

  function currentUser() {
    const user = typeof session === "object" && session ? session : {};
    return { id: String(user.userId || user.role || ""), name: String(user.name || "Usuario"), agency: String(user.agency || ""), role: String(user.role || "") };
  }

  function canUseFeria() {
    return isFeriaActive() && ["commercial", "legal", "admin"].includes(currentUser().role);
  }

  function applyVisibility() {
    const show = canUseFeria();
    $$("[data-feria-only]").forEach((element) => {
      element.hidden = !show;
    });
  }

  // ===== Datos =====
  async function authHeaders(extra = {}) {
    return { ...(await window.AutocorAuth.headers()), ...extra };
  }

  async function loadFeriaTasks(force = false) {
    if (!window.AutocorAuth?.hasSession()) return feriaTasks;
    if (!force && feriaLoadedAt && Date.now() - feriaLoadedAt < 15000) return feriaTasks;
    if (feriaLoading) return feriaLoading;
    feriaLoading = (async () => {
      try {
        const url = `${SUPABASE_URL}/REGISTROS?modulo=eq.${FERIA_MODULO}&tipo=eq.${FERIA_TIPO}&select=datos,created_at&order=id.desc&limit=3000`;
        const response = await fetch(url, { headers: await authHeaders() });
        if (!response.ok) throw new Error("No se pudieron cargar las solicitudes de la feria.");
        const rows = await response.json();
        const latest = new Map();
        (Array.isArray(rows) ? rows : []).forEach((row) => {
          const task = row?.datos;
          if (!task?.id || latest.has(task.id)) return;
          latest.set(task.id, task);
        });
        feriaTasks = [...latest.values()].sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
        feriaLoadedAt = Date.now();
      } catch (error) {
        toast(error.message || "No se pudieron cargar las solicitudes de la feria.", "error");
      } finally {
        feriaLoading = null;
      }
      return feriaTasks;
    })();
    return feriaLoading;
  }

  async function saveFeriaTask(task) {
    const saved = await guardarRegistroSupabase(FERIA_MODULO, FERIA_TIPO, task, currentUser().name);
    if (!saved) throw new Error("No se pudo guardar. Revise la conexión e intente de nuevo.");
    feriaTasks = [task, ...feriaTasks.filter((item) => item.id !== task.id)];
    return task;
  }

  async function uploadFeriaFile(file, folder, taskId, suffix = "") {
    const extension = (String(file.name || "").split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `feria-automundo/${folder}/${taskId}${suffix ? `-${suffix}` : ""}-${Date.now()}.${extension}`;
    await window.AutocorAuth.uploadFile(path, file, file.type || "application/octet-stream");
    return { path, name: file.name || `${folder}.${extension}`, type: file.type || "", size: file.size || 0 };
  }

  async function openFeriaFile(fileInfo, download = false) {
    if (!fileInfo?.path) return;
    const popup = download ? null : window.open("", "_blank");
    try {
      const blob = await window.AutocorAuth.downloadFile(fileInfo.path);
      const url = URL.createObjectURL(blob);
      if (download) {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileInfo.name || "liquidacion.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else if (popup) {
        popup.location.href = url;
      } else {
        window.location.href = url;
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      popup?.close();
      toast(error.message || "No se pudo abrir el archivo.", "error");
    }
  }

  function addHistory(task, action, note = "") {
    const user = currentUser();
    return [...(task.history || []), { at: new Date().toISOString(), by: user.name, byId: user.id, action, note }];
  }

  // ===== Fotos de la matricula =====
  async function compressImage(file, maxSide = 1600, quality = 0.82) {
    const bitmap = await createImageBitmap(file).catch(() => null);
    if (!bitmap) return file;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    if (!blob) return file;
    return new File([blob], "matricula.jpg", { type: "image/jpeg" });
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
      reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
      reader.readAsDataURL(blob);
    });
  }

  function markFilled(field) {
    field.classList.add("is-autofilled");
  }

  function setFormField(form, name, value, { overwrite = true } = {}) {
    const field = form?.elements?.[name];
    const text = String(value ?? "").trim();
    if (!field || !text) return false;
    if (!overwrite && String(field.value || "").trim()) return false;
    field.value = name === "placa" ? plateOf(text) : text.toUpperCase();
    markFilled(field);
    return true;
  }

  async function extractFromPhotos() {
    const form = $("#fxForm");
    const photos = ["anverso", "reverso"].map((side) => pendingPhotos[side]).filter(Boolean);
    if (!form || !photos.length) return;
    const button = $("[data-fx-ocr]", form);
    setHint("Extrayendo datos de la matrícula...", "info");
    if (button) {
      button.disabled = true;
      button.textContent = "Extrayendo...";
    }
    try {
      const images = await Promise.all(photos.map(async (photo) => ({ image: await blobToBase64(photo), mediaType: photo.type || "image/jpeg" })));
      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/feria-matricula`, {
        method: "POST",
        headers: await authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ images })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || "No se pudieron extraer los datos.");
      const data = payload.data || {};
      const plate = plateOf(form.elements.placa.value);
      const readPlate = plateOf(data.placa);
      // ANT manda en propietario y cedula; la matricula completa lo que ANT no trae.
      const filled = [];
      FICHA_FIELDS.forEach(([name]) => {
        const fromAnt = ["propietario", "cedula", "marca", "modelo", "anio"].includes(name) && pendingLookup;
        if (setFormField(form, name, data[name], { overwrite: !fromAnt })) filled.push(name);
      });
      const mismatch = readPlate && plate && readPlate !== plate;
      if (mismatch) {
        setHint(`Atención: la matrícula dice ${readPlate} y la placa consultada es ${plate}. Revisa antes de enviar.`, "warn");
      } else {
        setHint(filled.length
          ? "Datos extraídos de la matrícula y agregados a la ficha vehicular. Revísalos antes de enviar."
          : "La matrícula no aportó datos nuevos. La ficha conserva los datos de ANT.", filled.length ? "ok" : "info");
      }
    } catch (error) {
      setHint(error.message || "No se pudieron extraer los datos.", "warn");
    } finally {
      if (button) {
        button.textContent = "Extraer datos de la matrícula";
        button.disabled = !pendingPhotos.anverso && !pendingPhotos.reverso;
      }
    }
  }

  // ===== Consulta ANT (obligatoria) =====
  async function lookupPlate() {
    const form = $("#fxForm");
    const plate = plateOf(form?.elements.placa.value);
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) {
      setHint("Ingrese una placa válida, por ejemplo ABC1234.", "warn");
      form?.elements.placa.focus();
      return;
    }
    if (typeof canCurrentUserUseDatacil === "function" && !canCurrentUserUseDatacil()) {
      setHint("Tu usuario no tiene Consulta ANT habilitada. Pide al administrador que la active.", "warn");
      return;
    }
    const button = $("[data-fx-datacil]", form);
    if (button) {
      button.disabled = true;
      button.textContent = "Consultando...";
    }
    try {
      const payload = await callDatacilFunction({ placa: plate });
      const snapshot = payload.snapshot;
      if (typeof upsertDatacilStoredLookup === "function") upsertDatacilStoredLookup(snapshot);
      const data = getDatacilPayload(snapshot);
      const owner = data.propietario || {};
      const vehicle = data.vehiculo || {};
      const yearKey = Object.keys(vehicle).find((key) => /^(año|anio|a.o)$/i.test(key)) || "";
      setFormField(form, "propietario", owner.nombre);
      setFormField(form, "cedula", owner.cedula);
      setFormField(form, "marca", vehicle.marca);
      setFormField(form, "modelo", vehicle.modelo);
      setFormField(form, "anio", yearKey ? vehicle[yearKey] : "");
      setFormField(form, "color", vehicle.color);
      setFormField(form, "clase", vehicle.clase);
      setFormField(form, "servicio", vehicle.servicio);
      setFormField(form, "chasis", vehicle.chasis);
      const debt = Number(data.pagos?.totalPendiente || 0);
      const fines = Number(data.citaciones?.pendientes || 0);
      pendingLookup = {
        placa: plate,
        queriedAt: snapshot.queriedAt || "",
        deuda: debt,
        multas: fines,
        prohibicion: vehicle.prohibidoEnajenar === true,
        ultimoAnioPagado: String(vehicle.ultimoAnioPagado || "")
      };
      setFormStatus("");
      const alerts = [];
      if (debt > 0) alerts.push(`deuda de ${money(debt)}`);
      if (fines > 0) alerts.push(`${fines} multa${fines === 1 ? "" : "s"} pendiente${fines === 1 ? "" : "s"}`);
      if (pendingLookup.prohibicion) alerts.push("prohibición de enajenar");
      setHint(alerts.length
        ? `ANT reporta ${alerts.join(", ")}. La ficha se llenó; sigue con la matrícula.`
        : `ANT sin novedades${payload.cached ? " (consulta guardada, sin costo)" : ""}. La ficha se llenó; sigue con la matrícula.`, alerts.length ? "warn" : "ok");
    } catch (error) {
      pendingLookup = null;
      setHint(error.message || "No se pudo consultar ANT.", "warn");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Consultar ANT";
      }
    }
  }

  function setHint(message, level = "info") {
    const hint = $("[data-fx-hint]");
    if (!hint) return;
    hint.textContent = message;
    hint.dataset.level = level;
  }

  function setFormStatus(message, isError = false) {
    const status = $("[data-fx-status]");
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || "";
    status.classList.toggle("is-error", Boolean(isError));
  }

  function resetPhotos() {
    ["anverso", "reverso"].forEach((side) => {
      pendingPhotos[side] = null;
      const box = $(`[data-fx-side="${side}"]`);
      const preview = box?.querySelector(".fx-photo-preview");
      const empty = box?.querySelector(".fx-photo-empty");
      if (preview) {
        if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
        preview.removeAttribute("src");
        preview.hidden = true;
      }
      if (empty) empty.hidden = false;
    });
    const ocrButton = $("[data-fx-ocr]");
    if (ocrButton) ocrButton.disabled = true;
  }

  async function onPhotoSelected(input) {
    const box = input.closest("[data-fx-side]");
    const side = box?.dataset.fxSide;
    const file = input.files?.[0];
    if (!side || !file) return;
    if (!/^image\//.test(file.type)) {
      toast("Seleccione una imagen de la matrícula.", "error");
      input.value = "";
      return;
    }
    pendingPhotos[side] = await compressImage(file);
    const preview = box.querySelector(".fx-photo-preview");
    const empty = box.querySelector(".fx-photo-empty");
    if (preview) {
      if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
      preview.src = URL.createObjectURL(pendingPhotos[side]);
      preview.hidden = false;
    }
    if (empty) empty.hidden = true;
    const ocrButton = $("[data-fx-ocr]");
    if (ocrButton) ocrButton.disabled = false;
  }

  function resetForm(form) {
    form.reset();
    resetPhotos();
    pendingLookup = null;
    $$(".is-autofilled", form).forEach((field) => field.classList.remove("is-autofilled"));
    setFormStatus("");
    setHint("Empieza consultando la placa en ANT. Es obligatorio para enviar la solicitud.", "info");
  }

  async function submitFeriaForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const plate = plateOf(data.placa);
    const missing = [];
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) missing.push("placa válida");
    else if (pendingLookup?.placa !== plate) missing.push("Consulta ANT de esta placa");
    if (!String(data.propietario || "").trim()) missing.push("propietario");
    if (!String(data.cedula || "").trim()) missing.push("cédula");
    if (!(Number(data.precioToma) > 0)) missing.push("precio de toma");
    if (String(data.kilometraje || "") === "" || Number(data.kilometraje) < 0) missing.push("kilometraje");
    if (String(data.telefono || "").replace(/\D/g, "").length < 7) missing.push("teléfono");
    if (missing.length) {
      setFormStatus(`Falta completar: ${missing.join(", ")}.`, true);
      return;
    }
    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }
    setFormStatus("");
    try {
      const user = currentUser();
      const id = `feria-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
      const matricula = {};
      for (const side of ["anverso", "reverso"]) {
        if (pendingPhotos[side]) matricula[side] = await uploadFeriaFile(pendingPhotos[side], "matriculas", id, side);
      }
      const now = new Date().toISOString();
      const ficha = {};
      FICHA_FIELDS.forEach(([name]) => {
        ficha[name] = String(data[name] || "").trim().toUpperCase();
      });
      const task = {
        id,
        version: 1,
        tipo: "liquidacion",
        placa: plate,
        propietario: ficha.propietario,
        cedula: ficha.cedula,
        ficha,
        vehiculo: { marca: ficha.marca, modelo: ficha.modelo, anio: ficha.anio, color: ficha.color },
        telefono: String(data.telefono || "").trim(),
        precioToma: Number(data.precioToma) || 0,
        kilometraje: Number(data.kilometraje) || 0,
        observaciones: String(data.observaciones || "").trim(),
        ant: pendingLookup,
        matricula,
        asesor: { id: user.id, name: user.name, agency: user.agency },
        status: "pendiente",
        createdAt: now,
        updatedAt: now
      };
      task.history = addHistory(task, "Ficha enviada a mesa de control");
      await saveFeriaTask(task);
      resetForm(form);
      toast(`Ficha de ${plate} enviada a la mesa de control.`);
      renderCommercial();
    } catch (error) {
      setFormStatus(error.message || "No se pudo enviar la solicitud.", true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar ficha a mesa de control";
      }
    }
  }

  // ===== Vistas =====
  function statusPill(status) {
    return `<span class="fx-pill is-${esc(status)}">${esc(STATUS_LABELS[status] || status)}</span>`;
  }

  function fichaOf(task) {
    return task.ficha || { propietario: task.propietario, cedula: task.cedula, ...(task.vehiculo || {}) };
  }

  function vehicleLine(task) {
    const ficha = fichaOf(task);
    return [ficha.marca, ficha.modelo, ficha.anio, ficha.color].filter(Boolean).join(" · ") || "Vehículo sin detalle";
  }

  function antSummary(task) {
    if (!task.ant) return { text: "Sin Consulta ANT", level: "warn" };
    const parts = [];
    parts.push(task.ant.deuda > 0 ? `Deuda ${money(task.ant.deuda)}` : "Sin deuda");
    parts.push(task.ant.multas > 0 ? `${task.ant.multas} multa(s)` : "Sin multas");
    if (task.ant.prohibicion) parts.push("Prohibición de enajenar");
    return { text: `ANT: ${parts.join(" · ")}`, level: task.ant.deuda > 0 || task.ant.multas > 0 || task.ant.prohibicion ? "warn" : "ok" };
  }

  function matriculaFiles(task) {
    const files = task.matricula || {};
    if (files.path) return [["matricula", "Ver matrícula"]];
    return [["anverso", "Matrícula frente"], ["reverso", "Matrícula reverso"]].filter(([side]) => files[side]?.path);
  }

  function renderCard(task, mode) {
    const result = task.resultado;
    const isLegal = mode === "legal";
    const user = currentUser();
    const takenByOther = task.tomadaPor && task.tomadaPor.id !== user.id;
    const ant = antSummary(task);
    let actions = `<button type="button" class="btn secondary fx-btn" data-fx-ficha="${esc(task.id)}">Ver ficha</button>`;
    if (isLegal) {
      if (task.status === "pendiente") {
        actions += `<button type="button" class="btn primary fx-btn" data-fx-take="${esc(task.id)}">Tomar solicitud</button>`;
      } else if (task.status === "en_revision") {
        actions += `
          <div class="fx-resolve" data-fx-resolve="${esc(task.id)}">
            <label class="fx-file">
              <input type="file" accept="application/pdf" data-fx-result-file>
              <span>Subir liquidación (PDF)</span>
            </label>
            <textarea rows="2" placeholder="Comentario para el asesor (opcional)" data-fx-comment></textarea>
            <div class="fx-resolve-actions">
              <button type="button" class="btn secondary fx-btn" data-fx-observe="${esc(task.id)}">Devolver con observación</button>
              <button type="button" class="btn primary fx-btn" data-fx-finish="${esc(task.id)}">Finalizar</button>
            </div>
          </div>`;
      }
    } else if (task.status === "observada") {
      actions += `<button type="button" class="btn secondary fx-btn" data-fx-resend="${esc(task.id)}">Corregido, reenviar</button>`;
    }
    if (result?.path) {
      actions += `<button type="button" class="btn primary fx-btn" data-fx-download="${esc(task.id)}">Descargar liquidación</button>`;
    }
    return `
      <article class="fx-card is-${esc(task.status)}">
        <div class="fx-card-main">
          <div class="fx-card-top">
            <span class="fx-plate-tag">${esc(task.placa)}</span>
            <span class="fx-type-tag">Liquidación</span>
            ${statusPill(task.status)}
          </div>
          <strong class="fx-card-owner">${esc(task.propietario)} <small>· ${esc(task.cedula)}</small></strong>
          <span class="fx-card-line">${esc(vehicleLine(task))}</span>
          <div class="fx-card-facts">
            <span>Toma <b>${esc(money(task.precioToma))}</b></span>
            <span>Km <b>${esc(Number(task.kilometraje || 0).toLocaleString("es-EC"))}</b></span>
            <span>Tel. <b>${esc(task.telefono || "-")}</b></span>
            ${isLegal ? `<span>Asesor <b>${esc(task.asesor?.name || "-")}</b></span>` : ""}
          </div>
          <span class="fx-ant is-${ant.level}">${esc(ant.text)}</span>
          ${task.observacionMesa && task.status === "observada" ? `<p class="fx-card-note is-warn"><b>Observación de mesa:</b> ${esc(task.observacionMesa)}</p>` : ""}
          ${result?.comentario ? `<p class="fx-card-note is-ok"><b>Mesa de control:</b> ${esc(result.comentario)}</p>` : ""}
        </div>
        <div class="fx-card-side">
          <span class="fx-card-date">${esc(when(task.createdAt))}</span>
          ${task.tomadaPor ? `<span class="fx-card-taker">${takenByOther || !isLegal ? `Atiende: ${esc(task.tomadaPor.name)}` : "La atiendes tú"}</span>` : ""}
          ${actions}
        </div>
      </article>`;
  }

  // Ficha vehicular completa en una ventana.
  function openFicha(taskId) {
    const task = feriaTasks.find((item) => item.id === taskId);
    if (!task) return;
    const ficha = fichaOf(task);
    const ant = antSummary(task);
    const result = task.resultado;
    const rows = FICHA_FIELDS.map(([name, label]) => `<div class="fx-ficha-row"><dt>${esc(label)}</dt><dd>${esc(ficha[name] || "-")}</dd></div>`).join("");
    const files = matriculaFiles(task)
      .map(([side, label]) => `<button type="button" class="btn secondary fx-btn" data-fx-photo="${esc(task.id)}" data-fx-side-open="${side}">${esc(label)}</button>`)
      .join("");
    const history = (task.history || []).map((item) => `<li><b>${esc(when(item.at))}</b> · ${esc(item.action)} · ${esc(item.by || "")}${item.note ? ` — ${esc(item.note)}` : ""}</li>`).join("");
    const dialog = document.createElement("div");
    dialog.className = "fx-modal";
    dialog.innerHTML = `
      <div class="fx-modal-backdrop" data-fx-close></div>
      <section class="fx-modal-card" role="dialog" aria-modal="true" aria-labelledby="fxFichaTitle">
        <header class="fx-modal-head">
          <div>
            <span class="fx-badge">Ficha vehicular · Feria Automundo</span>
            <h3 id="fxFichaTitle"><span class="fx-plate-tag">${esc(task.placa)}</span> ${statusPill(task.status)}</h3>
          </div>
          <button type="button" class="fx-modal-close" data-fx-close aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
        </header>
        <div class="fx-modal-body">
          <section class="fx-ficha-panel">
            <h4>Vehículo y propietario</h4>
            <dl>${rows}</dl>
          </section>
          <section class="fx-ficha-panel">
            <h4>Negociación</h4>
            <dl>
              <div class="fx-ficha-row"><dt>Precio de toma</dt><dd>${esc(money(task.precioToma))}</dd></div>
              <div class="fx-ficha-row"><dt>Kilometraje</dt><dd>${esc(Number(task.kilometraje || 0).toLocaleString("es-EC"))} km</dd></div>
              <div class="fx-ficha-row"><dt>Teléfono</dt><dd>${esc(task.telefono || "-")}</dd></div>
              <div class="fx-ficha-row"><dt>Asesor</dt><dd>${esc(task.asesor?.name || "-")}</dd></div>
              <div class="fx-ficha-row"><dt>Enviada</dt><dd>${esc(when(task.createdAt))}</dd></div>
            </dl>
            <p class="fx-ant is-${ant.level}">${esc(ant.text)}</p>
            ${task.observaciones ? `<p class="fx-card-note">${esc(task.observaciones)}</p>` : ""}
          </section>
          <section class="fx-ficha-panel fx-ficha-wide">
            <h4>Documentos</h4>
            <div class="fx-ficha-files">
              ${files || `<span class="fx-muted">Sin fotos de la matrícula.</span>`}
              ${result?.path ? `<button type="button" class="btn primary fx-btn" data-fx-download="${esc(task.id)}">Descargar liquidación (PDF)</button>` : `<span class="fx-muted">La liquidación aparecerá aquí cuando la mesa de control la suba.</span>`}
            </div>
            ${result?.comentario ? `<p class="fx-card-note is-ok"><b>Mesa de control:</b> ${esc(result.comentario)}</p>` : ""}
            ${task.observacionMesa && task.status === "observada" ? `<p class="fx-card-note is-warn"><b>Observación de mesa:</b> ${esc(task.observacionMesa)}</p>` : ""}
          </section>
          ${history ? `<section class="fx-ficha-panel fx-ficha-wide"><h4>Historial</h4><ul class="fx-history">${history}</ul></section>` : ""}
        </div>
      </section>`;
    document.body.appendChild(dialog);
    document.body.classList.add("fx-modal-open");
    dialog.querySelector(".fx-modal-close")?.focus();
  }

  function closeFicha() {
    $$(".fx-modal").forEach((modal) => modal.remove());
    document.body.classList.remove("fx-modal-open");
  }

  function countBy(tasks) {
    const counts = { total: tasks.length, pendiente: 0, en_revision: 0, observada: 0, finalizada: 0 };
    tasks.forEach((task) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
    });
    counts.activas = counts.pendiente + counts.en_revision;
    return counts;
  }

  function renderCommercial() {
    const list = $("#fxMineList");
    if (!list) return;
    const user = currentUser();
    const mine = user.role === "admin" ? feriaTasks : feriaTasks.filter((task) => task.asesor?.id === user.id);
    const counts = countBy(mine);
    $$("[data-fx-stat]").forEach((element) => {
      element.textContent = String(counts[element.dataset.fxStat] || 0);
    });
    list.innerHTML = mine.length
      ? mine.map((task) => renderCard(task, "commercial")).join("")
      : `<div class="fx-empty">Aún no has enviado fichas en la feria.</div>`;
  }

  function renderLegal() {
    const list = $("#fxLegalList");
    if (!list) return;
    const counts = countBy(feriaTasks);
    $$("[data-fx-legal-count]").forEach((element) => {
      element.textContent = String(counts[element.dataset.fxLegalCount] || 0);
    });
    $$("[data-fx-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.fxFilter === legalFilter));
    const filtered = feriaTasks.filter((task) => legalFilter === "activas"
      ? ["pendiente", "en_revision"].includes(task.status)
      : task.status === legalFilter);
    const ordered = legalFilter === "activas"
      ? [...filtered].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
      : filtered;
    list.innerHTML = ordered.length
      ? ordered.map((task) => renderCard(task, "legal")).join("")
      : `<div class="fx-empty">No hay solicitudes en este estado.</div>`;
  }

  async function refreshAll(force = true) {
    if (!canUseFeria()) return;
    await loadFeriaTasks(force);
    renderCommercial();
    renderLegal();
  }

  function startAutoRefresh() {
    window.clearInterval(refreshTimer);
    refreshTimer = window.setInterval(() => {
      const commercialVisible = !$("[data-commercial-area-section='feria']")?.hidden && currentViewId === "formulario";
      const legalVisible = !$("#fxLegalPanel")?.hidden && currentViewId === "tareas";
      const busy = $(".fx-modal") || document.activeElement?.closest?.(".fx-resolve");
      if (document.visibilityState === "visible" && !busy && (commercialVisible || legalVisible)) refreshAll(true);
    }, 30000);
  }

  // ===== Acciones de mesa de control =====
  async function withFreshTask(taskId, change) {
    await loadFeriaTasks(true);
    const task = feriaTasks.find((item) => item.id === taskId);
    if (!task) throw new Error("La solicitud ya no existe.");
    const next = await change({ ...task });
    if (!next) return null;
    next.version = (Number(task.version) || 1) + 1;
    next.updatedAt = new Date().toISOString();
    await saveFeriaTask(next);
    return next;
  }

  async function takeTask(taskId) {
    const user = currentUser();
    await withFreshTask(taskId, (task) => {
      if (task.status !== "pendiente") {
        toast(task.tomadaPor ? `Ya la tomó ${task.tomadaPor.name}.` : "La solicitud ya cambió de estado.", "error");
        return null;
      }
      task.status = "en_revision";
      task.tomadaPor = { id: user.id, name: user.name, at: new Date().toISOString() };
      task.history = addHistory(task, "Tomada por mesa de control");
      return task;
    });
    legalFilter = "activas";
    renderLegal();
  }

  async function finishTask(taskId, card) {
    const fileInput = card.querySelector("[data-fx-result-file]");
    const comment = String(card.querySelector("[data-fx-comment]")?.value || "").trim();
    const file = fileInput?.files?.[0];
    if (!file) {
      toast("Suba la liquidación en PDF antes de finalizar.", "error");
      return;
    }
    if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
      toast("La liquidación debe ser un archivo PDF.", "error");
      return;
    }
    const user = currentUser();
    const uploaded = await uploadFeriaFile(file, "liquidaciones", taskId);
    await withFreshTask(taskId, (task) => {
      task.status = "finalizada";
      task.resultado = { ...uploaded, comentario: comment, at: new Date().toISOString(), by: user.name, byId: user.id };
      task.observacionMesa = "";
      task.history = addHistory(task, "Liquidación subida, solicitud realizada", comment);
      return task;
    });
    toast("Solicitud realizada. El asesor ya puede descargar la liquidación.");
    renderLegal();
  }

  async function observeTask(taskId, card) {
    const comment = String(card.querySelector("[data-fx-comment]")?.value || "").trim();
    if (!comment) {
      toast("Escriba la observación para el asesor.", "error");
      card.querySelector("[data-fx-comment]")?.focus();
      return;
    }
    await withFreshTask(taskId, (task) => {
      task.status = "observada";
      task.observacionMesa = comment;
      task.history = addHistory(task, "Devuelta con observación", comment);
      return task;
    });
    toast("Solicitud devuelta al asesor con la observación.");
    renderLegal();
  }

  async function resendTask(taskId) {
    await withFreshTask(taskId, (task) => {
      task.status = task.tomadaPor ? "en_revision" : "pendiente";
      task.history = addHistory(task, "Reenviada por el asesor");
      return task;
    });
    toast("Solicitud reenviada a la mesa de control.");
    renderCommercial();
  }

  // ===== Eventos =====
  function bind() {
    const form = $("#fxForm");
    form?.addEventListener("submit", submitFeriaForm);
    form?.addEventListener("reset", (event) => {
      event.preventDefault();
      resetForm(form);
    });
    $$("[data-fx-side] input[type=file]", form || document).forEach((input) => {
      input.addEventListener("change", (event) => onPhotoSelected(event.currentTarget));
    });
    form?.elements.placa?.addEventListener("input", (event) => {
      const input = event.currentTarget;
      input.value = plateOf(input.value);
      if (pendingLookup && pendingLookup.placa !== input.value) {
        pendingLookup = null;
        setHint("Cambiaste la placa: vuelve a consultar ANT.", "info");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && $(".fx-modal")) closeFicha();
    });

    document.addEventListener("click", async (event) => {
      const target = event.target;
      if (target.closest?.("[data-fx-close]")) {
        closeFicha();
        return;
      }
      if (target.closest?.("[data-commercial-area='feria']") || target.closest?.("[data-legal-scroll='fxLegalPanel']")) {
        refreshAll(true);
        return;
      }
      const button = target.closest?.("[data-fx-datacil],[data-fx-ocr],[data-fx-reload],[data-fx-filter],[data-fx-take],[data-fx-finish],[data-fx-observe],[data-fx-resend],[data-fx-ficha],[data-fx-download],[data-fx-photo]");
      if (!button) return;
      event.preventDefault();
      try {
        if (button.matches("[data-fx-datacil]")) return await lookupPlate();
        if (button.matches("[data-fx-ocr]")) return await extractFromPhotos();
        if (button.matches("[data-fx-reload]")) return await refreshAll(true);
        if (button.matches("[data-fx-ficha]")) return openFicha(button.dataset.fxFicha);
        if (button.matches("[data-fx-filter]")) {
          legalFilter = button.dataset.fxFilter;
          return renderLegal();
        }
        if (button.matches("[data-fx-download]")) {
          const task = feriaTasks.find((item) => item.id === button.dataset.fxDownload);
          return await openFeriaFile(task?.resultado, true);
        }
        if (button.matches("[data-fx-photo]")) {
          const task = feriaTasks.find((item) => item.id === button.dataset.fxPhoto);
          const side = button.dataset.fxSideOpen;
          return await openFeriaFile(side === "matricula" ? task?.matricula : task?.matricula?.[side]);
        }
        button.disabled = true;
        if (button.matches("[data-fx-take]")) await takeTask(button.dataset.fxTake);
        if (button.matches("[data-fx-finish]")) await finishTask(button.dataset.fxFinish, button.closest(".fx-card"));
        if (button.matches("[data-fx-observe]")) await observeTask(button.dataset.fxObserve, button.closest(".fx-card"));
        if (button.matches("[data-fx-resend]")) await resendTask(button.dataset.fxResend);
      } catch (error) {
        toast(error.message || "No se pudo completar la acción.", "error");
      } finally {
        if (button.isConnected) button.disabled = false;
      }
    });

    document.addEventListener("change", (event) => {
      const fileInput = event.target.closest?.("[data-fx-result-file]");
      if (!fileInput) return;
      const label = fileInput.closest(".fx-file")?.querySelector("span");
      if (label && fileInput.files?.[0]) label.textContent = fileInput.files[0].name;
    });
  }

  // La sesion cambia al ingresar o salir: se revisa cada poco si mostrar el modulo.
  let lastRole = "";
  function watchSession() {
    const role = currentUser().role;
    if (role !== lastRole) {
      lastRole = role;
      feriaTasks = [];
      feriaLoadedAt = 0;
      applyVisibility();
      if (canUseFeria() && role === "legal") refreshAll(true);
    }
  }

  bind();
  applyVisibility();
  startAutoRefresh();
  window.setInterval(watchSession, 1500);
  window.AutocorFeria = { refresh: refreshAll, isActive: isFeriaActive };
})();
