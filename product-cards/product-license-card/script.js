const licenseLibrary = {
  "Premium Landing Starter Pack": {
    personal: {
      label: "Personal",
      uses: [
        "Use in one personal project.",
        "Modify sections for your own brand.",
        "Publish on one personal domain."
      ],
      restriction: "Restriction: Client delivery, resale, and team-wide distribution are not included.",
      price: "$29",
      cta: "Choose Personal License"
    },
    commercial: {
      label: "Commercial",
      uses: [
        "Use in up to three client websites.",
        "Allow one designer and one developer seat.",
        "Deploy to commercial pages and funnels."
      ],
      restriction: "Restriction: Cannot be resold as a template library or white-label package.",
      price: "$89",
      cta: "Get Commercial License"
    },
    extended: {
      label: "Extended",
      uses: [
        "Use across unlimited client launch pages.",
        "Include in paid website delivery retainers.",
        "Collaborate across multi-role agency teams."
      ],
      restriction: "Restriction: Source files cannot be distributed as a downloadable product.",
      price: "$189",
      cta: "Choose Extended Access"
    }
  },
  "Dashboard Components Kit": {
    personal: {
      label: "Personal",
      uses: [
        "Use in one non-commercial internal dashboard.",
        "Customize components for learning and prototypes.",
        "Export visuals for demos and portfolio work."
      ],
      restriction: "Restriction: Paid client deployment and redistribution are not included.",
      price: "$59",
      cta: "Choose Personal License"
    },
    commercial: {
      label: "Commercial",
      uses: [
        "Use in up to five commercial client projects.",
        "Share with one internal delivery team.",
        "Customize and deploy to production apps."
      ],
      restriction: "Restriction: Productized resale and marketplace redistribution are not permitted.",
      price: "$149",
      cta: "Get Commercial License"
    },
    extended: {
      label: "Extended",
      uses: [
        "Use in unlimited client dashboards and admin systems.",
        "Support enterprise deployments under your service agreements.",
        "Allow collaboration across distributed agency teams."
      ],
      restriction: "Restriction: You may not sell components as a standalone UI kit product.",
      price: "$299",
      cta: "Choose Extended Access"
    }
  },
  "Brand Asset Starter Set": {
    personal: {
      label: "Personal",
      uses: [
        "Use for one personal brand identity.",
        "Customize social templates for your own channels.",
        "Export finished graphics for personal use."
      ],
      restriction: "Restriction: Client handoff and paid campaign use are excluded.",
      price: "$24",
      cta: "Choose Personal License"
    },
    commercial: {
      label: "Commercial",
      uses: [
        "Use in up to four client branding projects.",
        "Create social and ad assets for paid campaigns.",
        "Share with one branding team for production work."
      ],
      restriction: "Restriction: No standalone resale of editable source assets.",
      price: "$99",
      cta: "Get Commercial License"
    },
    extended: {
      label: "Extended",
      uses: [
        "Use in unlimited commercial brand projects.",
        "Allow agency collaboration across multiple teams.",
        "Include deliverables in paid end-client engagements."
      ],
      restriction: "Restriction: You cannot sell the source files as a standalone asset bundle.",
      price: "$329",
      cta: "Choose Extended Access"
    }
  }
};

function renderCardTier(card, tierKey) {
  const productName = card.dataset.productName;
  const tierInfo = licenseLibrary[productName]?.[tierKey];
  if (!tierInfo) {
    return;
  }

  const summary = card.querySelector("[data-license-summary]");
  const price = card.querySelector("[data-license-price]");
  const cta = card.querySelector("[data-license-cta]");
  const status = card.querySelector("[data-license-status]");

  const usesMarkup = tierInfo.uses
    .map((use) => `<li class="license-card__use">${use}</li>`)
    .join("");

  summary.innerHTML = `
    <p class="license-card__badge">Selected license: <strong>${tierInfo.label}</strong></p>
    <ul class="license-card__uses">${usesMarkup}</ul>
    <p class="license-card__limits">${tierInfo.restriction}</p>
  `;

  price.textContent = tierInfo.price;
  cta.textContent = tierInfo.cta;
  status.textContent = `${productName}: ${tierInfo.label} license selected.`;
}

function setPressedState(card, tierKey) {
  const tierButtons = card.querySelectorAll(".license-card__tier");
  tierButtons.forEach((button) => {
    const isActive = button.dataset.tier === tierKey;
    button.setAttribute("aria-pressed", String(isActive));
  });
}

document.addEventListener("click", (event) => {
  const tierButton = event.target.closest(".license-card__tier");
  if (!tierButton) {
    return;
  }

  const card = tierButton.closest(".license-card");
  if (!card) {
    return;
  }

  const tierKey = tierButton.dataset.tier;
  setPressedState(card, tierKey);
  renderCardTier(card, tierKey);
});

document.querySelectorAll(".license-card").forEach((card) => {
  const defaultTier = card.dataset.defaultTier;
  setPressedState(card, defaultTier);
  renderCardTier(card, defaultTier);
});
