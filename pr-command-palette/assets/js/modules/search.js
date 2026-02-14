function normalize(value) {
  return value.toLowerCase();
}

function matchIndex(haystack, needle) {
  return normalize(haystack).indexOf(normalize(needle));
}

export function filterActions(actions, query) {
  const trimmed = query.trim();
  if (!trimmed) {
    return actions.map((action) => ({ action, match: null }));
  }

  return actions
    .map((action) => {
      const labelMatchIndex = matchIndex(action.label, trimmed);
      const keywordMatch = action.keywords.some((keyword) => matchIndex(keyword, trimmed) >= 0);

      if (labelMatchIndex >= 0) {
        return {
          action,
          match: {
            start: labelMatchIndex,
            end: labelMatchIndex + trimmed.length,
          },
        };
      }

      if (keywordMatch) {
        return { action, match: null };
      }

      return null;
    })
    .filter(Boolean);
}

export function highlightLabel(label, match) {
  if (!match) {
    return label;
  }

  const before = label.slice(0, match.start);
  const matched = label.slice(match.start, match.end);
  const after = label.slice(match.end);
  return `${before}<mark>${matched}</mark>${after}`;
}

export function groupResults(results) {
  return results.reduce((accumulator, result) => {
    const group = result.action.group;
    if (!accumulator[group]) {
      accumulator[group] = [];
    }
    accumulator[group].push(result);
    return accumulator;
  }, {});
}
