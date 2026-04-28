const recommendationData = {
  'launch-faster': {
    goalLabel: 'Goal: Launch faster',
    product: 'Premium Landing Starter Pack',
    meta: 'Template Pack · Premium',
    rationale:
      'Start with launch-ready building blocks and delivery checklists so you can publish quickly with fewer setup decisions.',
    reasons: [
      'Includes conversion-tested landing sections and modular page structure.',
      'Provides step-by-step launch sequencing for content, QA, and handoff.',
      'Cuts initial project setup time with reusable implementation patterns.'
    ],
    cta: 'Use this product'
  },
  'improve-quality': {
    goalLabel: 'Goal: Improve quality',
    product: 'Frontend Quality Checklist',
    meta: 'Checklist · Premium',
    rationale:
      'Use a practical quality baseline to catch structural, accessibility, and responsiveness issues before release.',
    reasons: [
      'Covers semantic markup, interaction states, and keyboard support checks.',
      'Provides repeatable QA steps for mobile, tablet, and desktop breakpoints.',
      'Reduces last-minute rework by standardizing review criteria across projects.'
    ],
    cta: 'Use this product'
  },
  'protect-scope': {
    goalLabel: 'Goal: Protect scope',
    product: 'Scope Creep Guard',
    meta: 'Workflow Kit · Premium',
    rationale:
      'Keep project boundaries clear with scope framing, change-request language, and approval checkpoints.',
    reasons: [
      'Defines in-scope and out-of-scope examples for clearer client alignment.',
      'Adds lightweight change control templates for new requests.',
      'Supports predictable delivery by preserving timeline and budget guardrails.'
    ],
    cta: 'Use this product'
  },
  'build-client-trust': {
    goalLabel: 'Goal: Build client trust',
    product: 'Client Website Brief Template',
    meta: 'Brief Template · Free',
    rationale:
      'Clarify expectations early with structured discovery prompts and approval checkpoints that clients can confidently review.',
    reasons: [
      'Guides project goals, constraints, and decision ownership in plain language.',
      'Creates a documented baseline that reduces misunderstandings during delivery.',
      'Supports a more professional kickoff process with reusable briefing structure.'
    ],
    cta: 'Use this product'
  },
  'polish-ui': {
    goalLabel: 'Goal: Polish UI',
    product: 'Dashboard Components Kit',
    meta: 'Component Library · Premium',
    rationale:
      'Elevate visual consistency and interface clarity with production-ready UI blocks for modern product surfaces.',
    reasons: [
      'Provides cohesive card, table, and status patterns for cleaner dashboards.',
      'Includes adaptable spacing and hierarchy examples for readable layouts.',
      'Accelerates refinements without redesigning common interface structures.'
    ],
    cta: 'Use this product'
  }
};

const cardSelector = '[data-recommendation-card]';

document.addEventListener('click', (event) => {
  const goalButton = event.target.closest('.recommendation-card__goal');
  if (!goalButton) return;

  const card = goalButton.closest(cardSelector);
  if (!card) return;

  const goalKey = goalButton.dataset.goal;
  if (!goalKey || !recommendationData[goalKey]) return;

  updateRecommendationCard(card, goalKey);
});

document.querySelectorAll(cardSelector).forEach((card) => {
  const initialGoal = card.dataset.defaultGoal;
  if (initialGoal && recommendationData[initialGoal]) {
    updateRecommendationCard(card, initialGoal);
  }
});

function updateRecommendationCard(card, selectedGoal) {
  const recommendation = recommendationData[selectedGoal];
  if (!recommendation) return;

  const goalButtons = card.querySelectorAll('.recommendation-card__goal');
  goalButtons.forEach((button) => {
    const isSelected = button.dataset.goal === selectedGoal;
    button.setAttribute('aria-pressed', String(isSelected));
  });

  const goalLabel = card.querySelector('[data-goal-label]');
  const productName = card.querySelector('[data-product-name]');
  const productMeta = card.querySelector('[data-product-meta]');
  const rationale = card.querySelector('[data-rationale]');
  const reasonsList = card.querySelector('[data-reasons]');
  const cta = card.querySelector('[data-cta]');
  const liveRegion = card.querySelector('[data-live]');

  if (goalLabel) goalLabel.textContent = recommendation.goalLabel;
  if (productName) productName.textContent = recommendation.product;
  if (productMeta) productMeta.textContent = recommendation.meta;
  if (rationale) rationale.textContent = recommendation.rationale;
  if (reasonsList) replaceReasons(reasonsList, recommendation.reasons);
  if (cta) cta.textContent = recommendation.cta;
  if (liveRegion) {
    const selectedGoalLabel = recommendation.goalLabel.replace('Goal: ', '');
    liveRegion.textContent = `Goal set to ${selectedGoalLabel}. Recommended product: ${recommendation.product}.`;
  }
}

function replaceReasons(listElement, reasons) {
  listElement.textContent = '';
  reasons.slice(0, 3).forEach((reasonText) => {
    const reason = document.createElement('li');
    reason.className = 'recommendation-card__reason';
    reason.textContent = reasonText;
    listElement.appendChild(reason);
  });
}
