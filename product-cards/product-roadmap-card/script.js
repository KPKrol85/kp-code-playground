const roadmapGrid = document.querySelector('[data-roadmap-grid]');
const liveRegion = document.querySelector('[data-roadmap-live]');

function clampProgress(value) {
  const numericValue = Number.parseFloat(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  return Math.min(100, Math.max(0, numericValue));
}

function initializeRoadmapCard(card) {
  const progress = clampProgress(card.dataset.progress);
  card.style.setProperty('--roadmap-progress', `${progress}%`);

  const interestCountElement = card.querySelector('[data-interest-count-text]');
  const button = card.querySelector('.roadmap-card__cta');
  const initialCount = Number.parseInt(card.dataset.interestCount, 10);

  if (!interestCountElement || !button) {
    return;
  }

  const safeCount = Number.isNaN(initialCount) ? 0 : Math.max(0, initialCount);
  card.dataset.interestCount = String(safeCount);
  interestCountElement.textContent = String(safeCount);

  if (!button.dataset.ctaDefault) {
    button.dataset.ctaDefault = button.textContent.trim() || 'Join waitlist';
  }

  if (!button.dataset.ctaActive) {
    button.dataset.ctaActive = 'Joined';
  }

  button.textContent = button.dataset.ctaDefault;
  button.setAttribute('aria-pressed', 'false');
}

function setCardInterestState(card, interested) {
  const button = card.querySelector('.roadmap-card__cta');
  const interestCountElement = card.querySelector('[data-interest-count-text]');
  const title = card.querySelector('.roadmap-card__title')?.textContent?.trim() || 'This product';

  if (!button || !interestCountElement) {
    return;
  }

  const baseCount = Number.parseInt(card.dataset.interestCount ?? '0', 10);
  const safeBase = Number.isNaN(baseCount) ? 0 : Math.max(0, baseCount);
  const nextCount = interested ? safeBase + 1 : Math.max(0, safeBase - 1);

  card.dataset.interestCount = String(nextCount);
  interestCountElement.textContent = String(nextCount);
  button.setAttribute('aria-pressed', interested ? 'true' : 'false');
  button.textContent = interested ? button.dataset.ctaActive : button.dataset.ctaDefault;

  if (liveRegion) {
    const stateLabel = interested ? 'added to interest list' : 'removed from interest list';
    liveRegion.textContent = `${title} ${stateLabel}. ${nextCount} interested in this demo.`;
  }
}

if (roadmapGrid) {
  const cards = roadmapGrid.querySelectorAll('[data-roadmap-card]');
  cards.forEach(initializeRoadmapCard);

  roadmapGrid.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.roadmap-card__cta');
    if (!clickedButton || !roadmapGrid.contains(clickedButton)) {
      return;
    }

    const card = clickedButton.closest('[data-roadmap-card]');
    if (!card) {
      return;
    }

    const isPressed = clickedButton.getAttribute('aria-pressed') === 'true';
    setCardInterestState(card, !isPressed);
  });
}
