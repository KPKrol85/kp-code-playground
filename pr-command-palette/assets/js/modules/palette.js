import { trapFocus, announce } from "./a11y.js";
import { createActionRegistry } from "./registry.js";
import { filterActions, groupResults, highlightLabel } from "./search.js";
import { escapeHtml, formatShortcut, isMac } from "./utils.js";

export function createCommandPalette({ liveRegion, onError }) {
  const registry = createActionRegistry();
  let isOpen = false;
  let selectedIndex = 0;
  let results = [];
  let opener = null;

  const root = document.createElement("div");
  root.className = "command-palette";
  root.innerHTML = `
    <div class="command-palette__backdrop" data-palette-backdrop></div>
    <section
      class="command-palette__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="command-palette-title"
      aria-describedby="command-palette-description"
    >
      <h2 id="command-palette-title" class="sr-only">Command Palette</h2>
      <p id="command-palette-description" class="sr-only">Search and execute available actions.</p>
      <header class="command-palette__header">
        <input
          class="command-palette__input"
          type="text"
          placeholder="Type a command or search…"
          aria-label="Command search"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-palette-list"
          autocomplete="off"
        />
      </header>
      <div class="command-palette__list" id="command-palette-list" role="listbox"></div>
    </section>
  `;

  const dialog = root.querySelector(".command-palette__dialog");
  const backdrop = root.querySelector("[data-palette-backdrop]");
  const input = root.querySelector(".command-palette__input");
  const list = root.querySelector(".command-palette__list");

  document.body.append(root);

  function refreshResults() {
    const query = input.value;
    results = filterActions(registry.getActions(), query);
    if (selectedIndex >= results.length) {
      selectedIndex = Math.max(results.length - 1, 0);
    }
    render(query);
  }

  function setActiveDescendant() {
    if (!results.length) {
      input.removeAttribute("aria-activedescendant");
      return;
    }
    const current = results[selectedIndex];
    input.setAttribute("aria-activedescendant", `cp-option-${current.action.id}`);
  }

  function render(query) {
    if (!results.length) {
      list.innerHTML = '<p class="command-palette__empty">No actions found.</p>';
      setActiveDescendant();
      return;
    }

    const grouped = groupResults(results);
    list.innerHTML = Object.entries(grouped)
      .map(([group, entries]) => {
        const itemsMarkup = entries
          .map((entry) => {
            const absoluteIndex = results.findIndex((result) => result.action.id === entry.action.id);
            const activeClass = absoluteIndex === selectedIndex ? "command-palette__item--active" : "";
            const safeLabel = escapeHtml(entry.action.label);
            const labelMarkup = highlightLabel(safeLabel, entry.match);
            return `
              <button
                class="command-palette__item ${activeClass}"
                type="button"
                role="option"
                aria-selected="${absoluteIndex === selectedIndex}"
                id="cp-option-${entry.action.id}"
                data-action-id="${entry.action.id}"
              >
                <span class="command-palette__item-label">${labelMarkup}</span>
                ${entry.action.shortcut ? `<span class="command-palette__shortcut">${formatShortcut(entry.action.shortcut)}</span>` : ""}
              </button>
            `;
          })
          .join("");
        return `
          <section class="command-palette__group">
            <h3 class="command-palette__group-title">${escapeHtml(group)}</h3>
            ${itemsMarkup}
          </section>
        `;
      })
      .join("");

    setActiveDescendant();
    if (!query.trim()) {
      list.scrollTop = 0;
    }
  }

  async function executeSelected() {
    const current = results[selectedIndex];
    if (!current) {
      return;
    }
    try {
      await current.action.run();
      closePalette();
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Action execution failed.");
    }
  }

  function openPalette(fromElement = document.activeElement) {
    if (isOpen) {
      return;
    }
    isOpen = true;
    opener = fromElement instanceof HTMLElement ? fromElement : null;
    root.classList.add("command-palette--open");
    input.value = "";
    selectedIndex = 0;
    refreshResults();
    input.focus();
    announce("Command palette opened", liveRegion);
  }

  function closePalette() {
    if (!isOpen) {
      return;
    }
    isOpen = false;
    root.classList.remove("command-palette--open");
    announce("Command palette closed", liveRegion);
    opener?.focus?.();
  }

  function moveSelection(delta) {
    if (!results.length) {
      return;
    }
    selectedIndex = (selectedIndex + delta + results.length) % results.length;
    render(input.value);
    const active = list.querySelector(".command-palette__item--active");
    active?.scrollIntoView({ block: "nearest" });
  }

  input.addEventListener("input", () => {
    selectedIndex = 0;
    refreshResults();
  });

  list.addEventListener("mousemove", (event) => {
    const item = event.target.closest(".command-palette__item");
    if (!item) {
      return;
    }
    const index = results.findIndex((result) => result.action.id === item.dataset.actionId);
    if (index >= 0 && index !== selectedIndex) {
      selectedIndex = index;
      render(input.value);
    }
  });

  list.addEventListener("click", async (event) => {
    const item = event.target.closest(".command-palette__item");
    if (!item) {
      return;
    }
    selectedIndex = results.findIndex((result) => result.action.id === item.dataset.actionId);
    await executeSelected();
  });

  root.addEventListener("keydown", async (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSelection(1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSelection(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      await executeSelected();
      return;
    }

    trapFocus(dialog, event);
  });

  backdrop.addEventListener("click", closePalette);

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTypingContext =
      target instanceof HTMLElement &&
      (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

    if (isOpen) {
      return;
    }

    const usesPaletteShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
    if (usesPaletteShortcut && (!isTypingContext || event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      openPalette(target);
      return;
    }

    if (event.key === "k" && event.altKey && event.shiftKey && isMac()) {
      event.preventDefault();
      openPalette(target);
    }
  });

  return {
    registerAction: registry.registerAction,
    registerActions: registry.registerActions,
    unregisterAction: registry.unregisterAction,
    openPalette,
    closePalette,
  };
}
