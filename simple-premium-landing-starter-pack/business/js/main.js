(() => {
  const toggle = document.querySelector('.header__toggle');
  const menu = document.querySelector('#menu-business');
  const links = menu ? menu.querySelectorAll('a[href^="#"]') : [];

  if (!toggle || !menu) return;

  const setState = (expanded) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    menu.classList.toggle('is-open', expanded);
  };

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    setState(!expanded);
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 47.99rem)').matches) setState(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setState(false);
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) setState(false);
  });
})();
