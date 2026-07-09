import { auditCategories, auditRules } from './auditRules.js';
import { componentPresets } from './componentPresets.js';

const THEME_STORAGE_KEY = 'kp-layout-lens-theme';
const STATUS_NOT_CHECKED = 'not-checked';
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
  renderCounts();
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
    renderCounts();
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
    renderCounts();
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

function renderCounts() {
  const totals = auditRules.reduce((counts, rule) => {
    const status = statuses[rule.id] || STATUS_NOT_CHECKED;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  const checked = auditRules.length - (totals[STATUS_NOT_CHECKED] || 0);
  elements.totalRules.textContent = auditRules.length;
  elements.checkedRules.textContent = checked;
  elements.needsWorkRules.textContent = totals['needs-work'] || 0;
  elements.notApplicableRules.textContent = totals['not-applicable'] || 0;
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
