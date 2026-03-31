export const initMenu = () => {
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

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
    menuToggle.setAttribute('aria-expanded', 'false');

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
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');

    document.addEventListener('keydown', trapFocus);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleOutside);

    const firstLink = mobileNav.querySelector('a, button, summary');
    if (firstLink instanceof HTMLElement) {
      firstLink.focus();
    }
  });
};
