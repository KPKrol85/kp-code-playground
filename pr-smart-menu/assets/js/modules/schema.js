const itemShape = (item) =>
  item &&
  typeof item.id === 'string' &&
  typeof item.clickCount === 'number' &&
  (item.lastUsedAt === null || typeof item.lastUsedAt === 'number') &&
  (item.firstUsedAt === null || typeof item.firstUsedAt === 'number') &&
  typeof item.visitsCount === 'number';

export function isValidSchema(payload) {
  return (
    payload &&
    payload.schemaVersion === 1 &&
    payload.settings &&
    typeof payload.settings.smartMode === 'boolean' &&
    typeof payload.settings.sortMode === 'string' &&
    typeof payload.settings.maxFrequent === 'number' &&
    typeof payload.settings.pinnedEnabled === 'boolean' &&
    Array.isArray(payload.items) &&
    payload.items.every(itemShape)
  );
}
