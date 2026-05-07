document.addEventListener('DOMContentLoaded', () => {
  const checkboxNodes = document.querySelectorAll('input[type="checkbox"][data-check]');
  const decisionButtons = document.querySelectorAll('.decision__option[data-decision]');
  const decisionBadge = document.getElementById('decision-badge');
  const decisionSummary = document.getElementById('sum-decision');
  const sumTotal = document.getElementById('sum-total');
  const sumCompleted = document.getElementById('sum-completed');
  const sumRemaining = document.getElementById('sum-remaining');
  const sumProgress = document.getElementById('sum-progress');
  const resetChecklistBtn = document.getElementById('reset-checklist-btn');
  const resetDecisionBtn = document.getElementById('reset-decision-btn');
  const printBtn = document.getElementById('print-btn');

  const checkKeyPrefix = 'kp_dv_qa_check_';
  const decisionKey = 'kp_dv_qa_decision';

  const updateSummary = () => {
    const total = checkboxNodes.length;
    const completed = Array.from(checkboxNodes).filter((box) => box.checked).length;
    const remaining = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (sumTotal) sumTotal.textContent = String(total);
    if (sumCompleted) sumCompleted.textContent = String(completed);
    if (sumRemaining) sumRemaining.textContent = String(remaining);
    if (sumProgress) sumProgress.textContent = `${progress}%`;
  };

  const updateDecisionViews = (decisionText) => {
    const label = decisionText || 'Brak wyboru';
    if (decisionBadge) {
      decisionBadge.textContent = `Decyzja: ${label}`;
      decisionBadge.classList.toggle('is-approved', label === 'Zatwierdzone do publikacji');
    }
    if (decisionSummary) decisionSummary.textContent = label;
  };

  const setDecision = (decisionText) => {
    localStorage.setItem(decisionKey, decisionText);
    decisionButtons.forEach((btn) => {
      btn.classList.toggle('is-selected', btn.dataset.decision === decisionText);
      btn.setAttribute('aria-pressed', btn.dataset.decision === decisionText ? 'true' : 'false');
    });
    updateDecisionViews(decisionText);
  };

  checkboxNodes.forEach((box) => {
    const key = `${checkKeyPrefix}${box.dataset.check}`;
    const savedValue = localStorage.getItem(key);
    if (savedValue === 'true') box.checked = true;

    box.addEventListener('change', () => {
      localStorage.setItem(key, box.checked ? 'true' : 'false');
      updateSummary();
    });
  });

  decisionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const decisionText = btn.dataset.decision;
      if (!decisionText) return;
      setDecision(decisionText);
    });
  });

  if (resetChecklistBtn) {
    resetChecklistBtn.addEventListener('click', () => {
      checkboxNodes.forEach((box) => {
        box.checked = false;
        localStorage.removeItem(`${checkKeyPrefix}${box.dataset.check}`);
      });
      updateSummary();
    });
  }

  if (resetDecisionBtn) {
    resetDecisionBtn.addEventListener('click', () => {
      localStorage.removeItem(decisionKey);
      decisionButtons.forEach((btn) => {
        btn.classList.remove('is-selected');
        btn.setAttribute('aria-pressed', 'false');
      });
      updateDecisionViews('');
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const savedDecision = localStorage.getItem(decisionKey);
  if (savedDecision) {
    setDecision(savedDecision);
  } else {
    updateDecisionViews('');
  }

  updateSummary();
});
