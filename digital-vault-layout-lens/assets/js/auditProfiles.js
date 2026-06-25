export const DEFAULT_PROFILE_ID = 'production';

export const auditProfiles = [
  {
    id: 'baseline',
    name: 'Baseline',
    description: 'A forgiving starter profile for early layout reviews and rough product prototypes.',
    warningScore: 0.65,
    qualityThresholds: [
      { score: 88, label: 'Baseline-excellent' },
      { score: 76, label: 'Baseline-ready' },
      { score: 62, label: 'Solid baseline' },
      { score: 45, label: 'Baseline improving' }
    ],
    categoryMultipliers: {}
  },
  {
    id: 'production',
    name: 'Production',
    description: 'The default balanced profile for production UI readiness across all categories.',
    warningScore: 0.55,
    qualityThresholds: [
      { score: 92, label: 'Premium-ready' },
      { score: 82, label: 'Production-ready with minor polish' },
      { score: 70, label: 'Solid' },
      { score: 50, label: 'Improving' }
    ],
    categoryMultipliers: {}
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'A stricter profile for polished client-facing interfaces where warnings cost more.',
    warningScore: 0.42,
    qualityThresholds: [
      { score: 96, label: 'Premium-ready' },
      { score: 88, label: 'Production-ready with minor polish' },
      { score: 76, label: 'Solid premium foundation' },
      { score: 60, label: 'Premium polish needed' }
    ],
    categoryMultipliers: {
      'Visual polish': 1.18,
      Typography: 1.1,
      Spacing: 1.08
    }
  },
  {
    id: 'accessibility-first',
    name: 'Accessibility-first',
    description: 'Prioritizes accessibility blockers and related responsive usability recommendations.',
    warningScore: 0.5,
    qualityThresholds: [
      { score: 94, label: 'Accessible production-ready' },
      { score: 84, label: 'Accessible with minor polish' },
      { score: 72, label: 'Accessibility foundation set' },
      { score: 55, label: 'Accessibility improvements needed' }
    ],
    categoryMultipliers: {
      Accessibility: 1.45,
      Responsiveness: 1.12
    },
    recommendationCategoryPriority: ['Accessibility', 'Responsiveness']
  }
];

export function getAuditProfile(profileId) {
  return auditProfiles.find((profile) => profile.id === profileId) || auditProfiles.find((profile) => profile.id === DEFAULT_PROFILE_ID);
}
