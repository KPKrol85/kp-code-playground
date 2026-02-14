import { createCommandPalette } from "./modules/palette.js";
import { createToastManager } from "./modules/toast.js";
import {
  exportState,
  getCompactMode,
  importState,
  resetStoredState,
  setCompactMode,
  setThemePreference,
} from "./modules/storage.js";
import { isValidImportShape } from "./modules/schema.js";
import { initializeTheme, toggleTheme } from "./modules/theme.js";
import { downloadJson, readFileAsText } from "./modules/utils.js";

const liveRegion = document.getElementById("app-live-region");
const { showToast } = createToastManager();

initializeTheme();
applyCompactMode(getCompactMode());

const palette = createCommandPalette({
  liveRegion,
  onError: (message) => showToast(message, "error"),
});

const trigger = document.querySelector("[data-command-trigger]");
trigger?.addEventListener("click", () => {
  palette.openPalette(trigger);
});

const whatsNewModal = createInfoModal({
  id: "whats-new-modal",
  title: "What’s new",
  description:
    "This MVP includes command search, grouped actions, keyboard-first navigation, and persistent theme settings.",
});

const importModal = createImportModal();

document.body.append(whatsNewModal.root, importModal.root);

palette.registerActions([
  {
    id: "nav-dashboard",
    label: "Go to Dashboard",
    keywords: ["home", "overview", "landing"],
    group: "Navigation",
    shortcut: "Ctrl+1",
    run: () => navigateTo("index.html"),
  },
  {
    id: "nav-projects",
    label: "Go to Projects",
    keywords: ["work", "delivery", "roadmap"],
    group: "Navigation",
    shortcut: "Ctrl+2",
    run: () => navigateTo("pages/projects.html"),
  },
  {
    id: "nav-components",
    label: "Go to Components",
    keywords: ["ui", "library", "design"],
    group: "Navigation",
    shortcut: "Ctrl+3",
    run: () => navigateTo("pages/components.html"),
  },
  {
    id: "nav-settings",
    label: "Go to Settings",
    keywords: ["preferences", "account", "config"],
    group: "Navigation",
    shortcut: "Ctrl+4",
    run: () => navigateTo("pages/settings.html"),
  },
  {
    id: "toggle-theme",
    label: "Toggle theme",
    keywords: ["dark", "light", "appearance"],
    group: "Actions",
    shortcut: "Ctrl+T",
    run: () => {
      const next = toggleTheme();
      showToast(`Theme set to ${next}.`);
    },
  },
  {
    id: "toggle-compact",
    label: "Toggle compact mode",
    keywords: ["density", "spacing"],
    group: "Actions",
    shortcut: "Ctrl+M",
    run: () => {
      const next = !getCompactMode();
      setCompactMode(next);
      applyCompactMode(next);
      showToast(`Compact mode ${next ? "enabled" : "disabled"}.`);
    },
  },
  {
    id: "copy-support-email",
    label: "Copy support email",
    keywords: ["help", "contact", "clipboard"],
    group: "Actions",
    run: async () => {
      const email = "support@kp-code.dev";
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("input");
        input.value = email;
        document.body.append(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      showToast("Support email copied.");
    },
  },
  {
    id: "show-whats-new",
    label: "Show What’s new",
    keywords: ["release", "updates", "modal"],
    group: "Actions",
    run: () => whatsNewModal.open(),
  },
  {
    id: "reset-local",
    label: "Reset local data",
    keywords: ["clear", "factory", "storage"],
    group: "Settings",
    run: () => {
      const confirmed = window.confirm("Reset theme and compact mode to defaults?");
      if (!confirmed) {
        return;
      }
      resetStoredState();
      setThemePreference(null);
      initializeTheme();
      applyCompactMode(false);
      showToast("Local data reset.");
    },
  },
  {
    id: "export-state",
    label: "Export state JSON",
    keywords: ["backup", "download", "settings"],
    group: "Settings",
    run: () => {
      downloadJson("kp-command-palette-state.json", exportState());
      showToast("State exported.");
    },
  },
  {
    id: "import-state",
    label: "Import state JSON",
    keywords: ["upload", "restore", "settings"],
    group: "Settings",
    run: () => importModal.open(),
  },
]);

function applyCompactMode(enabled) {
  document.documentElement.dataset.compact = String(Boolean(enabled));
  document.body.classList.toggle("app--compact", Boolean(enabled));
}

function navigateTo(pathFromRoot) {
  const currentPath = window.location.pathname;
  const inPages = currentPath.includes("/pages/");
  const resolvedPath = inPages && pathFromRoot.startsWith("pages/") ? pathFromRoot.replace("pages/", "") : pathFromRoot;
  const finalPath = inPages && !pathFromRoot.startsWith("pages/") ? `../${pathFromRoot}` : resolvedPath;
  window.location.href = finalPath;
}

function createInfoModal({ id, title, description }) {
  const root = document.createElement("div");
  root.className = "info-modal";
  root.id = id;
  root.innerHTML = `
    <div class="command-palette__backdrop" data-close></div>
    <section class="info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
      <h2 id="${id}-title">${title}</h2>
      <p>${description}</p>
      <button class="button" type="button" data-close>Close</button>
    </section>
  `;

  const open = () => root.classList.add("info-modal--open");
  const close = () => root.classList.remove("info-modal--open");

  root.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("[data-close]")) {
      close();
    }
  });

  return { root, open, close };
}

function createImportModal() {
  const root = document.createElement("div");
  root.className = "info-modal";
  root.id = "import-modal";
  root.innerHTML = `
    <div class="command-palette__backdrop" data-close></div>
    <section class="info-modal__panel" role="dialog" aria-modal="true" aria-labelledby="import-modal-title">
      <h2 id="import-modal-title">Import state JSON</h2>
      <p>Import a file containing schemaVersion, theme, and compactMode.</p>
      <input class="button" type="file" accept="application/json" />
      <p class="info-panel__text" data-import-error hidden></p>
      <div style="margin-top: 0.75rem;">
        <button class="button" type="button" data-close>Cancel</button>
      </div>
    </section>
  `;

  const fileInput = root.querySelector('input[type="file"]');
  const errorText = root.querySelector("[data-import-error]");

  function setError(message = "") {
    errorText.textContent = message;
    errorText.hidden = !message;
  }

  async function handleFile(file) {
    try {
      setError("");
      const text = await readFileAsText(file);
      const parsed = JSON.parse(text);
      const validation = isValidImportShape(parsed);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
      importState(parsed);
      initializeTheme();
      applyCompactMode(parsed.compactMode);
      showToast("State imported successfully.");
      close();
    } catch {
      setError("Invalid JSON file. Please upload a valid export.");
    }
  }

  function open() {
    setError("");
    fileInput.value = "";
    root.classList.add("info-modal--open");
  }

  function close() {
    root.classList.remove("info-modal--open");
  }

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  });

  root.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("[data-close]")) {
      close();
    }
  });

  return { root, open, close };
}
