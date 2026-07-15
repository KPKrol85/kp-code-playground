export const MAX_ANNOTATION_NOTE_LENGTH = 240;

function normalizeText(value, maxLength = MAX_ANNOTATION_NOTE_LENGTH) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function normalizeWidth(value) {
  const numeric = Number(value);
  return Number.isSafeInteger(numeric) && numeric > 0 ? numeric : 0;
}

export function createInitialAnnotationState() {
  return { nextNumber: 1, items: [] };
}

export function normalizeFocusedElementMetadata(value) {
  if (!value || typeof value !== 'object') return null;
  const type = normalizeText(value.type, 40);
  const name = normalizeText(value.name, 100);
  const details = normalizeText(value.details, 140);
  const position = normalizeText(value.position, 40);
  const parts = { type, name, details, position };
  if (!Object.values(parts).some(Boolean)) return null;
  return parts;
}

export function createPreviewAnnotation(state, input = {}) {
  const currentState = state && Array.isArray(state.items) ? state : createInitialAnnotationState();
  const note = normalizeText(input.note);
  if (!note) return { state: currentState, annotation: null, error: 'Annotation note is required.' };
  const number = Number.isSafeInteger(currentState.nextNumber) && currentState.nextNumber > 0 ? currentState.nextNumber : currentState.items.length + 1;
  const annotation = {
    id: `preview-annotation-${number}`,
    note,
    viewportWidth: normalizeWidth(input.viewportWidth),
    overlayMode: normalizeText(input.overlayMode || 'off', 40) || 'off',
    focusedElement: normalizeFocusedElementMetadata(input.focusedElement),
    createdAt: normalizeText(input.createdAt || new Date().toISOString(), 40),
    updatedAt: null
  };
  return { state: { nextNumber: number + 1, items: [...currentState.items, annotation] }, annotation, error: null };
}

export function updatePreviewAnnotation(state, id, input = {}) {
  const currentState = state && Array.isArray(state.items) ? state : createInitialAnnotationState();
  const note = normalizeText(input.note);
  if (!note) return { state: currentState, annotation: null, error: 'Annotation note is required.' };
  let updated = null;
  const items = currentState.items.map((item) => {
    if (item.id !== id) return item;
    updated = { ...item, note, updatedAt: normalizeText(input.updatedAt || new Date().toISOString(), 40) };
    return updated;
  });
  return { state: { ...currentState, items }, annotation: updated, error: updated ? null : 'Annotation not found.' };
}

export function deletePreviewAnnotation(state, id) {
  const currentState = state && Array.isArray(state.items) ? state : createInitialAnnotationState();
  const items = currentState.items.filter((item) => item.id !== id);
  return { state: { ...currentState, items }, deleted: items.length !== currentState.items.length };
}
