export const SCHEMA_VERSION = 1;

export const FEATURE_REGISTRY = [
  {
    id: 'commandPalette',
    label: 'Command Palette',
    description: 'Enable global quick actions for power users with keyboard launch.',
    category: 'Navigation'
  },
  {
    id: 'smartMenu',
    label: 'Smart Menu',
    description: 'Context-aware menu that prioritizes actions based on usage.',
    category: 'Navigation'
  },
  {
    id: 'formEngine',
    label: 'Dynamic Form Engine',
    description: 'Switch forms to render from configuration definitions.',
    category: 'Forms'
  },
  {
    id: 'experimentalUI',
    label: 'Experimental UI',
    description: 'Activates the beta shell and new visual system.',
    category: 'Experience',
    beta: true
  },
  {
    id: 'compactMode',
    label: 'Compact Mode',
    description: 'Reduce spacing density for information-heavy views.',
    category: 'Experience'
  }
];

export const DEFAULT_FLAGS = FEATURE_REGISTRY.reduce((accumulator, feature) => {
  accumulator[feature.id] = false;
  return accumulator;
}, {});
