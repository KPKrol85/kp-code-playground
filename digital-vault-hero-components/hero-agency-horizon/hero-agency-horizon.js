(() => {
  const cards = Array.from(document.querySelectorAll('[data-service-card]'));
  const proofEl = document.querySelector('[data-proof-rotator]');
  const revealItems = Array.from(document.querySelectorAll('[data-reveal], .hero-agency-horizon__service-card'));
  const hero = document.querySelector('.hero-agency-horizon');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cards.length) {
    const activateCard = (card) => {
      cards.forEach((item) => {
        const active = item === card;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    };

    cards.forEach((card) => {
      card.addEventListener('click', () => activateCard(card));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateCard(card);
        }
      });
    });
  }

  if (proofEl) {
    const messages = [
      'Trusted by advisory firms, elite consultancies, and boutique venture teams.',
      'Average launch cycle reduced by 31% after strategic repositioning engagements.',
      'Recent clients reported stronger inbound quality within 90 days of relaunch.'
    ];
    let i = 0;
    if (!reduced) {
      setInterval(() => {
        i = (i + 1) % messages.length;
        proofEl.textContent = messages[i];
      }, 3200);
    }
  }

  if (revealItems.length && 'IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach((item) => io.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  if (hero && !reduced) {
    hero.addEventListener('pointermove', (event) => {
      const r = hero.getBoundingClientRect();
      const x = ((event.clientX - r.left) / r.width) * 100;
      const y = ((event.clientY - r.top) / r.height) * 100;
      hero.style.setProperty('--x', `${x}%`);
      hero.style.setProperty('--y', `${y}%`);
    });
  }
})();
