// Formulario de compra: Consulta ANT, fotos de la cedula y de la matricula, lectura automatica
// de los documentos (funcion lectura-documentos) y la ficha que ve la mesa de control.
// app.js llama a collect() y uploadDocuments() al enviar, y a renderTaskDocs() en las fichas.
(function () {
  "use strict";

  const VEHICLE_FIELDS = [
    ["marca", "Marca"],
    ["modelo", "Modelo"],
    ["anio", "Año"],
    ["color", "Color"],
    ["clase", "Clase"],
    ["servicio", "Servicio"],
    ["chasis", "Chasis"],
    ["motor", "Motor"]
  ];

  // Datos adicionales de la matricula (se guardan en task.matriculaDatos).
  const MATRICULA_EXTRA = [
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
    ["valorMatricula", "Valor de la matrícula"],
    ["domicilio", "Domicilio del propietario", true],
    ["lugarEmision", "Lugar de emisión"],
    ["fechaCompra", "Fecha de compra"],
    ["fechaEmision", "Fecha de emisión"],
    ["fechaCaducidad", "Fecha de caducidad"],
    ["observacionesMatricula", "Observaciones de la matrícula", true]
  ];

  // Datos adicionales de la cedula (se guardan en task.clienteDatos).
  const CEDULA_EXTRA = [
    ["apellidos", "Apellidos"],
    ["nombres", "Nombres"],
    ["fechaNacimiento", "Fecha de nacimiento"],
    ["lugarNacimiento", "Lugar de nacimiento"],
    ["nacionalidad", "Nacionalidad"],
    ["sexo", "Sexo"],
    ["estadoCivil", "Estado civil"],
    ["conyuge", "Cónyuge"],
    ["instruccion", "Instrucción"],
    ["profesion", "Profesión"],
    ["nombrePadre", "Nombre del padre"],
    ["nombreMadre", "Nombre de la madre"],
    ["codigoDactilar", "Código dactilar"],
    ["numeroDocumento", "N.º de documento"],
    ["lugarExpedicion", "Lugar de expedición"],
    ["fechaExpedicion", "Fecha de expedición"],
    ["fechaExpiracion", "Fecha de vencimiento"]
  ];

  const DOCS = [
    ["cedulaAnverso", "Cédula · frente"],
    ["cedulaReverso", "Cédula · reverso"],
    ["matriculaAnverso", "Matrícula · frente"],
    ["matriculaReverso", "Matrícula · reverso"]
  ];

  const HINT_START = "Consulta la placa en ANT para llenar la ficha con los datos del propietario y del vehículo.";
  const photos = {};
  const antFilled = new Set();

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => (typeof escapeHtml === "function" ? escapeHtml(value) : String(value ?? ""));
  const toast = (message, type) => (typeof showToast === "function" ? showToast(message, type) : window.alert(message));
  const plateOf = (value) => String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const digits = (value) => String(value || "").replace(/\D/g, "");
  const getForm = () => document.getElementById("requestForm");

  function setHint(message, level = "info") {
    const hint = $("[data-cx-hint]");
    if (!hint) return;
    hint.textContent = message;
    hint.dataset.level = level;
  }

  function setField(form, name, value, { overwrite = true } = {}) {
    const field = form?.elements?.[name];
    const text = String(value ?? "").trim();
    if (!field || !text) return false;
    if (!overwrite && String(field.value || "").trim()) return false;
    field.value = name === "placa" ? plateOf(text) : name === "cedula" ? digits(text) : text.toUpperCase();
    field.classList.add("is-autofilled");
    return true;
  }

  // ===== Mas datos (cedula y matricula) =====
  function buildExtraInputs() {
    const groups = { cliente: ["cx_", CEDULA_EXTRA], vehiculo: ["mx_", MATRICULA_EXTRA] };
    Object.entries(groups).forEach(([key, [prefix, fields]]) => {
      const box = $(`[data-cx-extra="${key}"]`);
      if (!box || box.childElementCount) return;
      box.innerHTML = fields.map(([name, label, wide]) =>
        `<label class="${wide ? "cx-span" : ""}">${esc(label)}<input name="${prefix}${name}" autocomplete="off"></label>`).join("");
    });
  }

  function updateExtraCounts(form = getForm()) {
    if (!form) return;
    [["cliente", "cx_", CEDULA_EXTRA, "de la cédula"], ["vehiculo", "mx_", MATRICULA_EXTRA, "de la matrícula"]].forEach(([key, prefix, fields, source]) => {
      const counter = $(`[data-cx-more-count="${key}"]`);
      if (!counter) return;
      const filled = fields.filter(([name]) => String(form.elements[prefix + name]?.value || "").trim()).length;
      counter.textContent = filled
        ? `${filled} dato${filled === 1 ? "" : "s"} leído${filled === 1 ? "" : "s"} ${source}`
        : `Se llenan al extraer los datos ${source}`;
    });
  }

  // ===== Consulta ANT =====
  function canUseAnt() {
    return typeof canCurrentUserUseDatacil === "function" && canCurrentUserUseDatacil();
  }

  function syncAntButton() {
    const button = $("[data-cx-ant]");
    if (!button) return;
    const allowed = canUseAnt();
    button.hidden = !allowed;
    const hint = $("[data-cx-hint]");
    if (hint && !hint.dataset.level) {
      hint.textContent = allowed ? HINT_START : "Ingresa la placa. Con las fotos de la cédula y la matrícula se llena la ficha.";
    }
  }

  async function lookupPlate() {
    const form = getForm();
    const plate = plateOf(form?.elements.placa.value);
    if (!/^[A-Z]{3}[0-9]{3,4}$/.test(plate)) {
      setHint("Ingrese una placa válida, por ejemplo ABC1234.", "warn");
      form?.elements.placa.focus();
      return;
    }
    if (!canUseAnt()) {
      setHint("Tu usuario no tiene Consulta ANT habilitada. Pide al administrador que la active.", "warn");
      return;
    }
    const button = $("[data-cx-ant]");
    if (button) {
      button.disabled = true;
      button.textContent = "Consultando...";
    }
    try {
      const payload = await callDatacilFunction({ placa: plate });
      const snapshot = payload.snapshot;
      if (typeof upsertDatacilStoredLookup === "function") upsertDatacilStoredLookup(snapshot);
      // Vincula la consulta a la solicitud (se guarda en la ficha sin consumir otro credito).
      if (typeof migrateDatacilLookupToPurchase === "function") migrateDatacilLookupToPurchase(snapshot);
      const data = getDatacilPayload(snapshot);
      const owner = data.propietario || {};
      const vehicle = data.vehiculo || {};
      const yearKey = Object.keys(vehicle).find((key) => /^(año|anio|a.o)$/i.test(key)) || "";
      antFilled.clear();
      [["cliente", owner.nombre], ["cedula", owner.cedula], ["marca", vehicle.marca], ["modelo", vehicle.modelo],
        ["anio", yearKey ? vehicle[yearKey] : ""], ["color", vehicle.color], ["clase", vehicle.clase],
        ["servicio", vehicle.servicio], ["chasis", vehicle.chasis]]
        .forEach(([name, value]) => { if (setField(form, name, value)) antFilled.add(name); });
      const debt = Number(data.pagos?.totalPendiente || 0);
      const fines = Number(data.citaciones?.pendientes || 0);
      const alerts = [];
      if (debt > 0) alerts.push(`deuda de ${typeof formatDatacilMoney === "function" ? formatDatacilMoney(debt) : debt}`);
      if (fines > 0) alerts.push(`${fines} multa${fines === 1 ? "" : "s"} pendiente${fines === 1 ? "" : "s"}`);
      if (vehicle.prohibidoEnajenar === true) alerts.push("prohibición de enajenar");
      setHint(alerts.length
        ? `ANT reporta ${alerts.join(", ")}. La ficha se llenó; sigue con los documentos.`
        : `ANT sin novedades${payload.cached ? " (consulta guardada, sin costo)" : ""}. La ficha se llenó; sigue con los documentos.`, alerts.length ? "warn" : "ok");
    } catch (error) {
      setHint(error.message || "No se pudo consultar ANT.", "warn");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Consultar ANT";
      }
    }
  }

  // ===== Fotos =====
  async function compressImage(file, maxSide = 1600, quality = 0.82) {
    const bitmap = await createImageBitmap(file).catch(() => null);
    if (!bitmap) return file;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    return blob ? new File([blob], "documento.jpg", { type: "image/jpeg" }) : file;
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
      reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
      reader.readAsDataURL(blob);
    });
  }

  function syncOcrButton() {
    const button = $("[data-cx-ocr]");
    if (button && button.textContent !== "Extrayendo...") button.disabled = !Object.values(photos).some(Boolean);
  }

  function showPhoto(box, file) {
    const preview = box.querySelector(".cx-drop-preview");
    const empty = box.querySelector(".cx-drop-empty");
    const clear = box.querySelector("[data-cx-clear]");
    if (preview?.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.hidden = false;
    } else if (preview) {
      preview.removeAttribute("src");
      preview.hidden = true;
    }
    if (empty) empty.hidden = Boolean(file);
    if (clear) clear.hidden = !file;
    box.classList.toggle("has-photo", Boolean(file));
  }

  async function onPhotoSelected(input) {
    const box = input.closest("[data-cx-doc]");
    const key = box?.dataset.cxDoc;
    const file = input.files?.[0];
    if (!key || !file) return;
    if (!/^image\//.test(file.type)) {
      toast("Seleccione una imagen del documento.", "error");
      input.value = "";
      return;
    }
    photos[key] = await compressImage(file);
    input.value = "";
    showPhoto(box, photos[key]);
    syncOcrButton();
  }

  function clearPhoto(box) {
    const key = box?.dataset.cxDoc;
    if (!key) return;
    photos[key] = null;
    showPhoto(box, null);
    syncOcrButton();
  }

  async function readDocument(tipo, files) {
    const images = await Promise.all(files.map(async (file) => ({ image: await blobToBase64(file), mediaType: file.type || "image/jpeg" })));
    const response = await fetch(`${SUPABASE_FUNCTIONS_URL}/lectura-documentos`, {
      method: "POST",
      headers: { ...(await window.AutocorAuth.headers()), "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, images })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.error || "No se pudieron leer los documentos.");
    return payload.data || {};
  }

  async function extractFromPhotos() {
    const form = getForm();
    if (!form) return;
    const cedulaFiles = [photos.cedulaAnverso, photos.cedulaReverso].filter(Boolean);
    const matriculaFiles = [photos.matriculaAnverso, photos.matriculaReverso].filter(Boolean);
    if (!cedulaFiles.length && !matriculaFiles.length) return;
    const button = $("[data-cx-ocr]");
    if (button) {
      button.disabled = true;
      button.textContent = "Extrayendo...";
    }
    setHint("Leyendo los documentos...", "info");
    const notes = [];
    const warnings = [];
    try {
      const [cedula, matricula] = await Promise.all([
        cedulaFiles.length ? readDocument("cedula", cedulaFiles).catch((error) => ({ __error: error.message })) : null,
        matriculaFiles.length ? readDocument("matricula", matriculaFiles).catch((error) => ({ __error: error.message })) : null
      ]);

      if (matricula?.__error) warnings.push(`Matrícula: ${matricula.__error}`);
      else if (matricula) {
        let count = 0;
        VEHICLE_FIELDS.forEach(([name]) => { if (setField(form, name, matricula[name], { overwrite: !antFilled.has(name) })) count += 1; });
        if (setField(form, "cliente", matricula.propietario, { overwrite: false })) count += 1;
        if (setField(form, "cedula", matricula.cedula, { overwrite: false })) count += 1;
        MATRICULA_EXTRA.forEach(([name]) => { if (setField(form, `mx_${name}`, matricula[name])) count += 1; });
        if (count) notes.push("matrícula");
        const plate = plateOf(form.elements.placa.value);
        if (matricula.placa && plate && matricula.placa !== plate) {
          warnings.push(`la matrícula dice ${matricula.placa} y la placa ingresada es ${plate}`);
        } else if (matricula.placa && !plate) {
          setField(form, "placa", matricula.placa);
        }
      }

      if (cedula?.__error) warnings.push(`Cédula: ${cedula.__error}`);
      else if (cedula) {
        let count = 0;
        const fullName = [cedula.apellidos, cedula.nombres].filter(Boolean).join(" ");
        const currentId = digits(form.elements.cedula.value);
        if (cedula.cedula && currentId && cedula.cedula !== currentId) {
          warnings.push(`la cédula subida (${cedula.cedula}) no coincide con la registrada (${currentId}); el titular puede no ser el propietario`);
        } else {
          if (setField(form, "cedula", cedula.cedula, { overwrite: !antFilled.has("cedula") })) count += 1;
          if (setField(form, "cliente", fullName, { overwrite: !antFilled.has("cliente") })) count += 1;
        }
        CEDULA_EXTRA.forEach(([name]) => { if (setField(form, `cx_${name}`, cedula[name])) count += 1; });
        if (count) notes.push("cédula");
      }

      ["cliente", "vehiculo"].forEach((key) => {
        const prefix = key === "cliente" ? "cx_" : "mx_";
        const hasData = $$(`[name^="${prefix}"]`, form).some((input) => input.value.trim());
        if (hasData) $(`[data-cx-more="${key}"]`).open = true;
      });
      updateExtraCounts(form);

      if (warnings.length) {
        setHint(`Atención: ${warnings.join(". ")}. Revisa antes de enviar.`, "warn");
      } else {
        setHint(notes.length
          ? `Datos de la ${notes.join(" y de la ")} agregados a la ficha. Revísalos antes de enviar.`
          : "Los documentos no aportaron datos nuevos.", notes.length ? "ok" : "info");
      }
    } finally {
      if (button) {
        button.textContent = "Extraer datos de los documentos";
        button.disabled = false;
        syncOcrButton();
      }
    }
  }

  // ===== Envio (lo llama app.js) =====
  // Quita archivos y separa los datos extra de la cedula y la matricula.
  function collect(raw = {}) {
    const data = {};
    const matriculaDatos = {};
    const clienteDatos = {};
    Object.entries(raw).forEach(([key, value]) => {
      if (typeof value !== "string") return;
      const text = value.trim();
      if (key.startsWith("mx_")) { if (text) matriculaDatos[key.slice(3)] = text.toUpperCase(); return; }
      if (key.startsWith("cx_")) { if (text) clienteDatos[key.slice(3)] = text.toUpperCase(); return; }
      data[key] = value;
    });
    VEHICLE_FIELDS.forEach(([name]) => { if (data[name] !== undefined) data[name] = String(data[name]).trim().toUpperCase(); });
    if (data.cliente !== undefined) data.cliente = String(data.cliente).trim().toUpperCase();
    if (data.telefono !== undefined) data.telefono = String(data.telefono).trim();
    data.matriculaDatos = matriculaDatos;
    data.clienteDatos = clienteDatos;
    return data;
  }

  async function uploadDocuments(plate = "") {
    const documentos = {};
    const base = `${plateOf(plate) || "sinplaca"}-${Date.now()}`;
    for (const [key] of DOCS) {
      const file = photos[key];
      if (!file) continue;
      const path = `compras/documentos/${base}-${key}.jpg`;
      await window.AutocorAuth.uploadFile(path, file, file.type || "image/jpeg");
      documentos[key] = { path, name: `${key}.jpg`, type: file.type || "image/jpeg", size: file.size || 0 };
    }
    return documentos;
  }

  function hasPhotos() {
    return Object.values(photos).some(Boolean);
  }

  function reset() {
    const form = getForm();
    DOCS.forEach(([key]) => {
      photos[key] = null;
      const box = $(`[data-cx-doc="${key}"]`);
      if (box) showPhoto(box, null);
    });
    syncOcrButton();
    antFilled.clear();
    if (!form) return;
    $$(".is-autofilled", form).forEach((field) => field.classList.remove("is-autofilled"));
    $$("[data-cx-more]", form).forEach((details) => { details.open = false; });
    updateExtraCounts(form);
    const hint = $("[data-cx-hint]");
    if (hint) delete hint.dataset.level;
    syncAntButton();
  }

  // ===== Ficha (mesa de control y asesor) =====
  function rows(list, source = {}) {
    return list
      .map(([name, label]) => [label, source[name]])
      .filter(([, value]) => String(value || "").trim())
      .map(([label, value]) => `<div><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`)
      .join("");
  }

  function renderTaskDocs(task = {}) {
    const vehicle = rows(VEHICLE_FIELDS, task);
    const client = rows([["telefono", "Teléfono del cliente"], ...CEDULA_EXTRA], { ...(task.clienteDatos || {}), telefono: task.telefono });
    const matricula = rows(MATRICULA_EXTRA, task.matriculaDatos || {});
    const docs = DOCS.filter(([key]) => task.documentos?.[key]?.path)
      .map(([key, label]) => `<button type="button" class="cx-doc-chip" data-cx-file="${esc(task.documentos[key].path)}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><path d="M21 16l-5-5-8 8"></path></svg>${esc(label)}</button>`)
      .join("");
    if (!vehicle && !client && !matricula && !docs) return "";
    return `
      <section class="cx-ficha-docs">
        ${docs ? `<div class="cx-ficha-group"><h4>Documentos</h4><div class="cx-doc-chips">${docs}</div></div>` : ""}
        ${vehicle ? `<div class="cx-ficha-group"><h4>Ficha del vehículo</h4><div class="cx-ficha-grid">${vehicle}</div></div>` : ""}
        ${client ? `<div class="cx-ficha-group"><h4>Datos de la cédula</h4><div class="cx-ficha-grid">${client}</div></div>` : ""}
        ${matricula ? `<div class="cx-ficha-group"><h4>Más datos de la matrícula</h4><div class="cx-ficha-grid">${matricula}</div></div>` : ""}
      </section>`;
  }

  async function openFile(path) {
    if (!path) return;
    const popup = window.open("", "_blank");
    try {
      const blob = await window.AutocorAuth.downloadFile(path);
      const url = URL.createObjectURL(blob);
      if (popup) popup.location.href = url;
      else window.location.href = url;
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      popup?.close();
      toast(error.message || "No se pudo abrir el documento.", "error");
    }
  }

  function bind() {
    const form = getForm();
    if (!form) return;
    buildExtraInputs();
    syncAntButton();
    form.addEventListener("change", (event) => {
      const input = event.target.closest?.("[data-cx-doc] input[type=file]");
      if (input) onPhotoSelected(input);
    });
    form.addEventListener("input", (event) => {
      if (event.target.name?.startsWith("mx_") || event.target.name?.startsWith("cx_")) updateExtraCounts(form);
      if (event.target.classList?.contains("is-autofilled")) event.target.classList.remove("is-autofilled");
    });
    form.addEventListener("click", (event) => {
      const clear = event.target.closest("[data-cx-clear]");
      if (clear) {
        event.preventDefault();
        event.stopPropagation();
        clearPhoto(clear.closest("[data-cx-doc]"));
        return;
      }
      if (event.target.closest("[data-cx-ant]")) {
        event.preventDefault();
        lookupPlate();
        return;
      }
      if (event.target.closest("[data-cx-ocr]")) {
        event.preventDefault();
        extractFromPhotos();
      }
    });
    form.addEventListener("reset", () => window.setTimeout(reset, 0));
    form.elements.placa?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (canUseAnt()) lookupPlate();
      }
    });
    document.addEventListener("click", (event) => {
      const file = event.target.closest?.("[data-cx-file]");
      if (file) {
        event.preventDefault();
        openFile(file.dataset.cxFile);
        return;
      }
      if (event.target.closest?.('[data-commercial-process="commercial-purchase-process"], [data-commercial-start="commercial-purchase-process"]')) {
        window.setTimeout(syncAntButton, 0);
      }
    });
  }

  window.CompraDocumentos = { collect, uploadDocuments, hasPhotos, reset, renderTaskDocs, syncAntButton };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
