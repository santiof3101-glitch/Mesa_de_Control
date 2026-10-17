// Proveedores y pagos (Procesamiento de datos): pestañas, resumen, historial de cargas,
// tabla de registros y tarjetas de proveedores. La logica de carga, perfiles y aprobacion
// de duplicados sigue en app.js; este archivo solo arma la pantalla.
(function () {
  "use strict";

  const PAGE_SIZE = 25;
  const LOADS_PAGE = 8;
  const ui = { tab: "resumen", recPage: 1, recSearch: "", loadsPage: 1 };
  try { ui.tab = sessionStorage.getItem("pvTab") || "resumen"; } catch (_) {}

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value) => (typeof escapeHtml === "function" ? escapeHtml(value) : String(value ?? ""));
  const money = (value) => `$ ${Number(value || 0).toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const moneyShort = (value) => {
    const n = Number(value || 0);
    return n >= 10000 ? `$ ${(n / 1000).toLocaleString("es-EC", { maximumFractionDigits: 1 })} mil` : money(n);
  };
  const monthLabel = (month) => (typeof formatMonthLabel === "function" ? formatMonthLabel(month) : month);
  const shortMonth = (month) => {
    const [y, m] = String(month || "").split("-");
    const names = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return m ? `${names[Number(m) - 1] || m} ${String(y).slice(2)}` : "—";
  };
  const when = (value) => (value && typeof formatDateTime === "function" ? formatDateTime(value) : "—");
  const panel = () => $(".pv[data-processing-panel='proveedores']");

  function allRecords() {
    return (state.dataProcessing?.proveedores || []).filter(isValidProviderRecord);
  }

  // ===== Pestañas =====
  function setTab(tab) {
    ui.tab = tab;
    try { sessionStorage.setItem("pvTab", tab); } catch (_) {}
    const root = panel();
    if (!root) return;
    $$("[data-pv-tab]", root).forEach((button) => {
      const active = button.dataset.pvTab === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    $$("[data-pv-pane]", root).forEach((pane) => pane.classList.toggle("is-active", pane.dataset.pvPane === tab));
  }

  // ===== Calculos =====
  function computeMetrics(records) {
    const groups = getProviderDuplicateGroups(records);
    const pending = groups.filter(isProviderDuplicatePending);
    const paid = getProviderEffectivePaidAmount(records);
    const billable = getProviderBillableAmount(records);
    const pendingAmounts = pending.map((group) => ({ plate: group.plate, amount: getProviderDuplicateUnauthorizedAmount(group, records) }));
    const overcharge = pendingAmounts.reduce((sum, item) => sum + item.amount, 0);
    const rejected = getProviderRejectedOverchargeAmount(records);
    const authorized = getProviderAuthorizedOverchargeAmount(records);
    const plates = new Set(records.map(getProviderRecordPlate).filter(Boolean)).size;
    // Estado de cada cobro (no de la placa completa).
    const status = new Map();
    groups.forEach((group) => {
      group.items.forEach((item, index) => {
        const decision = getProviderItemDecision(group, item, index);
        status.set(item, decision === "no_aprobado" ? "rejected" : index === 0 ? "base" : decision === "aprobado" ? "approved" : "pending");
      });
    });
    const withoutPlate = getProviderWithoutPlateRecords(records);
    const common = getProviderCommonAmount(records);
    const withoutPlateAmount = withoutPlate.reduce((sum, record) => sum + (getProviderRecordAmount(record) || common), 0);
    return { groups, pending, pendingAmounts, paid, billable, overcharge, rejected, authorized, plates, status, withoutPlate, withoutPlateAmount };
  }

  function sumBy(records, keyFn, common) {
    const map = new Map();
    records.forEach((record) => {
      const key = keyFn(record) || "SIN DATO";
      const amount = getProviderRecordAmount(record) || common;
      const item = map.get(key) || { label: key, amount: 0, count: 0 };
      item.amount += amount;
      item.count += 1;
      map.set(key, item);
    });
    return [...map.values()];
  }

  // ===== Resumen =====
  function kpi(label, value, hint, tone = "") {
    return `<article class="pv-kpi ${tone}"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(hint)}</small></article>`;
  }

  function hbars(items, { value = (item) => item.amount, label = (item) => item.label, format = money, empty = "Sin datos en el filtro." } = {}) {
    if (!items.length) return `<div class="pv-empty">${esc(empty)}</div>`;
    const max = Math.max(...items.map(value), 1);
    return `<ul class="pv-hbars">${items.map((item, index) => {
      const width = Math.max(2, Math.round((value(item) / max) * 100));
      return `<li><span class="pv-hbar-label" title="${esc(label(item))}">${esc(label(item))}</span>
        <span class="pv-hbar-track"><i class="${index === 0 ? "is-top" : ""}" style="width:${width}%"></i></span>
        <b>${esc(format(value(item)))}</b></li>`;
    }).join("")}</ul>`;
  }

  function columns(items) {
    if (!items.length) return `<div class="pv-empty">Sin datos en el filtro.</div>`;
    const max = Math.max(...items.map((item) => item.amount), 1);
    return `<div class="pv-cols">${items.map((item, index) => {
      const height = Math.max(3, Math.round((item.amount / max) * 100));
      return `<div class="pv-col" title="${esc(monthLabel(item.month))}: ${esc(money(item.amount))}">
        <b>${esc(moneyShort(item.amount))}</b>
        <span class="pv-col-track"><i class="${index === items.length - 1 ? "is-last" : ""}" style="height:${height}%"></i></span>
        <small>${esc(shortMonth(item.month))}</small>
      </div>`;
    }).join("")}</div>`;
  }

  function renderResumen(records, metrics) {
    const root = panel();
    const kpis = $("[data-pv-kpis]", root);
    const average = metrics.plates ? metrics.paid / metrics.plates : 0;
    if (kpis) {
      kpis.innerHTML = [
        kpi("Total cobrado", money(metrics.paid), `${records.length} cobros · ${metrics.plates} placas`),
        kpi("A pagar", money(metrics.billable), "Total cobrado menos por revisar y no aprobado", "is-ok"),
        kpi("Por revisar", money(metrics.overcharge), `${metrics.pending.length} placa(s) con cobros repetidos sin decisión`, metrics.pending.length ? "is-warn" : ""),
        kpi("No aprobado", money(metrics.rejected), "Cobros que no se pagan", "is-red"),
        kpi("Repetidos aprobados", money(metrics.authorized), "Cobros adicionales autorizados"),
        kpi("Sin placa", money(metrics.withoutPlateAmount), metrics.withoutPlate.length ? `${metrics.withoutPlate.length} cobro(s) para revisar` : "Todos los cobros tienen placa", metrics.withoutPlate.length ? "is-warn" : "")
      ].join("");
    }
    const common = getProviderCommonAmount(records);
    const byProvider = sumBy(records, (record) => record.provider, common).sort((a, b) => b.amount - a.amount).slice(0, 8);
    const providersBox = $("[data-pv-chart='providers']", root);
    if (providersBox) providersBox.innerHTML = hbars(byProvider);

    // Gasto por mes: respeta el proveedor elegido, no el mes ni la carga.
    const providerOnly = allRecords().filter((record) => !providerFilters.provider || record.provider === providerFilters.provider);
    const months = [...new Set(providerOnly.map((record) => record.importMonth).filter(Boolean))].sort().slice(-6);
    const byMonth = months.map((month) => ({ month, amount: getProviderPaidAmount(providerOnly.filter((record) => record.importMonth === month)) }));
    const monthsBox = $("[data-pv-chart='months']", root);
    if (monthsBox) monthsBox.innerHTML = columns(byMonth);

    const advisors = sumBy(records, getProviderAdvisor, common).sort((a, b) => b.count - a.count).slice(0, 6);
    const agencies = sumBy(records, getProviderAgency, common).sort((a, b) => b.count - a.count).slice(0, 6);
    const countFmt = (value) => `${value}`;
    const advisorsBox = $("[data-pv-chart='advisors']", root);
    if (advisorsBox) advisorsBox.innerHTML = hbars(advisors, { value: (item) => item.count, format: countFmt });
    const agenciesBox = $("[data-pv-chart='agencies']", root);
    if (agenciesBox) agenciesBox.innerHTML = hbars(agencies, { value: (item) => item.count, format: countFmt });

    const insight = $("[data-pv-insight]", root);
    if (insight) {
      const worst = metrics.pendingAmounts.slice().sort((a, b) => b.amount - a.amount)[0];
      const top = byProvider[0];
      const lines = [];
      if (top) lines.push(`<li><b>${esc(top.label)}</b> concentra ${metrics.paid ? Math.round((top.amount / metrics.paid) * 100) : 0}% del gasto (${esc(money(top.amount))}).</li>`);
      if (metrics.pending.length) {
        lines.push(`<li>Hay <b>${metrics.pending.length}</b> placa(s) cobradas más de una vez sin decisión, por ${esc(money(metrics.overcharge))}.${worst ? ` Empieza por <b>${esc(worst.plate)}</b> (${esc(money(worst.amount))}).` : ""}</li>`);
      } else if (records.length) {
        lines.push(`<li>No hay duplicados pendientes en el filtro actual.</li>`);
      }
      if (metrics.rejected > 0) lines.push(`<li>Los cobros no aprobados evitan pagar ${esc(money(metrics.rejected))}.</li>`);
      if (metrics.withoutPlate.length) lines.push(`<li><b>${metrics.withoutPlate.length}</b> cobro(s) no tienen placa (${esc(money(metrics.withoutPlateAmount))}). Revísalos en <b>Registros</b>: suelen venir de un Excel con las columnas en otro orden.</li>`);
      insight.innerHTML = records.length
        ? `<header><h3>Lectura rápida</h3>${metrics.pending.length ? `<button type="button" class="pv-btn pv-btn-red pv-btn-sm" data-pv-go="duplicados">Revisar duplicados</button>` : ""}</header><ul>${lines.join("")}</ul>`
        : `<header><h3>Sin registros</h3></header><p>Carga el reporte de un proveedor en la pestaña <b>Cargar reporte</b>.</p>`;
    }
  }

  // ===== Historial de cargas =====
  function renderLoads() {
    const root = panel();
    const box = $("[data-pv-loads]", root);
    if (!box) return;
    const loads = (state.dataProcessing?.providerLoads || [])
      .filter((load) => !providerFilters.provider || load.provider === providerFilters.provider)
      .filter((load) => !providerFilters.month || load.month === providerFilters.month)
      .slice()
      .sort((a, b) => new Date(b.importedAt) - new Date(a.importedAt));
    const count = $("[data-pv-loads-count]", root);
    if (count) count.textContent = `${loads.length} carga${loads.length === 1 ? "" : "s"}`;
    if (!loads.length) {
      box.innerHTML = `<div class="pv-empty">Todavía no hay cargas para este filtro.</div>`;
      return;
    }
    const pages = Math.max(1, Math.ceil(loads.length / LOADS_PAGE));
    ui.loadsPage = Math.min(Math.max(1, ui.loadsPage), pages);
    const items = loads.slice((ui.loadsPage - 1) * LOADS_PAGE, ui.loadsPage * LOADS_PAGE);
    box.innerHTML = `
      <div class="pv-table-wrap"><table class="pv-table">
        <thead><tr><th>Cargado</th><th>Proveedor</th><th>Mes</th><th class="num">Filas</th><th class="num">Cobrado</th><th class="num">Conciliado</th><th></th></tr></thead>
        <tbody>${items.map((load) => `
          <tr class="${load.id === providerFilters.loadId ? "is-selected" : ""}">
            <td>${esc(when(load.importedAt))}</td>
            <td class="pv-strong">${esc(load.provider || "—")}</td>
            <td>${esc(monthLabel(load.month))}</td>
            <td class="num">${esc(load.recordCount || 0)}</td>
            <td class="num">${esc(money(load.paidTotal ?? load.total))}</td>
            <td class="num">${esc(load.reconciledTotal ? money(load.reconciledTotal) : "—")}</td>
            <td class="pv-row-actions">
              <button type="button" class="pv-btn pv-btn-ghost pv-btn-sm" data-pv-load-view="${esc(load.id)}">Ver</button>
              <button type="button" class="pv-btn pv-btn-danger pv-btn-sm" data-pv-load-delete="${esc(load.id)}">Eliminar</button>
            </td>
          </tr>`).join("")}</tbody>
      </table></div>
      ${pages > 1 ? `<nav class="pv-pager"><button type="button" data-pv-loads-page="${ui.loadsPage - 1}" ${ui.loadsPage <= 1 ? "disabled" : ""}>‹</button><span>Página ${ui.loadsPage} de ${pages}</span><button type="button" data-pv-loads-page="${ui.loadsPage + 1}" ${ui.loadsPage >= pages ? "disabled" : ""}>›</button></nav>` : ""}`;
  }

  function focusLoad(loadId) {
    const load = (state.dataProcessing?.providerLoads || []).find((item) => item.id === loadId);
    if (!load) return null;
    providerFilters = { provider: load.provider || "", month: load.month || "", plate: "", loadId: load.id };
    return load;
  }

  // ===== Registros =====
  function filteredRows(records) {
    const term = ui.recSearch.trim().toUpperCase();
    if (!term) return records;
    return records.filter((record) => [getProviderRecordPlate(record), record.provider, getProviderAdvisor(record), getProviderAgency(record), getProviderObservation(record), record.FECHA]
      .join(" ").toUpperCase().includes(term));
  }

  function statusChip(state, hasPlate = true) {
    if (!hasPlate) return `<span class="pv-chip is-warn">Sin placa</span>`;
    if (state === "pending") return `<span class="pv-chip is-warn">Por revisar</span>`;
    if (state === "rejected") return `<span class="pv-chip is-red">No aprobado</span>`;
    if (state === "approved") return `<span class="pv-chip is-ok">Repetido aprobado</span>`;
    if (state === "base") return `<span class="pv-chip">Primer cobro</span>`;
    return `<span class="pv-chip">OK</span>`;
  }

  function renderRecords(records, metrics) {
    const root = panel();
    const box = $("[data-pv-records]", root);
    if (!box) return;
    const rows = filteredRows(records).slice().reverse();
    const count = $("[data-pv-rec-count]", root);
    if (count) count.textContent = `${rows.length} de ${records.length} registros del filtro`;
    const pager = $("[data-pv-rec-pager]", root);
    if (!rows.length) {
      box.innerHTML = `<div class="pv-empty">${records.length ? "Ningún registro coincide con la búsqueda." : "Sin registros en el filtro actual."}</div>`;
      if (pager) pager.innerHTML = "";
      return;
    }
    const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
    ui.recPage = Math.min(Math.max(1, ui.recPage), pages);
    const pageRows = rows.slice((ui.recPage - 1) * PAGE_SIZE, ui.recPage * PAGE_SIZE);
    const common = getProviderCommonAmount(records);
    box.innerHTML = `<div class="pv-table-wrap"><table class="pv-table">
      <thead><tr><th>Fecha</th><th>Placa</th><th>Proveedor</th><th class="num">Valor</th><th>Asesor</th><th>Agencia</th><th>Observación</th><th>Estado</th></tr></thead>
      <tbody>${pageRows.map((record) => {
        const plate = getProviderRecordPlate(record);
        return `<tr>
          <td>${esc(record.FECHA || "—")}</td>
          <td class="pv-plate">${esc(plate || "—")}</td>
          <td>${esc(record.provider || "—")}</td>
          <td class="num">${esc(money(getProviderRecordAmount(record) || common))}</td>
          <td>${esc(getProviderAdvisor(record) || "—")}</td>
          <td>${esc(getProviderAgency(record) || "—")}</td>
          <td class="pv-obs" title="${esc(getProviderObservation(record))}">${esc(getProviderObservation(record) || "")}</td>
          <td>${statusChip(metrics.status.get(record), Boolean(plate))}</td>
        </tr>`;
      }).join("")}</tbody></table></div>`;
    if (pager) {
      pager.innerHTML = pages > 1
        ? `<button type="button" data-pv-rec-page="${ui.recPage - 1}" ${ui.recPage <= 1 ? "disabled" : ""}>‹ Anterior</button><span>Página ${ui.recPage} de ${pages}</span><button type="button" data-pv-rec-page="${ui.recPage + 1}" ${ui.recPage >= pages ? "disabled" : ""}>Siguiente ›</button>`
        : "";
    }
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function exportCsv() {
    const records = getFilteredProviderRecords();
    const rows = filteredRows(records);
    if (!rows.length) {
      showToast("No hay registros para exportar.");
      return;
    }
    const metrics = computeMetrics(records);
    const common = getProviderCommonAmount(records);
    const statusText = { pending: "POR REVISAR", rejected: "NO APROBADO", approved: "REPETIDO APROBADO", base: "PRIMER COBRO" };
    const header = ["MES", "FECHA", "PLACA", "PROVEEDOR", "VALOR", "ASESOR", "AGENCIA", "OBSERVACION", "ESTADO", "CARGADO"];
    const lines = [header.join(";")].concat(rows.map((record) => {
      const plate = getProviderRecordPlate(record);
      return [
        record.importMonth, record.FECHA, plate, record.provider,
        (getProviderRecordAmount(record) || common).toFixed(2).replace(".", ","),
        getProviderAdvisor(record), getProviderAgency(record), getProviderObservation(record),
        plate ? (statusText[metrics.status.get(record)] || "OK") : "SIN PLACA", record.importedAt ? when(record.importedAt) : ""
      ].map(csvCell).join(";");
    }));
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `proveedores-${providerFilters.month || "todos"}${providerFilters.provider ? `-${providerFilters.provider.replace(/[^A-Z0-9]+/gi, "_")}` : ""}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 4000);
  }

  // ===== Proveedores =====
  function renderProfiles() {
    const root = panel();
    const box = $("[data-pv-profiles]", root);
    if (!box) return;
    // app.js ya reconstruyo los perfiles en este mismo render; reconstruirlos otra vez es costoso.
    const profiles = state.dataProcessing?.providerProfiles?.length ? state.dataProcessing.providerProfiles : getProviderProfiles();
    const loads = state.dataProcessing?.providerLoads || [];
    const stats = new Map();
    loads.forEach((load) => {
      const key = load.profileId || load.provider;
      const item = stats.get(key) || { loads: 0, rows: 0, paid: 0, last: "" };
      item.loads += 1;
      item.rows += Number(load.recordCount) || 0;
      item.paid += Number(load.paidTotal ?? load.total) || 0;
      if (!item.last || new Date(load.importedAt) > new Date(item.last)) item.last = load.importedAt;
      stats.set(key, item);
    });
    if (!profiles.length) {
      box.innerHTML = `<div class="pv-empty">Registra el primer proveedor con el botón de arriba.</div>`;
      return;
    }
    // Un proveedor puede tener perfiles repetidos con el mismo nombre: se muestra uno solo.
    const byName = new Map();
    profiles
      .map((profile) => ({ profile, stat: stats.get(profile.id) || stats.get(profile.name) || { loads: 0, rows: 0, paid: 0, last: "" } }))
      .forEach((item) => {
        const key = String(item.profile.name || "").trim().toUpperCase();
        const prev = byName.get(key);
        if (!prev || item.stat.loads > prev.stat.loads) byName.set(key, item);
      });
    box.innerHTML = [...byName.values()]
      .sort((a, b) => b.stat.paid - a.stat.paid || a.profile.name.localeCompare(b.profile.name))
      .map(({ profile, stat }) => {
        const cols = getProviderColumns(profile);
        return `<article class="pv-profile">
          <header>
            <span class="pv-avatar">${esc((profile.name || "?").replace(/[^A-Z0-9 ]/gi, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "P")}</span>
            <div><h4>${esc(profile.name)}</h4><small>${stat.last ? `Última carga ${esc(when(stat.last))}` : "Sin cargas todavía"}</small></div>
          </header>
          <dl>
            <div><dt>Cargas</dt><dd>${stat.loads}</dd></div>
            <div><dt>Registros</dt><dd>${stat.rows}</dd></div>
            <div><dt>Total cobrado</dt><dd>${esc(moneyShort(stat.paid))}</dd></div>
          </dl>
          <p class="pv-profile-cols" title="${esc(cols.join(", "))}">${cols.length} columnas: ${esc(cols.slice(0, 5).join(", "))}${cols.length > 5 ? "…" : ""}</p>
          <footer>
            <button type="button" class="pv-btn pv-btn-red pv-btn-sm" data-pv-profile-load="${esc(profile.id)}">Cargar reporte</button>
            <button type="button" class="pv-btn pv-btn-ghost pv-btn-sm" data-pv-profile-edit="${esc(profile.id)}">Editar</button>
            <button type="button" class="pv-btn pv-btn-ghost pv-btn-sm pv-btn-quiet" data-pv-profile-delete="${esc(profile.id)}">Eliminar</button>
          </footer>
        </article>`;
      }).join("");
  }

  function selectProfile(id) {
    const select = document.getElementById("providerProfileSelect");
    if (!select) return null;
    select.value = id;
    select.dispatchEvent(new Event("change", { bubbles: true }));
    return getSelectedProviderProfile();
  }

  // ===== Render principal =====
  function render() {
    const root = panel();
    if (!root) return;
    const records = getFilteredProviderRecords();
    const metrics = computeMetrics(records);
    const paidBox = $("[data-pv-m='paid']", root);
    if (paidBox) paidBox.textContent = money(metrics.paid);
    const billBox = $("[data-pv-m='billable']", root);
    if (billBox) billBox.textContent = money(metrics.billable);
    const pendingCount = $("[data-pv-count='pending']", root);
    if (pendingCount) {
      pendingCount.textContent = String(metrics.pending.length);
      pendingCount.hidden = !metrics.pending.length;
    }
    renderResumen(records, metrics);
    renderLoads();
    renderRecords(records, metrics);
    renderProfiles();
    setTab(ui.tab);
  }

  function bind() {
    const root = panel();
    if (!root || root.dataset.pvBound) return;
    root.dataset.pvBound = "1";
    root.addEventListener("click", (event) => {
      const tab = event.target.closest("[data-pv-tab]");
      if (tab) { setTab(tab.dataset.pvTab); return; }
      const go = event.target.closest("[data-pv-go]");
      if (go) {
        setTab(go.dataset.pvGo);
        if (go.dataset.pvGo === "proveedores" && typeof toggleProviderProfileManager === "function" && go.closest("[data-pv-pane='cargar']")) toggleProviderProfileManager(true);
        root.querySelector(".pv-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const view = event.target.closest("[data-pv-load-view]");
      if (view) {
        if (focusLoad(view.dataset.pvLoadView)) {
          ui.recPage = 1;
          setTab("registros");
          renderProviderProcessing();
        }
        return;
      }
      const del = event.target.closest("[data-pv-load-delete]");
      if (del) {
        if (focusLoad(del.dataset.pvLoadDelete)) {
          renderProviderProcessing();
          deleteSelectedProviderLoad();
        }
        return;
      }
      const loadsPage = event.target.closest("[data-pv-loads-page]");
      if (loadsPage) { ui.loadsPage = Number(loadsPage.dataset.pvLoadsPage) || 1; renderLoads(); return; }
      const recPage = event.target.closest("[data-pv-rec-page]");
      if (recPage) {
        ui.recPage = Number(recPage.dataset.pvRecPage) || 1;
        const records = getFilteredProviderRecords();
        renderRecords(records, computeMetrics(records));
        $("[data-pv-pane='registros']", root)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (event.target.closest("[data-pv-export]")) { exportCsv(); return; }
      const loadProfile = event.target.closest("[data-pv-profile-load]");
      if (loadProfile) { selectProfile(loadProfile.dataset.pvProfileLoad); setTab("cargar"); return; }
      const edit = event.target.closest("[data-pv-profile-edit]");
      if (edit) {
        selectProfile(edit.dataset.pvProfileEdit);
        toggleProviderProfileManager(true);
        editSelectedProviderProfile();
        document.getElementById("providerProfileNameInput")?.focus();
        return;
      }
      const remove = event.target.closest("[data-pv-profile-delete]");
      if (remove) { selectProfile(remove.dataset.pvProfileDelete); deleteSelectedProviderProfile(); }
    });
    let timer = 0;
    root.addEventListener("input", (event) => {
      const search = event.target.closest("[data-pv-rec-search]");
      if (!search) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        ui.recSearch = search.value;
        ui.recPage = 1;
        const records = getFilteredProviderRecords();
        renderRecords(records, computeMetrics(records));
      }, 200);
    });
    root.addEventListener("change", (event) => {
      if (event.target.matches("#providerFilterSelect, #providerMonthFilter, #providerLoadFilter")) { ui.recPage = 1; ui.loadsPage = 1; }
    });
  }

  // Engancha el render de app.js: se reemplazan los bloques antiguos del resumen y la tabla.
  const original = window.renderProviderProcessing;
  if (typeof original === "function") {
    window.renderProviderKpis = function () {};
    window.renderProviderExecutiveDashboard = function () {};
    window.renderProviderTable = function () {};
    window.renderProviderProcessing = function () {
      const result = original.apply(this, arguments);
      try { bind(); render(); } catch (error) { console.error("Proveedores: no se pudo dibujar la pantalla", error); }
      return result;
    };
  }
  window.ProveedoresUI = { render, setTab };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => { bind(); setTab(ui.tab); });
  else { bind(); setTab(ui.tab); }
})();
