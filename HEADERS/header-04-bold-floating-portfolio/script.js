const root = document.documentElement;
root.classList.add('bfp-js');
const header = document.querySelector('[data-header]');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
const navHighlight = document.querySelector('[data-nav-highlight]');
const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const THEME_KEY = 'bfp-theme';

const applyTheme = (theme, persist = false) => {
  root.dataset.theme = theme;

  if (themeToggle) {
    const isLight = theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.title = isLight ? 'Switch to dark theme' : 'Switch to light theme';
  }

  if (persist) {
    window.localStorage.setItem(THEME_KEY, theme);
  }
};

const resolveInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return mediaQuery.matches ? 'light' : 'dark';
};

const syncHighlight = (target) => {
  if (!navHighlight || !target) {
    return;
  }

  const list = target.closest('.bfp-nav__list');
  if (!list) {
    return;
  }

  const targetRect = target.getBoundingClientRect();
  const listRect = list.getBoundingClientRect();
  const offsetX = targetRect.left - listRect.left;

  navHighlight.style.width = `${targetRect.width}px`;
  navHighlight.style.transform = `translate3d(${offsetX}px, 0, 0)`;
  navHighlight.style.opacity = '1';
};

const setActiveLink = (target) => {
  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link === target);
  });

  syncHighlight(target);
};

const closeMobileMenu = () => {
  if (!header || !menuToggle || !mobilePanel) {
    return;
  }

  header.dataset.menuOpen = 'false';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  mobilePanel.hidden = true;
};

const openMobileMenu = () => {
  if (!header || !menuToggle || !mobilePanel) {
    return;
  }

  header.dataset.menuOpen = 'true';
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation menu');
  mobilePanel.hidden = false;
};

const toggleMobileMenu = () => {
  if (!menuToggle) {
    return;
  }

  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
};

const updateScrolledState = () => {
  if (!header) {
    return;
  }

  header.dataset.scrolled = window.scrollY > 18 ? 'true' : 'false';
};

applyTheme(resolveInitialTheme());
updateScrolledState();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  });
}

mediaQuery.addEventListener('change', (event) => {
  const hasStoredTheme = window.localStorage.getItem(THEME_KEY);
  if (!hasStoredTheme) {
    applyTheme(event.matches ? 'light' : 'dark');
  }
});

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMobileMenu);
}

window.addEventListener('resize', () => {
  const activeLink = document.querySelector('.bfp-nav__link.is-active');
  if (activeLink) {
    syncHighlight(activeLink);
  }

  if (window.innerWidth > 820) {
    closeMobileMenu();
  }
});

window.addEventListener(
  'scroll',
  () => {
    updateScrolledState();
  },
  { passive: true }
);

navLinks.forEach((link) => {
  link.addEventListener('pointerenter', () => syncHighlight(link));
  link.addEventListener('focus', () => syncHighlight(link));
  link.addEventListener('click', () => setActiveLink(link));
});

const navList = document.querySelector('.bfp-nav__list');
if (navList) {
  navList.addEventListener('pointerleave', () => {
    const activeLink = document.querySelector('.bfp-nav__link.is-active');
    if (activeLink) {
      syncHighlight(activeLink);
    }
  });
}

Array.from(document.querySelectorAll('.bfp-mobile-panel a')).forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    const activeLink = document.querySelector('.bfp-nav__link.is-active');
    if (activeLink) {
      syncHighlight(activeLink);
    }
  }
});

window.addEventListener('load', () => {
  const activeLink = document.querySelector('.bfp-nav__link.is-active') || navLinks[0];

  if (activeLink) {
    if (motionQuery.matches) {
      navHighlight?.style.setProperty('transition', 'none');
    }

    syncHighlight(activeLink);
  }
});
