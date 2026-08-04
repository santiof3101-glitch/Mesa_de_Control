(function registerProvidersModule(window) {
  "use strict";

  if (!window.Autocor || !window.Autocor.registerModule) return;

  window.Autocor.registerModule("proveedores", {
    label: "Proveedores y pagos",
    legacyFile: "app.js",
    extractionPhase: 2
  });
})(window);
