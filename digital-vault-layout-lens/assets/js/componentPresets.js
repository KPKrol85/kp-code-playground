export const componentPresets = [
  {
    id: 'landing-page',
    name: 'Landing page',
    description: 'A marketing-focused page where hierarchy, messaging, and primary calls to action need to be immediately clear.',
    bestUse: 'Use when reviewing homepages, campaign pages, or product introduction screens.',
    relatedCategories: ['Layout structure', 'Responsive behavior', 'Navigation and interaction', 'Content clarity', 'Visual consistency'],
    supportedPatterns: ['marketing-content', 'primary-actions', 'responsive-layout']
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'A data-heavy workspace that needs clear regions, readable summaries, and predictable responsive behavior.',
    bestUse: 'Use when auditing admin panels, analytics views, or operational command centers.',
    relatedCategories: ['Layout structure', 'Responsive behavior', 'Accessibility basics', 'Navigation and interaction', 'Performance hygiene'],
    supportedPatterns: ['data-dense', 'workspace-navigation', 'responsive-layout']
  },
  {
    id: 'form-signup-flow',
    name: 'Form / signup flow',
    description: 'A conversion or data-entry flow where labels, errors, keyboard access, and control states are critical.',
    bestUse: 'Use for sign-up, checkout, onboarding, contact, or settings forms.',
    relatedCategories: ['Forms and controls', 'Accessibility basics', 'Content clarity', 'Responsive behavior'],
    supportedPatterns: ['form-controls', 'primary-actions', 'responsive-layout']
  },
  {
    id: 'pricing-page',
    name: 'Pricing page',
    description: 'A comparison surface where plan hierarchy, feature clarity, and action labels must support confident decisions.',
    bestUse: 'Use when reviewing subscription tiers, package cards, or feature comparison sections.',
    relatedCategories: ['Layout structure', 'Visual consistency', 'Content clarity', 'Navigation and interaction'],
    supportedPatterns: ['marketing-content', 'pricing-comparison', 'primary-actions']
  },
  {
    id: 'content-article-page',
    name: 'Content article/page',
    description: 'A reading-focused page where headings, line length, media use, and semantic structure guide comprehension.',
    bestUse: 'Use for articles, documentation pages, guides, release notes, or editorial layouts.',
    relatedCategories: ['Content clarity', 'Accessibility basics', 'Responsive behavior', 'Performance hygiene'],
    supportedPatterns: ['long-form-content', 'responsive-layout']
  },
  {
    id: 'ecommerce-product-card',
    name: 'Ecommerce/product card',
    description: 'A compact product surface where image treatment, price clarity, states, and actions must stay consistent.',
    bestUse: 'Use for product cards, catalog tiles, marketplace listings, or offer modules.',
    relatedCategories: ['Visual consistency', 'Navigation and interaction', 'Content clarity', 'Responsive behavior'],
    supportedPatterns: ['product-card', 'primary-actions', 'responsive-layout']
  },
  {
    id: 'navigation-header',
    name: 'Navigation/header',
    description: 'A wayfinding component where current location, keyboard access, touch targets, and responsive behavior matter most.',
    bestUse: 'Use for primary headers, nav bars, menus, tab bars, or section navigation.',
    relatedCategories: ['Navigation and interaction', 'Accessibility basics', 'Responsive behavior', 'Layout structure'],
    supportedPatterns: ['workspace-navigation', 'primary-actions', 'responsive-layout']
  },
  {
    id: 'data-table-list-view',
    name: 'Data table/list view',
    description: 'A structured data view where alignment, overflow handling, readable labels, and actions must remain usable.',
    bestUse: 'Use for tables, list management screens, queues, directories, or record browsers.',
    relatedCategories: ['Layout structure', 'Responsive behavior', 'Accessibility basics', 'Forms and controls', 'Performance hygiene'],
    supportedPatterns: ['data-dense', 'form-controls', 'responsive-layout']
  }
];
