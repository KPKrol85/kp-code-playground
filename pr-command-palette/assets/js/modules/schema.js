export const APP_SCHEMA_VERSION = 1;

export function isValidImportShape(payload) {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Import must be a JSON object." };
  }

  if (payload.schemaVersion !== APP_SCHEMA_VERSION) {
    return {
      valid: false,
      error: `Unsupported schemaVersion. Expected ${APP_SCHEMA_VERSION}.`,
    };
  }

  if (!["light", "dark", null, undefined].includes(payload.theme)) {
    return { valid: false, error: "Theme must be 'light', 'dark', or omitted." };
  }

  if (typeof payload.compactMode !== "boolean") {
    return { valid: false, error: "compactMode must be a boolean." };
  }

  return { valid: true };
}
