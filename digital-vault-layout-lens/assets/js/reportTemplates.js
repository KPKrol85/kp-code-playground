export const REPORT_SECTION_IDS = Object.freeze(['cover-metadata', 'executive-summary', 'summary', 'categories', 'findings', 'notes', 'recommendations']);
export const DEFAULT_REPORT_TEMPLATE_ID = 'internal-qa';

export const REPORT_TEMPLATES = Object.freeze([
  template('internal-qa', 'Internal QA', 'Concise operational report for QA passes with technical findings, issue IDs, notes, and next-pass recommendations.', ['cover-metadata', 'executive-summary', 'summary', 'categories', 'findings', 'notes', 'recommendations'], {
    eyebrow: 'Internal QA report', intro: 'Operational QA report focused on audit status, category progress, technical findings, reviewer notes, and next-pass recommendations.',
    'cover-metadata': 'Report cover', 'executive-summary': 'Executive summary', summary: 'Audit status', categories: 'Category progress', findings: 'Technical findings', notes: 'Reviewer notes', recommendations: 'Next QA recommendations'
  }),
  template('freelancer-client', 'Freelancer / Client Delivery', 'Client-friendly report emphasizing quality score, completed review scope, important findings, and suggested next actions.', ['cover-metadata', 'executive-summary', 'summary', 'findings', 'recommendations', 'categories', 'notes'], {
    eyebrow: 'Client delivery report', intro: 'Client-friendly report focused on the quality score, completed review scope, important findings, and suggested next actions.',
    'cover-metadata': 'Project details', 'executive-summary': 'Executive summary', summary: 'Quality score', categories: 'Review scope by category', findings: 'Important findings', notes: 'Review notes', recommendations: 'Suggested next actions'
  }),
  template('agency-review', 'Agency Review', 'Professional stakeholder review with scope, category breakdown, prioritized findings, stable issue IDs, notes, and handoff recommendations.', ['cover-metadata', 'executive-summary', 'summary', 'categories', 'findings', 'recommendations', 'notes'], {
    eyebrow: 'Agency review report', intro: 'Stakeholder-ready report focused on review scope, category breakdown, prioritized findings with stable issue IDs, and handoff-ready recommendations.',
    'cover-metadata': 'Review cover', 'executive-summary': 'Executive summary', summary: 'Review scope summary', categories: 'Category breakdown', findings: 'Prioritized findings', notes: 'Reviewer notes', recommendations: 'Handoff recommendations'
  }),
  template('saas-team', 'SaaS Team', 'Product UI quality report emphasizing accessibility, responsive behavior, consistency findings, and task-trackable issue IDs.', ['cover-metadata', 'executive-summary', 'summary', 'categories', 'recommendations', 'findings', 'notes'], {
    eyebrow: 'SaaS product UI report', intro: 'Product-team report focused on UI quality, accessibility and responsive categories, consistency findings, prioritized implementation recommendations, and issue IDs for later task tracking.',
    'cover-metadata': 'Product context', 'executive-summary': 'Executive summary', summary: 'Product UI quality', categories: 'Accessibility, responsive, and UI categories', findings: 'Trackable findings', notes: 'Implementation notes', recommendations: 'Prioritized implementation recommendations'
  }),
  template('design-system-team', 'Design System Team', 'Design-system-oriented report for visual consistency, reusable patterns, accessibility, layout, and responsive behavior.', ['cover-metadata', 'executive-summary', 'summary', 'findings', 'categories', 'recommendations', 'notes'], {
    eyebrow: 'Design system quality report', intro: 'Design-system-oriented report focused on visual consistency, reusable UI patterns, component-related findings, accessibility, layout, and responsive behavior present in the audit state.',
    'cover-metadata': 'System context', 'executive-summary': 'Executive summary', summary: 'Shared UI quality', categories: 'Pattern and category coverage', findings: 'Component and consistency findings', notes: 'System quality notes', recommendations: 'Shared system recommendations'
  })
]);

function template(id, name, description, sectionOrder, labels) {
  return Object.freeze({ id, name, description, sectionOrder: Object.freeze(sectionOrder), labels: Object.freeze(labels) });
}

export function getReportTemplate(templateId = DEFAULT_REPORT_TEMPLATE_ID) {
  return REPORT_TEMPLATES.find((templateConfig) => templateConfig.id === templateId) || REPORT_TEMPLATES.find((templateConfig) => templateConfig.id === DEFAULT_REPORT_TEMPLATE_ID);
}

export function validateReportTemplates(templates = REPORT_TEMPLATES) {
  const errors = [];
  const seenIds = new Set();
  templates.forEach((templateConfig, index) => {
    if (!templateConfig || typeof templateConfig !== 'object') { errors.push(`Template ${index} must be an object.`); return; }
    if (!templateConfig.id || seenIds.has(templateConfig.id)) errors.push(`Template ${index} has a missing or duplicate id.`);
    seenIds.add(templateConfig.id);
    if (!templateConfig.name) errors.push(`Template ${templateConfig.id || index} needs a display name.`);
    if (!templateConfig.description) errors.push(`Template ${templateConfig.id || index} needs a description.`);
    REPORT_SECTION_IDS.forEach((sectionId) => {
      if (!templateConfig.sectionOrder?.includes(sectionId)) errors.push(`Template ${templateConfig.id || index} is missing section ${sectionId}.`);
      if (!templateConfig.labels?.[sectionId]) errors.push(`Template ${templateConfig.id || index} is missing label ${sectionId}.`);
    });
    if (new Set(templateConfig.sectionOrder || []).size !== REPORT_SECTION_IDS.length) errors.push(`Template ${templateConfig.id || index} has invalid section ordering.`);
  });
  return errors;
}
