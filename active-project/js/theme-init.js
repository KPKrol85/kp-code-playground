(() => {
  try {
    const stored = localStorage.getItem("kp_theme");
    const theme = stored
      ? JSON.parse(stored)
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    // no-op
  }
})();
