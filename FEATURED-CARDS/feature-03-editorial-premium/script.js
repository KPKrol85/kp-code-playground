(() => {
  const cards = document.querySelectorAll('.fc3ep-card');

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--glow-x', `${x.toFixed(2)}%`);
      card.style.setProperty('--glow-y', `${y.toFixed(2)}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--glow-x', '50%');
      card.style.setProperty('--glow-y', '50%');
    });
  });

  if ('IntersectionObserver' in window) {
    const revealItems = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    cards.forEach((card) => card.classList.add('is-visible'));
  }
})();
