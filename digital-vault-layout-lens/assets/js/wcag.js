export const WCAG_LEVELS = new Set(['A', 'AA', 'AAA']);
export const WCAG_CRITERION_PATTERN = /^[1-4]\.\d{1,2}\.\d{1,2}$/;

export const WCAG = Object.freeze({
  nonTextContent: Object.freeze({ criterion: '1.1.1', level: 'A', title: 'Non-text Content' }),
  infoAndRelationships: Object.freeze({ criterion: '1.3.1', level: 'A', title: 'Info and Relationships' }),
  reflow: Object.freeze({ criterion: '1.4.10', level: 'AA', title: 'Reflow' }),
  keyboard: Object.freeze({ criterion: '2.1.1', level: 'A', title: 'Keyboard' }),
  focusVisible: Object.freeze({ criterion: '2.4.7', level: 'AA', title: 'Focus Visible' }),
  linkPurpose: Object.freeze({ criterion: '2.4.4', level: 'A', title: 'Link Purpose (In Context)' }),
  headingsLabels: Object.freeze({ criterion: '2.4.6', level: 'AA', title: 'Headings and Labels' }),
  labelsInstructions: Object.freeze({ criterion: '3.3.2', level: 'A', title: 'Labels or Instructions' }),
  nameRoleValue: Object.freeze({ criterion: '4.1.2', level: 'A', title: 'Name, Role, Value' })
});

export function cloneWcag(entries) {
  return Array.isArray(entries) ? entries.map(({ criterion, level, title }) => ({ criterion, level, title })) : undefined;
}

export function validateWcagMappings(wcag) {
  const errors = [];
  if (wcag === undefined) return errors;
  if (!Array.isArray(wcag)) return ['WCAG metadata must be an array when present.'];
  const seen = new Set();
  wcag.forEach((entry, index) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) { errors.push(`WCAG entry ${index} must be an object.`); return; }
    if (typeof entry.criterion !== 'string' || !WCAG_CRITERION_PATTERN.test(entry.criterion)) errors.push(`WCAG entry ${index} has invalid criterion.`);
    if (!WCAG_LEVELS.has(entry.level)) errors.push(`WCAG entry ${index} has unsupported level.`);
    if (typeof entry.title !== 'string' || !entry.title.trim()) errors.push(`WCAG entry ${index} must include a non-empty title.`);
    if (seen.has(entry.criterion)) errors.push(`Duplicate WCAG criterion "${entry.criterion}".`);
    seen.add(entry.criterion);
  });
  return errors;
}
