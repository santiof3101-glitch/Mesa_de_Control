// Feria Automundo 2026: modulos temporales para pedir liquidaciones durante el evento.
// Flujo del asesor: Consulta ANT -> fotos de la matricula -> ficha vehicular -> mesa de control.
// Usa app.js (sesion, Datacil, avisos) y guarda cada solicitud en REGISTROS
// (modulo "feria", tipo "tarea"); las fotos y la liquidacion van a Storage.
(function () {
  "use strict";

  // Feria: jueves 15 a domingo 18 de octubre. Desde el lunes 19 ya no se reciben solicitudes;
  // la consulta y la descarga del reporte siguen disponibles hasta el 31 de octubre.
  const FERIA_SOLICITUDES_HASTA = new Date("2026-10-19T05:00:00Z");
  const FERIA_HASTA = new Date("2026-11-01T05:00:00Z");
  const FERIA_MODULO = "feria";
  const FERIA_TIPO = "tarea";
  const STATUS_LABELS = {
    pendiente: "Por asignar",
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

  // Datos adicionales que la lectura de la matricula llena (no obligatorios).
  const EXTRA_FIELDS = [
    ["numeroMatricula", "N.º de matrícula"],
    ["placaAnterior", "Placa anterior"],
    ["anioModelo", "Año modelo"],
    ["ramv", "RAMV / CPN"],
    ["cilindraje", "Cilindraje"],
    ["tipoVehiculo", "Tipo de vehículo"],
    ["combustible", "Combustible"],
    ["carroceria", "Carrocería"],
    ["pasajeros", "Pasajeros"],
    ["tonelaje", "Tonelaje"],
    ["tipoPeso", "Tipo de peso"],
    ["paisOrigen", "País de origen"],
    ["color2", "Color 2"],
    ["remarcado", "Remarcado"],
    ["ortopedico", "Ortopédico"],
    ["tipoTransporte", "Tipo de transporte"],
    ["ambitoOperacion", "Ámbito de operación"],
    ["provincia", "Provincia"],
    ["canton", "Cantón"],
    ["telefonoPropietario", "Teléfono en la matrícula"],
    ["avaluo", "Avalúo"],
    ["domicilio", "Domicilio del propietario", true],
    ["valorMatricula", "Valor de la matrícula"],
    ["lugarEmision", "Lugar de emisión"],
    ["fechaCompra", "Fecha de compra"],
    ["fechaEmision", "Fecha de emisión"],
    ["fechaCaducidad", "Fecha de caducidad"],
    ["observacionesMatricula", "Observaciones de la matrícula"]
  ];

  let feriaTasks = [];
  let feriaLoadedAt = 0;
  let feriaLoading = null;
  let legalFilter = "activas";
  // Listas paginadas de 5 en 5 con buscador (asesor y mesa de control).
  const PAGE_SIZE = 5;
  const listState = { mine: { page: 1, term: "" }, legal: { page: 1, term: "" } };
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

  function isReceivingRequests() {
    return Date.now() < FERIA_SOLICITUDES_HASTA.getTime();
  }

  function currentUser() {
    const user = typeof session === "object" && session ? session : {};
    return { id: String(user.userId || user.role || ""), name: String(user.name || "Usuario"), agency: String(user.agency || ""), role: String(user.role || "") };
  }

  // Asistentes legales que el administrador activo para recibir la feria (Usuarios > Feria Automundo).
  // Si nadie esta activado o disponible, las solicitudes quedan pendientes: el administrador las ve
  // y las puede asignar desde su modulo.
  function feriaLegalUsers() {
    const users = typeof state === "object" && Array.isArray(state?.legalUsers) ? state.legalUsers : [];
    return users.filter((user) => Array.isArray(user.mailboxes) && user.mailboxes.includes("feria"));
  }

  function currentLegalRecord() {
    return feriaLegalUsers().find((user) => user.id === currentUser().id) || null;
  }

  function legalReceivesFeria() {
    return Boolean(currentLegalRecord());
  }

  // Disponible para recibir solicitudes nuevas (las que ya tomo siempre las ve).
  function legalAvailableForFeria() {
    const record = currentLegalRecord();
    return Boolean(record) && record.legalAvailable !== false;
  }

  function canUseFeria() {
    const role = currentUser().role;
    if (!isFeriaActive() || !["commercial", "legal", "admin"].includes(role)) return false;
    return role !== "legal" || legalReceivesFeria();
  }

  function applyVisibility() {
    const show = canUseFeria();
    $$("[data-feria-only]").forEach((element) => {
      element.hidden = !show;
    });
    if (!show && typeof activeMcPage === "string" && activeMcPage === "feria" && typeof setMesaControlPage === "function") {
      setMesaControlPage("bandeja");
    }
    const open = isReceivingRequests();
    const form = $("#fxForm");
    const closed = $("[data-fx-closed]");
    if (form) form.hidden = !open;
    if (closed) closed.hidden = open;
    const note = $("[data-fx-assign-note]");
    if (note) {
      const names = feriaLegalUsers().filter((user) => user.legalAvailable !== false).map((user) => user.name);
      note.hidden = !show;
      note.textContent = currentUser().role === "legal" && !legalAvailableForFeria()
        ? "Estás como no disponible: no recibes solicitudes nuevas. Solo ves las que ya tomaste."
        : names.length
          ? `Estas solicitudes llegan a: ${names.join(", ")}. Lo define el administrador en Usuarios.`
          : "Nadie de mesa de control está disponible para la feria: las solicitudes quedan pendientes hasta que el administrador active a alguien.";
    }
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
        feriaTasks = [...latest.values()].filter((task) => !task.deleted).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
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
    feriaTasks = task.deleted
      ? feriaTasks.filter((item) => item.id !== task.id)
      : [task, ...feriaTasks.filter((item) => item.id !== task.id)];
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
      let extras = 0;
      EXTRA_FIELDS.forEach(([name]) => {
        if (setFormField(form, name, data[name])) extras += 1;
      });
      if (extras) {
        const more = $("[data-fx-more]", form);
        if (more) more.open = true;
      }
      updateExtraCount(form);
      const mismatch = readPlate && plate && readPlate !== plate;
      if (mismatch) {
        setHint(`Atención: la matrícula dice ${readPlate} y la placa consultada es ${plate}. Revisa antes de enviar.`, "warn");
      } else {
        setHint(filled.length || extras
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

  // Limpia lo que form.reset() no toca (fotos, consulta ANT, marcas de autollenado).
  function clearFormExtras(form) {
    resetPhotos();
    const more = $("[data-fx-more]", form);
    if (more) more.open = false;
    updateExtraCount(form);
    pendingLookup = null;
    $$(".is-autofilled", form).forEach((field) => field.classList.remove("is-autofilled"));
    setFormStatus("");
    setHint("Empieza consultando la placa en ANT. Es obligatorio para enviar la solicitud.", "info");
  }

  function resetForm(form) {
    form.reset();
    clearFormExtras(form);
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
        matriculaDatos: Object.fromEntries(EXTRA_FIELDS
          .map(([name]) => [name, String(data[name] || "").trim().toUpperCase()])
          .filter(([, value]) => value)),
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


  // ===== Enviar la liquidacion al cliente por WhatsApp =====
  const WA_ICON = '<svg class="fx-wa-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2Z" fill="currentColor"/></svg>';

  function titleCase(value) {
    return String(value || "").toLowerCase().replace(/(^|[\s-])([a-záéíóúñü])/g, (match, space, letter) => space + letter.toUpperCase()).trim();
  }

  // Numero de Ecuador en formato internacional: 0991234567 -> 593991234567.
  function whatsappNumber(value) {
    let digits = String(value || "").replace(/\D/g, "");
    if (digits.startsWith("593")) return digits.length >= 11 ? digits : "";
    if (digits.startsWith("0")) digits = digits.slice(1);
    return digits.length === 9 ? `593${digits}` : (digits.length >= 10 ? digits : "");
  }

  function whatsappMessage(task) {
    const ficha = fichaOf(task);
    const client = titleCase(ficha.propietario) || "estimado cliente";
    const advisor = titleCase(task.asesor?.name || currentUser().name);
    // Siglas cortas (AC, GL, 4X4) se quedan en mayusculas: "Nissan Kicks Drive AC 1.6".
    const car = String([ficha.marca, ficha.modelo].filter(Boolean).join(" ")).split(/\s+/).filter(Boolean)
      .map((word) => (word.length <= 2 || /\d/.test(word) ? word.toUpperCase() : titleCase(word))).join(" ") || "vehículo";
    const year = ficha.anio ? `, año ${ficha.anio}` : "";
    return [
      `¡Hola, ${client}! 👋`,
      `Soy ${advisor}, tu asesor comercial de AUTOCOR. ¡Gracias por confiar en nosotros! 🚗`,
      `Te comparto la liquidación de tu ${car}${year}, placas ${task.placa}, con todos los valores detallados para que podamos avanzar con tu negociación.`,
      "¡Queremos que aproveches esta oportunidad durante la Feria Automundo! Estamos listos para acompañarte y hacer que tu negociación sea rápida, segura y transparente.",
      "*Recuerda* que en AUTOCOR nos encargamos de todo: revisión legal, documentación, trámites y traspaso. ¡Tú disfrutas de una experiencia fácil y sin complicaciones! 🤝",
      "¡Sigamos sumando kilómetros juntos y hagamos de esta feria una gran experiencia para ti!"
    ].join("\n\n");
  }

  function liquidationFileName(task) {
    return `Liquidacion-AUTOCOR-${task.placa}.pdf`;
  }

  function canShareFiles() {
    try {
      const probe = new File(["x"], "x.pdf", { type: "application/pdf" });
      return typeof navigator.canShare === "function" && navigator.canShare({ files: [probe] });
    } catch {
      return false;
    }
  }

  const pdfCache = new Map();
  function prefetchPdf(task) {
    if (!pdfCache.has(task.resultado.path)) {
      const promise = window.AutocorAuth.downloadFile(task.resultado.path)
        .then((blob) => new File([blob], liquidationFileName(task), { type: "application/pdf" }));
      promise.catch(() => pdfCache.delete(task.resultado.path));
      pdfCache.set(task.resultado.path, promise);
    }
    return pdfCache.get(task.resultado.path);
  }

  // El enlace se prepara al abrir la ventana para que el chat se abra al instante con el toque.
  const linkCache = new Map();
  function prefetchLink(task) {
    const key = task.resultado.path;
    if (!linkCache.has(key)) {
      const entry = { url: "", promise: null };
      entry.promise = window.AutocorAuth.signedFileUrl(key, 7 * 24 * 60 * 60)
        .then((url) => { entry.url = url; return url; })
        .catch((error) => { linkCache.delete(key); throw error; });
      entry.promise.catch(() => {});
      linkCache.set(key, entry);
    }
    return linkCache.get(key);
  }

  function openWhatsapp(taskId) {
    const task = feriaTasks.find((item) => item.id === taskId);
    if (!task?.resultado?.path) return;
    const number = whatsappNumber(task.telefono);
    const shareFiles = canShareFiles();
    const dialog = document.createElement("div");
    dialog.className = "fx-modal fx-wa-modal";
    dialog.innerHTML = `
      <div class="fx-modal-backdrop" data-fx-close></div>
      <section class="fx-modal-card" role="dialog" aria-modal="true" aria-labelledby="fxWaTitle">
        <header class="fx-modal-head">
          <div>
            <span class="fx-badge">Liquidación · ${esc(task.placa)}</span>
            <h3 id="fxWaTitle">Enviar al cliente por WhatsApp</h3>
          </div>
          <button type="button" class="fx-modal-close" data-fx-close aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
        </header>
        <div class="fx-wa-body" data-fx-wa="${esc(task.id)}">
          <div class="fx-wa-to">
            <span>Para</span>
            <strong>${esc(titleCase(fichaOf(task).propietario) || "Cliente")}</strong>
            <em>${number ? `+${esc(number.slice(0, 3))} ${esc(number.slice(3))}` : "Sin número válido"}</em>
          </div>
          <label class="fx-wa-label" for="fxWaText">Mensaje (puedes editarlo)</label>
          <textarea id="fxWaText" rows="11" data-fx-wa-text>${esc(whatsappMessage(task))}</textarea>
          <div class="fx-wa-file">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
            <span>${esc(liquidationFileName(task))}</span>
          </div>
          <div class="fx-wa-actions">
            ${number ? `<button type="button" class="btn fx-wa-btn" data-fx-wa-chat>${WA_ICON}Abrir chat de +${esc(number.slice(0, 3))} ${esc(number.slice(3))}</button>` : ""}
            ${shareFiles ? `<button type="button" class="btn secondary" data-fx-wa-share>Adjuntar el PDF como archivo</button>` : ""}
          </div>
          <p class="fx-wa-help">${number
            ? `<b>Abrir chat</b> va directo al número del cliente con el mensaje y un enlace seguro a la liquidación (válido 7 días).${shareFiles ? " Si además quieres mandar el PDF como archivo, usa <b>Adjuntar el PDF</b>: WhatsApp no deja elegir el número desde aquí, pero el chat del cliente te aparecerá primero en la lista." : ""}`
            : "El número registrado no es válido. Usa <b>Adjuntar el PDF</b> y elige el chat del cliente en WhatsApp."}</p>
        </div>
      </section>`;
    document.body.appendChild(dialog);
    document.body.classList.add("fx-modal-open");
    if (shareFiles) prefetchPdf(task);
    if (number) prefetchLink(task);
    dialog.querySelector("[data-fx-wa-share],[data-fx-wa-chat]")?.focus();
  }

  async function logWhatsapp(taskId, how) {
    try {
      await withFreshTask(taskId, (task) => {
        task.enviosWhatsapp = [...(task.enviosWhatsapp || []), { at: new Date().toISOString(), by: currentUser().name, how }];
        task.history = addHistory(task, "Liquidación enviada al cliente por WhatsApp", how);
        return task;
      });
    } catch {}
  }

  async function shareWhatsappPdf(button) {
    const box = button.closest("[data-fx-wa]");
    const task = feriaTasks.find((item) => item.id === box?.dataset.fxWa);
    if (!task) return;
    const text = box.querySelector("[data-fx-wa-text]").value.trim();
    const file = await prefetchPdf(task);
    // Algunas versiones de WhatsApp ignoran el texto al compartir un archivo: queda copiado para pegarlo.
    navigator.clipboard?.writeText(text).catch(() => {});
    try {
      await navigator.share({ files: [file], text, title: `Liquidación ${task.placa}` });
    } catch (error) {
      if (error?.name === "AbortError") return;
      throw error;
    }
    toast("Listo. Si el mensaje no aparece en WhatsApp, pégalo: ya está copiado.");
    logWhatsapp(task.id, "PDF adjunto");
  }

  async function openWhatsappChat(button) {
    const box = button.closest("[data-fx-wa]");
    const task = feriaTasks.find((item) => item.id === box?.dataset.fxWa);
    const number = whatsappNumber(task?.telefono);
    if (!task || !number) return;
    const message = box.querySelector("[data-fx-wa-text]").value.trim();
    const buildUrl = (link) => `https://wa.me/${number}?text=${encodeURIComponent(`${message}\n\n📄 Descarga tu liquidación aquí:\n${link}`)}`;
    const entry = prefetchLink(task);
    if (entry.url) {
      // Directo al chat del numero registrado (en el celular abre la app de WhatsApp).
      const opened = window.open(buildUrl(entry.url), "_blank");
      if (!opened) window.location.href = buildUrl(entry.url);
    } else {
      const popup = window.open("", "_blank");
      try {
        const url = buildUrl(await entry.promise);
        if (popup) popup.location.href = url;
        else window.location.href = url;
      } catch (error) {
        popup?.close();
        throw error;
      }
    }
    logWhatsapp(task.id, "Chat del cliente con enlace al PDF");
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
      if (!isLegal) {
        actions += `<button type="button" class="btn fx-btn fx-wa-btn" data-fx-whatsapp="${esc(task.id)}">${WA_ICON}Enviar al cliente por WhatsApp</button>`;
      }
      actions += `<button type="button" class="btn ${isLegal ? "primary" : "secondary"} fx-btn" data-fx-download="${esc(task.id)}">Descargar liquidación</button>`;
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
          ${task.tomadaPor
            ? `<span class="fx-card-taker">${takenByOther || !isLegal ? `Atiende: ${esc(task.tomadaPor.name)}` : "La atiendes tú"}</span>`
            : (!isLegal && task.status === "pendiente" ? `<span class="fx-card-taker is-waiting">Aún sin asesor legal asignado</span>` : "")}
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
          ${extraRows(task) ? `<section class="fx-ficha-panel fx-ficha-wide"><h4>Datos de la matrícula</h4><dl class="fx-ficha-extra">${extraRows(task)}</dl></section>` : ""}
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

  function extraRows(task) {
    const extra = task.matriculaDatos || {};
    return EXTRA_FIELDS.filter(([name]) => extra[name])
      .map(([name, label]) => `<div class="fx-ficha-row"><dt>${esc(label)}</dt><dd>${esc(extra[name])}</dd></div>`).join("");
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

  function matchesTerm(task, term) {
    if (!term) return true;
    const ficha = fichaOf(task);
    const plain = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const haystack = plain([task.placa, ficha.propietario, ficha.cedula, task.telefono, ficha.marca, ficha.modelo, task.asesor?.name, task.tomadaPor?.name].join(" "));
    return plain(term).split(/\s+/).filter(Boolean).every((word) => haystack.includes(word));
  }

  // Devuelve solo la pagina actual y dibuja los botones de paginas.
  function paginate(key, items) {
    const info = listState[key];
    const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    info.page = Math.min(Math.max(1, info.page), pages);
    const pager = $(`[data-fx-pager="${key}"]`);
    if (pager) {
      if (items.length <= PAGE_SIZE) {
        pager.innerHTML = items.length ? `<span class="fx-pager-info">${items.length} solicitud${items.length === 1 ? "" : "es"}</span>` : "";
      } else {
        const from = (info.page - 1) * PAGE_SIZE + 1;
        const to = Math.min(items.length, info.page * PAGE_SIZE);
        const numbers = [];
        for (let page = 1; page <= pages; page += 1) {
          if (page === 1 || page === pages || Math.abs(page - info.page) <= 1) numbers.push(page);
          else if (numbers[numbers.length - 1] !== "…") numbers.push("…");
        }
        pager.innerHTML = `
          <span class="fx-pager-info">${from}–${to} de ${items.length}</span>
          <div class="fx-pager-buttons">
            <button type="button" data-fx-page="${key}:${info.page - 1}" ${info.page === 1 ? "disabled" : ""} aria-label="Página anterior">‹</button>
            ${numbers.map((page) => page === "…"
              ? `<span class="fx-pager-gap">…</span>`
              : `<button type="button" class="${page === info.page ? "is-active" : ""}" data-fx-page="${key}:${page}" ${page === info.page ? 'aria-current="page"' : ""}>${page}</button>`).join("")}
            <button type="button" data-fx-page="${key}:${info.page + 1}" ${info.page === pages ? "disabled" : ""} aria-label="Página siguiente">›</button>
          </div>`;
      }
    }
    return items.slice((info.page - 1) * PAGE_SIZE, info.page * PAGE_SIZE);
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
    const found = mine.filter((task) => matchesTerm(task, listState.mine.term));
    const page = paginate("mine", found);
    list.innerHTML = page.length
      ? page.map((task) => renderCard(task, "commercial")).join("")
      : `<div class="fx-empty">${mine.length ? "No hay solicitudes que coincidan con la búsqueda." : "Aún no has enviado fichas en la feria."}</div>`;
  }

  // Lo que ve cada asistente: el administrador todo; el asistente disponible todo; el no disponible solo lo suyo.
  function legalVisibleTasks() {
    const user = currentUser();
    if (user.role !== "legal" || legalAvailableForFeria()) return feriaTasks;
    return feriaTasks.filter((task) => task.tomadaPor?.id === user.id);
  }

  function renderLegal() {
    const list = $("#fxLegalList");
    if (!list) return;
    const visible = legalVisibleTasks();
    const counts = countBy(visible);
    $$("[data-fx-legal-count]").forEach((element) => {
      element.textContent = String(counts[element.dataset.fxLegalCount] || 0);
    });
    $$("[data-fx-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.fxFilter === legalFilter));
    const filtered = visible.filter((task) => legalFilter === "activas"
      ? ["pendiente", "en_revision"].includes(task.status)
      : task.status === legalFilter);
    const ordered = legalFilter === "activas"
      ? [...filtered].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
      : filtered;
    const found = ordered.filter((task) => matchesTerm(task, listState.legal.term));
    const page = paginate("legal", found);
    list.innerHTML = page.length
      ? page.map((task) => renderCard(task, "legal")).join("")
      : `<div class="fx-empty">${ordered.length ? "No hay solicitudes que coincidan con la búsqueda." : "No hay solicitudes en este estado."}</div>`;
  }

  async function refreshAll(force = true) {
    if (!canUseFeria()) return;
    await loadFeriaTasks(force);
    renderCommercial();
    renderLegal();
    renderAdmin();
  }

  function startAutoRefresh() {
    window.clearInterval(refreshTimer);
    refreshTimer = window.setInterval(() => {
      const commercialVisible = !$("[data-commercial-area-section='feria']")?.hidden && currentViewId === "formulario";
      const legalVisible = Boolean($("#fxLegalPanel")?.offsetParent) && currentViewId === "tareas";
      const busy = $(".fx-modal") || document.activeElement?.closest?.(".fx-resolve");
      if (document.visibilityState === "visible" && !busy && (commercialVisible || legalVisible)) refreshAll(true);
    }, 30000);
  }

  // ===== Reporte de la feria (CSV para Excel) =====
  function minutesBetween(start, end) {
    const a = Date.parse(start || "");
    const b = Date.parse(end || "");
    return Number.isFinite(a) && Number.isFinite(b) && b >= a ? Math.round((b - a) / 60000) : "";
  }

  function localDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const pad = (number) => String(number).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  async function exportFeria() {
    await loadFeriaTasks(true);
    if (!feriaTasks.length) {
      toast("Todavía no hay solicitudes de la feria para descargar.", "error");
      return;
    }
    const headers = [
      "Placa", "Estado", "Propietario", "Cédula/RUC", "Marca", "Modelo", "Año", "Color", "Clase", "Servicio", "Chasis", "Motor",
      "Precio de toma", "Kilometraje", "Teléfono", "Asesor", "Agencia",
      "Fecha de envío", "Tomada por", "Fecha tomada", "Realizada por", "Fecha realizada",
      "Minutos hasta tomar", "Minutos de atención", "Minutos totales",
      "ANT deuda", "ANT multas", "ANT prohibición de enajenar", "Fotos de matrícula", "Liquidación subida",
      "Observaciones del asesor", "Comentario de mesa", "Observación de mesa", "Veces devuelta",
      ...EXTRA_FIELDS.map(([, label]) => label)
    ];
    const ordered = [...feriaTasks].sort((a, b) => String(a.createdAt || "").localeCompare(String(b.createdAt || "")));
    const rows = ordered.map((task) => {
      const ficha = fichaOf(task);
      const takenAt = task.tomadaPor?.at || "";
      const doneAt = task.status === "finalizada" ? task.resultado?.at || "" : "";
      const photos = matriculaFiles(task).length;
      const returned = (task.history || []).filter((item) => /observaci/i.test(item.action || "")).length;
      // Cedula y telefono como texto para que Excel no borre el cero inicial.
      const asText = (value) => (value ? `="${String(value).replace(/"/g, "")}"` : "");
      return [
        task.placa, STATUS_LABELS[task.status] || task.status, ficha.propietario, asText(ficha.cedula), ficha.marca, ficha.modelo, ficha.anio, ficha.color,
        ficha.clase, ficha.servicio, ficha.chasis, ficha.motor,
        String(Number(task.precioToma || 0).toFixed(2)).replace(".", ","), task.kilometraje, asText(task.telefono), task.asesor?.name, task.asesor?.agency,
        localDate(task.createdAt), task.tomadaPor?.name || "", localDate(takenAt), doneAt ? task.resultado?.by || "" : "", localDate(doneAt),
        minutesBetween(task.createdAt, takenAt), minutesBetween(takenAt, doneAt), minutesBetween(task.createdAt, doneAt),
        task.ant ? String(Number(task.ant.deuda || 0).toFixed(2)).replace(".", ",") : "", task.ant ? task.ant.multas : "",
        task.ant ? (task.ant.prohibicion ? "Sí" : "No") : "", photos, task.resultado?.path ? "Sí" : "No",
        task.observaciones, task.resultado?.comentario || "", task.observacionMesa || "", returned,
        ...EXTRA_FIELDS.map(([name]) => (name === "telefonoPropietario" ? asText(task.matriculaDatos?.[name]) : task.matriculaDatos?.[name] || ""))
      ];
    });
    const csv = "﻿" + [headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const stamp = localDate(new Date().toISOString()).replace(/[: ]/g, "-");
    link.href = url;
    link.download = `feria-automundo-2026-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
    toast(`Reporte descargado: ${rows.length} solicitud${rows.length === 1 ? "" : "es"}.`);
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
    if (user.role === "legal" && !legalAvailableForFeria()) {
      toast("Estás como no disponible o sin la feria activada. Pide al administrador que te la asigne.", "error");
      return;
    }
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


  // ===== Administrador: editar, reasignar o borrar solicitudes =====
  let adminSearch = "";
  let adminStatus = "";
  let adminEditingId = "";

  function legalUserOptions() {
    const users = typeof state === "object" && Array.isArray(state?.legalUsers) ? state.legalUsers : [];
    return users.map((user) => ({ id: user.id, name: user.name }));
  }

  function renderAdmin() {
    const list = $("#fxaList");
    if (!list) return;
    const counts = countBy(feriaTasks);
    $$("[data-fxa-stat]").forEach((element) => {
      element.textContent = String(counts[element.dataset.fxaStat] || 0);
    });
    const term = adminSearch.trim().toLowerCase();
    const rows = feriaTasks.filter((task) => {
      if (adminStatus && task.status !== adminStatus) return false;
      if (!term) return true;
      const ficha = fichaOf(task);
      return [task.placa, ficha.propietario, ficha.cedula, task.asesor?.name, task.tomadaPor?.name, ficha.marca, ficha.modelo]
        .join(" ").toLowerCase().includes(term);
    });
    list.innerHTML = rows.length ? `
      <table class="fxa-table">
        <thead><tr><th>Placa / vehículo</th><th>Propietario</th><th>Asesor</th><th>Atiende</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          ${rows.map((task) => {
            const ficha = fichaOf(task);
            return `
              <tr class="${task.id === adminEditingId ? "is-selected" : ""}">
                <td data-label="Placa"><strong class="fxa-plate">${esc(task.placa)}</strong><small>${esc(vehicleLine(task))}</small></td>
                <td data-label="Propietario">${esc(ficha.propietario || "-")}<small>${esc(ficha.cedula || "")}</small></td>
                <td data-label="Asesor">${esc(task.asesor?.name || "-")}<small>${esc(when(task.createdAt))}</small></td>
                <td data-label="Atiende">${esc(task.tomadaPor?.name || "Sin asignar")}</td>
                <td data-label="Estado">${statusPill(task.status)}</td>
                <td class="fxa-actions"><button type="button" class="btn secondary fx-btn" data-fxa-edit="${esc(task.id)}">Editar</button></td>
              </tr>`;
          }).join("")}
        </tbody>
      </table>` : `<div class="fx-empty">No hay solicitudes con ese filtro.</div>`;
  }

  function field(label, name, value, { type = "text", wide = false, options = null } = {}) {
    const control = options
      ? `<select name="${name}">${options.map(([optionValue, optionLabel]) => `<option value="${esc(optionValue)}" ${String(optionValue) === String(value ?? "") ? "selected" : ""}>${esc(optionLabel)}</option>`).join("")}</select>`
      : type === "textarea"
        ? `<textarea name="${name}" rows="2">${esc(value ?? "")}</textarea>`
        : `<input name="${name}" type="${type}" value="${esc(value ?? "")}" ${type === "number" ? 'min="0" step="any"' : ""}>`;
    return `<label class="fxa-field${wide ? " is-wide" : ""}"><span>${esc(label)}</span>${control}</label>`;
  }

  function openEditor(taskId) {
    const editor = $("#fxaEditor");
    const task = feriaTasks.find((item) => item.id === taskId);
    if (!editor || !task) return;
    adminEditingId = taskId;
    const ficha = fichaOf(task);
    const legal = [["", "Sin asignar"], ...legalUserOptions().map((user) => [user.id, user.name])];
    if (task.tomadaPor?.id && !legal.some(([id]) => id === task.tomadaPor.id)) legal.push([task.tomadaPor.id, task.tomadaPor.name]);
    const files = matriculaFiles(task)
      .map(([side, label]) => `<button type="button" class="btn secondary fx-btn" data-fx-photo="${esc(task.id)}" data-fx-side-open="${side}">${esc(label)}</button>`).join("");
    const history = (task.history || []).slice(-6).reverse()
      .map((item) => `<li><b>${esc(when(item.at))}</b> · ${esc(item.action)} · ${esc(item.by || "")}</li>`).join("");
    editor.innerHTML = `
      <form class="fxa-form" data-fxa-form="${esc(task.id)}">
        <header class="fxa-editor-head">
          <div><span>Editar solicitud de feria</span><h3>${esc(task.placa)} · ${esc(vehicleLine(task))}</h3></div>
          <button type="button" class="fx-modal-close" data-fxa-close aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>
        </header>
        <fieldset><legend>Estado y responsable</legend>
          ${field("Estado", "status", task.status, { options: Object.entries(STATUS_LABELS) })}
          ${field("Atiende", "tomadaPor", task.tomadaPor?.id || "", { options: legal })}
          ${field("Observación de mesa", "observacionMesa", task.observacionMesa || "", { type: "textarea", wide: true })}
        </fieldset>
        <fieldset><legend>Vehículo y propietario</legend>
          ${field("Placa", "placa", task.placa)}
          ${FICHA_FIELDS.map(([name, label]) => field(label, name, ficha[name] || "", { wide: name === "propietario" })).join("")}
        </fieldset>
        <fieldset><legend>Más datos de la matrícula</legend>
          ${EXTRA_FIELDS.map(([name, label, wide]) => field(label, `extra_${name}`, task.matriculaDatos?.[name] || "", { wide })).join("")}
        </fieldset>
        <fieldset><legend>Negociación</legend>
          ${field("Precio de toma", "precioToma", task.precioToma || "", { type: "number" })}
          ${field("Kilometraje", "kilometraje", task.kilometraje ?? "", { type: "number" })}
          ${field("Teléfono", "telefono", task.telefono || "")}
          ${field("Observaciones del asesor", "observaciones", task.observaciones || "", { type: "textarea", wide: true })}
        </fieldset>
        <fieldset><legend>Archivos</legend>
          <div class="fxa-files is-wide">
            ${files || `<span class="fx-muted">Sin fotos de la matrícula.</span>`}
            ${task.resultado?.path ? `<button type="button" class="btn secondary fx-btn" data-fx-download="${esc(task.id)}">Descargar liquidación</button>` : ""}
            <label class="fx-file"><input type="file" accept="application/pdf" name="liquidacion" data-fx-result-file><span>${task.resultado?.path ? "Reemplazar liquidación (PDF)" : "Subir liquidación (PDF)"}</span></label>
          </div>
        </fieldset>
        ${history ? `<ul class="fx-history fxa-history">${history}</ul>` : ""}
        <footer class="fxa-editor-foot">
          <button type="button" class="btn fxa-delete" data-fxa-delete="${esc(task.id)}">Eliminar solicitud</button>
          <button type="button" class="btn secondary" data-fxa-close>Cancelar</button>
          <button type="submit" class="btn primary">Guardar cambios</button>
        </footer>
      </form>`;
    editor.hidden = false;
    renderAdmin();
    if (window.matchMedia("(max-width: 1100px)").matches) editor.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeEditor() {
    adminEditingId = "";
    const editor = $("#fxaEditor");
    if (editor) {
      editor.hidden = true;
      editor.innerHTML = "";
    }
    renderAdmin();
  }

  async function saveAdminEdit(form) {
    const taskId = form.dataset.fxaForm;
    const data = Object.fromEntries(new FormData(form).entries());
    const file = form.elements.liquidacion?.files?.[0] || null;
    const plate = plateOf(data.placa);
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) throw new Error("La placa no es válida.");
    if (file && file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) throw new Error("La liquidación debe ser un PDF.");
    const user = currentUser();
    const uploaded = file ? await uploadFeriaFile(file, "liquidaciones", taskId) : null;
    const saved = await withFreshTask(taskId, (task) => {
      if (data.status === "finalizada" && !task.resultado?.path && !uploaded) {
        throw new Error("Para marcarla como realizada, sube la liquidación en PDF.");
      }
      const changes = [];
      const ficha = { ...fichaOf(task) };
      FICHA_FIELDS.forEach(([name, label]) => {
        const value = String(data[name] || "").trim().toUpperCase();
        if (value !== String(ficha[name] || "")) changes.push(label);
        ficha[name] = value;
      });
      if (plate !== task.placa) changes.push("Placa");
      const extras = {};
      EXTRA_FIELDS.forEach(([name]) => {
        const value = String(data[`extra_${name}`] || "").trim().toUpperCase();
        if (value) extras[name] = value;
      });
      if (JSON.stringify(extras) !== JSON.stringify(task.matriculaDatos || {})) changes.push("Datos de la matrícula");
      task.matriculaDatos = extras;
      const price = Number(data.precioToma) || 0;
      const km = Number(data.kilometraje) || 0;
      if (price !== Number(task.precioToma || 0)) changes.push("Precio de toma");
      if (km !== Number(task.kilometraje || 0)) changes.push("Kilometraje");
      if (String(data.telefono || "").trim() !== String(task.telefono || "")) changes.push("Teléfono");
      if (String(data.observaciones || "").trim() !== String(task.observaciones || "")) changes.push("Observaciones");
      task.placa = plate;
      task.ficha = ficha;
      task.propietario = ficha.propietario;
      task.cedula = ficha.cedula;
      task.vehiculo = { marca: ficha.marca, modelo: ficha.modelo, anio: ficha.anio, color: ficha.color };
      task.precioToma = price;
      task.kilometraje = km;
      task.telefono = String(data.telefono || "").trim();
      task.observaciones = String(data.observaciones || "").trim();
      task.observacionMesa = String(data.observacionMesa || "").trim();

      const takerId = String(data.tomadaPor || "");
      if (takerId !== String(task.tomadaPor?.id || "")) {
        const taker = legalUserOptions().find((item) => item.id === takerId);
        task.tomadaPor = taker ? { id: taker.id, name: taker.name, at: new Date().toISOString() } : null;
        changes.push(taker ? `Asignada a ${taker.name}` : "Sin asignar");
      }
      let status = data.status || task.status;
      if (status === "en_revision" && !task.tomadaPor) status = "pendiente";
      if (status === "pendiente" && task.tomadaPor && takerId) status = "en_revision";
      if (status !== task.status) changes.push(`Estado: ${STATUS_LABELS[status] || status}`);
      task.status = status;
      if (uploaded) {
        task.resultado = { ...(task.resultado || {}), ...uploaded, at: new Date().toISOString(), by: user.name, byId: user.id };
        changes.push("Liquidación");
      }
      if (!changes.length) return null;
      task.history = addHistory(task, "Editada por el administrador", changes.join(", "));
      return task;
    });
    toast(saved ? "Cambios guardados." : "No hubo cambios para guardar.");
    if (saved) openEditor(taskId);
  }

  async function deleteAdminTask(taskId) {
    const task = feriaTasks.find((item) => item.id === taskId);
    if (!task) return;
    if (!window.confirm(`¿Eliminar la solicitud de ${task.placa}? Ya no aparecerá para el asesor ni para la mesa de control.`)) return;
    await withFreshTask(taskId, (fresh) => {
      fresh.deleted = true;
      fresh.history = addHistory(fresh, "Eliminada por el administrador");
      return fresh;
    });
    closeEditor();
    toast(`Solicitud de ${task.placa} eliminada.`);
  }

  // ===== Eventos =====
  function buildExtraInputs() {
    const box = $("[data-fx-extra]");
    if (!box || box.childElementCount) return;
    box.innerHTML = EXTRA_FIELDS.map(([name, label, wide]) =>
      `<label class="${wide ? "fx-span" : ""}">${esc(label)}<input name="${name}" autocomplete="off"></label>`).join("");
  }

  function updateExtraCount(form = $("#fxForm")) {
    const counter = $("[data-fx-more-count]");
    if (!counter || !form) return;
    const filled = EXTRA_FIELDS.filter(([name]) => String(form.elements[name]?.value || "").trim()).length;
    counter.textContent = filled ? `${filled} dato${filled === 1 ? "" : "s"} leído${filled === 1 ? "" : "s"} de la matrícula` : "Se llenan al extraer los datos de las fotos";
  }

  function bind() {
    buildExtraInputs();
    const form = $("#fxForm");
    form?.addEventListener("submit", submitFeriaForm);
    form?.addEventListener("reset", () => {
      window.setTimeout(() => clearFormExtras(form), 0);
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
      if (target.closest?.("[data-admin-module='admin-feria-module']")) {
        refreshAll(true);
        return;
      }
      const pageButton = target.closest?.("[data-fx-page]");
      if (pageButton) {
        const [key, page] = pageButton.dataset.fxPage.split(":");
        listState[key].page = Number(page) || 1;
        if (key === "mine") renderCommercial();
        else renderLegal();
        const list = $(key === "mine" ? "#fxMineList" : "#fxLegalList");
        if (list && list.getBoundingClientRect().top < 80) list.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (target.closest?.("[data-fxa-close]")) {
        closeEditor();
        return;
      }
      if (target.closest?.("[data-commercial-area='feria']")) {
        refreshAll(true);
        return;
      }
      const button = target.closest?.("[data-fx-export],[data-fx-datacil],[data-fx-ocr],[data-fx-reload],[data-fx-filter],[data-fx-take],[data-fx-finish],[data-fx-observe],[data-fx-resend],[data-fx-ficha],[data-fx-download],[data-fx-photo],[data-fxa-edit],[data-fxa-delete],[data-fxa-reload],[data-fx-whatsapp],[data-fx-wa-share],[data-fx-wa-chat]");
      if (!button) return;
      event.preventDefault();
      try {
        if (button.matches("[data-fx-export]")) return await exportFeria();
        if (button.matches("[data-fx-datacil]")) return await lookupPlate();
        if (button.matches("[data-fx-ocr]")) return await extractFromPhotos();
        if (button.matches("[data-fx-reload]")) return await refreshAll(true);
        if (button.matches("[data-fx-ficha]")) return openFicha(button.dataset.fxFicha);
        if (button.matches("[data-fxa-edit]")) return openEditor(button.dataset.fxaEdit);
        if (button.matches("[data-fx-whatsapp]")) return openWhatsapp(button.dataset.fxWhatsapp);
        if (button.matches("[data-fx-wa-share]")) return await shareWhatsappPdf(button);
        if (button.matches("[data-fx-wa-chat]")) return await openWhatsappChat(button);
        if (button.matches("[data-fxa-reload]")) return await refreshAll(true);
        if (button.matches("[data-fx-filter]")) {
          legalFilter = button.dataset.fxFilter;
          listState.legal.page = 1;
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
        if (button.matches("[data-fxa-delete]")) await deleteAdminTask(button.dataset.fxaDelete);
      } catch (error) {
        toast(error.message || "No se pudo completar la acción.", "error");
      } finally {
        if (button.isConnected) button.disabled = false;
      }
    });

    document.addEventListener("submit", async (event) => {
      const form = event.target.closest?.("[data-fxa-form]");
      if (!form) return;
      event.preventDefault();
      const submit = form.querySelector("button[type='submit']");
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Guardando...";
      }
      try {
        await saveAdminEdit(form);
      } catch (error) {
        toast(error.message || "No se pudieron guardar los cambios.", "error");
      } finally {
        if (submit?.isConnected) {
          submit.disabled = false;
          submit.textContent = "Guardar cambios";
        }
      }
    });
    $$("[data-fx-search]").forEach((input) => {
      input.addEventListener("input", () => {
        const key = input.dataset.fxSearch;
        listState[key].term = input.value || "";
        listState[key].page = 1;
        if (key === "mine") renderCommercial();
        else renderLegal();
      });
    });
    $("[data-fxa-search]")?.addEventListener("input", (event) => {
      adminSearch = event.target.value || "";
      renderAdmin();
    });
    $("[data-fxa-status]")?.addEventListener("change", (event) => {
      adminStatus = event.target.value || "";
      renderAdmin();
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
    const role = `${currentUser().role}:${currentUser().id}:${feriaLegalUsers().map((user) => `${user.id}${user.legalAvailable === false ? "-off" : ""}`).join(",")}`;
    if (role !== lastRole) {
      lastRole = role;
      feriaTasks = [];
      feriaLoadedAt = 0;
      applyVisibility();
      if (canUseFeria() && currentUser().role === "legal") refreshAll(true);
    }
  }

  bind();
  applyVisibility();
  startAutoRefresh();
  window.setInterval(watchSession, 1500);
  window.AutocorFeria = { refresh: refreshAll, isActive: isFeriaActive };
})();
