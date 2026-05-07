document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'kp_code_handoff_checklist_v1';
  var checkboxes = Array.prototype.slice.call(
    document.querySelectorAll('input[type="checkbox"][data-check-item]')
  );

  var printButton = document.querySelector('[data-action="print"]');
  var resetButton = document.querySelector('[data-action="reset"]');

  function loadState() {
    if (!checkboxes.length) {
      return;
    }

    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      var saved = JSON.parse(raw);
      checkboxes.forEach(function (checkbox) {
        var itemId = checkbox.getAttribute('data-check-item');
        checkbox.checked = Boolean(saved[itemId]);
      });
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function saveState() {
    if (!checkboxes.length) {
      return;
    }

    var nextState = {};
    checkboxes.forEach(function (checkbox) {
      var itemId = checkbox.getAttribute('data-check-item');
      if (itemId) {
        nextState[itemId] = checkbox.checked;
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }

  function resetState() {
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });
    localStorage.removeItem(STORAGE_KEY);
  }

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', saveState);
  });

  if (printButton) {
    printButton.addEventListener('click', function () {
      window.print();
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', resetState);
  }

  loadState();
});
