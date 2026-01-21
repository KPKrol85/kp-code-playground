import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { addRoute, startRouter } from "./router/router.js";
import { mockApi } from "./services/mockApi.js";
import { cartService } from "./services/cart.js";
import { authService } from "./services/auth.js";
import { storage } from "./services/storage.js";
import { store } from "./store/store.js";
import { actions } from "./store/actions.js";
import { selectors } from "./store/selectors.js";
import { showToast } from "./components/toast.js";
import { initErrorBoundary } from "./utils/error-boundary.js";
import { initKeyboardShortcuts } from "./utils/keyboard-shortcuts.js";
import { closeModal } from "./components/modal.js";
import { consumeProgrammaticNav, markProgrammaticNav, navigateHash } from "./utils/navigation.js";
import { content } from "./content/pl.js";
import { setMetaImages } from "./utils/meta.js";

const THEME_KEY = "kp_theme";
const SW_UPDATE_TOAST_KEY = "kp_sw_update_toast_shown";
const SW_UPDATE_RELOAD_KEY = "kp_sw_update_reloaded";

const applyTheme = (theme, { persist = true } = {}) => {
  document.documentElement.setAttribute("data-theme", theme);
  if (persist) {
    storage.set(THEME_KEY, theme);
  }
  actions.ui.setTheme(theme);
};

const detectTheme = () => {
  const saved = storage.get(THEME_KEY, null);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return {
    theme: saved ?? (prefersDark ? "dark" : "light"),
    hasSaved: Boolean(saved),
  };
};

const RETRY_BUTTON_SELECTOR = '[data-retry="init-data"]';
let isDataRetrying = false;

const updateRetryButtonsState = (isLoading) => {
  document.querySelectorAll(RETRY_BUTTON_SELECTOR).forEach((button) => {
    button.disabled = isLoading;
    button.textContent = isLoading ? "Ładowanie..." : "Spróbuj ponownie";
  });
};

const initData = async () => {
  if (isDataRetrying) {
    return;
  }
  isDataRetrying = true;
  updateRetryButtonsState(true);
  actions.data.setProductsLoading();
  try {
    const [products, licenses] = await Promise.all([mockApi.getProducts(), mockApi.getLicenses()]);
    actions.data.setProductsReady({ products, licenses });
  } catch (error) {
    showToast(content.toasts.dataFetchError, "error");
    actions.data.setProductsError(content.states.products.error.title);
  } finally {
    isDataRetrying = false;
    updateRetryButtonsState(false);
  }
};

const initStore = () => {
  const session = authService.getSession();
  const user = authService.getUser();
  const { theme, hasSaved } = detectTheme();
  actions.user.setSession(session, user);
  actions.cart.setCart(cartService.getCart());
  actions.ui.setTheme(theme);
  applyTheme(theme, { persist: hasSaved });

  authService.onAuthChange(({ session: nextSession, user: nextUser }) => {
    actions.user.setSession(nextSession, nextUser);
    actions.cart.setCart(cartService.getCart());
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (event) => {
    if (storage.get(THEME_KEY, null)) {
      return;
    }
    applyTheme(event.matches ? "dark" : "light", { persist: false });
  });
};

const initLayout = () => {
  renderHeader(
    document.getElementById("app-header"),
    () => {
      const currentTheme = selectors.theme(store.getState());
      applyTheme(currentTheme === "light" ? "dark" : "light");
    },
    { onHeightChange: updateHeaderOffset }
  );
};

const initFooter = () => {
  const container = document.getElementById("app-footer");
  if (!container || container._footerMounted) {
    return;
  }
  container._footerMounted = true;
  renderFooter(container);
};

const initFooterAfterFirstRoute = () => {
  const handleFirstRoute = () => {
    initFooter();
    window.removeEventListener("route:after", handleFirstRoute);
  };
  window.addEventListener("route:after", handleFirstRoute);
};

const initDataRetryHandling = () => {
  document.addEventListener("click", (event) => {
    const target = event.target.closest(RETRY_BUTTON_SELECTOR);
    if (!target) {
      return;
    }
    event.preventDefault();
    initData();
  });
};

const getHandlerByName = (name) => (module) => module[name];

const addLazyRoute = (pattern, loader, getHandler, meta) => {
  addRoute(pattern, null, meta, { loader, getHandler });
};

const initRoutes = () => {
  const placeholderLoader = () => import("./pages/placeholder.js");
  const checkoutLoader = () => import("./pages/checkout.js");
  const legalPagesLoader = () => import("./pages/legalPages.js");
  const metaRoutes = content.meta.routes;
  const placeholderBullets = {
    products: [
      "Przegląd kolekcji tematycznych i filtrów.",
      "Przykładowe podglądy i checklisty kompatybilności.",
      "Szybkie porównanie licencji i formatów plików.",
    ],
    services: [
      "Zakres i pakiety usług wraz z orientacyjnymi terminami.",
      "Case studies i przykładowe realizacje.",
      "Krótki formularz do szybkiej wyceny.",
    ],
    resources: [
      "Aktualne materiały i przewodniki dla klientów.",
      "Sekcja pytań i odpowiedzi oraz baza wiedzy.",
      "Kanały kontaktu i wsparcia technicznego.",
    ],
    company: [
      "Informacje o zespole i misji marki.",
      "Kamienie milowe oraz plan rozwoju produktu.",
      "Oferty współpracy i aktualne rekrutacje.",
    ],
    account: [
      "Ustawienia profilu i bezpieczeństwa konta.",
      "Powiadomienia oraz preferencje komunikacji.",
      "Zarządzanie danymi rozliczeniowymi.",
    ],
  };
  const defaultCtas = [
    { label: "Powrót do produktów", href: "#/products" },
    { label: "Zaloguj się", href: "#/auth", variant: "secondary" },
  ];
  const placeholderRoutes = [
    {
      pattern: /^\/products\/ui-kits$/,
      meta: {
        ...metaRoutes.placeholders.uiKits,
      },
      view: {
        title: "UI Kits & Components",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.products,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/products\/templates$/,
      meta: {
        ...metaRoutes.placeholders.templates,
      },
      view: {
        title: "Templates & Dashboards",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.products,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/products\/assets$/,
      meta: {
        ...metaRoutes.placeholders.assets,
      },
      view: {
        title: "Assets & Graphics",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.products,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/products\/knowledge$/,
      meta: {
        ...metaRoutes.placeholders.knowledge,
      },
      view: {
        title: "Knowledge & Tools",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.products,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/services$/,
      meta: {
        ...metaRoutes.placeholders.services,
      },
      view: {
        title: "Usługi",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.services,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/services\/web-development$/,
      meta: {
        ...metaRoutes.placeholders.webDevelopment,
      },
      view: {
        title: "Web Development",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.services,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/services\/wordpress$/,
      meta: {
        ...metaRoutes.placeholders.wordpress,
      },
      view: {
        title: "WordPress Solutions",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.services,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/services\/ui-ux-branding$/,
      meta: {
        ...metaRoutes.placeholders.uiUxBranding,
      },
      view: {
        title: "UI / UX & Branding",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.services,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/services\/consulting-support$/,
      meta: {
        ...metaRoutes.placeholders.consultingSupport,
      },
      view: {
        title: "Consulting & Support",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.services,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/pricing$/,
      meta: {
        ...metaRoutes.placeholders.pricing,
      },
      view: {
        title: "Cennik",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.resources,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/updates$/,
      meta: {
        ...metaRoutes.placeholders.updates,
      },
      view: {
        title: "Aktualizacje / Changelog",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.resources,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/docs$/,
      meta: {
        ...metaRoutes.placeholders.docs,
      },
      view: {
        title: "Dokumentacja",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.resources,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/faq$/,
      meta: {
        ...metaRoutes.placeholders.faq,
      },
      view: {
        title: "FAQ",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.resources,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/support$/,
      meta: {
        ...metaRoutes.placeholders.support,
      },
      view: {
        title: "Wsparcie",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.resources,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/about$/,
      meta: {
        ...metaRoutes.placeholders.about,
      },
      view: {
        title: "O nas",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.company,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/roadmap$/,
      meta: {
        ...metaRoutes.placeholders.roadmap,
      },
      view: {
        title: "Plan rozwoju / Roadmap",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.company,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/careers$/,
      meta: {
        ...metaRoutes.placeholders.careers,
      },
      view: {
        title: "Kariera",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.company,
        ctas: defaultCtas,
      },
    },
    {
      pattern: /^\/settings$/,
      meta: {
        ...metaRoutes.placeholders.settings,
      },
      view: {
        title: "Ustawienia konta",
        lead: "W przygotowaniu.",
        bullets: placeholderBullets.account,
        ctas: [
          { label: "Powrót do produktów", href: "#/products" },
          { label: "Przejdź do konta", href: "#/account", variant: "secondary" },
        ],
      },
    },
  ];

  addLazyRoute(
    /^\/$/,
    () => import("./pages/home.js"),
    getHandlerByName("renderHome"),
    metaRoutes.home
  );
  addLazyRoute(
    /^\/products(?:\?.*)?$/,
    () => import("./pages/products.js"),
    getHandlerByName("renderProducts"),
    metaRoutes.products
  );
  placeholderRoutes.forEach((route) => {
    addLazyRoute(
      route.pattern,
      placeholderLoader,
      (module) => module.createPlaceholderHandler(route.view),
      route.meta
    );
  });
  addLazyRoute(
    /^\/products\/(?<id>[\w-]+)$/,
    () => import("./pages/productDetails.js"),
    getHandlerByName("renderProductDetails"),
    metaRoutes.productDetails
  );
  addLazyRoute(
    /^\/cart$/,
    () => import("./pages/cart.js"),
    getHandlerByName("renderCart"),
    metaRoutes.cart
  );
  addLazyRoute(
    /^\/checkout$/,
    checkoutLoader,
    getHandlerByName("renderCheckout"),
    metaRoutes.checkout
  );
  addLazyRoute(
    /^\/checkout\/success$/,
    checkoutLoader,
    getHandlerByName("renderCheckoutSuccess"),
    metaRoutes.checkoutSuccess
  );
  addLazyRoute(
    /^\/auth$/,
    () => import("./pages/auth.js"),
    getHandlerByName("renderAuth"),
    metaRoutes.auth
  );
  addLazyRoute(
    /^\/account$/,
    () => import("./pages/account.js"),
    getHandlerByName("renderAccount"),
    metaRoutes.account
  );
  addLazyRoute(
    /^\/library$/,
    () => import("./pages/library.js"),
    getHandlerByName("renderLibrary"),
    metaRoutes.library
  );
  addLazyRoute(
    /^\/licenses$/,
    () => import("./pages/licenses.js"),
    getHandlerByName("renderLicenses"),
    metaRoutes.licenses
  );
  addLazyRoute(
    /^\/privacy$/,
    legalPagesLoader,
    getHandlerByName("renderPrivacy"),
    metaRoutes.privacy
  );
  addLazyRoute(
    /^\/terms$/,
    legalPagesLoader,
    getHandlerByName("renderTerms"),
    metaRoutes.terms
  );
  addLazyRoute(
    /^\/cookies$/,
    legalPagesLoader,
    getHandlerByName("renderCookies"),
    metaRoutes.cookies
  );
  addLazyRoute(
    /^\/admin$/,
    () => import("./pages/admin.js"),
    getHandlerByName("renderAdmin"),
    metaRoutes.admin
  );
  addLazyRoute(
    /^\/legal$/,
    () => import("./pages/legal.js"),
    getHandlerByName("renderLegal"),
    metaRoutes.legal
  );
  addLazyRoute(
    /^\/contact$/,
    () => import("./pages/contact.js"),
    getHandlerByName("renderContact"),
    metaRoutes.contact
  );
  addLazyRoute(
    /^\/404$/,
    () => import("./pages/notFound.js"),
    getHandlerByName("renderNotFound"),
    metaRoutes.notFound
  );
  startRouter();
};

const focusMain = ({ preventScroll = false } = {}) => {
  const main = document.getElementById("main-content");
  if (main) {
    const heading = main.querySelector("[data-focus-heading]");
    const target = heading || main;
    if (preventScroll) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      try {
        target.focus({ preventScroll: true });
      } catch (error) {
        target.focus();
        window.scrollTo(scrollX, scrollY);
      }
      return;
    }
    target.focus();
  }
};

const updateHeaderOffset = () => {
  const header = document.querySelector("header");
  if (!header) {
    return;
  }
  const height = Math.round(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-offset", `${height}px`);
};

const initRouteScrollHandling = () => {
  let isFirstRoute = true;
  window.addEventListener("route:after", () => {
    const shouldReset = consumeProgrammaticNav() || isFirstRoute;
    requestAnimationFrame(() => {
      if (shouldReset) {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      requestAnimationFrame(() => {
        updateHeaderOffset();
        focusMain({ preventScroll: true });
      });
    });
    isFirstRoute = false;
  });
};

const initRouteClickTracking = () => {
  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const link = event.target.closest('a[href^="#/"]');
    if (link) {
      markProgrammaticNav();
    }
  });
};

const initResizeHandling = () => {
  let resizeRaf = null;
  window.addEventListener("resize", () => {
    if (resizeRaf) {
      window.cancelAnimationFrame(resizeRaf);
    }
    resizeRaf = window.requestAnimationFrame(() => {
      updateHeaderOffset();
      resizeRaf = null;
    });
  });
};

const registerServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        if (!registration) {
          return;
        }
        let updateToastShown = false;
        const showUpdateToast = () => {
          if (updateToastShown || sessionStorage.getItem(SW_UPDATE_TOAST_KEY)) {
            return;
          }
          const waitingWorker = registration.waiting;
          if (!waitingWorker) {
            return;
          }
          updateToastShown = true;
          sessionStorage.setItem(SW_UPDATE_TOAST_KEY, "1");
          showToast(content.toasts.updateAvailable, "info", {
            actionLabel: content.toasts.updateCta,
            duration: null,
            onAction: () => {
              if (sessionStorage.getItem(SW_UPDATE_RELOAD_KEY)) {
                return;
              }
              sessionStorage.setItem(SW_UPDATE_RELOAD_KEY, "1");
              const reloadOnce = () => {
                navigator.serviceWorker.removeEventListener("controllerchange", reloadOnce);
                window.location.reload();
              };
              navigator.serviceWorker.addEventListener("controllerchange", reloadOnce);
              waitingWorker.postMessage({ type: "SKIP_WAITING" });
            },
          });
        };
        if (registration.waiting && navigator.serviceWorker.controller) {
          showUpdateToast();
        }
        registration.addEventListener("updatefound", () => {
          const installing = registration.installing;
          if (!installing) {
            return;
          }
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              showUpdateToast();
            }
          });
        });
        if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
          console.info("Service Worker registered.");
        }
      })
      .catch((error) => {
        if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
          console.warn("Service Worker registration failed:", error);
        }
      });
  });
};

initErrorBoundary();
initStore();
initLayout();
setMetaImages();
initDataRetryHandling();
initData();
initFooterAfterFirstRoute();
initRoutes();
initRouteScrollHandling();
initRouteClickTracking();
initResizeHandling();
updateHeaderOffset();
focusMain({ preventScroll: true });
registerServiceWorker();

initKeyboardShortcuts({
  getSearchInput: () => document.querySelector('input[type="search"]'),
  closeModal,
  navigateToAuth: () => {
    const user = selectors.user(store.getState());
    const target = user ? "#/account" : "#/auth";
    if (!target) {
      return false;
    }
    navigateHash(target, { force: true });
    return true;
  },
});
