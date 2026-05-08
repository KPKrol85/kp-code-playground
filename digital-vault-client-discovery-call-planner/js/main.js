(function () {
  const scoreInputs = Array.from(document.querySelectorAll('.score-grid input[type="number"]'));
  const totalScoreEl = document.getElementById('total-score');
  const resultLabelEl = document.getElementById('result-label');
  const recommendationEl = document.getElementById('result-recommendation');
  const nextStepGuidanceEl = document.getElementById('next-step-guidance');

  function clampScore(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) return 0;
    return Math.min(3, Math.max(0, parsed));
  }

  function getScoreState(total) {
    if (total <= 6) {
      return {
        label: 'Weak lead',
        recommendation: 'Recommendation: Clarify essentials before investing proposal time.',
        nextStep: 'Request a focused follow-up to confirm goals, budget, and ownership before estimating.'
      };
    }

    if (total <= 12) {
      return {
        label: 'Needs clarification',
        recommendation: 'Recommendation: Address open questions, then proceed with a guarded estimate.',
        nextStep: 'Schedule a second call and request missing details before drafting a final proposal.'
      };
    }

    if (total <= 18) {
      return {
        label: 'Promising lead',
        recommendation: 'Recommendation: Prepare a clear scope and timeline with assumptions listed.',
        nextStep: 'Prepare an estimate and share a proposal draft with milestones and dependencies.'
      };
    }

    return {
      label: 'Strong fit',
      recommendation: 'Recommendation: Move quickly with a detailed proposal and onboarding path.',
      nextStep: 'Send proposal and move toward onboarding once approval and deposit terms are confirmed.'
    };
  }

  function updateScore() {
    const total = scoreInputs.reduce(function (sum, input) {
      const value = clampScore(input.value);
      input.value = value;
      return sum + value;
    }, 0);

    const state = getScoreState(total);
    totalScoreEl.textContent = String(total);
    resultLabelEl.textContent = state.label;
    recommendationEl.textContent = state.recommendation;
    nextStepGuidanceEl.textContent = state.nextStep;
  }

  scoreInputs.forEach(function (input) {
    input.addEventListener('input', updateScore);
    input.addEventListener('blur', updateScore);
  });

  updateScore();
})();
