(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t) document.documentElement.classList.toggle("dark-mode", t === "dark");
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark-mode");
    }
  } catch (e) {}
})();
