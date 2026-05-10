const options = {
  projectType: ["Landing Page", "SaaS Dashboard", "Enterprise Platform", "Component Library"],
  teamSize: ["Solo Developer", "Small Product Team", "Agency Team", "Cross-Functional Department"],
  scale: ["Small", "Medium", "Large", "Platform"],
  methodology: ["BEM", "BEM + Utilities", "CUBE-inspired", "Design System First"],
  maintainability: ["Fast Launch", "Balanced", "Long-Term Product", "Strict Governance"]
};

const profile = {
  projectType: "SaaS Dashboard",
  teamSize: "Small Product Team",
  scale: "Medium",
  methodology: "BEM + Utilities",
  maintainability: "Long-Term Product"
};

const $ = (id) => document.getElementById(id);

Object.entries(options).forEach(([key, values]) => {
  const select = $(key);
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    if (profile[key] === value) option.selected = true;
    select.append(option);
  });
  select.addEventListener("change", (event) => {
    profile[key] = event.target.value;
    render();
  });
});

function namingExamples() {
  const prefix = profile.projectType === "Component Library" ? "c-" : "";
  return [
    `.${prefix}hero`,
    `.${prefix}hero__content`,
    `.${prefix}hero__actions`,
    `.${prefix}button--primary`,
    `.${prefix}card--featured`,
    `.u-text-center`,
    `.u-mb-4`,
    `.layout-shell`,
    `.section-pricing`
  ].join("\n");
}

function renderList(id, items) {
  const node = $(id);
  node.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    node.append(li);
  });
}

function render() {
  $("namingCode").textContent = namingExamples();
  renderList("namingInsights", [
    "Keep block names product-domain focused, not presentation-focused (avoid names like .blue-card).",
    "Allow modifiers only for variant intent; avoid stacking more than two modifiers on one block.",
    `For ${profile.teamSize}, enforce naming review in pull requests to prevent class drift.`,
    "Use utilities for spacing, typography, and one-off alignment, not component identity.",
    "Reserve section-level classes for page composition boundaries."
  ]);

  $("stateCode").textContent = [".is-active", ".is-loading", ".is-open", ".has-error", ".is-disabled"].join("\n");
  renderList("stateInsights", [
    "Use state classes for transient UI behavior controlled by JS.",
    "Prefer data attributes when state maps to feature modes (data-theme, data-step).",
    "Use aria-expanded and aria-hidden for disclosure components to keep state accessible.",
    "Never style from JS-only hooks; state classes communicate visual intent cleanly."
  ]);

  $("hookCode").textContent = `<button\n  class=\"accordion__trigger\"\n  data-accordion-trigger\n  aria-expanded=\"false\"\n>\n  Billing settings\n</button>`;
  renderList("hookInsights", [
    "JS hooks should be refactor-safe and never overloaded with visual styling.",
    "Use data-* for targeting and keep classes dedicated to CSS architecture.",
    "Accessibility attributes reflect truth of UI state and should be updated with JS interactions."
  ]);

  $("tokenCode").textContent = [
    "--color-surface-primary",
    "--color-text-muted",
    "--space-4",
    "--radius-md",
    "--shadow-soft",
    "--fs-06"
  ].join("\n");
  renderList("tokenInsights", [
    "Name tokens semantically by role, not raw color values.",
    "Use numeric scales for spacing and typography to keep design rhythm predictable.",
    `Given ${profile.maintainability}, freeze token aliases once consumed across components to avoid churn.`
  ]);

  const folderMap = {
    Small: "css/\n├── base/\n├── utilities/\n├── components/\n└── pages/",
    Medium: "css/\n├── base/\n├── tokens/\n├── utilities/\n├── layout/\n├── components/\n├── sections/\n└── pages/",
    Large: "css/\n├── foundations/\n├── tokens/\n├── themes/\n├── utilities/\n├── layouts/\n├── components/\n├── sections/\n├── pages/\n└── overrides/",
    Platform: "packages/styles/\n├── foundations/\n├── tokens/\n├── themes/\n├── primitives/\n├── components/\n└── adapters/"
  };
  $("folderCode").textContent = folderMap[profile.scale];
  renderList("folderInsights", [
    "Separate foundations from components to avoid circular styling dependencies.",
    "Keep pages and sections at the composition layer, not as styling primitives.",
    `For a ${profile.scale.toLowerCase()} scale project, introduce linting rules for folder and class naming consistency.`
  ]);

  $("handbookOutput").innerHTML = `
    <h4>Profile Summary</h4>
    <p>${profile.projectType} with ${profile.teamSize}, targeting a ${profile.scale.toLowerCase()} architecture and ${profile.methodology} workflow.</p>
    <h4>Naming Rules</h4>
    <p>Use descriptive block names, strict element chains, and intent-based modifiers. Avoid visual names and temporary suffixes such as -new or -final.</p>
    <h4>State Strategy</h4>
    <p>State classes should express UI behavior (.is-open, .has-error). Accessibility states must be mirrored through ARIA attributes for interactive controls.</p>
    <h4>Utility Strategy</h4>
    <p>Utilities are reserved for low-level alignment, spacing, and text helpers. Component appearance remains in component-level classes.</p>
    <h4>Token Strategy</h4>
    <p>Maintain a semantic token layer for color, spacing, typography, radius, and elevation. Use consistent scales and document token ownership.</p>
    <h4>JS Hooks</h4>
    <p>Use data attributes for JavaScript selectors to isolate behavior from styling. Keep styling classes stable across refactors.</p>
    <h4>Folder Conventions</h4>
    <p>Organize by layer: foundations → utilities → layout → components → composition. This keeps imports predictable and onboarding faster.</p>
    <h4>Scalability Recommendations</h4>
    <p>Enforce naming review in PRs, automate class linting, and publish a shared architecture glossary for new contributors.</p>
  `;
}

$("copyHandbook").addEventListener("click", async () => {
  const text = $("handbookOutput").innerText;
  try {
    await navigator.clipboard.writeText(text);
    $("copyHandbook").textContent = "Handbook Copied";
    setTimeout(() => { $("copyHandbook").textContent = "Copy Handbook"; }, 1400);
  } catch {
    $("copyHandbook").textContent = "Copy Unavailable";
  }
});

render();
