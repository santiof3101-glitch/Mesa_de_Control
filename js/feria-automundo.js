// Feria Automundo 2026: modulos temporales para pedir saneamientos y liquidaciones
// durante el evento. Usa app.js (sesion, Datacil, avisos) y guarda cada solicitud
// en REGISTROS (modulo "feria", tipo "tarea"); los archivos van a Storage.
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
    finalizada: "Lista"
  };
  const TYPE_LABELS = { saneamiento: "Saneamiento", liquidacion: "Liquidación" };

  let feriaTasks = [];
  let feriaLoadedAt = 0;
  let feriaLoading = null;
  let legalFilter = "activas";
  let pendingPhoto = null;
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
    const role = currentUser().role;
    return isFeriaActive() && ["commercial", "legal", "admin"].includes(role);
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

  async function uploadFeriaFile(file, folder, taskId) {
    const extension = (String(file.name || "").split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `feria-automundo/${folder}/${taskId}-${Date.now()}.${extension}`;
    await window.AutocorAuth.uploadFile(path, file, file.type || "application/octet-stream");
    return { path, name: file.name || `${folder}.${extension}`, type: file.type || "", size: file.size || 0 };
  }

  async function openFeriaFile(fileInfo) {
    if (!fileInfo?.path) return;
    const popup = window.open("", "_blank");
    try {
      const blob = await window.AutocorAuth.downloadFile(fileInfo.path);
      const url = URL.createObjectURL(blob);
      if (popup) popup.location.href = url;
      else window.location.href = url;
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

  // ===== Foto de la matricula =====
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

  async function readPlateFromPhoto() {
    const form = $("#fxForm");
    if (!pendingPhoto || !form) return;
    const button = $("[data-fx-ocr]", form);
    setHint("Leyendo la matrícula...", "info");
    if (button) button.disabled = true;
    try {
      const image = await blobToBase64(pendingPhoto);
      const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/feria-matricula`, {
        method: "POST",
        headers: await authHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ image, mediaType: pendingPhoto.type || "image/jpeg" })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || "No se pudo leer la matrícula.");
      const data = payload.data || {};
      const filled = [];
      const setField = (name, value) => {
        const field = form.elements[name];
        const text = String(value ?? "").trim();
        if (!field || !text) return;
        field.value = name === "placa" ? plateOf(text) : text;
        field.classList.add("is-autofilled");
        filled.push(name);
      };
      setField("placa", data.placa);
      setField("propietario", data.propietario);
      setField("cedula", data.cedula);
      setField("marca", data.marca);
      setField("modelo", data.modelo);
      setField("anio", data.anio);
      setField("color", data.color);
      setHint(filled.length
        ? "Datos leídos de la foto. Revísalos antes de enviar."
        : "No se pudieron leer datos claros. Intenta con otra foto o llena los campos.", filled.length ? "ok" : "warn");
    } catch (error) {
      setHint(error.message || "No se pudo leer la matrícula.", "warn");
    } finally {
      if (button) button.disabled = !pendingPhoto;
    }
  }

  // ===== Consulta ANT =====
  async function lookupPlate() {
    const form = $("#fxForm");
    const plate = plateOf(form?.elements.placa.value);
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) {
      setHint("Ingrese una placa válida, por ejemplo ABC1234.", "warn");
      form?.elements.placa.focus();
      return;
    }
    if (typeof canCurrentUserUseDatacil === "function" && !canCurrentUserUseDatacil()) {
      setHint("Tu usuario no tiene Consulta ANT habilitada. Usa la foto de la matrícula o llena los datos.", "warn");
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
      const set = (name, value) => {
        const text = String(value ?? "").trim();
        if (text && form.elements[name]) {
          form.elements[name].value = text;
          form.elements[name].classList.add("is-autofilled");
        }
      };
      set("propietario", owner.nombre);
      set("cedula", owner.cedula);
      set("marca", vehicle.marca);
      set("modelo", vehicle.modelo);
      set("anio", yearKey ? vehicle[yearKey] : "");
      set("color", vehicle.color);
      const debt = Number(data.pagos?.totalPendiente || 0);
      const fines = Number(data.citaciones?.pendientes || 0);
      pendingLookup = {
        placa: plate,
        queriedAt: snapshot.queriedAt || "",
        deuda: debt,
        multas: fines,
        prohibicion: vehicle.prohibidoEnajenar === true
      };
      const alerts = [];
      if (debt > 0) alerts.push(`deuda de ${money(debt)}`);
      if (fines > 0) alerts.push(`${fines} multa${fines === 1 ? "" : "s"} pendiente${fines === 1 ? "" : "s"}`);
      if (pendingLookup.prohibicion) alerts.push("prohibición de enajenar");
      setHint(alerts.length
        ? `ANT reporta ${alerts.join(", ")}. Los datos se llenaron; revísalos.`
        : `ANT sin novedades${payload.cached ? " (consulta guardada, sin costo)" : ""}. Los datos se llenaron; revísalos.`, alerts.length ? "warn" : "ok");
    } catch (error) {
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

  function resetPhoto() {
    pendingPhoto = null;
    const preview = $(".fx-photo-preview");
    const empty = $(".fx-photo-empty");
    if (preview) {
      if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
      preview.removeAttribute("src");
      preview.hidden = true;
    }
    if (empty) empty.hidden = false;
    const ocrButton = $("[data-fx-ocr]");
    if (ocrButton) ocrButton.disabled = true;
  }

  async function onPhotoSelected(input) {
    const file = input.files?.[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) {
      toast("Seleccione una imagen de la matrícula.", "error");
      input.value = "";
      return;
    }
    pendingPhoto = await compressImage(file);
    const preview = $(".fx-photo-preview");
    const empty = $(".fx-photo-empty");
    if (preview) {
      preview.src = URL.createObjectURL(pendingPhoto);
      preview.hidden = false;
    }
    if (empty) empty.hidden = true;
    const ocrButton = $("[data-fx-ocr]");
    if (ocrButton) ocrButton.disabled = false;
    setHint("Foto lista. Puedes leer los datos automáticamente o consultar ANT con la placa.", "info");
  }

  async function submitFeriaForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const plate = plateOf(data.placa);
    const missing = [];
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) missing.push("placa válida");
    if (!String(data.propietario || "").trim()) missing.push("propietario");
    if (!String(data.cedula || "").trim()) missing.push("cédula");
    if (!(Number(data.precioToma) > 0)) missing.push("precio de toma");
    if (String(data.kilometraje || "") === "" || Number(data.kilometraje) < 0) missing.push("kilometraje");
    if (String(data.telefono || "").replace(/\D/g, "").length < 7) missing.push("teléfono");
    if (!pendingPhoto) missing.push("foto de la matrícula");
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
      const matricula = await uploadFeriaFile(pendingPhoto, "matriculas", id);
      const now = new Date().toISOString();
      const task = {
        id,
        version: 1,
        tipo: data.tipo === "liquidacion" ? "liquidacion" : "saneamiento",
        placa: plate,
        propietario: String(data.propietario || "").trim().toUpperCase(),
        cedula: String(data.cedula || "").trim(),
        telefono: String(data.telefono || "").trim(),
        precioToma: Number(data.precioToma) || 0,
        kilometraje: Number(data.kilometraje) || 0,
        observaciones: String(data.observaciones || "").trim(),
        vehiculo: {
          marca: String(data.marca || "").trim(),
          modelo: String(data.modelo || "").trim(),
          anio: String(data.anio || "").trim(),
          color: String(data.color || "").trim()
        },
        ant: pendingLookup?.placa === plate ? pendingLookup : null,
        matricula,
        asesor: { id: user.id, name: user.name, agency: user.agency },
        status: "pendiente",
        createdAt: now,
        updatedAt: now
      };
      task.history = addHistory(task, "Solicitud creada");
      await saveFeriaTask(task);
      form.reset();
      resetPhoto();
      pendingLookup = null;
      $$(".is-autofilled", form).forEach((field) => field.classList.remove("is-autofilled"));
      setHint("Con la placa, ANT llena el propietario y el vehículo. La foto queda adjunta para la mesa de control.", "info");
      toast(`${TYPE_LABELS[task.tipo]} de ${plate} enviada a la mesa de control.`);
      renderCommercial();
    } catch (error) {
      setFormStatus(error.message || "No se pudo enviar la solicitud.", true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar a mesa de control";
      }
    }
  }

  // ===== Vistas =====
  function statusPill(status) {
    return `<span class="fx-pill is-${esc(status)}">${esc(STATUS_LABELS[status] || status)}</span>`;
  }

  function vehicleLine(task) {
    const vehicle = task.vehiculo || {};
    return [vehicle.marca, vehicle.modelo, vehicle.anio, vehicle.color].filter(Boolean).join(" · ") || "Vehículo sin detalle";
  }

  function antLine(task) {
    if (!task.ant) return "";
    const parts = [];
    parts.push(task.ant.deuda > 0 ? `Deuda ${money(task.ant.deuda)}` : "Sin deuda");
    parts.push(task.ant.multas > 0 ? `${task.ant.multas} multa(s)` : "Sin multas");
    if (task.ant.prohibicion) parts.push("Prohibición de enajenar");
    return `<span class="fx-ant ${task.ant.deuda > 0 || task.ant.multas > 0 || task.ant.prohibicion ? "is-warn" : "is-ok"}">ANT: ${esc(parts.join(" · "))}</span>`;
  }

  function renderCard(task, mode) {
    const result = task.resultado;
    const isLegal = mode === "legal";
    const user = currentUser();
    const takenByOther = task.tomadaPor && task.tomadaPor.id !== user.id;
    let actions = "";
    if (isLegal) {
      if (task.status === "pendiente") {
        actions = `<button type="button" class="btn primary fx-btn" data-fx-take="${esc(task.id)}">Tomar solicitud</button>`;
      } else if (task.status === "en_revision") {
        actions = `
          <div class="fx-resolve" data-fx-resolve="${esc(task.id)}">
            <label class="fx-file">
              <input type="file" accept="application/pdf,image/*" data-fx-result-file>
              <span>${task.tipo === "liquidacion" ? "Subir liquidación (PDF o imagen)" : "Subir resultado del saneamiento"}</span>
            </label>
            <textarea rows="2" placeholder="Comentario para el asesor (opcional)" data-fx-comment></textarea>
            <div class="fx-resolve-actions">
              <button type="button" class="btn secondary fx-btn" data-fx-observe="${esc(task.id)}">Devolver con observación</button>
              <button type="button" class="btn primary fx-btn" data-fx-finish="${esc(task.id)}">Finalizar</button>
            </div>
          </div>`;
      }
    } else if (task.status === "observada") {
      actions = `<button type="button" class="btn secondary fx-btn" data-fx-resend="${esc(task.id)}">Corregido, reenviar</button>`;
    }
    return `
      <article class="fx-card is-${esc(task.status)}">
        <div class="fx-card-main">
          <div class="fx-card-top">
            <span class="fx-plate-tag">${esc(task.placa)}</span>
            <span class="fx-type-tag">${esc(TYPE_LABELS[task.tipo] || task.tipo)}</span>
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
          ${antLine(task)}
          ${task.observaciones ? `<p class="fx-card-note">${esc(task.observaciones)}</p>` : ""}
          ${task.observacionMesa ? `<p class="fx-card-note is-warn"><b>Observación de mesa:</b> ${esc(task.observacionMesa)}</p>` : ""}
          ${result?.comentario ? `<p class="fx-card-note is-ok"><b>Mesa de control:</b> ${esc(result.comentario)}</p>` : ""}
          <div class="fx-card-files">
            ${task.matricula?.path ? `<button type="button" class="fx-link" data-fx-open="${esc(task.id)}" data-fx-which="matricula">Ver matrícula</button>` : ""}
            ${result?.path ? `<button type="button" class="fx-link is-strong" data-fx-open="${esc(task.id)}" data-fx-which="resultado">Descargar ${task.tipo === "liquidacion" ? "liquidación" : "resultado"}</button>` : ""}
          </div>
        </div>
        <div class="fx-card-side">
          <span class="fx-card-date">${esc(when(task.createdAt))}</span>
          ${task.tomadaPor ? `<span class="fx-card-taker">${takenByOther || !isLegal ? `Atiende: ${esc(task.tomadaPor.name)}` : "La atiendes tú"}</span>` : ""}
          ${actions}
        </div>
      </article>`;
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
    const mine = currentUser().role === "admin" ? feriaTasks : feriaTasks.filter((task) => task.asesor?.id === user.id);
    const counts = countBy(mine);
    $$("[data-fx-stat]").forEach((element) => {
      element.textContent = String(counts[element.dataset.fxStat] || 0);
    });
    list.innerHTML = mine.length
      ? mine.map((task) => renderCard(task, "commercial")).join("")
      : `<div class="fx-empty">Aún no has enviado solicitudes en la feria.</div>`;
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
      if (document.visibilityState === "visible" && (commercialVisible || legalVisible)) refreshAll(true);
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
    const current = feriaTasks.find((item) => item.id === taskId);
    if (!file && current?.tipo === "liquidacion") {
      toast("Suba el archivo de la liquidación antes de finalizar.", "error");
      return;
    }
    if (!file && !comment) {
      toast("Suba el resultado o escriba un comentario antes de finalizar.", "error");
      return;
    }
    const user = currentUser();
    const uploaded = file ? await uploadFeriaFile(file, "resultados", taskId) : null;
    await withFreshTask(taskId, (task) => {
      task.status = "finalizada";
      task.resultado = { ...(uploaded || {}), comentario: comment, at: new Date().toISOString(), by: user.name, byId: user.id };
      task.observacionMesa = "";
      task.history = addHistory(task, "Finalizada", comment);
      return task;
    });
    toast("Solicitud finalizada. El asesor ya puede ver el resultado.");
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
    form?.addEventListener("reset", () => {
      window.setTimeout(() => {
        resetPhoto();
        pendingLookup = null;
        setFormStatus("");
        $$(".is-autofilled", form).forEach((field) => field.classList.remove("is-autofilled"));
      }, 0);
    });
    form?.elements.matricula?.addEventListener("change", (event) => onPhotoSelected(event.currentTarget));
    form?.elements.placa?.addEventListener("input", (event) => {
      const input = event.currentTarget;
      input.value = plateOf(input.value);
    });

    document.addEventListener("click", async (event) => {
      const target = event.target;
      if (target.closest?.("[data-commercial-area='feria']") || target.closest?.("[data-legal-scroll='fxLegalPanel']")) {
        refreshAll(true);
        return;
      }
      const button = target.closest?.("[data-fx-datacil],[data-fx-ocr],[data-fx-reload],[data-fx-filter],[data-fx-take],[data-fx-finish],[data-fx-observe],[data-fx-resend],[data-fx-open]");
      if (!button) return;
      event.preventDefault();
      try {
        if (button.matches("[data-fx-datacil]")) return await lookupPlate();
        if (button.matches("[data-fx-ocr]")) return await readPlateFromPhoto();
        if (button.matches("[data-fx-reload]")) return await refreshAll(true);
        if (button.matches("[data-fx-filter]")) {
          legalFilter = button.dataset.fxFilter;
          return renderLegal();
        }
        if (button.matches("[data-fx-open]")) {
          const task = feriaTasks.find((item) => item.id === button.dataset.fxOpen);
          return await openFeriaFile(button.dataset.fxWhich === "resultado" ? task?.resultado : task?.matricula);
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

  // La sesion cambia al ingresar o salir: se revisa cada pocos segundos si mostrar el modulo.
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
