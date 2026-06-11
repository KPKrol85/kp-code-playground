export const componentPresets = [
  {
    id: 'saas-dashboard',
    name: 'SaaS dashboard',
    summary: 'A dense analytics dashboard with cards, charts, navigation, filters, and administrative actions.',
    idealReviewFocus: ['Information hierarchy', 'Responsive grid behavior', 'Accessible controls', 'Performance budget'],
    statuses: {
      'layout-grid-structure': 'pass',
      'layout-overflow-risk': 'warning',
      'spacing-system': 'pass',
      'spacing-density': 'warning',
      'typography-hierarchy': 'pass',
      'typography-line-length': 'pass',
      'responsive-breakpoints': 'warning',
      'responsive-touch-targets': 'warning',
      'accessibility-focus-states': 'fail',
      'accessibility-semantics': 'warning',
      'visual-polish-alignment': 'pass',
      'visual-polish-states': 'warning',
      'performance-assets': 'pass',
      'performance-rendering': 'warning',
      'maintainability-tokens': 'pass',
      'maintainability-component-boundaries': 'pass'
    }
  },
  {
    id: 'pricing-section',
    name: 'Pricing section',
    summary: 'A conversion-focused pricing table with plan cards, feature comparisons, and checkout calls to action.',
    idealReviewFocus: ['Plan comparison clarity', 'CTA state coverage', 'Mobile stacking', 'Semantic lists'],
    statuses: {
      'layout-grid-structure': 'pass',
      'layout-overflow-risk': 'pass',
      'spacing-system': 'warning',
      'spacing-density': 'pass',
      'typography-hierarchy': 'pass',
      'typography-line-length': 'pass',
      'responsive-breakpoints': 'pass',
      'responsive-touch-targets': 'pass',
      'accessibility-focus-states': 'warning',
      'accessibility-semantics': 'warning',
      'visual-polish-alignment': 'warning',
      'visual-polish-states': 'fail',
      'performance-assets': 'pass',
      'performance-rendering': 'pass',
      'maintainability-tokens': 'warning',
      'maintainability-component-boundaries': 'pass'
    }
  },
  {
    id: 'card-grid',
    name: 'Card grid',
    summary: 'A reusable content grid for product cards, resource collections, services, or marketplace listings.',
    idealReviewFocus: ['Card rhythm', 'Long content handling', 'Keyboard navigation', 'Token consistency'],
    statuses: {}
  },
  {
    id: 'hero-section',
    name: 'Hero section',
    summary: 'A top-of-page marketing hero with headline, proof points, media, and primary/secondary actions.',
    idealReviewFocus: ['Message hierarchy', 'Visual balance', 'CTA clarity', 'Reduced motion'],
    statuses: {}
  },
  {
    id: 'form-section',
    name: 'Form section',
    summary: 'A form-heavy interface with labels, help text, validation states, and submit interactions.',
    idealReviewFocus: ['Label semantics', 'Error states', 'Focus order', 'Tap targets'],
    statuses: {
      'accessibility-focus-states': 'warning',
      'accessibility-semantics': 'fail',
      'visual-polish-states': 'fail',
      'responsive-touch-targets': 'warning'
    }
  }
];
