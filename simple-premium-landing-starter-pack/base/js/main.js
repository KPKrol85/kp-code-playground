(() => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#primary-menu');
  const navLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 47.99rem)').matches) closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
