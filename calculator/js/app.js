const display = document.getElementById('display');
const keypad = document.querySelector('.keypad');
const operatorKeys = document.querySelectorAll('.key--operator');
const backspaceButton = document.querySelector('.backspace');

const MAX_DISPLAY_LENGTH = 12;

const state = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  isNewEntry: true,
  lastOperation: null,
  errorState: false,
};

const operatorMap = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

const stripTrailingZeros = (value) => {
  if (!value.includes('.') && !value.includes('e')) {
    return value;
  }
  if (value.includes('e')) {
    const [base, exponent] = value.split('e');
    const trimmed = base.replace(/\.0+$|(?<=\d)0+$/, '').replace(/\.$/, '');
    return `${trimmed}e${exponent}`;
  }
  return value.replace(/\.0+$|(?<=\d)0+$/, '').replace(/\.$/, '');
};

const formatDisplay = (value) => {
  if (value === 'Error') {
    return 'Error';
  }
  if (value === '-' || value === '-0') {
    return '-0';
  }
  if (value.endsWith('.')) {
    return value;
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return 'Error';
  }
  const raw = value.replace(/^(-?)0+(\d)/, '$1$2');
  if (raw.length <= MAX_DISPLAY_LENGTH) {
    return raw;
  }
  let formatted = stripTrailingZeros(num.toPrecision(9));
  if (formatted.length > MAX_DISPLAY_LENGTH) {
    formatted = stripTrailingZeros(num.toExponential(6));
  }
  return formatted;
};

const updateDisplay = () => {
  const formatted = formatDisplay(state.currentValue);
  display.textContent = formatted;
};

const setSelectedOperator = (operator) => {
  operatorKeys.forEach((key) => {
    if (key.dataset.operator === operator) {
      key.classList.add('is-selected');
    } else {
      key.classList.remove('is-selected');
    }
  });
};

const setErrorState = () => {
  state.errorState = true;
  state.currentValue = 'Error';
  state.previousValue = null;
  state.operator = null;
  state.lastOperation = null;
  state.isNewEntry = true;
  setSelectedOperator(null);
  updateDisplay();
};

const inputDigit = (digit) => {
  if (state.errorState) {
    return;
  }
  if (state.isNewEntry) {
    state.currentValue = digit;
    state.isNewEntry = false;
  } else if (state.currentValue === '0') {
    state.currentValue = digit;
  } else if (state.currentValue.length < MAX_DISPLAY_LENGTH + 2) {
    state.currentValue += digit;
  }
  updateDisplay();
};

const inputDecimal = () => {
  if (state.errorState) {
    return;
  }
  if (state.isNewEntry) {
    state.currentValue = '0.';
    state.isNewEntry = false;
    updateDisplay();
    return;
  }
  if (!state.currentValue.includes('.')) {
    state.currentValue += '.';
    updateDisplay();
  }
};

const setOperator = (operator) => {
  if (state.errorState) {
    return;
  }
  if (state.operator && !state.isNewEntry) {
    compute();
  }
  state.operator = operator;
  state.previousValue = state.currentValue;
  state.isNewEntry = true;
  setSelectedOperator(operator);
};

const compute = () => {
  if (state.errorState) {
    return;
  }
  if (state.operator) {
    const prev = Number(state.previousValue ?? state.currentValue);
    const currentOperand = state.isNewEntry ? prev : Number(state.currentValue);
    if (state.operator === '/' && currentOperand === 0) {
      setErrorState();
      return;
    }
    const result = operatorMap[state.operator](prev, currentOperand);
    if (!Number.isFinite(result)) {
      setErrorState();
      return;
    }
    state.currentValue = String(result);
    state.previousValue = String(result);
    state.lastOperation = { operator: state.operator, operand: String(currentOperand) };
    state.operator = null;
    state.isNewEntry = true;
    setSelectedOperator(null);
    updateDisplay();
    return;
  }

  if (state.lastOperation) {
    const prev = Number(state.currentValue);
    const operand = Number(state.lastOperation.operand);
    if (state.lastOperation.operator === '/' && operand === 0) {
      setErrorState();
      return;
    }
    const result = operatorMap[state.lastOperation.operator](prev, operand);
    if (!Number.isFinite(result)) {
      setErrorState();
      return;
    }
    state.currentValue = String(result);
    state.isNewEntry = true;
    updateDisplay();
  }
};

const clearAll = () => {
  state.currentValue = '0';
  state.previousValue = null;
  state.operator = null;
  state.isNewEntry = true;
  state.lastOperation = null;
  state.errorState = false;
  setSelectedOperator(null);
  updateDisplay();
};

const toggleSign = () => {
  if (state.errorState) {
    return;
  }
  if (state.currentValue === '0') {
    return;
  }
  if (state.currentValue.startsWith('-')) {
    state.currentValue = state.currentValue.slice(1);
  } else {
    state.currentValue = `-${state.currentValue}`;
  }
  updateDisplay();
};

const percent = () => {
  if (state.errorState) {
    return;
  }
  const num = Number(state.currentValue);
  if (!Number.isFinite(num)) {
    setErrorState();
    return;
  }
  state.currentValue = String(num / 100);
  state.isNewEntry = false;
  updateDisplay();
};

const backspace = () => {
  if (state.errorState) {
    return;
  }
  if (state.isNewEntry) {
    return;
  }
  if (state.currentValue.length <= 1 || (state.currentValue.length === 2 && state.currentValue.startsWith('-'))) {
    state.currentValue = '0';
    state.isNewEntry = true;
  } else {
    state.currentValue = state.currentValue.slice(0, -1);
  }
  updateDisplay();
};

const handleAction = (action, payload) => {
  switch (action) {
    case 'digit':
      inputDigit(payload);
      break;
    case 'decimal':
      inputDecimal();
      break;
    case 'operator':
      setOperator(payload);
      break;
    case 'equals':
      compute();
      break;
    case 'clear':
      clearAll();
      break;
    case 'sign':
      toggleSign();
      break;
    case 'percent':
      percent();
      break;
    case 'backspace':
      backspace();
      break;
    default:
      break;
  }
};

keypad.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }
  if (state.errorState && button.dataset.action !== 'clear') {
    return;
  }
  const { action } = button.dataset;
  if (action === 'digit') {
    handleAction(action, button.dataset.digit);
    return;
  }
  if (action === 'operator') {
    handleAction(action, button.dataset.operator);
    return;
  }
  handleAction(action);
});

backspaceButton.addEventListener('click', () => {
  if (state.errorState) {
    return;
  }
  backspace();
});

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key >= '0' && key <= '9') {
    event.preventDefault();
    inputDigit(key);
    return;
  }
  if (key === '.') {
    event.preventDefault();
    inputDecimal();
    return;
  }
  if (['+', '-', '*', '/'].includes(key)) {
    event.preventDefault();
    setOperator(key);
    return;
  }
  if (key === 'Enter' || key === '=') {
    event.preventDefault();
    compute();
    return;
  }
  if (key === 'Backspace') {
    event.preventDefault();
    backspace();
    return;
  }
  if (key === 'Escape') {
    event.preventDefault();
    clearAll();
  }
});

updateDisplay();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

// Manual test checklist: podstawowe działania, powtarzanie =, procent, +/- oraz AC, Backspace, Error dla dzielenia przez 0, nawigacja klawiaturą, PWA offline/instalacja.
