(function () {
  'use strict';

  var yearElement = document.getElementById('kp-current-year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  var ctaButtons = document.querySelectorAll('.kp-btn[data-kp-cta]');
  if (!ctaButtons.length) {
    return;
  }

  ctaButtons.forEach(function (button) {
    var baseType = button.getAttribute('data-kp-cta');

    button.addEventListener('click', function () {
      button.setAttribute('data-kp-cta', 'clicked');

      window.setTimeout(function () {
        button.setAttribute('data-kp-cta', baseType || 'primary');
      }, 320);
    });
  });
})();
