import { FEATURE_REGISTRY } from './registry.js';
import { groupBy } from './utils.js';

function createFeatureItem(feature, enabled) {
  const wrapper = document.createElement('article');
  wrapper.className = 'feature-item';

  const content = document.createElement('div');
  const heading = document.createElement('div');
  heading.className = 'feature-meta';

  const label = document.createElement('strong');
  label.textContent = feature.label;

  heading.appendChild(label);
  if (feature.beta) {
    const badge = document.createElement('span');
    badge.className = 'badge badge-beta';
    badge.textContent = 'Beta';
    heading.appendChild(badge);
  }

  const description = document.createElement('p');
  description.className = 'feature-description';
  description.textContent = feature.description;

  content.append(heading, description);

  const toggle = document.createElement('button');
  toggle.className = 'switch';
  toggle.setAttribute('role', 'switch');
  toggle.setAttribute('aria-label', `${feature.label} toggle`);
  toggle.dataset.flag = feature.id;
  toggle.setAttribute('aria-checked', String(enabled));

  wrapper.append(content, toggle);
  return wrapper;
}

export function renderFeatureRegistry(container, flags) {
  container.innerHTML = '';
  const groupedFeatures = groupBy(FEATURE_REGISTRY, 'category');

  Object.entries(groupedFeatures).forEach(([category, features]) => {
    const group = document.createElement('section');
    group.className = 'feature-group';

    const title = document.createElement('h3');
    title.textContent = category;
    group.appendChild(title);

    features.forEach((feature) => {
      group.appendChild(createFeatureItem(feature, flags[feature.id]));
    });

    container.appendChild(group);
  });
}

export function updateToggleStates(container, flags) {
  container.querySelectorAll('.switch').forEach((toggle) => {
    const flagId = toggle.dataset.flag;
    toggle.setAttribute('aria-checked', String(Boolean(flags[flagId])));
  });
}

export function renderPreview(container, flags) {
  const cards = [
    {
      id: 'commandPalette',
      title: 'Command Center',
      description: 'Universal action launcher for commands and navigation.'
    },
    {
      id: 'smartMenu',
      title: 'Smart Menu',
      description: 'Personalized menu priorities based on team behavior.'
    },
    {
      id: 'formEngine',
      title: 'Form Engine',
      description: 'Schema-driven form builder used across workflow screens.'
    },
    {
      id: 'experimentalUI',
      title: 'Experimental Shell',
      description: 'Beta UI foundations and next-generation components.'
    }
  ];

  container.innerHTML = '';
  cards.forEach((card) => {
    const enabled = flags[card.id];
    const cardElement = document.createElement('article');
    cardElement.className = `preview-card ${enabled ? '' : 'hidden'} ${flags.compactMode ? 'compact' : ''}`.trim();
    cardElement.innerHTML = `
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <p><strong>Status:</strong> ${enabled ? 'Enabled' : 'Disabled'}</p>
    `;
    container.appendChild(cardElement);
  });
}
