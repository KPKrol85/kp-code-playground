(function () {
  const links = Array.from(document.querySelectorAll('.showcase-nav__link'));
  const sections = Array.from(document.querySelectorAll('.variant-card[id]'));
  const copyButtons = Array.from(document.querySelectorAll('.copy-anchor'));

  if (links.length && sections.length && 'IntersectionObserver' in window) {
    const linkById = new Map(links.map((link) => [link.getAttribute('href').slice(1), link]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const active = linkById.get(entry.target.id);
          if (!active) return;
          links.forEach((l) => l.classList.remove('is-active'));
          active.classList.add('is-active');
        });
      },
      { threshold: 0.45, rootMargin: '-80px 0px -40% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('.copy-anchor');
    if (!trigger) return;

    const value = trigger.dataset.copy;
    if (!value) return;

    if (!navigator.clipboard) {
      trigger.textContent = 'Clipboard unavailable';
      return;
    }

    navigator.clipboard
      .writeText(value)
      .then(() => {
        const previous = trigger.textContent;
        trigger.textContent = 'Copied!';
        setTimeout(() => {
          trigger.textContent = previous;
        }, 1200);
      })
      .catch(() => {
        trigger.textContent = 'Copy failed';
      });
  });
})();
