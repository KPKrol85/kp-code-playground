(function () {
  const scoreInputs = document.querySelectorAll('.score-input');
  const totalScoreEl = document.getElementById('total-score');
  const scoreLabelEl = document.getElementById('score-label');
  const recommendationEl = document.getElementById('score-recommendation');

  function getScoreSummary(total) {
    if (total <= 8) {
      return {
        label: 'Weak copy',
        recommendation:
          'Focus first on clarifying the offer, audience, and next step CTA. Remove vague claims and add specifics.'
      };
    }
    if (total <= 15) {
      return {
        label: 'Decent but unclear',
        recommendation:
          'You have a base to build on. Tighten headline clarity, CTA specificity, and trust proof placement.'
      };
    }
    if (total <= 20) {
      return {
        label: 'Strong foundation',
        recommendation:
          'Your messaging is working. Prioritize benefit language and stronger proof to increase conversion confidence.'
      };
    }
    return {
      label: 'Conversion-ready copy',
      recommendation:
        'Excellent clarity and persuasive structure. Run A/B tests on CTAs and refine for specific audience segments.'
    };
  }

  function updateScore() {
    const total = Array.from(scoreInputs).reduce(function (sum, input) {
      return sum + Number(input.value);
    }, 0);

    const summary = getScoreSummary(total);
    totalScoreEl.textContent = String(total);
    scoreLabelEl.textContent = summary.label;
    recommendationEl.textContent = summary.recommendation;
  }

  scoreInputs.forEach(function (input) {
    input.addEventListener('change', updateScore);
  });

  updateScore();
})();
