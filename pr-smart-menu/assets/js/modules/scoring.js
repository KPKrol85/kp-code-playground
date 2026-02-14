const dayMs = 24 * 60 * 60 * 1000;

const scoringModes = {
  'frequency-recency': (item, latestTimestamp) => item.clickCount * 1 + recencyFactor(item.lastUsedAt, latestTimestamp) * 0.75,
  frequency: (item) => item.clickCount,
  recency: (item, latestTimestamp) => recencyFactor(item.lastUsedAt, latestTimestamp)
};

function recencyFactor(timestamp, latestTimestamp) {
  if (!timestamp) return 0;
  if (!latestTimestamp) return 1;
  const ageDays = Math.max((latestTimestamp - timestamp) / dayMs, 0);
  return 1 / (1 + ageDays);
}

export function scoreItems(items, mode = 'frequency-recency') {
  const scorer = scoringModes[mode] || scoringModes['frequency-recency'];
  const latestTimestamp = items.reduce((latest, item) => Math.max(latest, item.lastUsedAt || 0), 0);
  return items.map((item) => ({ ...item, score: scorer(item, latestTimestamp) }));
}

export function reorderItems({
  baseItems,
  metrics,
  pinnedIds,
  homeId,
  threshold,
  totalInteractions,
  mode,
  smartMode,
  pinnedEnabled
}) {
  const metricsById = new Map(metrics.map((item) => [item.id, item]));
  const enriched = baseItems.map((item, index) => ({
    ...item,
    originalIndex: index,
    ...(metricsById.get(item.id) || {})
  }));

  if (!smartMode || totalInteractions < threshold) return enriched;

  const pinnedSet = pinnedEnabled ? new Set(pinnedIds) : new Set();
  const pinned = [];
  const staticItems = [];
  const sortable = [];

  enriched.forEach((item) => {
    if (item.id === homeId) {
      staticItems.push(item);
    } else if (pinnedSet.has(item.id)) {
      pinned.push(item);
    } else {
      sortable.push(item);
    }
  });

  const scored = scoreItems(sortable, mode).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  });

  const result = [];
  result.push(...staticItems.sort((a, b) => a.originalIndex - b.originalIndex));
  result.push(...pinned.sort((a, b) => a.originalIndex - b.originalIndex));
  result.push(...scored);

  return result;
}

export function topFrequent({ baseItems, metrics, maxFrequent, mode, homeId }) {
  const metricsById = new Map(metrics.map((item) => [item.id, item]));
  const scored = scoreItems(
    baseItems
      .map((item, index) => ({ ...item, originalIndex: index, ...(metricsById.get(item.id) || {}) }))
      .filter((item) => item.id !== homeId),
    mode
  )
    .filter((item) => item.clickCount > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.originalIndex - b.originalIndex;
    });

  return scored.slice(0, maxFrequent);
}
