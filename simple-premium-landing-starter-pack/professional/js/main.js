(() => {
  const toggle = document.querySelector('.p-header__toggle');
  const menu = document.querySelector('#professional-menu');
  const links = menu ? menu.querySelectorAll('a[href^="#"]') : [];

  if (!toggle || !menu) return;

  const setExpanded = (state) => {
    toggle.setAttribute('aria-expanded', String(state));
    menu.classList.toggle('is-open', state);
  };

  toggle.addEventListener('click', () => {
    setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 47.99rem)').matches) setExpanded(false);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setExpanded(false);
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 48rem)').matches) setExpanded(false);
  });
})();
