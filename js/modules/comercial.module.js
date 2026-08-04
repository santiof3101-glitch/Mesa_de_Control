(function registerCommercialModule(window) {
  "use strict";

  if (!window.Autocor || !window.Autocor.registerModule) return;

  window.Autocor.registerModule("comercial", {
    label: "Acceso comercial",
    legacyFile: "app.js",
    extractionPhase: 2
  });
})(window);
