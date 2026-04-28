const comparisonVariants = {
  'Website Launch Checklist': {
    starter: {
      plan: 'Starter',
      bestFor: 'Best for solo creators shipping one landing page with a dependable launch flow.',
      features: [
        'Pre-launch task sequence with timing estimates',
        'Browser/device QA checklist',
        'Post-launch verification steps for analytics and forms'
      ],
      limitations: ['No multi-page campaign workflow', 'No stakeholder review handoff template'],
      price: '$19 one-time',
      cta: 'Start with Starter'
    },
    advanced: {
      plan: 'Advanced',
      bestFor: 'Best for small teams running repeated launches and needing shared review checkpoints.',
      features: [
        'Everything in Starter plus campaign-level launch sequencing',
        'Review and sign-off checklist for collaborators',
        'Rollback and postmortem worksheet'
      ],
      limitations: ['No agency white-label assets included'],
      price: '$59 one-time',
      cta: 'Choose Advanced'
    }
  },
  'Dashboard Components Kit': {
    basic: {
      plan: 'Basic',
      bestFor: 'Best for MVP dashboards that need clean data cards and simple chart shells.',
      features: [
        '12 responsive dashboard card patterns',
        'Table and filter bar starter blocks',
        'Vanilla JS interaction snippets'
      ],
      limitations: ['No advanced accessibility audit checklist'],
      price: '$49 one-time',
      cta: 'Choose Basic'
    },
    pro: {
      plan: 'Pro',
      bestFor: 'Best for product teams standardizing dashboard UI across multiple modules.',
      features: [
        'Everything in Basic plus 24 additional analytics modules',
        'Accessibility QA checklist and testing prompts',
        'State-pattern examples for empty, loading, and error flows'
      ],
      limitations: ['Requires design-token mapping on first integration'],
      price: '$119 one-time',
      cta: 'Choose Pro'
    }
  },
  'Freelancer Operations Bundle': {
    single: {
      plan: 'Single Product',
      bestFor: 'Best for freelancers who only need one reusable operations template right now.',
      features: [
        'Choose one toolkit from proposals, onboarding, or reporting',
        'Editable templates in plain text and spreadsheet format',
        'Quick-start setup notes'
      ],
      limitations: ['Other toolkits sold separately', 'No bundled process map'],
      price: '$29 per toolkit',
      cta: 'Pick one toolkit'
    },
    bundle: {
      plan: 'Bundle',
      bestFor: 'Best for established freelancers who want a complete client operations system in one purchase.',
      features: [
        'All operations toolkits in one package',
        'End-to-end process map from lead to monthly reporting',
        'Quarterly update pack for template improvements'
      ],
      limitations: ['Higher upfront cost than single toolkit'],
      price: '$99 bundle',
      cta: 'Get bundle'
    }
  }
};

const cardSelector = '[data-product-card]';

document.addEventListener('click', (event) => {
  const button = event.target.closest('.comparison-card__variant');
  if (!button) return;

  const card = button.closest(cardSelector);
  if (!card) return;

  const productName = card.querySelector('.comparison-card__product')?.textContent?.trim();
  if (!productName || !comparisonVariants[productName]) return;

  const variantKey = button.dataset.variant;
  const variantData = comparisonVariants[productName][variantKey];
  if (!variantData) return;

  updateCard(card, variantKey, variantData, productName);
});

function updateCard(card, selectedVariant, variantData, productName) {
  const variantButtons = card.querySelectorAll('.comparison-card__variant');
  variantButtons.forEach((variantButton) => {
    const isSelected = variantButton.dataset.variant === selectedVariant;
    variantButton.setAttribute('aria-pressed', String(isSelected));
  });

  const planEl = card.querySelector('[data-plan]');
  const bestForEl = card.querySelector('[data-best-for]');
  const featuresEl = card.querySelector('[data-features]');
  const limitationsEl = card.querySelector('[data-limitations]');
  const priceEl = card.querySelector('[data-price]');
  const ctaEl = card.querySelector('[data-cta]');
  const liveEl = card.querySelector('[data-live]');

  if (planEl) planEl.textContent = variantData.plan;
  if (bestForEl) bestForEl.textContent = variantData.bestFor;
  if (featuresEl) replaceListContent(featuresEl, variantData.features);
  if (limitationsEl) replaceListContent(limitationsEl, variantData.limitations);
  if (priceEl) priceEl.textContent = variantData.price;
  if (ctaEl) ctaEl.textContent = variantData.cta;
  if (liveEl) liveEl.textContent = `Selected ${variantData.plan} for ${productName}.`;
}

function replaceListContent(listElement, items) {
  listElement.textContent = '';

  items.slice(0, 3).forEach((itemText) => {
    const item = document.createElement('li');
    item.textContent = itemText;
    listElement.appendChild(item);
  });
}
