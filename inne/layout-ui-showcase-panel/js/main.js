(() => {
  const nav = document.querySelector('.showcase-nav__scroll');
  const links = nav ? Array.from(nav.querySelectorAll('a[href^="#layout-"]')) : [];
  const variants = Array.from(document.querySelectorAll('[data-variant]'));
  const copyButtons = Array.from(document.querySelectorAll('[data-copy-anchor]'));
  const densityToggle = document.querySelector('[data-density-toggle]');
  const showcase = document.querySelector('.showcase');

  if (links.length && variants.length && 'IntersectionObserver' in window) {
    const indexById = new Map(links.map((link, i) => [link.getAttribute('href').slice(1), i]));
    let activeId = '';

    const setActive = (id) => {
      if (!id || activeId === id) return;
      activeId = id;
      links.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', isMatch);
        if (isMatch) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      const activeLink = links[indexById.get(id)];
      activeLink?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.45, rootMargin: '-10% 0px -45% 0px' });

    variants.forEach((section) => observer.observe(section));
  }

  if (copyButtons.length) {
    document.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy-anchor]');
      if (!button) return;
      const anchor = button.getAttribute('data-copy-anchor') || '';
      const fullURL = `${window.location.origin}${window.location.pathname}${anchor}`;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(fullURL);
          button.textContent = 'Copied';
          setTimeout(() => { button.textContent = 'Copy anchor'; }, 1200);
        }
      } catch (_) {
        button.textContent = 'Copy unavailable';
      }
    });
  }

  if (densityToggle && showcase) {
    densityToggle.addEventListener('click', () => {
      const compact = showcase.classList.toggle('showcase--compact');
      densityToggle.setAttribute('aria-pressed', String(compact));
      densityToggle.textContent = compact ? 'Switch to Comfortable Density' : 'Switch to Compact Density';
    });
  }
})();
