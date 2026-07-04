import { escapeAttribute, escapeHTML } from '../utils/sanitize.js';

export const inputField = ({ id, label, type = 'text', value = '', helper = '', error = '' }) => {
  return `
    <div class="input">
      <label class="input__label" for="${escapeAttribute(id)}">${escapeHTML(label)}</label>
      <input class="input__field ${error ? 'input__field--error' : ''}" id="${escapeAttribute(id)}" name="${escapeAttribute(id)}" type="${escapeAttribute(type)}" value="${escapeAttribute(value)}" />
      ${helper ? `<span class="input__helper">${escapeHTML(helper)}</span>` : ''}
      ${error ? `<span class="input__error">${escapeHTML(error)}</span>` : ''}
    </div>
  `;
};

export const selectField = ({ id, label, options = [], value = '', helper = '', error = '' }) => {
  return `
    <div class="input">
      <label class="input__label" for="${escapeAttribute(id)}">${escapeHTML(label)}</label>
      <select class="input__select ${error ? 'input__select--error' : ''}" id="${escapeAttribute(id)}" name="${escapeAttribute(id)}">
        ${options.map((option) => `<option value="${escapeAttribute(option.value)}" ${option.value === value ? 'selected' : ''}>${escapeHTML(option.label)}</option>`).join('')}
      </select>
      ${helper ? `<span class="input__helper">${escapeHTML(helper)}</span>` : ''}
      ${error ? `<span class="input__error">${escapeHTML(error)}</span>` : ''}
    </div>
  `;
};
