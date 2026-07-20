// Session-only local controls. This policy deliberately measures packages, not provider usage.
export const AI_USAGE_POLICY = Object.freeze({ prepareCooldownMs: 1200, copyCooldownMs: 1200, maxPreparedRequestsPerSession: 12, maxCopiedRequestsPerSession: 12 });

export function createAiUsageState() { return Object.freeze({ prepared: 0, copied: 0, lastPreparedAt: 0, lastCopiedAt: 0 }); }

export function measureAiRequestPackage(request) {
  const text = typeof request === 'string' ? request : JSON.stringify(request, replacer);
  const evidence = request?.evidence || {};
  const findings = [...(evidence.manualFindings || []), ...(evidence.analyzerFindings || [])];
  return Object.freeze({ characters: text.length, evidenceCount: Array.isArray(request?.evidenceIds) ? request.evidenceIds.length : 0, snippetCount: findings.filter((item) => item.evidenceSnippet).length });
}

export function allowAiUsageAction(state = createAiUsageState(), action, now = Date.now(), policy = AI_USAGE_POLICY) {
  const current = state || createAiUsageState();
  const isPrepare = action === 'prepare';
  const count = isPrepare ? current.prepared : current.copied;
  const limit = isPrepare ? policy.maxPreparedRequestsPerSession : policy.maxCopiedRequestsPerSession;
  const lastAt = isPrepare ? current.lastPreparedAt : current.lastCopiedAt;
  const cooldown = isPrepare ? policy.prepareCooldownMs : policy.copyCooldownMs;
  if (count >= limit) return Object.freeze({ ok: false, reason: 'session-limit', state: current });
  if (lastAt && now - lastAt < cooldown) return Object.freeze({ ok: false, reason: 'cooldown', state: current });
  const next = { ...current, [isPrepare ? 'prepared' : 'copied']: count + 1, [isPrepare ? 'lastPreparedAt' : 'lastCopiedAt']: now };
  return Object.freeze({ ok: true, state: Object.freeze(next) });
}

export function aiUsageSummary(state = createAiUsageState(), policy = AI_USAGE_POLICY) {
  return Object.freeze({ prepared: state.prepared, copied: state.copied, prepareLimit: policy.maxPreparedRequestsPerSession, copyLimit: policy.maxCopiedRequestsPerSession, disclaimer: 'Layout Lens does not know or calculate provider price, token usage, network latency, or external model execution time.' });
}

function replacer(key, value) { return key === 'packageMeasurement' || value instanceof Map ? undefined : value; }
