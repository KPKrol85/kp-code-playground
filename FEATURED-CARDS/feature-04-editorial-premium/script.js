(() => {
  const stats = document.querySelectorAll('.fc-editorial-premium [data-counter]');

  if (!stats.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const formatValue = (value, decimals, prefix, suffix) => {
    const safe = Number(value).toFixed(decimals);
    return `${prefix}${safe}${suffix}`;
  };

  const animateStat = (node) => {
    if (node.dataset.animated === 'true') return;

    const target = Number(node.dataset.target);
    if (Number.isNaN(target)) return;

    const prefix = node.dataset.prefix || '';
    const suffix = node.dataset.suffix || '';
    const decimals = (node.dataset.target.split('.')[1] || '').length;

    if (prefersReducedMotion) {
      node.textContent = formatValue(target, decimals, prefix, suffix);
      node.dataset.animated = 'true';
      return;
    }

    const duration = 900;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      node.textContent = formatValue(current, decimals, prefix, suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        node.dataset.animated = 'true';
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateStat(entry.target);
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  stats.forEach((stat) => observer.observe(stat));
})();
