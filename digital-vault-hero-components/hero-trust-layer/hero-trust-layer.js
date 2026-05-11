(() => {
  const root = document.querySelector('.hero-trust-layer');
  if (!root) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const proofData = {
    discover: {
      quote:
        '“Their diagnostic workshop gave our partners clarity in 10 days that we had not reached in 10 months.”',
      meta: 'Managing Partner, Regional Law Group · Governance modernization engagement'
    },
    design: {
      quote:
        '“The roadmap aligned our board, operations, and legal teams around one accountable plan in under three weeks.”',
      meta: 'Chief Operating Officer, Multi-State Advisory Practice · Operating model redesign'
    },
    deliver: {
      quote:
        '“Execution discipline was exceptional. We hit every milestone and restored client confidence before quarter close.”',
      meta: 'CFO, Enterprise Services Group · Transformation implementation program'
    }
  };

  const cards = root.querySelectorAll('.hero-trust-layer-process-card');
  const proofQuote = root.querySelector('#hero-trust-layer-proof-quote');
  const proofMeta = root.querySelector('#hero-trust-layer-proof-meta');

  const selectCard = (card) => {
    if (!card || !proofQuote || !proofMeta) return;
    cards.forEach((item) => {
      const selected = item === card;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    const next = proofData[card.dataset.proofKey];
    if (!next) return;
    proofQuote.textContent = next.quote;
    proofMeta.textContent = next.meta;
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => selectCard(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        selectCard(card);
      }
    });
  });

  const metrics = root.querySelectorAll('[data-count-target]');
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-count-target'));
    const suffix = el.getAttribute('data-count-suffix') || '';
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(target * progress);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const visibleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;

      if (node.hasAttribute('data-count-target')) {
        animateCounter(node);
      } else {
        node.classList.add('is-visible');
      }

      observer.unobserve(node);
    });
  }, { threshold: 0.2 });

  root.querySelectorAll('.hero-trust-layer-reveal').forEach((el) => {
    if (reduceMotion) {
      el.classList.add('is-visible');
      return;
    }
    visibleObserver.observe(el);
  });

  metrics.forEach((metric) => {
    if (reduceMotion) {
      animateCounter(metric);
      return;
    }
    visibleObserver.observe(metric);
  });
})();
