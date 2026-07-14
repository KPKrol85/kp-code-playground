import { RULE_SCHEMA_VERSION, auditCategories, auditRuleSchemaMetadata, auditRules } from './auditRules.js';
import { componentPresets } from './componentPresets.js';
import { ALL_RULES_PACK_ID, rulePacks } from './rulePacks.js';
import { DEFAULT_SEVERITY_PROFILE_ID, getValidSeverityProfileIds, resolveSeverityProfile, severityProfiles } from './severityProfiles.js';
import { SCORE_STATUSES, calculateAuditScore, calculateCategoryScores } from './scoringEngine.js';
import { getApplicableRules, getPresetPatternIds, isRuleApplicable } from './ruleApplicability.js';
import { generateRecommendations } from './recommendations.js';
import { AUDIT_STORAGE_KEY, clearSavedAuditState, loadSavedAuditState, saveAuditState } from './auditStorage.js';
import { assertValidRuleData } from './ruleDataValidator.js';

try {
  assertValidRuleData();
} catch (error) {
  console.error(error.message, error.result?.errors || error);
  throw error;
}

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
  checklistTitle: document.querySelector('#checklist-title'),
  rulePackSelect: document.querySelector('#rule-pack-select'),
  rulePackDescription: document.querySelector('#rule-pack-description'),
  rulePackCount: document.querySelector('#rule-pack-count'),
  severityProfileSelect: document.querySelector('#severity-profile-select'),
  severityProfileDescription: document.querySelector('#severity-profile-description'),
  severityProfileSummary: document.querySelector('#severity-profile-summary'),
  auditStorageStatus: document.querySelector('#audit-storage-status'),
  statusFilterSelect: document.querySelector('#status-filter-select'),
  severityFilterSelect: document.querySelector('#severity-filter-select'),
  categoryFilterSelect: document.querySelector('#category-filter-select'),
  relevanceFilterSelect: document.querySelector('#relevance-filter-select'),
  clearRuleFilters: document.querySelector('#clear-rule-filters'),
  checklistFilterSummary: document.querySelector('#checklist-filter-summary')
};

let statuses = createInitialStatuses();
let ruleNotes = {};
let filters = createInitialFilters();
let selectedPresetId = componentPresets[0]?.id;
let selectedRulePackId = ALL_RULES_PACK_ID;
let selectedSeverityProfileId = DEFAULT_SEVERITY_PROFILE_ID;
const validRuleIds = new Set(auditRules.map((rule) => rule.id));
const validPresetIds = new Set(componentPresets.map((preset) => preset.id));
const validRulePackIds = new Set([ALL_RULES_PACK_ID, ...rulePacks.map((pack) => pack.id)]);
const validSeverityProfileIds = getValidSeverityProfileIds();
const validStatuses = new Set(statusOptions.map((option) => option.value));

init();

function init() {
  restoreSavedAuditState();
  renderPresets();
  renderSelectedPreset();
  renderRulePackOptions();
  renderRulePackSelector();
  renderSeverityProfileOptions();
  renderSeverityProfileSelector();
  renderFilterOptions();
  renderFilterControls();
  renderRules();
  renderScore();
  bindEvents();
  syncThemeToggle();
}

function createInitialStatuses() {
  return Object.fromEntries(auditRules.map((rule) => [rule.id, STATUS_NOT_CHECKED]));
}

function createInitialFilters() {
  return {
    status: 'all',
    severity: 'all',
    category: 'all',
    relevance: 'applicable'
  };
}

function bindEvents() {
  elements.rulesContainer.addEventListener('change', (event) => {
    const statusControl = event.target.closest('[data-rule-status]');
    const noteControl = event.target.closest('[data-rule-note]');

    if (statusControl) {
      statuses[statusControl.dataset.ruleStatus] = statusControl.value;
      if (filters.status === 'all' || filters.status === statusControl.value) {
        renderRuleStatus(statusControl.dataset.ruleStatus);
      } else {
        renderRules();
      }
      updateCategoryProgressIndicators();
      renderScore();
      persistAuditState('Saved in this browser.');
      return;
    }

    if (noteControl) {
      updateRuleNote(noteControl.dataset.ruleNote, noteControl.value);
      persistAuditState('Reviewer note saved in this browser.');
    }
  });

  [elements.statusFilterSelect, elements.severityFilterSelect, elements.categoryFilterSelect, elements.relevanceFilterSelect].forEach((select) => {
    select?.addEventListener('change', () => {
      filters = getFiltersFromControls();
      renderRules();
    });
  });

  elements.clearRuleFilters?.addEventListener('click', () => {
    filters = createInitialFilters();
    renderFilterControls();
    renderRules();
  });

  elements.rulePackSelect?.addEventListener('change', () => {
    selectedRulePackId = validRulePackIds.has(elements.rulePackSelect.value)
      ? elements.rulePackSelect.value
      : ALL_RULES_PACK_ID;
    renderRulePackSelector();
    renderSeverityProfileSelector();
    renderFilterControls();
    renderRules();
    renderScore();
    persistAuditState('Rule pack updated. Saved in this browser.');
  });

  elements.severityProfileSelect?.addEventListener('change', () => {
    selectedSeverityProfileId = validSeverityProfileIds.has(elements.severityProfileSelect.value)
      ? elements.severityProfileSelect.value
      : DEFAULT_SEVERITY_PROFILE_ID;
    renderSeverityProfileSelector();
    renderScore();
    persistAuditState('Severity profile updated. Saved in this browser.');
  });

  elements.presetOptions?.addEventListener('change', (event) => {
    const control = event.target.closest('[data-preset-id]');
    if (!control) return;

    selectedPresetId = control.value;
    renderSelectedPreset();
    renderRulePackSelector();
    renderRules();
    renderScore();
    persistAuditState('Saved in this browser.');
  });

  elements.resetAudit.addEventListener('click', () => {
    selectedPresetId = componentPresets[0]?.id;
    selectedRulePackId = ALL_RULES_PACK_ID;
    selectedSeverityProfileId = DEFAULT_SEVERITY_PROFILE_ID;
    statuses = createInitialStatuses();
    ruleNotes = {};
    filters = createInitialFilters();
    clearSavedAuditState();
    renderPresets();
    renderSelectedPreset();
    renderRulePackSelector();
    renderSeverityProfileSelector();
    renderFilterControls();
    renderRules();
    renderScore();
    setAuditStorageStatus('Local audit cleared. Browser-only draft removed.');
  });

  elements.themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Theme preference remains session-only when browser storage is unavailable.
    }
    syncThemeToggle();
  });
}



function restoreSavedAuditState() {
  const result = loadSavedAuditState({ validPresetIds, validRuleIds, validStatuses, validRulePackIds, validSeverityProfileIds, currentRuleSchemaVersion: RULE_SCHEMA_VERSION, compatibleRuleSchemaVersions: auditRuleSchemaMetadata.compatibleRuleSchemaVersions });

  if (result.state) {
    if (result.state.selectedPresetId) {
      selectedPresetId = result.state.selectedPresetId;
    }

    if (result.state.selectedRulePackId) {
      selectedRulePackId = result.state.selectedRulePackId;
    }

    if (result.state.selectedSeverityProfileId) {
      selectedSeverityProfileId = result.state.selectedSeverityProfileId;
    }

    statuses = {
      ...createInitialStatuses(),
      ...result.state.ruleStatuses
    };

    ruleNotes = result.state.ruleNotes || {};
  }

  if (result.status === 'loaded') {
    setAuditStorageStatus('Local draft restored. Changes are saved in this browser only.');
    return;
  }

  if (result.status === 'schema-mismatch') {
    setAuditStorageStatus('Saved audit data uses a different rule schema and needs a future migration. Starting a fresh browser-only audit.');
    return;
  }

  if (result.status === 'invalid') {
    setAuditStorageStatus('Saved audit data could not be used. Starting a fresh browser-only audit.');
    return;
  }

  setAuditStorageStatus(`Browser-only audit state. Saved locally under ${AUDIT_STORAGE_KEY}.`);
}

function persistAuditState(message) {
  const saved = saveAuditState({
    selectedPresetId,
    selectedRulePackId,
    selectedSeverityProfileId,
    ruleStatuses: statuses,
    ruleNotes,
    ruleSchemaVersion: RULE_SCHEMA_VERSION
  });

  setAuditStorageStatus(saved ? message : 'Browser storage is unavailable. Changes are kept for this session only.');
}

function setAuditStorageStatus(message) {
  if (!elements.auditStorageStatus) return;
  elements.auditStorageStatus.textContent = message;
}

function renderFilterOptions() {
  if (elements.statusFilterSelect) {
    elements.statusFilterSelect.innerHTML = [
      '<option value="all">All statuses</option>',
      ...statusOptions.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    ].join('');
  }

  if (elements.severityFilterSelect) {
    const severities = [...new Set(auditRules.map((rule) => rule.severity))].sort();
    elements.severityFilterSelect.innerHTML = [
      '<option value="all">All severities</option>',
      ...severities.map((severity) => `<option value="${escapeHtml(severity)}">${escapeHtml(severity)}</option>`)
    ].join('');
  }

  if (elements.categoryFilterSelect) {
    elements.categoryFilterSelect.innerHTML = [
      '<option value="all">All categories</option>',
      ...auditCategories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    ].join('');
  }
}

function renderFilterControls() {
  if (elements.statusFilterSelect) elements.statusFilterSelect.value = filters.status;
  if (elements.severityFilterSelect) elements.severityFilterSelect.value = filters.severity;
  if (elements.categoryFilterSelect) elements.categoryFilterSelect.value = filters.category;
  if (elements.relevanceFilterSelect) elements.relevanceFilterSelect.value = filters.relevance;
}

function getFiltersFromControls() {
  return {
    status: elements.statusFilterSelect?.value || 'all',
    severity: elements.severityFilterSelect?.value || 'all',
    category: elements.categoryFilterSelect?.value || 'all',
    relevance: elements.relevanceFilterSelect?.value || 'applicable'
  };
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

function renderRulePackOptions() {
  if (!elements.rulePackSelect) return;

  const options = [
    { id: ALL_RULES_PACK_ID, name: 'All rules' },
    ...rulePacks
  ];

  elements.rulePackSelect.innerHTML = options
    .map((pack) => `<option value="${escapeHtml(pack.id)}">${escapeHtml(pack.name)}</option>`)
    .join('');
}

function renderRulePackSelector() {
  const activePack = getSelectedRulePack();
  const scopedRules = getActiveRules();

  if (elements.rulePackSelect) {
    elements.rulePackSelect.value = selectedRulePackId;
  }

  if (elements.rulePackDescription) {
    elements.rulePackDescription.textContent = activePack.description;
  }

  if (elements.rulePackCount) {
    elements.rulePackCount.textContent = `${scopedRules.length} applicable ${pluralize('rule', scopedRules.length)} in scope`;
  }
}


function renderSeverityProfileOptions() {
  if (!elements.severityProfileSelect) return;

  elements.severityProfileSelect.innerHTML = severityProfiles
    .map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`)
    .join('');
}

function renderSeverityProfileSelector() {
  const activeProfile = getSelectedSeverityProfile();

  if (elements.severityProfileSelect) {
    elements.severityProfileSelect.value = activeProfile.id;
  }

  if (elements.severityProfileDescription) {
    elements.severityProfileDescription.textContent = activeProfile.description;
  }

  if (elements.severityProfileSummary) {
    elements.severityProfileSummary.textContent = activeProfile.summary || activeProfile.description;
  }
}

function getSelectedSeverityProfile() {
  const profile = resolveSeverityProfile(selectedSeverityProfileId);
  selectedSeverityProfileId = profile.id;
  return profile;
}

function getSelectedRulePack() {
  if (selectedRulePackId === ALL_RULES_PACK_ID) {
    return {
      id: ALL_RULES_PACK_ID,
      name: 'All rules',
      description: 'Use the full manual checklist without narrowing the audit scope.',
      ruleIds: auditRules.map((rule) => rule.id)
    };
  }

  return rulePacks.find((pack) => pack.id === selectedRulePackId) || getSelectedRulePackFallback();
}

function getSelectedRulePackFallback() {
  selectedRulePackId = ALL_RULES_PACK_ID;
  return getSelectedRulePack();
}

function getActiveRules() {
  const activePack = getSelectedRulePack();
  const ruleIdSet = new Set(activePack.ruleIds);
  const scopedRules = auditRules.filter((rule) => ruleIdSet.has(rule.id));
  const packRules = scopedRules.length > 0 ? scopedRules : auditRules;

  return getApplicableRules(packRules, getApplicabilityContext());
}

function getApplicabilityContext() {
  const preset = getSelectedPreset();
  return {
    presetId: preset?.id,
    rulePackId: selectedRulePackId,
    patternIds: getPresetPatternIds(preset)
  };
}

function getActiveCategories(activeRules) {
  const scopedCategorySet = new Set(activeRules.map((rule) => rule.category));
  return auditCategories.filter((category) => scopedCategorySet.has(category));
}

function renderRules() {
  const displayRules = getFilteredDisplayRules();
  const activeCategories = getActiveCategories(displayRules);
  updateFilterSummary(displayRules.length);
  elements.rulesContainer.innerHTML = activeCategories.length > 0
    ? activeCategories.map((category) => renderCategory(category, displayRules)).join('')
    : renderNoMatchingRules();
}

function getDisplayScopeRules() {
  const activePack = getSelectedRulePack();
  const ruleIdSet = new Set(activePack.ruleIds);
  const scopedRules = auditRules.filter((rule) => ruleIdSet.has(rule.id));
  return scopedRules.length > 0 ? scopedRules : auditRules;
}

function getFilteredDisplayRules() {
  const context = getApplicabilityContext();
  return getDisplayScopeRules().filter((rule) => {
    const applicable = isRuleApplicable(rule, context);
    const status = statuses[rule.id] || STATUS_NOT_CHECKED;

    if (filters.relevance === 'applicable' && !applicable) return false;
    if (filters.relevance === 'inapplicable' && applicable) return false;
    if (filters.status !== 'all' && status !== filters.status) return false;
    if (filters.severity !== 'all' && rule.severity !== filters.severity) return false;
    if (filters.category !== 'all' && rule.category !== filters.category) return false;

    return true;
  });
}

function updateFilterSummary(displayCount) {
  if (!elements.checklistFilterSummary) return;
  const activeCount = getActiveRules().length;
  const filterDescriptions = [];
  if (filters.status !== 'all') filterDescriptions.push(`status: ${getStatusLabel(filters.status)}`);
  if (filters.severity !== 'all') filterDescriptions.push(`severity: ${filters.severity}`);
  if (filters.category !== 'all') filterDescriptions.push(`category: ${filters.category}`);
  if (filters.relevance === 'inapplicable') filterDescriptions.push('not relevant to this preset');
  if (filters.relevance === 'all') filterDescriptions.push('all relevance states');

  elements.checklistFilterSummary.textContent = filterDescriptions.length > 0
    ? `Showing ${displayCount} ${pluralize('rule', displayCount)} matching ${filterDescriptions.join(', ')}. Scoring still uses ${activeCount} applicable ${pluralize('rule', activeCount)}.`
    : `Showing ${displayCount} currently applicable ${pluralize('rule', displayCount)}.`;
}

function renderNoMatchingRules() {
  return `
    <article class="recommendation-empty">
      <h3>No rules match these filters.</h3>
      <p>Clear filters or choose a broader status, severity, category, or preset relevance option. Saved statuses, notes, and scoring are unchanged.</p>
    </article>
  `;
}

function renderNoApplicableRules() {
  return `
    <article class="recommendation-empty">
      <h3>No applicable rules for this context.</h3>
      <p>Choose a different preset or rule pack to bring relevant manual checks back into scope. Saved rule statuses are preserved.</p>
    </article>
  `;
}

function renderCategory(category, activeRules) {
  const rules = activeRules.filter((rule) => rule.category === category);
  const progress = calculateCategoryProgress(rules);
  const progressLabel = formatCategoryProgressLabel(progress);
  const progressPercent = getCategoryProgressPercent(progress);
  const safeCategoryId = slugify(category);

  return `
    <section class="rule-category" aria-labelledby="category-${safeCategoryId}">
      <div class="rule-category__header">
        <div>
          <h4 id="category-${safeCategoryId}" class="rule-category__title">${escapeHtml(category)}</h4>
          <p>${rules.length} manual checks for this audit area.</p>
        </div>
        <div class="rule-category__progress" data-category-progress="${escapeHtml(category)}">
          <span class="rule-category__count">${escapeHtml(progressLabel)}</span>
          <div
            class="rule-category__bar"
            role="progressbar"
            aria-label="${escapeHtml(category)} reviewed applicable rules"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${progressPercent}"
          >
            <span style="width: ${progressPercent}%"></span>
          </div>
        </div>
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
  const note = ruleNotes[rule.id] || "";
  const relevant = isRuleApplicable(rule, getApplicabilityContext());
  return `
    <article class="rule-card rule-card--${selectedStatus}" data-rule-card="${escapeHtml(rule.id)}">
      <div class="rule-card__body">
        <div>
          <p class="rule-card__meta">${escapeHtml(rule.severity)} severity · ${escapeHtml(rule.category)} · ${relevant ? 'Preset relevant' : 'Not preset relevant'}</p>
          <h5 class="rule-card__title">${safeTitle}</h5>
          <p>${escapeHtml(rule.description)}</p>
        </div>
        <div class="rule-card__controls">
          <label class="status-select" for="status-${escapeHtml(rule.id)}">
            <span>Status for ${safeTitle}</span>
            <select id="status-${escapeHtml(rule.id)}" data-rule-status="${escapeHtml(rule.id)}">
              ${statusOptions.map((option) => `<option value="${option.value}" ${option.value === selectedStatus ? 'selected' : ''}>${option.label}</option>`).join('')}
            </select>
          </label>
          <label class="note-field" for="note-${escapeHtml(rule.id)}">
            <span>Reviewer note for ${safeTitle}</span>
            <textarea id="note-${escapeHtml(rule.id)}" data-rule-note="${escapeHtml(rule.id)}" maxlength="1000" rows="2" placeholder="Optional local note">${escapeHtml(note)}</textarea>
          </label>
        </div>
      </div>
    </article>
  `;
}

function updateRuleNote(ruleId, value) {
  if (!validRuleIds.has(ruleId) || typeof value !== 'string') return;
  const normalizedNote = value.replace(/\u0000/g, '').slice(0, 1000);
  if (normalizedNote.length > 0) {
    ruleNotes[ruleId] = normalizedNote;
  } else {
    delete ruleNotes[ruleId];
  }
}

function getStatusLabel(status) {
  return statusOptions.find((option) => option.value === status)?.label || status;
}

function renderRuleStatus(ruleId) {
  const card = elements.rulesContainer.querySelector(`[data-rule-card="${CSS.escape(ruleId)}"]`);
  if (!card) return;
  statusOptions.forEach((option) => card.classList.remove(`rule-card--${option.value}`));
  card.classList.add(`rule-card--${statuses[ruleId] || STATUS_NOT_CHECKED}`);
}

function renderScore() {
  const activeRules = getActiveRules();
  const activeProfile = getSelectedSeverityProfile();
  const score = calculateAuditScore(activeRules, statuses, activeProfile);
  const categoryScores = calculateCategoryScores(getActiveCategories(activeRules), activeRules, statuses, activeProfile);
  const recommendations = generateRecommendations(activeRules, statuses, activeProfile);
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

  const applicableRules = categoryScore.totalRules - categoryScore.notApplicableRules;
  const progressPercent = getProgressPercent(applicableCheckedRules, applicableRules);

  return `
    <article class="category-score" aria-labelledby="category-score-${categoryScore.categoryId}">
      <div>
        <h4 id="category-score-${categoryScore.categoryId}">${escapeHtml(categoryScore.categoryName)}</h4>
        <p>${escapeHtml(statusText)}</p>
      </div>
      <strong>${hasScore ? `${categoryScore.scorePercent}%` : '—'}</strong>
      <meter class="category-score__meter" min="0" max="100" value="${hasScore ? categoryScore.scorePercent : 0}">${hasScore ? `${categoryScore.scorePercent}%` : 'No category score yet'}</meter>
      <span class="category-score__meta">${escapeHtml(formatProgressMeta(applicableCheckedRules, applicableRules, categoryScore.notCheckedRules, progressPercent))}</span>
    </article>
  `;
}


function updateCategoryProgressIndicators() {
  const activeRules = getActiveRules();

  getActiveCategories(activeRules).forEach((category) => {
    const container = elements.rulesContainer.querySelector(`[data-category-progress="${CSS.escape(category)}"]`);
    if (!container) return;

    const progress = calculateCategoryProgress(activeRules.filter((rule) => rule.category === category));
    const progressPercent = getCategoryProgressPercent(progress);
    const progressLabel = formatCategoryProgressLabel(progress);
    const label = container.querySelector('.rule-category__count');
    const bar = container.querySelector('.rule-category__bar');
    const fill = container.querySelector('.rule-category__bar span');

    if (label) label.textContent = progressLabel;
    if (bar) bar.setAttribute('aria-valuenow', String(progressPercent));
    if (fill) fill.style.width = `${progressPercent}%`;
  });
}

function calculateCategoryProgress(rules) {
  return rules.reduce((progress, rule) => {
    const status = statuses[rule.id] || STATUS_NOT_CHECKED;

    if (status === SCORE_STATUSES.NOT_APPLICABLE) {
      return progress;
    }

    progress.applicableRules += 1;

    if (status === SCORE_STATUSES.PASS || status === SCORE_STATUSES.NEEDS_WORK) {
      progress.reviewedRules += 1;
    }

    return progress;
  }, { reviewedRules: 0, applicableRules: 0 });
}

function formatCategoryProgressLabel(progress) {
  if (progress.applicableRules === 0) {
    return 'No applicable rules';
  }

  return `${progress.reviewedRules} / ${progress.applicableRules} reviewed`;
}

function getCategoryProgressPercent(progress) {
  return getProgressPercent(progress.reviewedRules, progress.applicableRules);
}

function getProgressPercent(reviewedRules, applicableRules) {
  if (applicableRules <= 0) return 0;
  return Math.round((reviewedRules / applicableRules) * 100);
}

function formatProgressMeta(reviewedRules, applicableRules, notCheckedRules, progressPercent) {
  if (applicableRules === 0) {
    return 'No applicable rules in this category.';
  }

  return `${reviewedRules} of ${applicableRules} applicable ${pluralize('rule', applicableRules)} reviewed (${progressPercent}%) · ${notCheckedRules} not checked`;
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
