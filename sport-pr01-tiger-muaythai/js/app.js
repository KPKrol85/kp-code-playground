import {initTheme} from './modules/theme.js';import {initNav,initHeaderScroll} from './modules/nav.js';import {initAccordion} from './modules/accordion.js';import {initForm} from './modules/form.js';import {initReveal} from './modules/reveal.js';
function init(){initTheme();initNav();initHeaderScroll();initAccordion();initForm();initReveal();}
document.addEventListener('DOMContentLoaded',init);
