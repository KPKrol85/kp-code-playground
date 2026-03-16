(() => {
  const header = document.querySelector('[data-header-03]');

  if (!header) {
    return;
  }

  const root = document.documentElement;
  const menuToggle = header.querySelector('[data-header-03-menu-toggle]');
  const mobileNav = header.querySelector('[data-header-03-mobile-nav]');
  const themeToggle = header.querySelector('[data-header-03-theme-toggle]');
  const themeLabel = header.querySelector('[data-header-03-theme-label]');
  const desktopMedia = window.matchMedia('(min-width: 900px)');

  const setTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    if (themeLabel) {
      themeLabel.textContent = isDark ? 'Dark' : 'Light';
    }

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    window.localStorage.setItem('header-03-theme', theme);
  };

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) {
      return;
    }

    header.classList.remove('header-03--menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileNav.hidden = true;
  };

  const openMenu = () => {
    if (!menuToggle || !mobileNav) {
      return;
    }

    header.classList.add('header-03--menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    mobileNav.hidden = false;
  };

  const toggleMenu = () => {
    const isExpanded = menuToggle?.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
      return;
    }
    openMenu();
  };

  const handleThemeInit = () => {
    const savedTheme = window.localStorage.getItem('header-03-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', toggleMenu);

    header.addEventListener('click', (event) => {
      if (!header.classList.contains('header-03--menu-open')) {
        return;
      }

      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest('.header-03__mobile-link')) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('header-03--menu-open')) {
        return;
      }

      if (event.target instanceof Node && !header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        menuToggle.focus();
      }
    });

    const handleDesktopChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    if (typeof desktopMedia.addEventListener === 'function') {
      desktopMedia.addEventListener('change', handleDesktopChange);
    } else {
      desktopMedia.addListener(handleDesktopChange);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('header-03--scrolled', window.scrollY > 12);
  });

  handleThemeInit();
})();
