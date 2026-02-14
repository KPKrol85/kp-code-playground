import { SmartMenu } from './modules/smart-menu.js';

const nav = document.querySelector('[data-smart-menu]');

if (nav) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nav.classList.add('smart-menu--animated');
  }

  SmartMenu.init(nav, {
    storageKey: 'pr-smart-menu-learning',
    mode: 'frequency-recency',
    pinnedItems: ['services'],
    threshold: 3,
    maxFrequent: 3,
    pinnedEnabled: true,
    homeId: 'home'
  });
}
