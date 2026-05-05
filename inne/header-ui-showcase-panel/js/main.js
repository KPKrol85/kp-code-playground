(function () {
  const nav = document.querySelector('.showcase-nav');
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#variant-"]')) : [];
  const sections = Array.from(document.querySelectorAll('.variant[id]'));
  const toggles = Array.from(document.querySelectorAll('[data-menu-toggle]'));

  document.documentElement.style.scrollBehavior = 'smooth';

  const closeAllMenus = () => {
    toggles.forEach((button) => {
      const id = button.getAttribute('aria-controls');
      const menu = id ? document.getElementById(id) : null;
      if (!menu) return;
      button.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  };

  toggles.forEach((button) => {
    const id = button.getAttribute('aria-controls');
    const menu = id ? document.getElementById(id) : null;
    if (!menu) return;
    menu.dataset.collapsible = 'true';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const expanded = button.getAttribute('aria-expanded') === 'true';
      closeAllMenus();
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-open');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllMenus();
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-menu]') || target.closest('[data-menu-toggle]')) return;
    closeAllMenus();
  });

  if ('IntersectionObserver' in window && navLinks.length && sections.length) {
    const map = new Map(navLinks.map((link) => [link.getAttribute('href')?.slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove('is-active'));
        const active = map.get(entry.target.id);
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 });

    sections.forEach((section) => observer.observe(section));
  }

  document.addEventListener('click', async (event) => {
    const trigger = event.target;
    if (!(trigger instanceof Element)) return;
    const copyBtn = trigger.closest('.copy-anchor');
    if (!copyBtn) return;
    const section = copyBtn.closest('.variant');
    if (!section || !section.id) return;
    const text = `#${section.id}`;

    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Anchor copied';
    } catch (error) {
      copyBtn.textContent = text;
    }

    window.setTimeout(() => {
      copyBtn.textContent = 'Copy section anchor';
    }, 1200);
  });
})();
