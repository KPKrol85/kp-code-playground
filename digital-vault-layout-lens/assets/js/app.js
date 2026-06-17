import { auditCategories, auditRules } from './auditRules.js';
import { calculateAudit, createInitialStatuses } from './auditEngine.js';
import { componentPresets } from './demoData.js';

const STORAGE_KEY = 'kp-layout-lens-audit-v1';
const statusOptions = [
  { value: 'pass', label: 'Pass' },
  { value: 'warning', label: 'Warning' },
  { value: 'fail', label: 'Fail' },
  { value: 'na', label: 'N/A' }
];

const elements = {
  componentType: document.querySelector('#component-type'),
  demoSummary: document.querySelector('#demo-summary'),
  rulesContainer: document.querySelector('#rules-container'),
  overallScore: document.querySelector('#overall-score'),
  qualityLabel: document.querySelector('#quality-label'),
  passedCount: document.querySelector('#passed-count'),
  warningCount: document.querySelector('#warning-count'),
  failedCount: document.querySelector('#failed-count'),
  scoreRingValue: document.querySelector('#score-ring-value'),
  scoreRingLabel: document.querySelector('#score-ring-label'),
  categoryScores: document.querySelector('#category-scores'),
  recommendationList: document.querySelector('#recommendation-list'),
  resetAudit: document.querySelector('#reset-audit')
};

const savedState = loadState();
let state = savedState || createState(componentPresets[0]);

init();

function init() {
  renderComponentOptions();
  renderDemoSummary();
  renderRules();
  renderResults();
  bindEvents();
}

function createState(preset) {
  return {
    componentTypeId: preset.id,
    statuses: createInitialStatuses(auditRules, preset.statuses)
  };
}

function bindEvents() {
  elements.componentType.addEventListener('change', (event) => {
    const preset = getPresetById(event.target.value);
    state = createState(preset);
    persistAndRender();
  });

  elements.rulesContainer.addEventListener('change', (event) => {
    const control = event.target.closest('[data-rule-status]');
    if (!control) return;

    state.statuses[control.dataset.ruleStatus] = control.value;
    persistAndRender();
  });

  elements.resetAudit.addEventListener('click', () => {
    state = createState(getPresetById(state.componentTypeId));
    persistAndRender();
  });
}

function renderComponentOptions() {
  elements.componentType.innerHTML = componentPresets
    .map((preset) => `<option value="${preset.id}">${preset.name}</option>`)
    .join('');
  elements.componentType.value = state.componentTypeId;
}

function renderDemoSummary() {
  const preset = getPresetById(state.componentTypeId);
  elements.demoSummary.innerHTML = `
    <p>${escapeHtml(preset.summary)}</p>
    <div>
      <strong>Review focus</strong>
      <ul class="demo-summary__list">${preset.idealReviewFocus.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
    </div>
  `;
}

function renderRules() {
  elements.rulesContainer.innerHTML = auditCategories
    .map((category) => {
      const rules = auditRules.filter((rule) => rule.category === category);
      return `
        <section class="rule-category" aria-labelledby="category-${slugify(category)}">
          <div class="rule-category__header">
            <h4 id="category-${slugify(category)}" class="rule-category__title">${escapeHtml(category)}</h4>
            <span class="rule-category__count">${rules.length} checks</span>
          </div>
          <div class="rule-list">
            ${rules.map(renderRule).join('')}
          </div>
        </section>
      `;
    })
    .join('');
}

function renderRule(rule) {
  const selectedStatus = state.statuses[rule.id] || 'warning';
  const safeLabel = escapeHtml(rule.label);
  return `
    <article class="rule-card rule-card--${selectedStatus}">
      <div class="rule-card__body">
        <div>
          <p class="rule-card__meta">${escapeHtml(rule.severity)} severity · weight ${rule.weight}</p>
          <h5 class="rule-card__title">${safeLabel}</h5>
          <p>${escapeHtml(rule.description)}</p>
        </div>
        <label class="status-select">
          <span class="sr-only">Status for ${safeLabel}</span>
          <select data-rule-status="${rule.id}">
            ${statusOptions
              .map((option) => `<option value="${option.value}" ${option.value === selectedStatus ? 'selected' : ''}>${option.label}</option>`)
              .join('')}
          </select>
        </label>
      </div>
      <details class="rule-card__details">
        <summary>Recommendation and future automation</summary>
        <p><strong>Recommendation:</strong> ${escapeHtml(rule.recommendation)}</p>
        <p><strong>Automation hint:</strong> ${escapeHtml(rule.futureAutomationHint)}</p>
      </details>
    </article>
  `;
}

function renderResults() {
  const result = calculateAudit(auditRules, state.statuses);

  elements.overallScore.textContent = result.score;
  elements.qualityLabel.textContent = result.qualityLabel;
  elements.passedCount.textContent = result.totals.pass;
  elements.warningCount.textContent = result.totals.warning;
  elements.failedCount.textContent = result.totals.fail;
  elements.scoreRingValue.textContent = result.score;
  elements.scoreRingLabel.textContent = result.qualityLabel;

  elements.categoryScores.innerHTML = result.categoryScores
    .map(
      (category) => `
        <div class="category-score">
          <div>
            <strong>${escapeHtml(category.name)}</strong>
            <span>${category.counts.pass} pass · ${category.counts.warning} warn · ${category.counts.fail} fail</span>
          </div>
          <meter min="0" max="100" value="${category.score}">${category.score}</meter>
          <b>${category.score}</b>
        </div>
      `
    )
    .join('');

  elements.recommendationList.innerHTML = result.recommendations.length
    ? result.recommendations.slice(0, 8).map(renderRecommendation).join('')
    : '<article class="recommendation-card"><h3>No open recommendations</h3><p>All applicable checks are passing. Keep validating real content and edge cases before release.</p></article>';
}

function renderRecommendation(item) {
  return `
    <article class="recommendation-card recommendation-card--${item.status}">
      <p class="recommendation-card__meta">${escapeHtml(item.category)} · ${escapeHtml(item.severity)} · ${escapeHtml(item.status)}</p>
      <h3>${escapeHtml(item.label)}</h3>
      <p>${escapeHtml(item.recommendation)}</p>
      <small>Future automation: ${escapeHtml(item.futureAutomationHint)}</small>
    </article>
  `;
}

function persistAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderComponentOptions();
  renderDemoSummary();
  renderRules();
  renderResults();
}

function loadState() {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return null;
    const parsed = JSON.parse(rawState);
    if (!getPresetById(parsed.componentTypeId)) return null;
    return {
      componentTypeId: parsed.componentTypeId,
      statuses: createInitialStatuses(auditRules, parsed.statuses || {})
    };
  } catch {
    return null;
  }
}

function getPresetById(id) {
  return componentPresets.find((preset) => preset.id === id) || componentPresets[0];
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}
