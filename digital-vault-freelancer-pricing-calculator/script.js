(() => {
  const pricingConfig = {
    basePrices: {
      landing: 1200,
      smallBusiness: 2200,
      portfolio: 1800,
      service: 2600,
      extendedCompany: 3800
    },
    extras: {
      additionalPage: 250,
      contactForm: 300,
      cmsIntegration: 1200,
      seoSetup: 600,
      expressMultiplier: 0.25,
      revisions: {
        1: 0,
        2: 250,
        3: 500,
        4: 900
      }
    },
    limits: {
      minPages: 1,
      maxPages: 30,
      minMargin: 0,
      maxMargin: 50
    },
    defaults: {
      websiteType: "smallBusiness",
      pageCount: 5,
      contactForm: true,
      cmsIntegration: false,
      seoSetup: true,
      revisionRounds: "1",
      expressDeadline: false,
      marginPercent: 15
    }
  };

  const currencyFormatter = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0
  });

  const form = document.getElementById("pricing-form");
  const controls = {
    websiteType: document.getElementById("websiteType"),
    pageCount: document.getElementById("pageCount"),
    contactForm: document.getElementById("contactForm"),
    cmsIntegration: document.getElementById("cmsIntegration"),
    seoSetup: document.getElementById("seoSetup"),
    revisionRounds: document.getElementById("revisionRounds"),
    expressDeadline: document.getElementById("expressDeadline"),
    marginPercent: document.getElementById("marginPercent"),
    marginValue: document.getElementById("marginValue")
  };

  const output = {
    basePrice: document.getElementById("basePrice"),
    addonsBreakdown: document.getElementById("addonsBreakdown"),
    subtotal: document.getElementById("subtotal"),
    marginAmount: document.getElementById("marginAmount"),
    finalPrice: document.getElementById("finalPrice")
  };

  function clamp(value, min, max) {
    if (Number.isNaN(value)) {
      return min;
    }

    return Math.min(Math.max(value, min), max);
  }

  function formatCurrency(value) {
    return currencyFormatter.format(Math.round(value));
  }

  function getSafeState() {
    const pageCount = clamp(
      Number.parseInt(controls.pageCount.value, 10),
      pricingConfig.limits.minPages,
      pricingConfig.limits.maxPages
    );

    const marginPercent = clamp(
      Number.parseInt(controls.marginPercent.value, 10),
      pricingConfig.limits.minMargin,
      pricingConfig.limits.maxMargin
    );

    return {
      websiteType: controls.websiteType.value,
      pageCount,
      contactForm: controls.contactForm.checked,
      cmsIntegration: controls.cmsIntegration.checked,
      seoSetup: controls.seoSetup.checked,
      revisionRounds: controls.revisionRounds.value,
      expressDeadline: controls.expressDeadline.checked,
      marginPercent
    };
  }

  function buildAddonsBreakdown(parts) {
    if (parts.length === 0) {
      return "No add-ons selected";
    }

    return parts.join(" • ");
  }

  function calculateEstimate(state) {
    const basePrice = pricingConfig.basePrices[state.websiteType] ?? 0;
    const additionalPages = Math.max(state.pageCount - 1, 0);
    const pagesCost = additionalPages * pricingConfig.extras.additionalPage;

    const parts = [];
    let extrasTotal = pagesCost;

    if (additionalPages > 0) {
      parts.push(`Additional pages (${additionalPages}): ${formatCurrency(pagesCost)}`);
    }

    if (state.contactForm) {
      extrasTotal += pricingConfig.extras.contactForm;
      parts.push(`Contact form: ${formatCurrency(pricingConfig.extras.contactForm)}`);
    }

    if (state.cmsIntegration) {
      extrasTotal += pricingConfig.extras.cmsIntegration;
      parts.push(`CMS integration: ${formatCurrency(pricingConfig.extras.cmsIntegration)}`);
    }

    if (state.seoSetup) {
      extrasTotal += pricingConfig.extras.seoSetup;
      parts.push(`SEO starter setup: ${formatCurrency(pricingConfig.extras.seoSetup)}`);
    }

    const revisionCost = pricingConfig.extras.revisions[state.revisionRounds] ?? 0;
    if (revisionCost > 0) {
      extrasTotal += revisionCost;
      parts.push(`Revisions (${state.revisionRounds}): ${formatCurrency(revisionCost)}`);
    }

    let subtotal = basePrice + extrasTotal;
    if (state.expressDeadline) {
      const expressFee = subtotal * pricingConfig.extras.expressMultiplier;
      subtotal += expressFee;
      parts.push(`Express deadline (+25%): ${formatCurrency(expressFee)}`);
    }

    const marginAmount = subtotal * (state.marginPercent / 100);
    const finalPrice = subtotal + marginAmount;

    return {
      basePrice,
      subtotal,
      marginAmount,
      finalPrice,
      addonsBreakdown: buildAddonsBreakdown(parts)
    };
  }

  function syncSanitizedValues(state) {
    controls.pageCount.value = String(state.pageCount);
    controls.marginPercent.value = String(state.marginPercent);
    controls.marginValue.textContent = `${state.marginPercent}%`;
  }

  function render() {
    const state = getSafeState();
    syncSanitizedValues(state);

    const estimate = calculateEstimate(state);

    output.basePrice.textContent = formatCurrency(estimate.basePrice);
    output.addonsBreakdown.textContent = estimate.addonsBreakdown;
    output.subtotal.textContent = formatCurrency(estimate.subtotal);
    output.marginAmount.textContent = formatCurrency(estimate.marginAmount);
    output.finalPrice.textContent = formatCurrency(estimate.finalPrice);
  }

  function applyDefaults() {
    const defaults = pricingConfig.defaults;
    controls.websiteType.value = defaults.websiteType;
    controls.pageCount.value = String(defaults.pageCount);
    controls.contactForm.checked = defaults.contactForm;
    controls.cmsIntegration.checked = defaults.cmsIntegration;
    controls.seoSetup.checked = defaults.seoSetup;
    controls.revisionRounds.value = defaults.revisionRounds;
    controls.expressDeadline.checked = defaults.expressDeadline;
    controls.marginPercent.value = String(defaults.marginPercent);
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      applyDefaults();
      render();
    });
  });

  applyDefaults();
  render();
})();
