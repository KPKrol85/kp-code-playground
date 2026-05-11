(function () {
  const dishButtons = Array.from(document.querySelectorAll('.hero-restaurant-atelier-dish-btn'));
  const dishName = document.querySelector('[data-dish-name]');
  const dishDescription = document.querySelector('[data-dish-description]');
  const dishPrice = document.querySelector('[data-dish-price]');
  const dishTag = document.querySelector('[data-dish-tag]');

  const dishes = {
    'ember-salmon': {
      name: 'Ember Salmon',
      description: 'Oak-charred king salmon, smoked fennel cream, confit citrus, and herb oil.',
      price: '$38',
      tag: 'Chef Signature'
    },
    'garden-risotto': {
      name: 'Garden Risotto',
      description: 'Carnaroli rice, roasted spring vegetables, cultured mascarpone, basil ash.',
      price: '$31',
      tag: 'Vegetarian Favorite'
    },
    'citrus-tart': {
      name: 'Citrus Tart',
      description: 'Caramelized lemon custard, almond sable, toasted meringue, orange blossom.',
      price: '$16',
      tag: 'Pastry Atelier'
    }
  };

  const canUpdateDish = dishButtons.length && dishName && dishDescription && dishPrice && dishTag;

  function updateDish(key) {
    if (!canUpdateDish || !dishes[key]) return;
    const next = dishes[key];
    dishName.textContent = next.name;
    dishDescription.textContent = next.description;
    dishPrice.textContent = next.price;
    dishTag.textContent = next.tag;
  }

  if (canUpdateDish) {
    dishButtons.forEach((button) => {
      button.addEventListener('click', () => {
        dishButtons.forEach((item) => {
          item.setAttribute('aria-pressed', String(item === button));
        });
        updateDish(button.dataset.dish);
      });

      button.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const currentIndex = dishButtons.indexOf(button);
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const targetIndex = (currentIndex + direction + dishButtons.length) % dishButtons.length;
        dishButtons[targetIndex].focus();
        dishButtons[targetIndex].click();
      });
    });
  }

  const revealItems = document.querySelectorAll('.hero-restaurant-atelier-reveal');
  if (revealItems.length) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealItems.forEach((el) => el.classList.add('is-visible'));
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.2 });
      revealItems.forEach((el) => observer.observe(el));
    } else {
      revealItems.forEach((el) => el.classList.add('is-visible'));
    }
  }

  document.querySelectorAll('.hero-restaurant-atelier__menu-item, .hero-restaurant-atelier__dish-card').forEach((card) => {
    card.addEventListener('mouseenter', () => card.classList.add('is-elevated'));
    card.addEventListener('mouseleave', () => card.classList.remove('is-elevated'));
    card.addEventListener('focusin', () => card.classList.add('is-elevated'));
    card.addEventListener('focusout', () => card.classList.remove('is-elevated'));
  });
})();
