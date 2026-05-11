(function () {
  const root = document.querySelector('.hero-commerce-spotlight-page');
  if (!root) return;

  const variants = Array.from(document.querySelectorAll('.hero-commerce-spotlight__variant'));
  const labelEl = document.getElementById('variant-label');
  const priceEl = document.getElementById('variant-price');
  const metaEl = document.getElementById('variant-meta');
  const revealEls = document.querySelectorAll('.hero-commerce-spotlight__reveal');
  const previewShell = document.getElementById('product-preview-shell');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function selectVariant(button) {
    variants.forEach((variantBtn) => {
      const selected = variantBtn === button;
      variantBtn.classList.toggle('is-selected', selected);
      variantBtn.setAttribute('aria-pressed', String(selected));
    });

    labelEl.textContent = button.dataset.label || '';
    priceEl.textContent = button.dataset.price || '';
    metaEl.textContent = button.dataset.meta || '';
  }

  variants.forEach((button, index) => {
    button.addEventListener('click', () => selectVariant(button));
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const nextIndex = event.key === 'ArrowRight'
        ? (index + 1) % variants.length
        : (index - 1 + variants.length) % variants.length;
      variants[nextIndex].focus();
      selectVariant(variants[nextIndex]);
    });
  });

  if (!prefersReduced) {
    requestAnimationFrame(() => revealEls.forEach((el) => el.classList.add('is-visible')));

    if (previewShell) {
      previewShell.addEventListener('pointermove', (event) => {
        const rect = previewShell.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        previewShell.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
      });
      previewShell.addEventListener('pointerleave', () => {
        previewShell.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    }
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
