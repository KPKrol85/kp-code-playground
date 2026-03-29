const modal = document.getElementById('pathwayWizard');
const dialog = modal.querySelector('.pw-dialog');
const openBtn = document.getElementById('openWizard');
const closeBtn = document.getElementById('closeWizard');
const prevBtn = document.getElementById('prevStep');
const nextBtn = document.getElementById('nextStep');
const finishBtn = document.getElementById('finishWizard');
const stepCounter = document.getElementById('stepCounter');
const steps = Array.from(modal.querySelectorAll('.pw-step'));
const progressItems = Array.from(modal.querySelectorAll('.pw-progress-item'));

const focusSelectors =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let activeStep = 1;
let lastFocused = null;

function getFocusable() {
  return Array.from(dialog.querySelectorAll(focusSelectors)).filter((el) => !el.hidden);
}

function setStep(stepNumber) {
  activeStep = stepNumber;

  steps.forEach((step, index) => {
    const isActive = index + 1 === activeStep;
    step.classList.toggle('is-active', isActive);
    step.hidden = !isActive;
    if (!isActive) {
      step.setAttribute('aria-hidden', 'true');
    } else {
      step.removeAttribute('aria-hidden');
    }
  });

  progressItems.forEach((item, index) => {
    item.classList.toggle('is-active', index + 1 === activeStep);
    item.setAttribute('aria-current', index + 1 === activeStep ? 'step' : 'false');
  });

  prevBtn.disabled = activeStep === 1;
  nextBtn.hidden = activeStep === 3;
  finishBtn.hidden = activeStep !== 3;
  stepCounter.textContent = `Step ${activeStep} of 3`;
}

function lockScroll(shouldLock) {
  document.body.classList.toggle('pw-lock', shouldLock);
}

function openModal() {
  lastFocused = document.activeElement;
  setStep(1);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  lockScroll(true);
  const firstFocusable = getFocusable()[0];
  (firstFocusable || dialog).focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  lockScroll(false);
  if (lastFocused && typeof lastFocused.focus === 'function') {
    lastFocused.focus();
  }
}

function onKeydown(event) {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    event.preventDefault();
    closeModal();
    return;
  }

  if (event.key !== 'Tab' || !modal.classList.contains('is-open')) {
    return;
  }

  const focusable = getFocusable();
  if (focusable.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
  if (event.target.closest('[data-close="true"]')) {
    closeModal();
  }
});

prevBtn.addEventListener('click', () => {
  if (activeStep > 1) {
    setStep(activeStep - 1);
  }
});

nextBtn.addEventListener('click', () => {
  if (activeStep < 3) {
    setStep(activeStep + 1);
  }
});

finishBtn.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', onKeydown);
