(function () {
  const root = document.querySelector('.hero-real-estate-vista');
  if (!root) return;

  const chipGroup = root.querySelector('.hero-real-estate-vista__chip-group');
  const chips = Array.from(root.querySelectorAll('.hero-real-estate-vista__chip'));
  const detailTitle = root.querySelector('[data-detail-title]');
  const detailCopy = root.querySelector('[data-detail-copy]');
  const detailMeta = root.querySelector('[data-detail-meta]');
  const visualMain = root.querySelector('.hero-real-estate-vista__visual-main');
  const visualTitle = root.querySelector('[data-visual-title]');
  const visualCaption = root.querySelector('[data-visual-caption]');

  if (!chipGroup || !chips.length || !detailTitle || !detailCopy || !detailMeta || !visualMain || !visualTitle || !visualCaption) return;

  const details = {
    residence: {
      title: 'Residence Overview',
      copy: 'Dual-orientation glazing frames sunrise-to-sunset water views, while a gallery-style plan keeps social living and private suites intuitively balanced.',
      meta: 'From $4.8M · Ready Q3 2027',
      visualTitle: 'Panoramic Great Room',
      visualCaption: 'Ceiling-height glazing, sculpted limestone hearth, and unobstructed bay frontage.'
    },
    interior: {
      title: 'Interior Finishes',
      copy: 'Hand-selected travertine, smoked oak millwork, and brushed brass hardware create a quiet, textural material story across every level.',
      meta: 'Designer fit-out package included',
      visualTitle: 'Material Studio Palette',
      visualCaption: 'Natural stone islands, soft-integrated lighting, and custom crafted storage walls.'
    },
    amenities: {
      title: 'Amenities',
      copy: 'Private wellness suite, climate-controlled wine gallery, and an indoor-outdoor entertaining deck shaped for year-round hosting.',
      meta: 'Concierge + resident club services available',
      visualTitle: 'Resident Amenity Gallery',
      visualCaption: 'Curated lifestyle spaces for wellness, hosting, and elevated day-to-day rituals.'
    },
    location: {
      title: 'Location Advantage',
      copy: 'Positioned minutes from cultural anchors, marinas, and acclaimed dining, with discreet access routes for effortless city mobility.',
      meta: 'Prime waterfront district · Walk score 92',
      visualTitle: 'District & Waterfront Context',
      visualCaption: 'An address balancing privacy, prestige, and immediate neighborhood access.'
    }
  };

  function setActiveDetail(key) {
    const detail = details[key];
    if (!detail) return;

    chips.forEach((chip) => {
      const active = chip.dataset.detail === key;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });

    detailTitle.textContent = detail.title;
    detailCopy.textContent = detail.copy;
    detailMeta.textContent = detail.meta;
    visualTitle.textContent = detail.visualTitle;
    visualCaption.textContent = detail.visualCaption;
    visualMain.setAttribute('data-visual-state', key);
  }

  chipGroup.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    setActiveDetail(target.dataset.detail || '');
  });

  chipGroup.addEventListener('keydown', (event) => {
    const currentIndex = chips.indexOf(document.activeElement);
    if (currentIndex < 0) return;

    let nextIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % chips.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + chips.length) % chips.length;
    if (nextIndex === -1) return;

    event.preventDefault();
    chips[nextIndex].focus();
    setActiveDetail(chips[nextIndex].dataset.detail || '');
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    root.querySelectorAll('.hero-real-estate-vista__reveal').forEach((el) => observer.observe(el));
  } else {
    root.querySelectorAll('.hero-real-estate-vista__reveal').forEach((el) => el.classList.add('is-visible'));
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    root.addEventListener('pointermove', (event) => {
      const rect = visualMain.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const clampX = Math.max(-0.5, Math.min(0.5, x));
      const clampY = Math.max(-0.5, Math.min(0.5, y));
      visualMain.style.transform = `perspective(900px) rotateX(${(-clampY * 2).toFixed(2)}deg) rotateY(${(clampX * 2).toFixed(2)}deg)`;
    });

    root.addEventListener('pointerleave', () => {
      visualMain.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  }
})();
