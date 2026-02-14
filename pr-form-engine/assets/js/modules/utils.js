export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getFieldKey = (field) => field.name || field.id;

export const createId = (prefix, key, suffix) => `${prefix}-${key}-${suffix}`;

export const normalizeValue = (field) => {
  if (field.type === 'checkbox') return field.checked;
  if (field.type === 'radio') return field.checked ? field.value : null;
  return field.value.trim();
};

export const collectValues = (form) => {
  const data = {};
  const formData = new FormData(form);
  for (const [key, value] of formData.entries()) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
    } else {
      data[key] = value;
    }
  }

  form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (!(checkbox.name in data)) {
      data[checkbox.name] = false;
    }
    if (checkbox.name in data && checkbox.checked && checkbox.value === 'on') {
      data[checkbox.name] = true;
    }
  });

  return data;
};
