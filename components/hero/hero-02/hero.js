(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  var hero = document.querySelector('.hero-02');
  if (!hero) {
    return;
  }

  var floatCards = hero.querySelectorAll('[data-hero-02-float]');
  if (!floatCards.length) {
    return;
  }

  var onPointerMove = function (event) {
    var bounds = hero.getBoundingClientRect();
    var x = (event.clientX - bounds.left) / bounds.width;
    var y = (event.clientY - bounds.top) / bounds.height;

    floatCards.forEach(function (card, index) {
      var intensity = index === 0 ? 8 : 12;
      var xShift = (x - 0.5) * intensity;
      var yShift = (y - 0.5) * intensity;
      card.style.transform = 'translate3d(' + xShift.toFixed(2) + 'px, ' + yShift.toFixed(2) + 'px, 0)';
    });
  };

  var resetTransform = function () {
    floatCards.forEach(function (card) {
      card.style.transform = 'translate3d(0, 0, 0)';
    });
  };

  hero.addEventListener('pointermove', onPointerMove);
  hero.addEventListener('pointerleave', resetTransform);
})();
