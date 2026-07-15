import { WCAG } from './wcag.js';

export const RULE_SCHEMA_VERSION = 2;

export const auditRuleSchemaMetadata = {
  schemaName: 'kp-layout-lens-rule-schema',
  schemaVersion: RULE_SCHEMA_VERSION,
  compatibleAuditStateVersions: [1],
  compatibleRuleSchemaVersions: [1, 2],
  ruleIdStrategy: 'stable-human-readable-ids',
  migrationNote: 'Persisted audit drafts store this rule schema version so future rule data changes can trigger safe migrations.'
};

export const auditCategories = [
  'Layout structure',
  'Responsive behavior',
  'Accessibility basics',
  'Forms and controls',
  'Navigation and interaction',
  'Visual consistency',
  'Content clarity',
  'Performance hygiene'
];

export const auditRules = [
  { id: 'layout-landmarks', category: 'Layout structure', title: 'Page regions are easy to identify', description: 'Header, main content, navigation, side panels, and footer areas are visually and semantically clear.', severity: 'high', wcag: [WCAG.infoAndRelationships] },
  { id: 'layout-hierarchy', category: 'Layout structure', title: 'Visual hierarchy supports the main task', description: 'The most important heading, action, and content group stand out before secondary information.', severity: 'high' },
  { id: 'layout-alignment', category: 'Layout structure', title: 'Elements align to a consistent structure', description: 'Cards, controls, and text blocks line up predictably instead of feeling randomly placed.', severity: 'medium' },
  { id: 'layout-overflow', category: 'Layout structure', title: 'Content avoids clipping and horizontal overflow', description: 'Long labels, cards, tables, and controls remain readable without unexpected sideways scrolling.', severity: 'high', wcag: [WCAG.reflow] },
  { id: 'responsive-mobile-layout', category: 'Responsive behavior', title: 'Mobile layout remains usable', description: 'The interface stacks cleanly on narrow screens and keeps primary actions reachable.', severity: 'high', wcag: [WCAG.reflow] },
  { id: 'responsive-tablet-desktop', category: 'Responsive behavior', title: 'Medium and wide layouts use space well', description: 'Tablet and desktop views avoid awkward empty areas, cramped panels, or oversized line lengths.', severity: 'medium' },
  { id: 'responsive-touch-targets', category: 'Responsive behavior', title: 'Touch targets are comfortable', description: 'Buttons, links, selects, and inputs are large enough and spaced well for touch use.', severity: 'medium' },
  { id: 'responsive-content-reflow', category: 'Responsive behavior', title: 'Content reflows without losing meaning', description: 'Important labels, status text, and relationships still make sense after the layout changes.', severity: 'medium', wcag: [WCAG.reflow, WCAG.infoAndRelationships] },
  { id: 'accessibility-keyboard', category: 'Accessibility basics', title: 'Keyboard users can operate the UI', description: 'All interactive elements can be reached, used, and exited with a keyboard.', severity: 'high', wcag: [WCAG.keyboard] },
  { id: 'accessibility-focus', category: 'Accessibility basics', title: 'Focus states are visible', description: 'Links, buttons, and form controls show a clear focus indicator that is not color-only.', severity: 'high', wcag: [WCAG.focusVisible] },
  { id: 'accessibility-labels', category: 'Accessibility basics', title: 'Controls have meaningful labels', description: 'Inputs, selects, buttons, and icon actions have clear visible or accessible names.', severity: 'high', wcag: [WCAG.headingsLabels, WCAG.nameRoleValue] },
  { id: 'accessibility-contrast', category: 'Accessibility basics', title: 'Text contrast is sufficient', description: 'Body text, labels, links, and status badges remain readable against their backgrounds.', severity: 'high' },
  { id: 'forms-label-placement', applicability: { patterns: ['form-controls'] }, category: 'Forms and controls', title: 'Form labels stay connected to fields', description: 'Users can quickly understand what each field asks for, including on small screens.', severity: 'high', wcag: [WCAG.labelsInstructions] },
  { id: 'forms-help-errors', applicability: { patterns: ['form-controls'] }, category: 'Forms and controls', title: 'Help and error messages are clear', description: 'Supporting text explains requirements, and errors describe how to fix the problem.', severity: 'medium', wcag: [WCAG.labelsInstructions] },
  { id: 'forms-states', category: 'Forms and controls', title: 'Control states are distinguishable', description: 'Default, hover, focus, disabled, selected, and error states are understandable.', severity: 'medium' },
  { id: 'forms-native-controls', category: 'Forms and controls', title: 'Native controls are preferred where possible', description: 'The UI uses real buttons, links, inputs, selects, and labels instead of generic clickable elements.', severity: 'high', wcag: [WCAG.nameRoleValue] },
  { id: 'nav-current-location', applicability: { patterns: ['workspace-navigation'] }, category: 'Navigation and interaction', title: 'Current location is understandable', description: 'Users can tell where they are and what section or workflow step they are reviewing.', severity: 'medium' },
  { id: 'nav-primary-actions', category: 'Navigation and interaction', title: 'Primary actions are obvious', description: 'The most important next action is visible, clearly worded, and not competing with too many choices.', severity: 'high' },
  { id: 'nav-feedback', category: 'Navigation and interaction', title: 'Interactions provide feedback', description: 'Users receive a clear response after changing status, submitting input, opening panels, or triggering actions.', severity: 'medium' },
  { id: 'nav-no-dead-ends', category: 'Navigation and interaction', title: 'No obvious dead ends', description: 'Empty states, disabled actions, and finished steps explain what the user can do next.', severity: 'medium' },
  { id: 'visual-spacing', category: 'Visual consistency', title: 'Spacing follows a repeatable rhythm', description: 'Margins, gaps, and padding feel intentional across sections, cards, and controls.', severity: 'medium' },
  { id: 'visual-typography', category: 'Visual consistency', title: 'Typography feels consistent', description: 'Heading levels, labels, body copy, and metadata use a limited and readable type system.', severity: 'medium' },
  { id: 'visual-color', category: 'Visual consistency', title: 'Color usage is purposeful', description: 'Brand, status, and neutral colors are used consistently and never carry meaning alone.', severity: 'medium' },
  { id: 'visual-components', category: 'Visual consistency', title: 'Similar components look and behave alike', description: 'Cards, buttons, badges, fields, and lists use consistent shapes, borders, shadows, and states.', severity: 'medium' },
  { id: 'content-headings', category: 'Content clarity', title: 'Headings describe the content below', description: 'Section titles and card headings are specific enough to support quick scanning.', severity: 'medium', wcag: [WCAG.headingsLabels] },
  { id: 'content-actions', category: 'Content clarity', title: 'Action labels are direct', description: 'Buttons and links use clear verbs that explain what will happen next.', severity: 'medium', wcag: [WCAG.linkPurpose, WCAG.nameRoleValue] },
  { id: 'content-empty-states', category: 'Content clarity', title: 'Empty and planned states are honest', description: 'Unavailable future features are labelled as planned or coming next instead of appearing complete.', severity: 'high' },
  { id: 'content-jargon', category: 'Content clarity', title: 'Copy avoids unnecessary jargon', description: 'Explanations are professional but understandable for developers, designers, and stakeholders.', severity: 'low' },
  { id: 'performance-media', applicability: { presets: ['landing-page', 'pricing-page', 'content-article-page', 'ecommerce-product-card'] }, category: 'Performance hygiene', title: 'Media usage is restrained', description: 'Images, video, and decorative assets are appropriately sized and not used where text or CSS would be better.', severity: 'medium' },
  { id: 'performance-effects', category: 'Performance hygiene', title: 'Visual effects are not excessive', description: 'Shadows, blurs, filters, animations, and gradients support the UI without overwhelming rendering.', severity: 'low' },
  { id: 'performance-motion', applicability: { packs: ['marketing-pages', 'navigation', 'modals', 'drawers'] }, category: 'Performance hygiene', title: 'Motion is purposeful and respectful', description: 'Animations are short, helpful, and compatible with reduced-motion preferences.', severity: 'medium' },
  { id: 'performance-dom', category: 'Performance hygiene', title: 'Markup complexity is reasonable', description: 'The UI avoids unnecessary wrapper elements and deeply nested structures that make maintenance harder.', severity: 'low' }
];
