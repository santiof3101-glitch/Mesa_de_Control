(function registerProcessingModule(window) {
  "use strict";

  if (!window.Autocor || !window.Autocor.registerModule) return;

  window.Autocor.registerModule("procesamiento", {
    label: "Procesamiento de datos",
    legacyFile: "app.js",
    extractionPhase: 2
  });
})(window);
