(() => {
  const root = document.querySelector('.hero-product-matrix');
  if (!root) return;

  const chips = Array.from(root.querySelectorAll('.hero-product-matrix__chip'));
  const cells = Array.from(root.querySelectorAll('.hero-product-matrix__cell'));
  const filterStatus = root.querySelector('#matrix-filter-status');
  const featuredTag = root.querySelector('#featured-tag');
  const featuredTitle = root.querySelector('#featured-title');
  const featuredDesc = root.querySelector('#featured-desc');
  const featuredMetric = root.querySelector('#featured-metric');
  const featuredPrice = root.querySelector('#featured-price');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!chips.length || !cells.length) return;

  const setFeatured = (cell) => {
    if (!cell || !featuredTitle || !featuredDesc || !featuredTag || !featuredMetric || !featuredPrice) return;
    featuredTitle.textContent = cell.dataset.title || 'Featured Product';
    featuredDesc.textContent = cell.dataset.desc || 'Product details unavailable.';
    featuredTag.textContent = cell.dataset.tag || 'Category';
    featuredMetric.textContent = cell.dataset.metric || 'Metric';
    featuredPrice.textContent = cell.dataset.price || '$0';
  };

  const activateCell = (cell) => {
    cells.forEach((item) => item.classList.remove('is-active'));
    cell.classList.add('is-active');
    setFeatured(cell);
  };

  const filterByCategory = (category) => {
    const visible = cells.filter((cell) => {
      const show = category === 'all' || cell.dataset.category === category;
      cell.hidden = !show;
      return show;
    });

    if (filterStatus) {
      filterStatus.textContent =
        category === 'all'
          ? 'Showing all categories.'
          : `Showing ${category} products (${visible.length} results).`;
    }

    if (visible.length) {
      activateCell(visible[0]);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      filterByCategory(chip.dataset.category || 'all');
    });

    chip.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const currentIndex = chips.indexOf(chip);
      const nextIndex =
        event.key === 'ArrowRight'
          ? (currentIndex + 1) % chips.length
          : (currentIndex - 1 + chips.length) % chips.length;
      chips[nextIndex].focus();
    });
  });

  cells.forEach((cell) => {
    cell.addEventListener('click', () => activateCell(cell));
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateCell(cell);
      }
    });
  });

  const revealItems = root.querySelectorAll('.hero-product-matrix__reveal');
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const grid = root.querySelector('[data-grid-glow]');
  if (grid && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    grid.addEventListener('pointermove', (event) => {
      const rect = grid.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      grid.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(72,214,255,.22), rgba(12,19,37,.2) 45%), transparent`;
    });
    grid.addEventListener('pointerleave', () => {
      grid.style.background = 'transparent';
    });
  }

  filterByCategory('all');
})();
