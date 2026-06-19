  const month = providerMonthFilter?.value || "";
  let loadId = providerLoadFilter?.value || "";
  if (loadId) {
    const load = (state.dataProcessing?.providerLoads || []).find((item) => item.id === loadId);
    if (!load || (provider && load.provider !== provider) || (month && load.month !== month)) loadId = "";
  }
  providerFilters = {
    provider,
    month,
    loadId,
    plate: providerPlateFilter?.value || ""
  };
  renderProviderProcessing();
}

[providerFilterSelect, providerMonthFilter, providerLoadFilter].forEach((control) => {
  if (control) control.addEventListener("change", updateProviderFilters);
});

if (providerPlateFilter) providerPlateFilter.addEventListener("input", updateProviderFilters);

if (deleteProviderLoadBtn) {
  deleteProviderLoadBtn.addEventListener("click", deleteSelectedProviderLoad);
}

if (clearProviderFiltersBtn) {
  clearProviderFiltersBtn.addEventListener("click", () => {
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    if (providerFilterSelect) providerFilterSelect.value = "";
    if (providerMonthFilter) providerMonthFilter.value = "";
    if (providerLoadFilter) providerLoadFilter.value = "";
    if (providerPlateFilter) providerPlateFilter.value = "";
    renderProviderProcessing();
  });
}

if (clearProvidersBtn) {
  clearProvidersBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Desea borrar todos los reportes cargados de proveedores?");
    if (!confirmed) return;
    createPcBackup("antes-de-limpiar-proveedores");
    state.dataProcessing.providerTrash = {
      deletedAt: new Date().toISOString(),
      proveedores: structuredClone(state.dataProcessing.proveedores || []),
      providerLoads: structuredClone(state.dataProcessing.providerLoads || []),
      providerDuplicateApprovals: structuredClone(state.dataProcessing.providerDuplicateApprovals || {})
    };
    state.dataProcessing.proveedores = [];
    state.dataProcessing.providerLoads = [];
    state.dataProcessing.providerDuplicateApprovals = {};
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    pendingProviderRecords = [];
    renderProviderPastePreview([]);
    saveState();
    renderProviderProcessing();
    showToast("Reportes de proveedores limpiados.");
  });
}

if (restoreProviderTrashBtn) {
  restoreProviderTrashBtn.addEventListener("click", () => {
    const trash = state.dataProcessing?.providerTrash;
    if (!trash?.proveedores?.length && !trash?.providerLoads?.length) {
      showToast("No hay borrado de proveedores disponible para restaurar.");
      return;
    }
    const confirmed = window.confirm(`Se restaurara el borrado del ${formatDateTime(trash.deletedAt)}. Desea continuar?`);
    if (!confirmed) return;
    state.dataProcessing.proveedores = mergeByKey(state.dataProcessing.proveedores || [], trash.proveedores || [], "id").map(normalizeProviderRecord);
    state.dataProcessing.providerLoads = mergeByKey(state.dataProcessing.providerLoads || [], trash.providerLoads || [], "id").map(normalizeProviderLoad);
    state.dataProcessing.providerDuplicateApprovals = {
      ...(trash.providerDuplicateApprovals || {}),
      ...(state.dataProcessing.providerDuplicateApprovals || {})
    };
    providerFilters = { provider: "", month: "", plate: "", loadId: "" };
    saveState();
    renderProviderProcessing();
    showToast("Proveedores restaurados desde el ultimo borrado.");
  });
}

document.querySelector("#openAdvisorReportBtn")?.addEventListener("click", openAdvisorReportModal);

document.querySelectorAll("[data-close-advisor-report]").forEach((button) => {
  button.addEventListener("click", closeAdvisorReportModal);
});

document.querySelectorAll("[data-close-purchase-detail]").forEach((button) => {
  button.addEventListener("click", closePurchaseDetailModal);
});

document.querySelectorAll("[data-close-provider-detail]").forEach((button) => {
  button.addEventListener("click", closeProviderDetail);
});

if (clearPurchaseFiltersBtn) {
  clearPurchaseFiltersBtn.addEventListener("click", () => {
    purchaseFilters = { month: "", loadId: "", date: "", agency: "", advisor: [], coordinator: [], status: "", plate: "" };
    if (purchaseMonthFilter) purchaseMonthFilter.value = "";
    if (purchaseLoadFilter) purchaseLoadFilter.value = "";
    if (purchaseDateFilter) purchaseDateFilter.value = "";
    if (purchaseAgencyFilter) purchaseAgencyFilter.value = "";
    if (purchaseAdvisorFilter) [...purchaseAdvisorFilter.options].forEach((option) => { option.selected = false; });
    if (purchaseCoordinatorFilter) [...purchaseCoordinatorFilter.options].forEach((option) => { option.selected = false; });
    if (purchaseStatusFilter) purchaseStatusFilter.value = "";
    if (purchasePlateFilter) purchasePlateFilter.value = "";
    renderPurchaseProcessing();
  });
}

if (clearPurchasesBtn) {
  clearPurchasesBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Desea borrar todos los registros procesados de compras?");
    if (!confirmed) return;
    state.dataProcessing.compras = [];
    state.dataProcessing.loads = [];
    state.dataProcessing.purchaseDuplicateApprovals = {};
    saveState();
    renderPurchaseProcessing();
    showToast("Compras procesadas limpiadas.");
  });
}

document.querySelectorAll("[data-close-admin-lead]").forEach((button) => {
  button.addEventListener("click", closeAdminLeadEditor);
});

document.querySelectorAll("[data-option-form]").forEach((optionForm) => {
  optionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = optionForm.dataset.optionForm;
    const input = optionForm.querySelector("input");
    addOption(key, input.value);
    input.value = "";
  });
});

logoInput.addEventListener("change", () => {
  const file = logoInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.logoDataUrl = reader.result;
    saveState();
    renderLogo();
    showToast("Logo actualizado.");
  });
  reader.readAsDataURL(file);
});

resetLogoBtn.addEventListener("click", () => {
  state.logoDataUrl = "";
  saveState();
  renderLogo();
  showToast("Logo restablecido.");
});

document.querySelectorAll("[data-close-image]").forEach((button) => {
  button.addEventListener("click", closeImageModal);
});

document.querySelectorAll("[data-close-file-preview]").forEach((button) => {
  button.addEventListener("click", closeStoredFilePreview);
});

document.addEventListener("change", (event) => {
  const groupCheck = event.target.closest?.("[data-provider-duplicate-approval]");
  if (groupCheck) {
    handleProviderGroupApprovalChange(groupCheck);
    return;
  }
  const itemCheck = event.target.closest?.("[data-provider-duplicate-item]");
  if (itemCheck) {
    handleProviderItemApprovalChange(itemCheck);
  }
});

["click", "keydown", "input", "change", "mousemove"].forEach((eventName) => {
  document.addEventListener(eventName, touchSession, { passive: true });
});

window.setInterval(checkSessionExpiry, 60000);

renderAll();
restoreStateFromInternalBackupIfNeeded();
restoreStateFromSupabaseIfNeeded();
migrateIndexedDbFilesToSharedPc();
