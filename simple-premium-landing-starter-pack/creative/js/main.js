(() => {
  const toggle = document.querySelector('.topbar__toggle');
  const menu = document.querySelector('#creative-menu');
  const links = menu ? menu.querySelectorAll('a[href^="#"]') : [];

  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 47.99rem)').matches) closeMenu();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) closeMenu();
  });
})();
