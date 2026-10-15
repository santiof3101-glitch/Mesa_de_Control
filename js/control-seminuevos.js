// Control Seminuevos: dashboards ejecutivos para gerencia.
// Usa las tareas de app.js (saneamientos, contratos, CUV, firmas) y las solicitudes de la Feria Automundo.
(function () {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => (typeof escapeHtml === "function" ? escapeHtml(value) : String(value ?? ""));
  const DAY = 24 * 60 * 60 * 1000;
  const PROCESS_LABELS = { saneamientos: "Saneamientos", contratos: "Contratos", cuv: "CUV", firmas: "Firmas" };
  const FERIA_LABELS = { pendiente: "Por asignar", en_revision: "En revisión", observada: "Con observación", finalizada: "Realizada" };

  const view = { period: "month", from: "", to: "", agency: "", process: "", tab: "resumen" };
  let feriaTasks = [];
  let feriaLoadedAt = 0;
  let feriaLoading = null;

  // ===== Datos =====
  const time = (value) => {
    const parsed = Date.parse(value || "");
    return Number.isFinite(parsed) ? parsed : NaN;
  };
  const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  function periodRange() {
    const now = new Date();
    const today = startOfDay(now);
    if (view.period === "today") return { from: today, to: today + DAY, prevFrom: today - DAY, prevTo: today, label: "hoy" };
    if (view.period === "7d") return { from: today - 6 * DAY, to: today + DAY, prevFrom: today - 13 * DAY, prevTo: today - 6 * DAY, label: "últimos 7 días" };
    if (view.period === "all") return { from: 0, to: Infinity, prevFrom: 0, prevTo: 0, label: "todo el historial" };
    if (view.period === "range") {
      const from = view.from ? startOfDay(new Date(`${view.from}T00:00:00`)) : 0;
      const to = view.to ? startOfDay(new Date(`${view.to}T00:00:00`)) + DAY : Infinity;
      const span = Number.isFinite(to) && from ? to - from : 0;
      return { from, to, prevFrom: span ? from - span : 0, prevTo: span ? from : 0, label: "el rango elegido" };
    }
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
    const elapsed = Date.now() - monthStart;
    return { from: monthStart, to: today + DAY, prevFrom: prevMonthStart, prevTo: prevMonthStart + elapsed, label: "este mes" };
  }

  const inRange = (value, from, to) => {
    const stamp = time(value);
    return Number.isFinite(stamp) && stamp >= from && stamp < to;
  };

  function processOf(task) {
    return typeof getTaskMailbox === "function" ? getTaskMailbox(task) : "saneamientos";
  }

  function isClosed(task) {
    return typeof isClosedStatus === "function" ? isClosedStatus(task.status) : false;
  }

  function isRejected(task) {
    return /rechaz/i.test(String(task.status || ""));
  }

  function statusLabel(value) {
    return (typeof getStatusOption === "function" && getStatusOption(value)?.label) || value || "Sin estado";
  }

  function allTasks() {
    const tasks = typeof state === "object" && Array.isArray(state?.tasks) ? state.tasks : [];
    return tasks.filter((task) => task && !task.deleted && processOf(task) !== "consulta-info");
  }

  function filteredTasks(range = periodRange(), { ignoreProcess = false } = {}) {
    return allTasks()
      .filter((task) => inRange(task.createdAt, range.from, range.to))
      .filter((task) => !view.agency || task.agencia === view.agency)
      .filter((task) => ignoreProcess || !view.process || processOf(task) === view.process);
  }

  function minutesBetween(start, end) {
    const a = time(start);
    const b = time(end);
    return Number.isFinite(a) && Number.isFinite(b) && b >= a ? (b - a) / 60000 : NaN;
  }

  function average(values) {
    const valid = values.filter((value) => Number.isFinite(value));
    return valid.length ? valid.reduce((sum, value) => sum + value, 0) / valid.length : NaN;
  }

  function formatDuration(minutes) {
    if (!Number.isFinite(minutes)) return "—";
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hours = Math.floor(minutes / 60);
    const rest = Math.round(minutes % 60);
    if (hours < 48) return rest ? `${hours} h ${rest} min` : `${hours} h`;
    return `${Math.round(hours / 24)} días`;
  }

  const number = (value) => Number(value || 0).toLocaleString("es-EC");
  const percent = (part, total) => (total ? `${Math.round((part / total) * 100)}%` : "—");
  const money = (value) => Number(value || 0).toLocaleString("es-EC", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function countBy(items, keyOf, fallback = "Sin dato") {
    const map = new Map();
    items.forEach((item) => {
      const key = keyOf(item) || fallback;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return [...map.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  }

  // ===== Feria Automundo (ultima version de cada solicitud) =====
  async function loadFeria(force = false) {
    if (!window.AutocorAuth?.hasSession?.()) return feriaTasks;
    if (!force && feriaLoadedAt && Date.now() - feriaLoadedAt < 60000) return feriaTasks;
    if (feriaLoading) return feriaLoading;
    feriaLoading = (async () => {
      try {
        const response = await fetch(`${window.AutocorAuth.REST_URL}/rpc/autocor_feria_tareas`, {
          method: "POST",
          headers: await window.AutocorAuth.headers({ "Content-Type": "application/json" }),
          body: "{}"
        });
        const rows = response.ok ? await response.json() : [];
        feriaTasks = (Array.isArray(rows) ? rows : []).map((row) => row.datos).filter((task) => task?.id && !task.deleted);
        feriaLoadedAt = Date.now();
      } catch {
        // Si falla, se conserva lo ultimo cargado.
      } finally {
        feriaLoading = null;
      }
      return feriaTasks;
    })();
    return feriaLoading;
  }

  function filteredFeria(range = periodRange()) {
    return feriaTasks
      .filter((task) => inRange(task.createdAt, range.from, range.to))
      .filter((task) => !view.agency || task.asesor?.agency === view.agency);
  }

  // ===== Graficos (una sola serie, rojo Autocor) =====
  function hbars(items, { unit = "", max = null, empty = "Sin datos en el periodo." } = {}) {
    if (!items.length) return `<p class="cs-empty">${esc(empty)}</p>`;
    const top = max || Math.max(...items.map((item) => item.value), 1);
    return `<div class="cs-hb">${items.map((item) => `
      <div class="cs-hb-row" title="${esc(item.label)}: ${esc(item.display ?? `${number(item.value)}${unit}`)}">
        <span class="cs-hb-label">${esc(item.label)}</span>
        <span class="cs-hb-track"><i style="width:${Math.max(2, (item.value / top) * 100).toFixed(1)}%"></i></span>
        <b>${esc(item.display ?? `${number(item.value)}${unit}`)}</b>
      </div>`).join("")}</div>`;
  }

  function columns(items, { highlightLast = true, label = "Solicitudes" } = {}) {
    if (!items.length || items.every((item) => !item.value)) return `<p class="cs-empty">Sin solicitudes en el periodo.</p>`;
    const width = 640;
    const height = 170;
    const left = 34;
    const max = Math.max(...items.map((item) => item.value), 1);
    const niceMax = max <= 4 ? 4 : Math.ceil(max / 4) * 4;
    const slot = (width - left) / items.length;
    const bar = Math.max(4, Math.min(22, slot * 0.6));
    const step = Math.ceil(items.length / 16);
    let svg = `<svg class="cs-cols" viewBox="0 0 ${width} ${height + 30}" role="img" aria-label="${esc(label)} por día">`;
    [0, 0.5, 1].forEach((ratio) => {
      const y = 8 + height - (height - 8) * ratio;
      svg += `<line class="cs-grid-line" x1="${left}" x2="${width}" y1="${y}" y2="${y}"></line><text class="cs-axis" x="${left - 6}" y="${y + 4}" text-anchor="end">${Math.round(niceMax * ratio)}</text>`;
    });
    items.forEach((item, index) => {
      const h = ((height - 8) * item.value) / niceMax;
      const x = left + index * slot + (slot - bar) / 2;
      const y = 8 + height - h;
      const r = Math.min(4, h / 2, bar / 2);
      const hi = highlightLast && index === items.length - 1;
      if (item.value) {
        svg += `<path class="cs-col${hi ? " is-hi" : ""}" d="M${x},${8 + height} V${y + r} Q${x},${y} ${x + r},${y} H${x + bar - r} Q${x + bar},${y} ${x + bar},${y + r} V${8 + height} Z"><title>${esc(item.label)}: ${number(item.value)}</title></path>`;
      }
      // Zona de toque mas grande que la barra para el detalle al pasar el cursor.
      svg += `<rect class="cs-hit" x="${left + index * slot}" y="8" width="${slot}" height="${height - 8}"><title>${esc(item.label)}: ${number(item.value)}</title></rect>`;
      if (hi && item.value) svg += `<text class="cs-val" x="${x + bar / 2}" y="${y - 6}" text-anchor="middle">${number(item.value)}</text>`;
      if (index % step === 0 || index === items.length - 1) {
        svg += `<text class="cs-axis" x="${x + bar / 2}" y="${height + 26}" text-anchor="middle">${esc(item.short || item.label)}</text>`;
      }
    });
    return `${svg}</svg>`;
  }

  function seriesByDay(items, range, dateOf = (item) => item.createdAt) {
    if (view.period === "today") {
      const hours = Array.from({ length: 24 }, (_, hour) => ({ label: `${hour}:00`, short: `${hour}h`, value: 0 }));
      items.forEach((item) => {
        const stamp = time(dateOf(item));
        if (Number.isFinite(stamp)) hours[new Date(stamp).getHours()].value += 1;
      });
      const now = new Date().getHours();
      return hours.slice(Math.min(8, now), now + 1);
    }
    let from = range.from;
    if (!from || !Number.isFinite(range.to)) {
      const stamps = items.map((item) => time(dateOf(item))).filter(Number.isFinite);
      if (!stamps.length) return [];
      from = startOfDay(new Date(Math.max(Math.min(...stamps), Date.now() - 59 * DAY)));
    }
    const to = Number.isFinite(range.to) ? Math.min(range.to, startOfDay(new Date()) + DAY) : startOfDay(new Date()) + DAY;
    const days = [];
    for (let day = from; day < to; day += DAY) {
      const date = new Date(day);
      days.push({ key: day, label: date.toLocaleDateString("es-EC", { day: "numeric", month: "short" }), short: String(date.getDate()), value: 0 });
    }
    items.forEach((item) => {
      const stamp = time(dateOf(item));
      if (!Number.isFinite(stamp)) return;
      const slot = days.find((day) => stamp >= day.key && stamp < day.key + DAY);
      if (slot) slot.value += 1;
    });
    return days;
  }

  function kpiCards(items) {
    return items.map(([label, value, note, tone]) => `
      <div class="cs-kpi${tone ? ` is-${tone}` : ""}">
        <span>${esc(label)}</span>
        <strong>${esc(value)}</strong>
        <small>${esc(note || "")}</small>
      </div>`).join("");
  }

  function trend(current, previous) {
    if (!previous || view.period === "all") return "";
    const change = Math.round(((current - previous) / previous) * 100);
    return `${change >= 0 ? "+" : ""}${change}% vs. periodo anterior`;
  }

  function mesaTable(tasks, empty = "Sin tareas asignadas en el periodo.") {
    const map = new Map();
    tasks.filter((task) => task.legalAdvisor || task.legalUserId).forEach((task) => {
      const name = task.legalAdvisor || "Sin nombre";
      const row = map.get(name) || { name, open: 0, closed: 0, times: [] };
      if (isClosed(task)) {
        row.closed += 1;
        row.times.push(minutesBetween(task.createdAt, task.completedAt));
      } else {
        row.open += 1;
      }
      map.set(name, row);
    });
    const rows = [...map.values()].sort((a, b) => b.closed - a.closed || b.open - a.open).slice(0, 8);
    if (!rows.length) return `<p class="cs-empty">${esc(empty)}</p>`;
    const max = Math.max(...rows.map((row) => row.closed), 1);
    return `
      <table class="cs-table">
        <thead><tr><th>Asistente</th><th class="cs-c">Abiertas</th><th>Cerradas</th><th class="cs-c">Cierre prom.</th></tr></thead>
        <tbody>${rows.map((row) => `
          <tr>
            <td><strong>${esc(row.name)}</strong></td>
            <td class="cs-c">${number(row.open)}</td>
            <td><span class="cs-inline-bar"><i style="width:${Math.max(2, (row.closed / max) * 100).toFixed(0)}%"></i></span><b>${number(row.closed)}</b></td>
            <td class="cs-c">${esc(formatDuration(average(row.times)))}</td>
          </tr>`).join("")}
        </tbody>
      </table>`;
  }

  // ===== Pestanas =====
  function renderResumen(range, tasks, previousTasks, feria) {
    const closed = tasks.filter(isClosed);
    const open = allTasks()
      .filter((task) => !isClosed(task))
      .filter((task) => !view.agency || task.agencia === view.agency)
      .filter((task) => !view.process || processOf(task) === view.process);
    const unassigned = open.filter((task) => !task.legalUserId).length;
    const rejected = closed.filter(isRejected).length;
    $('[data-cs-kpis="resumen"]').innerHTML = kpiCards([
      ["Solicitudes", number(tasks.length), trend(tasks.length, previousTasks.length) || `En ${range.label}`],
      ["Abiertas ahora", number(open.length), `${number(unassigned)} por asignar`, unassigned ? "warn" : ""],
      ["Cerradas", number(closed.length), `${percent(closed.length, tasks.length)} del periodo`],
      ["Tiempo prom. de cierre", formatDuration(average(closed.map((task) => minutesBetween(task.createdAt, task.completedAt)))), `Toma: ${formatDuration(average(tasks.map((task) => minutesBetween(task.createdAt, task.takenAt))))}`],
      ["Rechazadas", number(rejected), `${percent(rejected, closed.length)} de los cierres`]
    ]);
    const days = seriesByDay(tasks, range);
    $('[data-cs-chart="days"]').innerHTML = columns(days);
    const note = $("[data-cs-days-note]");
    if (note) note.textContent = view.period === "today" ? "Por hora · hoy" : "Último día resaltado";
    const byProcess = countBy(filteredTasks(range, { ignoreProcess: true }), (task) => PROCESS_LABELS[processOf(task)] || "Otros");
    if (!view.process && feria.length) byProcess.push({ label: "Feria Automundo", value: feria.length });
    byProcess.sort((a, b) => b.value - a.value);
    $('[data-cs-chart="process"]').innerHTML = hbars(byProcess);
    $('[data-cs-chart="agency"]').innerHTML = hbars(countBy(tasks, (task) => task.agencia, "Sin agencia").slice(0, 8));
    $('[data-cs-chart="mesa"]').innerHTML = mesaTable(tasks);
    renderFeriaSummary(feria);
  }

  function feriaKpis(feria) {
    const done = feria.filter((task) => task.status === "finalizada");
    const total = feria.reduce((sum, task) => sum + (Number(task.precioToma) || 0), 0);
    return [
      ["Liquidaciones", number(feria.length), "Pedidas en la feria"],
      ["Por asignar", number(feria.filter((task) => task.status === "pendiente").length), "Sin asesor legal", feria.some((task) => task.status === "pendiente") ? "warn" : ""],
      ["En revisión", number(feria.filter((task) => task.status === "en_revision").length), "En mesa de control"],
      ["Realizadas", number(done.length), `${percent(done.length, feria.length)} con PDF entregado`],
      ["Tiempo prom.", formatDuration(average(done.map((task) => minutesBetween(task.createdAt, task.resultado?.at)))), `Toma: ${formatDuration(average(feria.map((task) => minutesBetween(task.createdAt, task.tomadaPor?.at))))}`],
      ["Precio de toma", money(total), "Suma de lo cotizado"]
    ];
  }

  function renderFeriaSummary(feria) {
    const box = $("[data-cs-feria-summary]");
    if (!box) return;
    box.hidden = Boolean(view.process);
    if (view.process) return;
    box.innerHTML = `
      <div class="cs-ph">
        <div class="cs-fx-head">
          <img src="assets/feria-automundo-2026.webp" alt="Automundo Feria 2026">
          <div><h2>Feria Automundo</h2><span>Liquidaciones de ${esc(periodRange().label)}</span></div>
        </div>
        <button type="button" class="btn secondary" data-cs-tab-go="feria">Ver dashboard de la feria</button>
      </div>
      <div class="cs-kpis cs-kpis-6 is-soft">${kpiCards(feriaKpis(feria))}</div>
      <div class="cs-grid cs-grid-in">
        <div><h3>Liquidaciones por asesor</h3>${hbars(countBy(feria, (task) => task.asesor?.name, "Sin asesor").slice(0, 5), { empty: "Sin liquidaciones en el periodo." })}</div>
        <div><h3>Marcas más cotizadas</h3>${hbars(countBy(feria, (task) => (task.ficha?.marca || task.vehiculo?.marca || "").toUpperCase(), "Sin marca").slice(0, 5), { empty: "Sin liquidaciones en el periodo." })}</div>
      </div>`;
  }

  function renderSaneamientos(range) {
    const tasks = filteredTasks(range, { ignoreProcess: true }).filter((task) => processOf(task) === "saneamientos");
    const previous = filteredTasks({ from: range.prevFrom, to: range.prevTo }, { ignoreProcess: true }).filter((task) => processOf(task) === "saneamientos");
    const closed = tasks.filter(isClosed);
    const rejected = closed.filter(isRejected);
    $('[data-cs-kpis="saneamientos"]').innerHTML = kpiCards([
      ["Saneamientos", number(tasks.length), trend(tasks.length, previous.length) || `En ${range.label}`],
      ["Por asignar", number(tasks.filter((task) => !task.legalUserId && !isClosed(task)).length), "Sin asistente legal"],
      ["Cerrados", number(closed.length), `${percent(closed.length, tasks.length)} del periodo`],
      ["Rechazados", number(rejected.length), `${percent(rejected.length, closed.length)} de los cierres`],
      ["Tiempo prom. de cierre", formatDuration(average(closed.map((task) => minutesBetween(task.createdAt, task.completedAt)))), `Toma: ${formatDuration(average(tasks.map((task) => minutesBetween(task.createdAt, task.takenAt))))}`]
    ]);
    $('[data-cs-chart="san-status"]').innerHTML = hbars(countBy(tasks, (task) => statusLabel(task.status)));
    $('[data-cs-chart="san-advisors"]').innerHTML = hbars(countBy(tasks, (task) => task.asesor || task.commercialUserName, "Sin asesor").slice(0, 8));
    const byAgency = new Map();
    closed.forEach((task) => {
      const key = task.agencia || "Sin agencia";
      const list = byAgency.get(key) || [];
      list.push(minutesBetween(task.createdAt, task.completedAt));
      byAgency.set(key, list);
    });
    const times = [...byAgency.entries()]
      .map(([label, list]) => ({ label, value: average(list) / 60, display: formatDuration(average(list)) }))
      .filter((item) => Number.isFinite(item.value)).sort((a, b) => b.value - a.value).slice(0, 8);
    $('[data-cs-chart="san-agency-time"]').innerHTML = hbars(times, { empty: "Sin saneamientos cerrados en el periodo." });
    $('[data-cs-chart="san-rejects"]').innerHTML = hbars(countBy(rejected, (task) => task.agencia, "Sin agencia").slice(0, 8), { empty: "Sin rechazos en el periodo." });
  }

  function renderContratos(range) {
    const isContract = (task) => ["contratos", "cuv", "firmas"].includes(processOf(task));
    const tasks = filteredTasks(range, { ignoreProcess: true }).filter(isContract);
    const previous = filteredTasks({ from: range.prevFrom, to: range.prevTo }, { ignoreProcess: true }).filter(isContract);
    const closed = tasks.filter(isClosed);
    $('[data-cs-kpis="contratos"]').innerHTML = kpiCards([
      ["Contratos, CUV y firmas", number(tasks.length), trend(tasks.length, previous.length) || `En ${range.label}`],
      ["Contratos", number(tasks.filter((task) => processOf(task) === "contratos").length), "Compraventa"],
      ["CUV", number(tasks.filter((task) => processOf(task) === "cuv").length), "Certificado vehicular"],
      ["Firmas", number(tasks.filter((task) => processOf(task) === "firmas").length), "Pilot"],
      ["Cerrados", number(closed.length), `${percent(closed.length, tasks.length)} · prom. ${formatDuration(average(closed.map((task) => minutesBetween(task.createdAt, task.completedAt))))}`]
    ]);
    $('[data-cs-chart="con-process"]').innerHTML = hbars(countBy(tasks, (task) => PROCESS_LABELS[processOf(task)]));
    $('[data-cs-chart="con-status"]').innerHTML = hbars(countBy(tasks, (task) => statusLabel(task.status)));
    $('[data-cs-chart="con-agency"]').innerHTML = hbars(countBy(tasks, (task) => task.agencia, "Sin agencia").slice(0, 8));
    $('[data-cs-chart="con-mesa"]').innerHTML = mesaTable(tasks);
  }

  function renderFeria(range, feria) {
    $('[data-cs-kpis="feria"]').innerHTML = kpiCards(feriaKpis(feria));
    $('[data-cs-chart="fx-days"]').innerHTML = columns(seriesByDay(feria, range), { label: "Liquidaciones" });
    $('[data-cs-chart="fx-advisors"]').innerHTML = hbars(countBy(feria, (task) => task.asesor?.name, "Sin asesor").slice(0, 8), { empty: "Sin liquidaciones en el periodo." });
    $('[data-cs-chart="fx-brands"]').innerHTML = hbars(countBy(feria, (task) => (task.ficha?.marca || task.vehiculo?.marca || "").toUpperCase(), "Sin marca").slice(0, 8), { empty: "Sin liquidaciones en el periodo." });
    const mesa = countBy(feria.filter((task) => task.tomadaPor?.name), (task) => task.tomadaPor.name).slice(0, 8);
    $('[data-cs-chart="fx-mesa"]').innerHTML = hbars(mesa, { empty: "Nadie de mesa de control ha tomado solicitudes en el periodo." });
    const count = $("[data-cs-fx-count]");
    if (count) count.textContent = `${number(feria.length)} en ${range.label}`;
    const rows = [...feria].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))).slice(0, 50);
    $('[data-cs-chart="fx-list"]').innerHTML = rows.length ? `
      <div class="cs-table-wrap"><table class="cs-table">
        <thead><tr><th>Placa</th><th>Vehículo</th><th>Asesor</th><th>Atiende</th><th>Estado</th><th class="cs-r">Precio de toma</th><th>Enviada</th></tr></thead>
        <tbody>${rows.map((task) => `
          <tr>
            <td><strong>${esc(task.placa)}</strong></td>
            <td>${esc([task.ficha?.marca, task.ficha?.modelo, task.ficha?.anio].filter(Boolean).join(" ") || "—")}</td>
            <td>${esc(task.asesor?.name || "—")}</td>
            <td>${esc(task.tomadaPor?.name || "Por asignar")}</td>
            <td><span class="cs-pill is-${esc(task.status)}">${esc(FERIA_LABELS[task.status] || task.status)}</span></td>
            <td class="cs-r">${esc(money(task.precioToma))}</td>
            <td>${esc(typeof formatDateTime === "function" ? formatDateTime(task.createdAt) : task.createdAt)}</td>
          </tr>`).join("")}</tbody>
      </table></div>
      ${feria.length > rows.length ? `<p class="cs-note">Mostrando las ${rows.length} más recientes de ${number(feria.length)}. El Excel trae todas.</p>` : ""}` : `<p class="cs-empty">Sin liquidaciones en el periodo.</p>`;
  }

  function renderHero(tasks, feria) {
    const box = $("[data-cs-hero]");
    if (!box) return;
    const closed = tasks.filter(isClosed);
    box.innerHTML = [
      [number(tasks.length + (view.process ? 0 : feria.length)), "solicitudes"],
      [percent(closed.length, tasks.length), "cerradas"],
      [formatDuration(average(closed.map((task) => minutesBetween(task.createdAt, task.completedAt)))), "cierre prom."]
    ].map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join("");
    const badge = $("[data-cs-feria-count]");
    if (badge) badge.textContent = number(feria.length);
  }

  function syncAgencies() {
    const select = $("[data-cs-agency]");
    if (!select) return;
    const agencies = [...new Set([
      ...((typeof state === "object" && state?.agencies) || []),
      ...allTasks().map((task) => task.agencia).filter(Boolean)
    ])].sort((a, b) => a.localeCompare(b));
    const current = view.agency;
    select.innerHTML = `<option value="">Todas las agencias</option>${agencies.map((agency) => `<option value="${esc(agency)}" ${agency === current ? "selected" : ""}>${esc(agency)}</option>`).join("")}`;
  }

  function render() {
    const root = $("#gerencial.cs");
    if (!root) return;
    syncAgencies();
    const range = periodRange();
    const tasks = filteredTasks(range);
    const previous = filteredTasks({ from: range.prevFrom, to: range.prevTo });
    const feria = filteredFeria(range);
    renderHero(tasks, feria);
    if (view.tab === "resumen") renderResumen(range, tasks, previous, feria);
    if (view.tab === "saneamientos") renderSaneamientos(range);
    if (view.tab === "contratos") renderContratos(range);
    if (view.tab === "feria") renderFeria(range, feria);
    const exportButton = $("[data-cs-export]");
    if (exportButton) exportButton.hidden = view.tab === "detalle";
  }

  async function refresh(force = false) {
    render();
    await loadFeria(force);
    render();
  }

  // ===== Excel (CSV con separador ;) =====
  function csvCell(value) {
    const text = String(value ?? "");
    return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function localDate(value) {
    const stamp = time(value);
    if (!Number.isFinite(stamp)) return "";
    const date = new Date(stamp);
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function download(name, headers, rows) {
    const csv = "﻿" + [headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  function exportCurrent() {
    const range = periodRange();
    const stamp = localDate(new Date().toISOString()).replace(/[: ]/g, "-");
    if (view.tab === "feria") {
      download(`control-seminuevos-feria-${stamp}.csv`,
        ["Placa", "Estado", "Propietario", "Marca", "Modelo", "Año", "Precio de toma", "Asesor", "Agencia", "Atiende", "Enviada", "Tomada", "Realizada", "Minutos hasta tomar", "Minutos totales"],
        filteredFeria(range).map((task) => [
          task.placa, FERIA_LABELS[task.status] || task.status, task.ficha?.propietario || task.propietario, task.ficha?.marca, task.ficha?.modelo, task.ficha?.anio,
          String(Number(task.precioToma || 0).toFixed(2)).replace(".", ","), task.asesor?.name, task.asesor?.agency, task.tomadaPor?.name || "",
          localDate(task.createdAt), localDate(task.tomadaPor?.at), localDate(task.resultado?.at),
          Number.isFinite(minutesBetween(task.createdAt, task.tomadaPor?.at)) ? Math.round(minutesBetween(task.createdAt, task.tomadaPor?.at)) : "",
          Number.isFinite(minutesBetween(task.createdAt, task.resultado?.at)) ? Math.round(minutesBetween(task.createdAt, task.resultado?.at)) : ""
        ]));
      return;
    }
    let tasks = filteredTasks(range);
    if (view.tab === "saneamientos") tasks = filteredTasks(range, { ignoreProcess: true }).filter((task) => processOf(task) === "saneamientos");
    if (view.tab === "contratos") tasks = filteredTasks(range, { ignoreProcess: true }).filter((task) => ["contratos", "cuv", "firmas"].includes(processOf(task)));
    download(`control-seminuevos-${view.tab}-${stamp}.csv`,
      ["Placa", "Proceso", "Estado", "Cliente", "Agencia", "Asesor", "Mesa de control", "Creada", "Tomada", "Cerrada", "Minutos hasta tomar", "Minutos hasta cerrar"],
      tasks.map((task) => [
        task.placa, PROCESS_LABELS[processOf(task)] || processOf(task), statusLabel(task.status), task.cliente || task.vendedor || "",
        task.agencia || "", task.asesor || task.commercialUserName || "", task.legalAdvisor || "",
        localDate(task.createdAt), localDate(task.takenAt), localDate(task.completedAt),
        Number.isFinite(minutesBetween(task.createdAt, task.takenAt)) ? Math.round(minutesBetween(task.createdAt, task.takenAt)) : "",
        Number.isFinite(minutesBetween(task.createdAt, task.completedAt)) ? Math.round(minutesBetween(task.createdAt, task.completedAt)) : ""
      ]));
  }

  // ===== Eventos =====
  function setTab(tab) {
    view.tab = tab;
    $$("#gerencial [data-cs-tab]").forEach((button) => {
      const isOn = button.dataset.csTab === tab;
      button.classList.toggle("is-active", isOn);
      button.setAttribute("aria-selected", String(isOn));
    });
    $$("#gerencial [data-cs-pane]").forEach((pane) => {
      const isOn = pane.dataset.csPane === tab;
      pane.hidden = !isOn;
      pane.classList.toggle("is-active", isOn);
    });
    render();
  }

  function bind() {
    const root = $("#gerencial.cs");
    if (!root) return;
    root.addEventListener("click", (event) => {
      const period = event.target.closest("[data-cs-period]");
      if (period) {
        view.period = period.dataset.csPeriod;
        $$("[data-cs-period]", root).forEach((button) => button.classList.toggle("is-active", button === period));
        const range = $("[data-cs-range]", root);
        if (range) range.hidden = view.period !== "range";
        render();
        return;
      }
      const tab = event.target.closest("[data-cs-tab],[data-cs-tab-go]");
      if (tab) {
        setTab(tab.dataset.csTab || tab.dataset.csTabGo);
        return;
      }
      if (event.target.closest("[data-cs-export]")) exportCurrent();
    });
    $("[data-cs-from]", root)?.addEventListener("change", (event) => { view.from = event.target.value; render(); });
    $("[data-cs-to]", root)?.addEventListener("change", (event) => { view.to = event.target.value; render(); });
    $("[data-cs-agency]", root)?.addEventListener("change", (event) => { view.agency = event.target.value; render(); });
    $("[data-cs-process]", root)?.addEventListener("change", (event) => { view.process = event.target.value; render(); });
    // Mientras gerencia tiene la vista abierta, la feria se actualiza cada minuto.
    window.setInterval(() => {
      if (document.visibilityState === "visible" && root.classList.contains("is-active")) refresh(true);
    }, 60000);
  }

  bind();
  window.ControlSeminuevos = { render: () => refresh(false), refresh };
  if ($("#gerencial.cs")?.classList.contains("is-active")) refresh(false);
})();
