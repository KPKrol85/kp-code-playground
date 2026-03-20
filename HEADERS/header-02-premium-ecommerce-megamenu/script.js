const searchDataset = [
  {
    title: "Marlow Modular Sectional",
    category: "Living Room · Sectionals",
    price: "$5,940",
    tag: "Performance bouclé",
    swatch: "travertine"
  },
  {
    title: "Brune Travertine Coffee Table",
    category: "Living Room · Coffee Tables",
    price: "$1,780",
    tag: "Natural stone",
    swatch: "stone"
  },
  {
    title: "Vanta Halo Pendant",
    category: "Lighting · Statement pendants",
    price: "$2,740",
    tag: "Brushed brass",
    swatch: "metal"
  },
  {
    title: "Alden Bouclé Lounge Chair",
    category: "Living Room · Accent chairs",
    price: "$2,180",
    tag: "Made to order",
    swatch: "linen"
  },
  {
    title: "Elio Walnut Media Console",
    category: "Living Room · Consoles",
    price: "$2,860",
    tag: "Cable-managed storage",
    swatch: "walnut"
  },
  {
    title: "Orla Floor Lamp",
    category: "Lighting · Floor lamps",
    price: "$940",
    tag: "Satin bronze stem",
    swatch: "metal"
  }
];

const root = document.querySelector("[data-header-root]");
const searchRoot = document.querySelector("[data-search-root]");
const searchInput = document.querySelector("[data-search-input]");
const searchPanel = document.querySelector("[data-search-panel]");
const searchEmptyState = document.querySelector("[data-search-empty]");
const searchResultsState = document.querySelector("[data-search-results]");
const searchSummary = document.querySelector("[data-search-summary]");
const suggestionList = document.querySelector("[data-suggestion-list]");
const accountRoot = document.querySelector("[data-account-root]");
const accountTrigger = document.querySelector("[data-account-trigger]");
const accountPanel = document.querySelector("[data-account-panel]");
const cartRoot = document.querySelector("[data-cart-root]");
const cartTrigger = document.querySelector("[data-cart-trigger]");
const cartPanel = document.querySelector("[data-cart-panel]");
const megaTrigger = document.querySelector("[data-mega-trigger]");
const megaMenu = document.querySelector("[data-mega-menu]");
const mobileToggle = document.querySelector("[data-mobile-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const progressBar = document.querySelector("[data-scroll-progress]");
const liveRegion = document.querySelector("[data-live-region]");
const cartFilled = document.querySelector("[data-cart-filled]");
const cartEmpty = document.querySelector("[data-cart-empty]");
const badgeButtons = document.querySelectorAll("[data-badge-bump]");

let activeSuggestionIndex = -1;
let megaHoverTimer;
let megaCloseTimer;
let isCartEmpty = false;

const setHeaderOffset = () => {
  const offset = root?.offsetHeight ?? 0;
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
};

const announce = (message) => {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.requestAnimationFrame(() => {
    liveRegion.textContent = message;
  });
};

const decoratePanel = (panel) => {
  if (!panel) return;
  panel.setAttribute("data-animated-panel", "true");
  window.setTimeout(() => panel.removeAttribute("data-animated-panel"), 260);
};

const buildSuggestionItem = (item, index) => {
  const li = document.createElement("li");
  const button = document.createElement("button");

  button.type = "button";
  button.className = "commerce-header__suggestion-item";
  button.setAttribute("role", "option");
  button.setAttribute("id", `suggestion-${index}`);
  button.setAttribute("aria-selected", "false");
  button.dataset.index = String(index);

  const swatch = document.createElement("div");
  swatch.className = `commerce-header__mini-swatch commerce-header__mini-swatch--${item.swatch}`;

  const meta = document.createElement("div");
  meta.className = "commerce-header__suggestion-meta";
  meta.innerHTML = `<strong>${item.title}</strong><span>${item.category}</span><span>${item.tag}</span>`;

  const price = document.createElement("strong");
  price.textContent = item.price;

  button.append(swatch, meta, price);
  li.append(button);
  return li;
};

const getMatches = (query) => {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 2) return [];
  return searchDataset.filter((item) => {
    return [item.title, item.category, item.tag].some((value) => value.toLowerCase().includes(normalized));
  });
};

const openSearchPanel = () => {
  if (!searchPanel) return;
  searchPanel.hidden = false;
  searchInput?.setAttribute("aria-expanded", "true");
  decoratePanel(searchPanel);
  setHeaderOffset();
};

const closeSearchPanel = () => {
  if (!searchPanel) return;
  searchPanel.hidden = true;
  searchInput?.setAttribute("aria-expanded", "false");
  searchInput?.removeAttribute("aria-activedescendant");
  activeSuggestionIndex = -1;
};



const toggleAccount = (force) => {
  if (!accountPanel || !accountTrigger) return;
  const shouldOpen = typeof force === "boolean" ? force : accountPanel.hidden;
  const isOpen = !accountPanel.hidden;
  if (shouldOpen === isOpen) return;

  accountPanel.hidden = !shouldOpen;
  accountTrigger.setAttribute("aria-expanded", String(shouldOpen));

  if (shouldOpen) {
    decoratePanel(accountPanel);
    announce("Account shortcuts opened.");
    setHeaderOffset();
  }
};

const renderSearchState = (matches, query = "") => {
  if (!searchEmptyState || !searchResultsState || !suggestionList) return;

  if (!query.trim() || query.trim().length < 2) {
    searchEmptyState.hidden = false;
    searchResultsState.hidden = true;
    suggestionList.innerHTML = "";
    activeSuggestionIndex = -1;
    searchSummary.textContent = "Recent searches and recently viewed pieces";
    return;
  }

  searchEmptyState.hidden = true;
  searchResultsState.hidden = false;
  suggestionList.innerHTML = "";
  matches.slice(0, 5).forEach((item, index) => {
    suggestionList.append(buildSuggestionItem(item, index));
  });

  searchSummary.textContent = matches.length
    ? `${matches.length} matching suggestions for “${query.trim()}”`
    : `No direct matches for “${query.trim()}” — try a product material, category, or finish.`;

  if (!matches.length) {
    const empty = document.createElement("li");
    empty.className = "commerce-header__suggestion-item";
    empty.innerHTML = `
      <div class="commerce-header__mini-swatch commerce-header__mini-swatch--stone"></div>
      <div class="commerce-header__suggestion-meta">
        <strong>Refine your search</strong>
        <span>Try “sofa”, “travertine”, or “pendant” for broader results.</span>
      </div>
      <strong>Guide</strong>
    `;
    suggestionList.append(empty);
  }
};

const updateActiveSuggestion = (index) => {
  const suggestions = suggestionList?.querySelectorAll(".commerce-header__suggestion-item[role='option']") ?? [];
  suggestions.forEach((element, suggestionIndex) => {
    const selected = suggestionIndex === index;
    element.setAttribute("aria-selected", String(selected));
    if (selected) {
      searchInput?.setAttribute("aria-activedescendant", element.id);
      element.scrollIntoView({ block: "nearest" });
    }
  });
};

const handleSearchInput = () => {
  if (!searchInput) return;
  const matches = getMatches(searchInput.value);
  openSearchPanel();
  renderSearchState(matches, searchInput.value);
  if (matches.length) {
    activeSuggestionIndex = 0;
    updateActiveSuggestion(0);
  } else {
    activeSuggestionIndex = -1;
  }
};

const toggleCart = (force) => {
  if (!cartPanel || !cartTrigger) return;
  const shouldOpen = typeof force === "boolean" ? force : cartPanel.hidden;
  const isOpen = !cartPanel.hidden;
  if (shouldOpen === isOpen) return;

  cartPanel.hidden = !shouldOpen;
  cartTrigger.setAttribute("aria-expanded", String(shouldOpen));
  cartRoot?.classList.toggle("is-emphasized", shouldOpen);

  if (shouldOpen) {
    decoratePanel(cartPanel);
    announce(isCartEmpty ? "Cart preview opened. Cart is empty." : "Cart preview opened with two items.");
    setHeaderOffset();
  }
};

const setCartState = (emptyState) => {
  isCartEmpty = emptyState;
  cartFilled.hidden = emptyState;
  cartEmpty.hidden = !emptyState;
  announce(emptyState ? "Mini cart switched to empty state." : "Mini cart restored to filled state.");
};

const openMegaMenu = () => {
  if (!megaMenu || !megaTrigger) return;
  window.clearTimeout(megaCloseTimer);
  megaMenu.hidden = false;
  megaTrigger.setAttribute("aria-expanded", "true");
  decoratePanel(megaMenu);
};

const closeMegaMenu = () => {
  if (!megaMenu || !megaTrigger) return;
  megaMenu.hidden = true;
  megaTrigger.setAttribute("aria-expanded", "false");
};

const scheduleMegaOpen = () => {
  window.clearTimeout(megaCloseTimer);
  megaHoverTimer = window.setTimeout(openMegaMenu, 130);
};

const scheduleMegaClose = () => {
  window.clearTimeout(megaHoverTimer);
  megaCloseTimer = window.setTimeout(closeMegaMenu, 160);
};

const toggleMobilePanel = (force) => {
  if (!mobilePanel || !mobileToggle) return;
  const shouldOpen = typeof force === "boolean" ? force : mobilePanel.hidden;
  const isOpen = !mobilePanel.hidden;
  if (shouldOpen === isOpen) return;

  mobilePanel.hidden = !shouldOpen;
  mobileToggle.setAttribute("aria-expanded", String(shouldOpen));
  announce(shouldOpen ? "Mobile navigation opened." : "Mobile navigation closed.");
  setHeaderOffset();
};

const updateScrollState = () => {
  const scrollTop = window.scrollY;
  root?.classList.toggle("is-compact", scrollTop > 120);

  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${Math.min(Math.max(ratio, 0), 100)}%`;
  }
  setHeaderOffset();
};

document.querySelector(".commerce-header__search")?.addEventListener("submit", (event) => {
  event.preventDefault();
  announce(searchInput?.value?.trim() ? `Search submitted for ${searchInput.value.trim()}.` : "Search submitted.");
});

accountTrigger?.addEventListener("click", () => toggleAccount());

searchInput?.addEventListener("focus", () => {
  openSearchPanel();
  renderSearchState([], "");
});

searchInput?.addEventListener("input", handleSearchInput);

searchInput?.addEventListener("keydown", (event) => {
  const suggestions = suggestionList?.querySelectorAll(".commerce-header__suggestion-item[role='option']") ?? [];

  if (event.key === "ArrowDown" && suggestions.length) {
    event.preventDefault();
    activeSuggestionIndex = (activeSuggestionIndex + 1) % suggestions.length;
    updateActiveSuggestion(activeSuggestionIndex);
  }

  if (event.key === "ArrowUp" && suggestions.length) {
    event.preventDefault();
    activeSuggestionIndex = (activeSuggestionIndex - 1 + suggestions.length) % suggestions.length;
    updateActiveSuggestion(activeSuggestionIndex);
  }

  if (event.key === "Enter" && activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
    event.preventDefault();
    const target = suggestions[activeSuggestionIndex];
    target.click();
  }

  if (event.key === "Escape") {
    closeSearchPanel();
    searchInput.blur();
  }
});

searchPanel?.addEventListener("click", (event) => {
  const chip = event.target.closest(".commerce-header__chip");
  const suggestion = event.target.closest(".commerce-header__suggestion-item[role='option']");

  if (chip && searchInput) {
    searchInput.value = chip.textContent?.trim() ?? "";
    handleSearchInput();
    announce(`Search updated to ${searchInput.value}.`);
  }

  if (suggestion && searchInput) {
    const selectedTitle = suggestion.querySelector("strong")?.textContent ?? "Selected suggestion";
    searchInput.value = selectedTitle;
    closeSearchPanel();
    announce(`${selectedTitle} selected from suggestions.`);
  }
});

cartTrigger?.addEventListener("click", () => toggleCart());
cartPanel?.addEventListener("click", (event) => {
  if (event.target.closest("[data-cart-toggle-close]")) {
    toggleCart(false);
  }

  if (event.target.closest("[data-toggle-cart-state]")) {
    setCartState(!isCartEmpty);
  }
});

megaTrigger?.addEventListener("click", () => {
  const shouldOpen = megaMenu?.hidden ?? true;
  if (shouldOpen) {
    openMegaMenu();
  } else {
    closeMegaMenu();
  }
});

megaTrigger?.addEventListener("mouseenter", scheduleMegaOpen);
megaTrigger?.addEventListener("mouseleave", scheduleMegaClose);
megaMenu?.addEventListener("mouseenter", () => window.clearTimeout(megaCloseTimer));
megaMenu?.addEventListener("mouseleave", scheduleMegaClose);

mobileToggle?.addEventListener("click", () => toggleMobilePanel());

badgeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const badge = button.querySelector(".commerce-header__badge");
    if (badge) {
      badge.classList.remove("is-bumping");
      window.requestAnimationFrame(() => badge.classList.add("is-bumping"));
    }
    announce("Wishlist preview highlighted.");
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  if (searchRoot && !searchRoot.contains(target)) {
    closeSearchPanel();
  }

  if (accountRoot && !accountRoot.contains(target)) {
    toggleAccount(false);
  }

  if (cartRoot && !cartRoot.contains(target)) {
    toggleCart(false);
  }

  if (
    megaMenu &&
    megaTrigger &&
    !megaMenu.contains(target) &&
    !megaTrigger.contains(target)
  ) {
    closeMegaMenu();
  }

  if (mobilePanel && mobileToggle && !mobilePanel.contains(target) && !mobileToggle.contains(target)) {
    if (window.innerWidth <= 820) {
      toggleMobilePanel(false);
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  closeSearchPanel();
  toggleAccount(false);
  toggleCart(false);
  closeMegaMenu();
  toggleMobilePanel(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    toggleMobilePanel(false);
  }
  setHeaderOffset();
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("load", () => {
  setHeaderOffset();
  updateScrollState();
  setCartState(false);
});
