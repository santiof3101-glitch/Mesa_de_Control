(function bootstrapAutocorCore(window) {
  "use strict";

  const Autocor = window.Autocor || {};
  const registry = Autocor.registry || { modules: {}, components: {} };

  function register(target, name, api) {
    if (!name) return null;
    target[name] = Object.freeze({ ...(api || {}) });
    return target[name];
  }

  Autocor.version = "20260803-modular-phase1";
  Autocor.registry = registry;
  Autocor.modules = registry.modules;
  Autocor.components = registry.components;
  Autocor.registerModule = function registerModule(name, api) {
    return register(registry.modules, name, api);
  };
  Autocor.registerComponent = function registerComponent(name, api) {
    return register(registry.components, name, api);
  };
  Autocor.utils = {
    ...(Autocor.utils || {}),
    escapeHtml(value = "") {
      return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },
    normalizeText(value = "") {
      return String(value).trim().replace(/\s+/g, " ");
    },
    normalizeUpper(value = "") {
      return Autocor.utils.normalizeText(value).toUpperCase();
    }
  };

  window.Autocor = Autocor;
})(window);
