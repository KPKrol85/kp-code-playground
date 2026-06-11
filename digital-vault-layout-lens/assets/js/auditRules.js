export const auditRules = [
  {
    id: 'layout-grid-structure',
    category: 'Layout',
    label: 'Clear structural hierarchy',
    description: 'The section uses an intentional grid, stack, or landmark structure rather than ad-hoc positioning.',
    severity: 'high',
    weight: 10,
    recommendation: 'Define a predictable layout system with semantic regions, consistent alignment, and explicit content grouping.',
    futureAutomationHint: 'Detect landmark usage, container depth, grid/flex declarations, and visual alignment anomalies.'
  },
  {
    id: 'layout-overflow-risk',
    category: 'Layout',
    label: 'No obvious overflow or clipping risk',
    description: 'Content remains readable without horizontal overflow, hidden interactive controls, or clipped labels.',
    severity: 'high',
    weight: 9,
    recommendation: 'Test narrow viewports, long labels, and dynamic content. Replace brittle fixed widths with responsive constraints.',
    futureAutomationHint: 'Measure scroll width, fixed-size containers, and overflow declarations across breakpoints.'
  },
  {
    id: 'spacing-system',
    category: 'Spacing',
    label: 'Spacing follows a repeatable system',
    description: 'Margins, gaps, and padding look intentional and use a small set of reusable spacing values.',
    severity: 'medium',
    weight: 8,
    recommendation: 'Introduce spacing tokens and reduce one-off values that make the interface feel uneven.',
    futureAutomationHint: 'Parse CSS spacing values and compare them against configured design tokens.'
  },
  {
    id: 'spacing-density',
    category: 'Spacing',
    label: 'Density supports scanning',
    description: 'Related items are grouped tightly enough to scan while still leaving enough whitespace for comprehension.',
    severity: 'medium',
    weight: 7,
    recommendation: 'Tune vertical rhythm so headings, controls, and supporting copy form clear visual clusters.',
    futureAutomationHint: 'Estimate visual density from element bounding boxes and text volume.'
  },
  {
    id: 'typography-hierarchy',
    category: 'Typography',
    label: 'Readable type hierarchy',
    description: 'Headings, labels, body copy, and metadata have distinct sizes, weights, and line heights.',
    severity: 'high',
    weight: 9,
    recommendation: 'Create a limited type scale and ensure headings communicate page structure without relying on color alone.',
    futureAutomationHint: 'Compare heading levels, font sizes, line heights, and contrast values.'
  },
  {
    id: 'typography-line-length',
    category: 'Typography',
    label: 'Comfortable line length',
    description: 'Paragraphs and dense text blocks avoid extremely long lines and cramped line-height.',
    severity: 'medium',
    weight: 6,
    recommendation: 'Constrain prose width and use line-height values that preserve readability on desktop and mobile.',
    futureAutomationHint: 'Estimate characters per line from computed width and font metrics.'
  },
  {
    id: 'responsive-breakpoints',
    category: 'Responsiveness',
    label: 'Responsive behavior is intentional',
    description: 'The component adapts cleanly across mobile, tablet, and desktop without losing key actions.',
    severity: 'high',
    weight: 10,
    recommendation: 'Define mobile-first layout states and test primary workflows at common viewport widths.',
    futureAutomationHint: 'Run viewport sweeps and detect overlapping elements, hidden controls, and layout jumps.'
  },
  {
    id: 'responsive-touch-targets',
    category: 'Responsiveness',
    label: 'Touch targets are usable',
    description: 'Buttons, links, and inputs have enough size and spacing for touch interaction.',
    severity: 'medium',
    weight: 7,
    recommendation: 'Increase tap target dimensions and add spacing around adjacent interactive controls.',
    futureAutomationHint: 'Measure interactive element dimensions and spacing against accessibility thresholds.'
  },
  {
    id: 'accessibility-focus-states',
    category: 'Accessibility',
    label: 'Visible keyboard focus states',
    description: 'Interactive controls expose obvious focus styles for keyboard and assistive technology users.',
    severity: 'critical',
    weight: 10,
    recommendation: 'Add high-contrast focus-visible styles to links, buttons, form controls, and custom widgets.',
    futureAutomationHint: 'Inspect computed focus styles and compare visual difference from default state.'
  },
  {
    id: 'accessibility-semantics',
    category: 'Accessibility',
    label: 'Semantic controls and headings',
    description: 'The UI uses semantic headings, buttons, links, labels, and regions instead of generic clickable containers.',
    severity: 'critical',
    weight: 10,
    recommendation: 'Use native HTML elements first and ensure form controls have programmatic labels.',
    futureAutomationHint: 'Parse DOM roles, heading order, label associations, and invalid interactive nesting.'
  },
  {
    id: 'visual-polish-alignment',
    category: 'Visual polish',
    label: 'Alignment and edge quality feel refined',
    description: 'Cards, text, controls, and icons line up consistently without accidental visual noise.',
    severity: 'medium',
    weight: 7,
    recommendation: 'Audit edge alignment, border radii, icon sizing, and card boundaries for premium presentation.',
    futureAutomationHint: 'Use screenshot analysis to detect off-grid alignment and inconsistent radii.'
  },
  {
    id: 'visual-polish-states',
    category: 'Visual polish',
    label: 'Interactive states are complete',
    description: 'Hover, active, disabled, selected, loading, empty, and error states are considered where relevant.',
    severity: 'medium',
    weight: 8,
    recommendation: 'Document and implement state coverage before shipping the component into production contexts.',
    futureAutomationHint: 'Map UI controls to expected states and compare implementation coverage.'
  },
  {
    id: 'performance-assets',
    category: 'Performance basics',
    label: 'Assets are appropriately constrained',
    description: 'Images, video, shadows, and decorative effects are sized and used responsibly.',
    severity: 'medium',
    weight: 6,
    recommendation: 'Compress large media, avoid excessive blur/shadow stacks, and reserve space to reduce layout shift.',
    futureAutomationHint: 'Inspect asset dimensions, transfer size, lazy loading, and layout shift potential.'
  },
  {
    id: 'performance-rendering',
    category: 'Performance basics',
    label: 'Rendering complexity is reasonable',
    description: 'The UI avoids unnecessary DOM depth, heavy animations, and expensive visual effects.',
    severity: 'low',
    weight: 5,
    recommendation: 'Keep animation purposeful, respect reduced motion, and remove decorative complexity that hurts usability.',
    futureAutomationHint: 'Count DOM nodes, animation declarations, expensive filters, and paint-heavy CSS.'
  },
  {
    id: 'maintainability-tokens',
    category: 'Code maintainability',
    label: 'Design decisions are token-friendly',
    description: 'Colors, spacing, shadows, and type values can be centralized into reusable design tokens.',
    severity: 'medium',
    weight: 7,
    recommendation: 'Move repeated visual values into variables and document component-level design constraints.',
    futureAutomationHint: 'Detect repeated CSS literals and suggest token extraction candidates.'
  },
  {
    id: 'maintainability-component-boundaries',
    category: 'Code maintainability',
    label: 'Component boundaries are clear',
    description: 'Markup, styles, and behavior are organized so the UI can be extended without fragile coupling.',
    severity: 'medium',
    weight: 8,
    recommendation: 'Keep rendering, data, and scoring logic separate. Prefer predictable naming and small functions.',
    futureAutomationHint: 'Analyze file organization, selector complexity, and coupling between scripts and markup.'
  }
];

export const auditCategories = [...new Set(auditRules.map((rule) => rule.category))];
