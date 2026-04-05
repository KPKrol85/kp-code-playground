export const initMenu = () => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const menuToggleText = menuToggle?.querySelector('.nav__toggle-text');
  const desktopMq = window.matchMedia('(min-width: 1024px)');

  let lastKnownScroll = 0;
  let ticking = false;
  let lastFocusedElement = null;

  const onScroll = () => {
    lastKnownScroll = window.scrollY;

    if (ticking) return;

    window.requestAnimationFrame(() => {
      if (header) {
        header.classList.toggle('header--shrink', lastKnownScroll > 10);
      }
      ticking = false;
    });

    ticking = true;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  if (!menuToggle || !mobileNav) return;

  const trapFocus = (event) => {
    const focusable = Array.from(mobileNav.querySelectorAll('a, button, summary'));
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.key !== 'Tab') return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  const handleOutside = (event) => {
    if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  };

  const closeMenu = () => {
    mobileNav.classList.remove('mobile-nav--open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Otwórz menu nawigacji');
    menuToggle.setAttribute('data-menu-state', 'closed');
    if (menuToggleText) {
      menuToggleText.textContent = 'Menu';
    }

    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', trapFocus);
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('click', handleOutside);

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';

    if (expanded) {
      closeMenu();
      return;
    }

    lastFocusedElement = document.activeElement;
    mobileNav.classList.add('mobile-nav--open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Zamknij menu nawigacji');
    menuToggle.setAttribute('data-menu-state', 'open');
    if (menuToggleText) {
      menuToggleText.textContent = 'Zamknij';
    }
    document.body.classList.add('no-scroll');

    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutside);

    const firstLink = mobileNav.querySelector('a, button, summary');
    if (firstLink instanceof HTMLElement) {
      firstLink.focus();
    }
  });

  mobileNav.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('data-menu-state', 'closed');

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  desktopMq.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
};
