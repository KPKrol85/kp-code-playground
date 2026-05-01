(() => {
  const storageKey = "everafterring-theme";
  const root = document.documentElement;
  let theme = null;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    }
  } catch {
    theme = null;
  }

  const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");

  if (!theme && mediaQuery?.matches) {
    theme = "dark";
  }

  root.dataset.theme = theme || "light";
})();
