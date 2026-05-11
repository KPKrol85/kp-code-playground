(() => {
  const cards = Array.from(document.querySelectorAll('.hero-creator-showcase__portfolio-card'));
  const proofText = document.getElementById('hero-creator-showcase-proof-text');
  const proofClient = document.getElementById('hero-creator-showcase-proof-client');
  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const setSelectedCard = (selectedCard) => {
    if (!selectedCard || !cards.length) return;

    cards.forEach((card) => {
      const isSelected = card === selectedCard;
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-pressed', String(isSelected));
    });

    if (proofText) {
      proofText.textContent = selectedCard.dataset.proof || proofText.textContent;
    }

    if (proofClient) {
      proofClient.textContent = selectedCard.dataset.client || proofClient.textContent;
    }
  };

  if (cards.length) {
    cards.forEach((card) => {
      card.addEventListener('click', () => setSelectedCard(card));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelectedCard(card);
        }
      });

      if (finePointer && !reduceMotion) {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const offsetX = event.clientX - rect.left;
          const offsetY = event.clientY - rect.top;
          const rotateY = ((offsetX / rect.width) - 0.5) * 5;
          const rotateX = (0.5 - (offsetY / rect.height)) * 5;
          card.style.transform = `translateY(-2px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        });

        card.addEventListener('pointerleave', () => {
          card.style.transform = '';
        });
      }
    });
  }

  if (revealItems.length && !reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            instance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
