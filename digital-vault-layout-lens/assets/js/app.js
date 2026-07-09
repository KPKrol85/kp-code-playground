import { auditCategories, auditRules } from './auditRules.js';
import { componentPresets } from './componentPresets.js';
import { SCORE_STATUSES, calculateAuditScore, calculateCategoryScores } from './scoringEngine.js';
import { generateRecommendations } from './recommendations.js';

const THEME_STORAGE_KEY = 'kp-layout-lens-theme';
const STATUS_NOT_CHECKED = SCORE_STATUSES.NOT_CHECKED;
const statusOptions = [
  { value: STATUS_NOT_CHECKED, label: 'Not checked' },
  { value: 'pass', label: 'Pass' },
  { value: 'needs-work', label: 'Needs work' },
  { value: 'not-applicable', label: 'Not applicable' }
];

const elements = {
  rulesContainer: document.querySelector('#rules-container'),
  totalRules: document.querySelector('#total-rules'),
  checkedRules: document.querySelector('#checked-rules'),
  needsWorkRules: document.querySelector('#needs-work-rules'),
  notApplicableRules: document.querySelector('#not-applicable-rules'),
  auditScoreValue: document.querySelector('#audit-score-value'),
  auditScoreUnit: document.querySelector('#audit-score-unit'),
  auditScoreSummary: document.querySelector('#audit-score-summary'),
  auditEarnedPoints: document.querySelector('#audit-earned-points'),
  auditPossiblePoints: document.querySelector('#audit-possible-points'),
  auditCheckedRules: document.querySelector('#audit-checked-rules'),
  auditNeedsWorkRules: document.querySelector('#audit-needs-work-rules'),
  auditNotApplicableRules: document.querySelector('#audit-not-applicable-rules'),
  categoryScores: document.querySelector('#category-scores'),
  recommendationList: document.querySelector('#recommendation-list'),
  resetAudit: document.querySelector('#reset-audit'),
  themeToggle: document.querySelector('#theme-toggle'),
  presetOptions: document.querySelector('#preset-options'),
  selectedPresetName: document.querySelector('#selected-preset-name'),
  selectedPresetHint: document.querySelector('#selected-preset-hint'),
  selectedPresetDescription: document.querySelector('#selected-preset-description'),
  selectedPresetCategories: document.querySelector('#selected-preset-categories'),
  checklistTitle: document.querySelector('#checklist-title')
};

let statuses = createInitialStatuses();
let selectedPresetId = componentPresets[0]?.id;

init();

function init() {
  renderPresets();
  renderSelectedPreset();
  renderRules();
  renderScore();
  bindEvents();
  syncThemeToggle();
}

function createInitialStatuses() {
  return Object.fromEntries(auditRules.map((rule) => [rule.id, STATUS_NOT_CHECKED]));
}

function bindEvents() {
  elements.rulesContainer.addEventListener('change', (event) => {
    const control = event.target.closest('[data-rule-status]');
    if (!control) return;

    statuses[control.dataset.ruleStatus] = control.value;
    renderRuleStatus(control.dataset.ruleStatus);
    renderScore();
  });

  elements.presetOptions?.addEventListener('change', (event) => {
    const control = event.target.closest('[data-preset-id]');
    if (!control) return;

    selectedPresetId = control.value;
    renderSelectedPreset();
  });

  elements.resetAudit.addEventListener('click', () => {
    statuses = createInitialStatuses();
    renderRules();
    renderScore();
  });

  elements.themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    syncThemeToggle();
  });
}


function renderPresets() {
  if (!elements.presetOptions) return;

  elements.presetOptions.innerHTML = componentPresets.map(renderPresetOption).join('');
}

function renderPresetOption(preset) {
  const isSelected = preset.id === selectedPresetId;

  return `
    <label class="preset-option" for="preset-${escapeHtml(preset.id)}">
      <input
        id="preset-${escapeHtml(preset.id)}"
        name="component-preset"
        type="radio"
        value="${escapeHtml(preset.id)}"
        data-preset-id="${escapeHtml(preset.id)}"
        ${isSelected ? 'checked' : ''}
      />
      <span class="preset-option__content">
        <span class="preset-option__name">${escapeHtml(preset.name)}</span>
        <span class="preset-option__description">${escapeHtml(preset.description)}</span>
      </span>
    </label>
  `;
}

function renderSelectedPreset() {
  const preset = getSelectedPreset();
  if (!preset) return;

  elements.selectedPresetName.textContent = preset.name;
  elements.selectedPresetHint.textContent = preset.bestUse || 'Preset helps focus the checklist.';
  elements.selectedPresetDescription.textContent = preset.description;
  elements.selectedPresetCategories.innerHTML = preset.relatedCategories
    .map((category) => `<li>${escapeHtml(category)}</li>`)
    .join('');
  elements.checklistTitle.textContent = `${preset.name} audit checklist`;
}

function getSelectedPreset() {
  return componentPresets.find((preset) => preset.id === selectedPresetId) || componentPresets[0];
}

function renderRules() {
  elements.rulesContainer.innerHTML = auditCategories.map(renderCategory).join('');
}

function renderCategory(category) {
  const rules = auditRules.filter((rule) => rule.category === category);
  return `
    <section class="rule-category" aria-labelledby="category-${slugify(category)}">
      <div class="rule-category__header">
        <div>
          <h4 id="category-${slugify(category)}" class="rule-category__title">${escapeHtml(category)}</h4>
          <p>${rules.length} manual checks for this audit area.</p>
        </div>
        <span class="rule-category__count">${rules.length} checks</span>
      </div>
      <div class="rule-list">
        ${rules.map(renderRule).join('')}
      </div>
    </section>
  `;
}

function renderRule(rule) {
  const selectedStatus = statuses[rule.id] || STATUS_NOT_CHECKED;
  const safeTitle = escapeHtml(rule.title);
  return `
    <article class="rule-card rule-card--${selectedStatus}" data-rule-card="${escapeHtml(rule.id)}">
      <div class="rule-card__body">
        <div>
          <p class="rule-card__meta">${escapeHtml(rule.severity)} severity · ${escapeHtml(rule.category)}</p>
          <h5 class="rule-card__title">${safeTitle}</h5>
          <p>${escapeHtml(rule.description)}</p>
        </div>
        <label class="status-select" for="status-${escapeHtml(rule.id)}">
          <span>Status for ${safeTitle}</span>
          <select id="status-${escapeHtml(rule.id)}" data-rule-status="${escapeHtml(rule.id)}">
            ${statusOptions.map((option) => `<option value="${option.value}" ${option.value === selectedStatus ? 'selected' : ''}>${option.label}</option>`).join('')}
          </select>
        </label>
      </div>
    </article>
  `;
}

function renderRuleStatus(ruleId) {
  const card = elements.rulesContainer.querySelector(`[data-rule-card="${CSS.escape(ruleId)}"]`);
  if (!card) return;
  statusOptions.forEach((option) => card.classList.remove(`rule-card--${option.value}`));
  card.classList.add(`rule-card--${statuses[ruleId] || STATUS_NOT_CHECKED}`);
}

function renderScore() {
  const score = calculateAuditScore(auditRules, statuses);
  const categoryScores = calculateCategoryScores(auditCategories, auditRules, statuses);
  const recommendations = generateRecommendations(auditRules, statuses);
  const hasScoredRules = score.scorePercent !== null;

  elements.totalRules.textContent = score.totalRules;
  elements.checkedRules.textContent = score.checkedRules;
  elements.needsWorkRules.textContent = score.needsWorkRules;
  elements.notApplicableRules.textContent = score.notApplicableRules;

  elements.auditScoreValue.textContent = hasScoredRules ? score.scorePercent : '—';
  elements.auditScoreUnit.textContent = hasScoredRules ? '%' : '';
  elements.auditScoreSummary.textContent = hasScoredRules
    ? 'Based on checked applicable rules.'
    : 'Not enough checked rules yet.';
  elements.auditEarnedPoints.textContent = score.earnedPoints;
  elements.auditPossiblePoints.textContent = score.possiblePoints;
  elements.auditCheckedRules.textContent = score.checkedRules;
  elements.auditNeedsWorkRules.textContent = score.needsWorkRules;
  elements.auditNotApplicableRules.textContent = score.notApplicableRules;
  renderCategoryScores(categoryScores);
  renderRecommendations(recommendations);
}

function renderCategoryScores(categoryScores) {
  if (!elements.categoryScores) return;

  elements.categoryScores.innerHTML = categoryScores.map(renderCategoryScore).join('');
}

function renderCategoryScore(categoryScore) {
  const hasScore = categoryScore.scorePercent !== null;
  const applicableCheckedRules = categoryScore.passedRules + categoryScore.needsWorkRules;
  const statusText = hasScore
    ? `${categoryScore.needsWorkRules} ${pluralize('rule', categoryScore.needsWorkRules)} needing work`
    : 'Not enough checked rules yet';

  return `
    <article class="category-score" aria-labelledby="category-score-${categoryScore.categoryId}">
      <div>
        <h4 id="category-score-${categoryScore.categoryId}">${escapeHtml(categoryScore.categoryName)}</h4>
        <p>${escapeHtml(statusText)}</p>
      </div>
      <strong>${hasScore ? `${categoryScore.scorePercent}%` : '—'}</strong>
      <meter class="category-score__meter" min="0" max="100" value="${hasScore ? categoryScore.scorePercent : 0}">${hasScore ? `${categoryScore.scorePercent}%` : 'No category score yet'}</meter>
      <span class="category-score__meta">${applicableCheckedRules} of ${categoryScore.totalRules - categoryScore.notApplicableRules} applicable ${pluralize('rule', categoryScore.totalRules - categoryScore.notApplicableRules)} checked · ${categoryScore.notCheckedRules} not checked</span>
    </article>
  `;
}

function renderRecommendations(recommendations) {
  if (!elements.recommendationList) return;

  if (recommendations.length === 0) {
    elements.recommendationList.innerHTML = `
      <article class="recommendation-empty">
        <h3>No recommendations yet.</h3>
        <p>Mark checklist items as “Needs work” to generate manual recommendations.</p>
      </article>
    `;
    return;
  }

  elements.recommendationList.innerHTML = recommendations.map(renderRecommendation).join('');
}

function renderRecommendation(recommendation) {
  return `
    <article class="recommendation-card recommendation-card--${escapeHtml(recommendation.priority)}">
      <p class="recommendation-card__meta">${escapeHtml(recommendation.categoryName)} · ${escapeHtml(recommendation.priority)} priority</p>
      <h3>${escapeHtml(recommendation.title)}</h3>
      <p>${escapeHtml(recommendation.description)}</p>
    </article>
  `;
}

function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
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

function syncThemeToggle() {
  if (!elements.themeToggle) return;

  const isDark = document.documentElement.dataset.theme === 'dark';
  elements.themeToggle.setAttribute('aria-pressed', String(isDark));
  elements.themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  elements.themeToggle.querySelector('.theme-toggle__icon').textContent = isDark ? '☀' : '☾';
  elements.themeToggle.querySelector('.theme-toggle__text').textContent = isDark ? 'Light' : 'Dark';
}
