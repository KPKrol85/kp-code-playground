(() => {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-header]');
  const progressBar = document.querySelector('[data-scroll-progress]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobilePanel = document.getElementById('mobile-navigation');
  const menuCloseControls = document.querySelectorAll('[data-menu-close]');
  const desktopLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const mobileLinks = Array.from(document.querySelectorAll('[data-mobile-link]'));
  const allNavLinks = [...desktopLinks, ...mobileLinks];
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const themeStorageKey = 'kp-clean-tech-theme';

  if (!header) {
    return;
  }

  let isMenuOpen = false;
  let lastScrollY = window.scrollY;

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme;

    if (themeToggle) {
      const pressed = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', String(pressed));
      themeToggle.setAttribute('aria-label', pressed ? 'Switch to light theme' : 'Switch to dark theme');
      themeToggle.setAttribute('title', pressed ? 'Switch to light theme' : 'Switch to dark theme');
    }

    if (persist) {
      window.localStorage.setItem(themeStorageKey, theme);
    }
  };

  const resolveInitialTheme = () => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    return darkThemeQuery.matches ? 'dark' : 'light';
  };

  const setCurrentLink = (id) => {
    allNavLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-current', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateProgress = () => {
    if (!progressBar) {
      return;
    }

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };

  const updateHeaderState = () => {
    const currentScrollY = window.scrollY;
    header.classList.toggle('is-scrolled', currentScrollY > 8);

    if (reduceMotion.matches || isMenuOpen) {
      header.classList.remove('is-hidden');
      lastScrollY = currentScrollY;
      return;
    }

    const delta = currentScrollY - lastScrollY;
    const scrollingDown = delta > 6;
    const scrollingUp = delta < -4;

    if (currentScrollY < 24 || scrollingUp) {
      header.classList.remove('is-hidden');
    } else if (scrollingDown && currentScrollY > header.offsetHeight + 24) {
      header.classList.add('is-hidden');
    }

    lastScrollY = currentScrollY;
  };

  const openMenu = () => {
    if (!menuToggle || !mobilePanel) {
      return;
    }

    isMenuOpen = true;
    body.dataset.menuOpen = 'true';
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    mobilePanel.setAttribute('aria-hidden', 'false');
    header.classList.remove('is-hidden');

    const firstLink = mobilePanel.querySelector('a, button');
    if (firstLink) {
      window.requestAnimationFrame(() => firstLink.focus());
    }
  };

  const closeMenu = (restoreFocus = true) => {
    if (!menuToggle || !mobilePanel) {
      return;
    }

    isMenuOpen = false;
    delete body.dataset.menuOpen;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobilePanel.setAttribute('aria-hidden', 'true');

    if (restoreFocus) {
      menuToggle.focus();
    }
  };

  setTheme(resolveInitialTheme(), false);
  setCurrentLink('overview');
  updateProgress();
  updateHeaderState();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
    });
  }

  darkThemeQuery.addEventListener('change', (event) => {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return;
    }
    setTheme(event.matches ? 'dark' : 'light', false);
  });

  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menuCloseControls.forEach((control) => {
      control.addEventListener('click', () => closeMenu(false));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!isMenuOpen) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const clickInsidePanel = mobilePanel.contains(target);
      const clickOnToggle = menuToggle.contains(target);

      if (!clickInsidePanel && !clickOnToggle) {
        closeMenu(false);
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        setCurrentLink(visibleEntry.target.id);
      }
    },
    {
      rootMargin: '-35% 0px -50% 0px',
      threshold: [0.2, 0.45, 0.7]
    }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener(
    'scroll',
    () => {
      updateProgress();
      updateHeaderState();
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && isMenuOpen) {
      closeMenu(false);
    }
    updateProgress();
    updateHeaderState();
  });
})();
