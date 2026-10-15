// Version nueva publicada: las pestanas que quedaron abiertas se actualizan para usar las reglas nuevas.
(function watchNewVersion() {
  "use strict";

  const script = document.querySelector('script[src*="app.js?v="]');
  const current = (script?.getAttribute("src") || "").split("v=")[1] || "";
  if (!current) return;
  let pending = false;

  function isBusy() {
    const active = document.activeElement;
    if (active && /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return true;
    if (document.querySelector(".fx-modal, .commercial-modal:not([hidden]), .legal-contract-generator.is-open")) return true;
    const feriaForm = document.querySelector("#fxForm");
    return Boolean(feriaForm && String(feriaForm.elements?.placa?.value || "").trim());
  }

  function reloadWhenFree() {
    if (!isBusy()) {
      window.location.reload();
      return;
    }
    window.setTimeout(reloadWhenFree, 15000);
  }

  function showBanner() {
    if (document.querySelector(".version-banner")) return;
    const banner = document.createElement("div");
    banner.className = "version-banner";
    banner.setAttribute("role", "status");
    banner.innerHTML = '<span>Hay una actualización del sistema. Se aplicará en unos segundos.</span><button type="button">Actualizar ahora</button>';
    banner.querySelector("button").addEventListener("click", () => window.location.reload());
    document.body.appendChild(banner);
    window.setTimeout(reloadWhenFree, 20000);
  }

  async function check() {
    if (pending || document.visibilityState !== "visible" || !navigator.onLine) return;
    try {
      const response = await fetch(`index.html?nc=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const match = (await response.text()).match(/app\.js\?v=([^"'&]+)/);
      if (match && match[1] !== current) {
        pending = true;
        showBanner();
      }
    } catch {}
  }

  window.setInterval(check, 90 * 1000);
  document.addEventListener("visibilitychange", check);
})();
