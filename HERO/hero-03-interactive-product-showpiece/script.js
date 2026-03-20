(() => {
  const stage = document.querySelector('[data-stage]');
  const product = document.querySelector('[data-product]');
  const hotspotButtons = Array.from(document.querySelectorAll('[data-hotspot]'));
  const variantInputs = Array.from(document.querySelectorAll('[data-variant]'));
  const detailTitle = document.querySelector('[data-detail-title]');
  const detailBody = document.querySelector('[data-detail-body]');
  const detailMeta = document.querySelector('[data-detail-meta]');
  const variantLabel = document.querySelector('[data-variant-label]');

  if (!stage || !product || !detailTitle || !detailBody || !detailMeta || !variantLabel) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hotspotContent = {
    array: {
      title: 'Adaptive acoustic array',
      body:
        'A stepped coaxial driver stack balances presence and warmth, then refines the output in real time based on placement and listening distance.',
      meta: [
        'Beam-shaped tweeter guide for low-room smear.',
        'Pressure-balanced housing tuned for desktop listening.',
      ],
    },
    dial: {
      title: 'Haptic crown control',
      body:
        'A micro-serrated aluminum dial gives volume and playback control a deliberate mechanical feel, with silent detents and precise tactile feedback.',
      meta: [
        'Capacitive ring wakes softly on approach.',
        'Native click, press-and-hold, and fine increment control.',
      ],
    },
    dock: {
      title: 'Magnetic fast-charge dock',
      body:
        'The low-profile dock anchors the speaker visually while delivering a guided magnetic recharge that restores hours of playback during short breaks.',
      meta: [
        'Machined contact rails reduce wear over repeated cycles.',
        'Weighted base improves stability on stone, wood, or glass surfaces.',
      ],
    },
  };

  const variantContent = {
    graphite: {
      label: 'Graphite Alloy selected · matte ceramic blast aluminum and charcoal woven mesh.',
      className: 'is-graphite',
    },
    champagne: {
      label: 'Champagne Ceramic selected · warm satin shell with pearl mesh and bronze-toned highlights.',
      className: 'is-champagne',
    },
    ice: {
      label: 'Ice Titanium selected · pale technical metal with high-contrast luminous detailing.',
      className: 'is-ice',
    },
  };

  const setHotspot = (key) => {
    const content = hotspotContent[key];

    if (!content) {
      return;
    }

    detailTitle.textContent = content.title;
    detailBody.textContent = content.body;
    detailMeta.innerHTML = '';

    content.meta.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      detailMeta.appendChild(li);
    });

    hotspotButtons.forEach((button) => {
      const isActive = button.dataset.hotspotKey === key;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const setVariant = (value) => {
    const variant = variantContent[value];

    if (!variant) {
      return;
    }

    stage.classList.remove('is-graphite', 'is-champagne', 'is-ice');
    product.classList.remove('is-graphite', 'is-champagne', 'is-ice');
    stage.classList.add(variant.className);
    product.classList.add(variant.className);
    variantLabel.textContent = variant.label;
  };

  const resetTilt = () => {
    stage.style.transform = '';
    product.style.transform = '';
    stage.style.boxShadow = '';
    stage.style.background = '';
  };

  const applyTilt = (clientX, clientY) => {
    if (prefersReducedMotion) {
      return;
    }

    const bounds = stage.getBoundingClientRect();
    const x = (clientX - bounds.left) / bounds.width;
    const y = (clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;
    const glowX = 30 + x * 40;
    const glowY = 20 + y * 35;

    stage.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    product.style.transform = `translateZ(18px) rotateX(${rotateX * 0.35}deg) rotateY(${rotateY * 0.45}deg)`;
    stage.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.12), 0 40px 120px rgba(0, 0, 0, 0.5), 0 0 80px rgba(110, 145, 255, 0.08)`;
    stage.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(148, 174, 255, 0.11), transparent 24%), linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)), linear-gradient(180deg, rgba(7, 11, 18, 0.94), rgba(10, 15, 25, 0.98))`;
  };

  hotspotButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setHotspot(button.dataset.hotspotKey);
    });
  });

  variantInputs.forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked) {
        setVariant(input.value);
      }
    });
  });

  stage.addEventListener('pointermove', (event) => {
    applyTilt(event.clientX, event.clientY);
  });

  stage.addEventListener('pointerleave', resetTilt);
  stage.addEventListener('blur', resetTilt);

  stage.addEventListener('focus', () => {
    if (!prefersReducedMotion) {
      const bounds = stage.getBoundingClientRect();
      applyTilt(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2.8);
    }
  });

  stage.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      return;
    }

    event.preventDefault();

    const keyToHotspot = {
      ArrowUp: 'array',
      ArrowRight: 'dial',
      ArrowDown: 'dock',
      ArrowLeft: 'array',
    };

    setHotspot(keyToHotspot[event.key]);
  });

  const selectedVariant = variantInputs.find((input) => input.checked)?.value || 'graphite';
  setVariant(selectedVariant);
  setHotspot('array');
})();
