import { initAccordion } from './modules/accordion.js';
import { initBackToTop } from './modules/back-to-top.js';
import { initContactForm } from './modules/form.js';
import { initMenu } from './modules/menu.js';
import { initReveal } from './modules/reveal.js';
import { initTabs } from './modules/tabs.js';
import { initTheme } from './modules/theme.js';

const bootstrap = () => {
  initTheme();
  initMenu();
  initReveal();
  initAccordion();
  initTabs();
  initBackToTop();
  initContactForm();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
