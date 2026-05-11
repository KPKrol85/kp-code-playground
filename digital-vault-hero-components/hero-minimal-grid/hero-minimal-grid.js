(function () {
  const page = document.querySelector('.hero-minimal-grid-page');
  if (!page) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cells = Array.from(document.querySelectorAll('.hero-minimal-grid-cell'));
  const proofTitle = document.getElementById('hero-minimal-grid-proof-title');
  const proofText = document.getElementById('hero-minimal-grid-proof-text');
  const proofMetric = document.getElementById('hero-minimal-grid-proof-metric');

  const setActiveCell = (cell) => {
    if (!cell || !proofTitle || !proofText || !proofMetric) return;
    cells.forEach((item) => {
      const active = item === cell;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    proofTitle.textContent = cell.dataset.cell || 'Selected item';
    proofText.textContent = cell.dataset.statement || '';
    proofMetric.textContent = cell.dataset.metric || '';
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', () => setActiveCell(cell));
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActiveCell(cell);
      }
    });
  });

  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!reduceMotion && reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  const gridWrap = document.querySelector('[data-grid-wrap]');
  if (!reduceMotion && gridWrap && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    gridWrap.addEventListener('pointermove', (event) => {
      const rect = gridWrap.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      gridWrap.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(51, 92, 103, 0.09), transparent 38%), var(--hero-minimal-grid-surface)`;
    });
    gridWrap.addEventListener('pointerleave', () => {
      gridWrap.style.background = 'var(--hero-minimal-grid-surface)';
    });
  }
})();
