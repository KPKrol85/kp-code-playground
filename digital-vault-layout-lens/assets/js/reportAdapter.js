import { buildManualAuditReportData } from './reportData.js';

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach((entry) => deepFreeze(entry));
  return value;
}

export function adaptManualAuditReport(input = {}) {
  return deepFreeze(buildManualAuditReportData(input));
}
