export const DEFAULT_SEVERITY_PROFILE_ID = 'baseline';

export const severityProfiles = [
  {
    id: DEFAULT_SEVERITY_PROFILE_ID,
    name: 'Baseline',
    description: 'Balanced general-purpose evaluation that stays closest to the default weighted score.',
    summary: 'Balanced weighting for everyday manual audits. Changes scoring weight only, not checklist answers.',
    severityMultipliers: {
      low: 1,
      medium: 1,
      high: 1
    }
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Stricter pre-release evaluation focused on issues that affect real users.',
    summary: 'Raises the impact of higher-severity usability, accessibility, responsive, and functional clarity findings.',
    severityMultipliers: {
      low: 1,
      medium: 1.15,
      high: 1.4
    },
    categoryMultipliers: {
      'Responsive behavior': 1.1,
      'Accessibility basics': 1.15,
      'Forms and controls': 1.1,
      'Navigation and interaction': 1.1,
      'Content clarity': 1.05
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'High-polish review for portfolio, agency, client-delivery, and premium-product work.',
    summary: 'Gives medium-severity polish, visual consistency, responsive quality, and content clarity issues more weight.',
    severityMultipliers: {
      low: 1.05,
      medium: 1.25,
      high: 1.35
    },
    categoryMultipliers: {
      'Layout structure': 1.05,
      'Responsive behavior': 1.1,
      'Accessibility basics': 1.1,
      'Navigation and interaction': 1.05,
      'Visual consistency': 1.25,
      'Content clarity': 1.2,
      'Performance hygiene': 1.05
    }
  },
  {
    id: 'accessibility-first',
    name: 'Accessibility-first',
    description: 'Accessibility-focused evaluation that gives accessibility findings more influence without removing other rules.',
    summary: 'Prioritizes accessibility basics while retaining every active non-accessibility rule. This is not WCAG certification.',
    severityMultipliers: {
      low: 1,
      medium: 1.1,
      high: 1.3
    },
    categoryMultipliers: {
      'Accessibility basics': 1.75,
      'Forms and controls': 1.2,
      'Navigation and interaction': 1.15,
      'Responsive behavior': 1.05,
      'Content clarity': 1.05
    }
  }
];

export function resolveSeverityProfile(profileId) {
  return severityProfiles.find((profile) => profile.id === profileId) || getDefaultSeverityProfile();
}

export function getDefaultSeverityProfile() {
  return severityProfiles.find((profile) => profile.id === DEFAULT_SEVERITY_PROFILE_ID) || severityProfiles[0];
}

export function getValidSeverityProfileIds() {
  return new Set(severityProfiles.map((profile) => profile.id));
}
