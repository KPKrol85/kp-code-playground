(() => {
  const storageKey = 'header-editorial-line-theme';
  const desktopQuery = window.matchMedia('(min-width: 56.25rem)');

  const root = document.documentElement;
  const header = document.querySelector('[data-editorial-header]');
  const menu = document.querySelector('[data-mobile-menu]');
  const menuPanel = document.querySelector('.editorial-menu__panel');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuLinks = menu ? [...menu.querySelectorAll('.editorial-menu__link')] : [];

  if (!menu || !menuToggle || !themeToggle || !menuPanel || !overlay) {
    return;
  }

  const setMenuLinksFocusable = (focusable) => {
    menuLinks.forEach((link) => {
      link.tabIndex = focusable ? 0 : -1;
    });
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle.textContent = isDark ? 'Read: Dark' : 'Read: Light';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light reading mode' : 'Switch to dark reading mode');
  };

  const initialTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const closeMenu = ({ focusTrigger = false } = {}) => {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    setMenuLinksFocusable(false);
    if (focusTrigger) menuToggle.focus();
  };

  const openMenu = () => {
    menu.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    setMenuLinksFocusable(true);
  };

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
  });

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu({ focusTrigger: true });
    }
  });

  overlay.addEventListener('click', () => closeMenu());

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('click', (event) => {
    if (menu.hidden) return;
    const clickInside = menuPanel.contains(event.target) || menuToggle.contains(event.target);
    if (!clickInside) closeMenu();
  });

  const onDesktopChange = (event) => {
    if (event.matches) closeMenu();
  };

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', onDesktopChange);
  } else {
    desktopQuery.addListener(onDesktopChange);
  }

  let ticking = false;
  const updateScrollState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };

  document.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    },
    { passive: true }
  );

  applyTheme(initialTheme());
  closeMenu();
})();
