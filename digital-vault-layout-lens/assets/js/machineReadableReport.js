import { AUDIT_SCHEMA_VERSION } from './auditStorage.js';
import { RULE_SCHEMA_VERSION } from './auditRules.js';
import { normalizeReportNote, normalizeReportText } from './reportData.js';

export const MACHINE_READABLE_REPORT_SCHEMA_VERSION = 1;
export const MACHINE_READABLE_REPORT_PRODUCT_ID = 'kp-code-digital-vault-layout-lens';
const FORMAT = 'manual-audit-json';
const SEVERITIES = new Set(['low', 'medium', 'high']);
const PRIORITIES = new Set(['low', 'medium', 'high']);

// This intentionally consumes only the immutable manual report adapter model. It never reads UI,
// persistence, preview, analyzer, or AI state.
export function createMachineReadableReport(report, { generatedAt = new Date().toISOString() } = {}) {
  const metadata = cleanMetadata(report?.metadata);
  const output = {
    metadata: { productId: MACHINE_READABLE_REPORT_PRODUCT_ID, schemaVersion: MACHINE_READABLE_REPORT_SCHEMA_VERSION, format: FORMAT, generatedAt: normalizeTimestamp(generatedAt), ruleSchemaVersion: RULE_SCHEMA_VERSION, auditStorageSchemaVersion: AUDIT_SCHEMA_VERSION, template: reference(report?.template) },
    audit: { preset: reference(report?.preset), rulePack: reference(report?.rulePack), severityProfile: reference(report?.severityProfile), ...(Object.keys(metadata).length ? { context: metadata } : {}) },
    scores: cleanScore(report?.score, report?.executiveSummary),
    categories: (Array.isArray(report?.categoryScores) ? report.categoryScores : []).map(cleanCategory).sort(categoryOrder),
    findings: (Array.isArray(report?.findings) ? report.findings : []).map(cleanFinding).sort(byIssueId),
    recommendations: (Array.isArray(report?.recommendations) ? report.recommendations : []).map(cleanRecommendation).sort(byIssueId),
    summary: cleanSummary(report?.executiveSummary)
  };
  validateMachineReadableReport(output);
  return deepFreeze(output);
}

export function getMachineReadableStablePayload(machineReport) {
  const { generatedAt, ...stableMetadata } = machineReport.metadata || {};
  return { ...machineReport, metadata: stableMetadata };
}

export function stringifyMachineReadableReport(machineReport) {
  validateMachineReadableReport(machineReport);
  return `${JSON.stringify(machineReport, null, 2)}\n`;
}

export function normalizeMachineReadableFilename(value = 'layout-lens-audit-report') {
  const safe = normalizeReportText(value, 80).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${safe || 'layout-lens-audit-report'}.json`;
}

export function downloadMachineReadableReport(machineReport, { documentRef = globalThis.document, URLRef = globalThis.URL, BlobRef = globalThis.Blob, filename } = {}) {
  if (!documentRef?.createElement || !documentRef?.body?.append || !URLRef?.createObjectURL || !URLRef?.revokeObjectURL || !BlobRef) return { ok: false, reason: 'unavailable' };
  try {
    const blob = new BlobRef([stringifyMachineReadableReport(machineReport)], { type: 'application/json;charset=utf-8' });
    const link = documentRef.createElement('a');
    const objectUrl = URLRef.createObjectURL(blob);
    try {
      link.href = objectUrl;
      link.download = normalizeMachineReadableFilename(filename);
      documentRef.body.append(link);
      link.click();
      return { ok: true, filename: link.download };
    } finally {
      link.remove();
      URLRef.revokeObjectURL(objectUrl);
    }
  } catch {
    return { ok: false, reason: 'failed' };
  }
}

export function validateMachineReadableReport(value) {
  assertObject(value, ['metadata', 'audit', 'scores', 'categories', 'findings', 'recommendations', 'summary']);
  assertObject(value.metadata, ['productId', 'schemaVersion', 'format', 'generatedAt', 'ruleSchemaVersion', 'auditStorageSchemaVersion', 'template']);
  if (value.metadata.productId !== MACHINE_READABLE_REPORT_PRODUCT_ID || value.metadata.schemaVersion !== MACHINE_READABLE_REPORT_SCHEMA_VERSION || value.metadata.format !== FORMAT) throw new Error('Unsupported machine-readable report schema.');
  if (!Number.isInteger(value.metadata.ruleSchemaVersion) || !Number.isInteger(value.metadata.auditStorageSchemaVersion) || !isIsoTimestamp(value.metadata.generatedAt)) throw new Error('Invalid machine-readable report metadata.');
  assertReference(value.metadata.template); assertObject(value.audit, ['preset', 'rulePack', 'severityProfile', 'context']); assertReference(value.audit.preset); assertReference(value.audit.rulePack); assertReference(value.audit.severityProfile);
  if (value.audit.context !== undefined) { assertObject(value.audit.context, ['projectName', 'owner', 'projectType', 'targetUrl', 'reviewer', 'reviewDate']); Object.values(value.audit.context).forEach(assertText); }
  assertObject(value.scores, ['weightedScore', 'scoreAvailable', 'earnedPoints', 'possiblePoints', 'totalRules', 'checkedRules', 'passedRules', 'needsWorkRules', 'notApplicableRules', 'notCheckedRules', 'reviewedRules', 'applicableRules', 'completionPercent']);
  Object.entries(value.scores).forEach(([key, item]) => { if (key === 'weightedScore') { if (item !== null) assertPercent(item); } else if (key === 'scoreAvailable') { if (typeof item !== 'boolean') throw new Error('Invalid score availability.'); } else if (key === 'earnedPoints' || key === 'possiblePoints') assertNumber(item); else assertCount(item); });
  assertArray(value.categories, 'categoryId', validateCategory); assertArray(value.findings, 'issueId', validateFinding); assertArray(value.recommendations, 'issueId', validateRecommendation); assertObject(value.summary, ['needsWorkFindings', 'passingRules', 'severityCounts', 'strengths', 'priorities']);
  assertCount(value.summary.needsWorkFindings); assertCount(value.summary.passingRules); assertObject(value.summary.severityCounts, ['low', 'medium', 'high']); Object.values(value.summary.severityCounts).forEach(assertCount); assertArray(value.summary.strengths, 'id', validateSummaryCategory); assertArray(value.summary.priorities, 'id', validateSummaryCategory);
  return true;
}

function reference(value = {}) { return { id: normalizeReportText(value.id, 120), name: normalizeReportText(value.name, 240) }; }
function cleanMetadata(value) { return Object.fromEntries(Object.entries(value || {}).map(([key, item]) => [key, normalizeReportText(item)]).filter(([, item]) => item)); }
function cleanScore(score = {}, summary = {}) { return { weightedScore: numberOrNull(score.scorePercent), scoreAvailable: score.scorePercent !== null && score.scorePercent !== undefined, earnedPoints: number(score.earnedPoints), possiblePoints: number(score.possiblePoints), totalRules: count(score.totalRules), checkedRules: count(score.checkedRules), passedRules: count(score.passedRules), needsWorkRules: count(score.needsWorkRules), notApplicableRules: count(score.notApplicableRules), notCheckedRules: count(score.notCheckedRules), reviewedRules: count(summary.reviewedRules), applicableRules: count(summary.applicableRules), completionPercent: numberOrNull(summary.completionPercent) }; }
function cleanCategory(item = {}) { return { categoryId: normalizeReportText(item.categoryId, 120), categoryName: normalizeReportText(item.categoryName, 240), weightedScore: numberOrNull(item.scorePercent), scoreAvailable: item.scorePercent !== null && item.scorePercent !== undefined, reviewedRules: count(item.reviewedRules), applicableRules: count(item.applicableRules), needsWorkRules: count(item.needsWorkRules), passedRules: count(item.passedRules), notApplicableRules: count(item.notApplicableRules), notCheckedRules: count(item.notCheckedRules) }; }
function cleanFinding(item = {}) { const note = normalizeReportNote(item.note); return { issueId: normalizeReportText(item.issueId, 180), ruleId: normalizeReportText(item.ruleId, 160), title: normalizeReportText(item.title), description: normalizeReportText(item.description, 1000), categoryName: normalizeReportText(item.categoryName), severity: severity(item.severity), ...(note ? { reviewerNote: note } : {}) }; }
function cleanRecommendation(item = {}) { return { issueId: normalizeReportText(item.issueId, 180), id: normalizeReportText(item.id, 180), title: normalizeReportText(item.title), description: normalizeReportText(item.description, 1000), categoryName: normalizeReportText(item.categoryName), priority: priority(item.priority) }; }
function cleanSummary(summary = {}) { return { needsWorkFindings: count(summary.needsWorkFindings), passingRules: count(summary.passingRules), severityCounts: Object.fromEntries(['low', 'medium', 'high'].map((key) => [key, count(summary.severityCounts?.[key])])), strengths: (summary.strengths || []).map(cleanSummaryCategory).sort(summaryCategoryOrder), priorities: (summary.priorities || []).map(cleanSummaryCategory).sort(summaryCategoryOrder) }; }
function cleanSummaryCategory(item = {}) { return { id: normalizeReportText(item.id, 120), name: normalizeReportText(item.name, 240), weightedScore: numberOrNull(item.scorePercent), reviewedRules: count(item.reviewedRules), applicableRules: count(item.applicableRules), needsWorkRules: count(item.needsWorkRules) }; }
function number(value) { return Number.isFinite(value) && value >= 0 ? Math.round(value * 100) / 100 : 0; } function count(value) { return Number.isInteger(value) && value >= 0 ? value : 0; } function numberOrNull(value) { return Number.isFinite(value) && value >= 0 ? Math.round(value * 100) / 100 : null; } function severity(value) { return SEVERITIES.has(value) ? value : 'medium'; } function priority(value) { return PRIORITIES.has(value) ? value : 'medium'; }
function categoryOrder(a, b) { return a.categoryId.localeCompare(b.categoryId) || a.categoryName.localeCompare(b.categoryName); } function byIssueId(a, b) { return a.issueId.localeCompare(b.issueId) || a.id?.localeCompare(b.id || '') || 0; } function summaryCategoryOrder(a, b) { return a.id.localeCompare(b.id); }
function normalizeTimestamp(value) { const parsed = new Date(value); if (!isIsoTimestamp(parsed.toISOString())) throw new Error('Invalid report generation timestamp.'); return parsed.toISOString(); } function isIsoTimestamp(value) { return typeof value === 'string' && !Number.isNaN(Date.parse(value)); }
function assertObject(value, allowed) { if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).some((key) => !allowed.includes(key))) throw new Error('Invalid or unknown machine-readable report field.'); } function assertReference(value) { assertObject(value, ['id', 'name']); assertText(value.id); assertText(value.name); } function assertText(value) { if (typeof value !== 'string') throw new Error('Invalid report text.'); } function assertCount(value) { if (!Number.isInteger(value) || value < 0) throw new Error('Invalid report count.'); } function assertNumber(value) { if (!Number.isFinite(value) || value < 0) throw new Error('Invalid report number.'); } function assertPercent(value) { if (!Number.isFinite(value) || value < 0 || value > 100) throw new Error('Invalid report percentage.'); } function assertArray(value, uniqueKey, validator) { if (!Array.isArray(value)) throw new Error('Invalid report array.'); const seen = new Set(); value.forEach((item) => { validator(item); if (!item[uniqueKey] || seen.has(item[uniqueKey])) throw new Error('Duplicate or missing report identifier.'); seen.add(item[uniqueKey]); }); }
function validateCategory(value) { assertObject(value, ['categoryId', 'categoryName', 'weightedScore', 'scoreAvailable', 'reviewedRules', 'applicableRules', 'needsWorkRules', 'passedRules', 'notApplicableRules', 'notCheckedRules']); assertText(value.categoryId); assertText(value.categoryName); if (value.weightedScore !== null) assertPercent(value.weightedScore); if (typeof value.scoreAvailable !== 'boolean') throw new Error('Invalid category score availability.'); ['reviewedRules', 'applicableRules', 'needsWorkRules', 'passedRules', 'notApplicableRules', 'notCheckedRules'].forEach((key) => assertCount(value[key])); }
function validateFinding(value) { assertObject(value, ['issueId', 'ruleId', 'title', 'description', 'categoryName', 'severity', 'reviewerNote']); ['issueId', 'ruleId', 'title', 'description', 'categoryName'].forEach((key) => assertText(value[key])); if (!SEVERITIES.has(value.severity)) throw new Error('Invalid finding severity.'); if (value.reviewerNote !== undefined) assertText(value.reviewerNote); }
function validateRecommendation(value) { assertObject(value, ['issueId', 'id', 'title', 'description', 'categoryName', 'priority']); ['issueId', 'id', 'title', 'description', 'categoryName'].forEach((key) => assertText(value[key])); if (!PRIORITIES.has(value.priority)) throw new Error('Invalid recommendation priority.'); }
function validateSummaryCategory(value) { assertObject(value, ['id', 'name', 'weightedScore', 'reviewedRules', 'applicableRules', 'needsWorkRules']); assertText(value.id); assertText(value.name); if (value.weightedScore !== null) assertPercent(value.weightedScore); ['reviewedRules', 'applicableRules', 'needsWorkRules'].forEach((key) => assertCount(value[key])); }
function deepFreeze(value) { if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value; Object.freeze(value); Object.values(value).forEach(deepFreeze); return value; }
