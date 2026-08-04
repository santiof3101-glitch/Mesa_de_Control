(function registerControlDeskModule(window) {
  "use strict";

  if (!window.Autocor || !window.Autocor.registerModule) return;

  window.Autocor.registerModule("mesaControl", {
    label: "Mesa de control",
    legacyFile: "app.js",
    extractionPhase: 2
  });
})(window);
