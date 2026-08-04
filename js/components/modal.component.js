(function registerModalComponent(window) {
  "use strict";

  if (!window.Autocor || !window.Autocor.registerComponent) return;

  window.Autocor.registerComponent("modal", {
    openById(id) {
      const element = document.getElementById(id);
      if (!element) return false;
      element.hidden = false;
      element.classList.add("is-open");
      return true;
    },
    closeById(id) {
      const element = document.getElementById(id);
      if (!element) return false;
      element.classList.remove("is-open");
      element.hidden = true;
      return true;
    }
  });
})(window);
