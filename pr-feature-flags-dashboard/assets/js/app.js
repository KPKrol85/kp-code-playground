import { announce } from './modules/a11y.js';
import { FeatureFlags } from './modules/feature-flags.js';
import { DEFAULT_FLAGS, FEATURE_REGISTRY, SCHEMA_VERSION } from './modules/registry.js';
import { downloadJSON } from './modules/utils.js';
import { renderFeatureRegistry, renderPreview, updateToggleStates } from './modules/ui.js';

const featureGroups = document.getElementById('featureGroups');
const previewArea = document.getElementById('previewArea');
const exportBtn = document.getElementById('exportFlags');
const importInput = document.getElementById('importFlags');
const resetBtn = document.getElementById('resetFlags');

function renderAll(flags) {
  renderFeatureRegistry(featureGroups, flags);
  renderPreview(previewArea, flags);
}

function applyFromImport(parsed) {
  if (parsed.schemaVersion !== SCHEMA_VERSION || !parsed.flags || typeof parsed.flags !== 'object') {
    throw new Error('Invalid schema version or payload structure.');
  }

  Object.keys(DEFAULT_FLAGS).forEach((flagId) => {
    FeatureFlags.set(flagId, Boolean(parsed.flags[flagId]));
  });
}

function handleToggleInteraction(event) {
  const switchButton = event.target.closest('.switch');
  if (!switchButton) {
    return;
  }

  const flagId = switchButton.dataset.flag;
  const next = FeatureFlags.toggle(flagId);
  updateToggleStates(featureGroups, FeatureFlags.all());
  renderPreview(previewArea, FeatureFlags.all());

  const feature = FEATURE_REGISTRY.find((item) => item.id === flagId);
  announce(`${feature?.label || flagId} ${next ? 'enabled' : 'disabled'}.`);
}

featureGroups?.addEventListener('click', handleToggleInteraction);

featureGroups?.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    handleToggleInteraction(event);
  }
});

exportBtn?.addEventListener('click', () => {
  downloadJSON(
    {
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      flags: FeatureFlags.all()
    },
    'kp-feature-flags.json'
  );
  announce('Feature flags exported as JSON.');
});

importInput?.addEventListener('change', async (event) => {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  try {
    const parsed = JSON.parse(await file.text());
    applyFromImport(parsed);
    updateToggleStates(featureGroups, FeatureFlags.all());
    renderPreview(previewArea, FeatureFlags.all());
    announce('Feature flags imported successfully.');
  } catch (error) {
    announce('Import failed. Please check schemaVersion and file format.');
  } finally {
    importInput.value = '';
  }
});

resetBtn?.addEventListener('click', () => {
  const resetState = FeatureFlags.reset();
  updateToggleStates(featureGroups, resetState);
  renderPreview(previewArea, resetState);
  announce('Feature flags reset to defaults.');
});

const initialFlags = FeatureFlags.init();
renderAll(initialFlags);

FeatureFlags.onChange(({ state }) => {
  if (state) {
    updateToggleStates(featureGroups, state);
  }
});
