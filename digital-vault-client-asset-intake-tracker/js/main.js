(function () {
  const assetData = {
    "Brand assets": [
      ["Logo files", "Primary logo source files for web and print formats."],
      ["Logo variations", "Horizontal, icon-only, and dark/light versions."],
      ["Brand colors", "Confirmed color palette with hex/RGB references."],
      ["Typography or font files", "Licensed fonts or approved web-safe alternatives."],
      ["Brand guidelines", "Usage rules for logos, spacing, and tone."],
      ["Icon set or brand marks", "Approved icon assets aligned with brand style."]
    ],
    "Website copy": [
      ["Homepage copy", "Main message, headline, subheadline, and section text."],
      ["About page copy", "Company story, mission, values, and team intro."],
      ["Service descriptions", "Clear details for each service offering."],
      ["Offer or pricing copy", "Pricing structure, tiers, or proposal language."],
      ["FAQ content", "Common customer questions with approved answers."],
      ["Contact details", "Phone, email, location, and contact form routing."],
      ["Call-to-action text", "Button and conversion-focused call prompts."]
    ],
    "Media assets": [
      ["Hero images", "High-resolution banners for key landing sections."],
      ["Service images", "Visuals representing services and capabilities."],
      ["Team photos", "Professional profile or culture images."],
      ["Portfolio or project images", "Before/after or case visual proof assets."],
      ["Testimonials photos", "Images tied to testimonial statements."],
      ["Video files", "Compressed web-ready or source video assets."],
      ["Image usage permissions", "Proof of rights for all visual media."]
    ],
    "Technical access": [
      ["Domain access", "Registrar access with update permissions."],
      ["Hosting access", "Control panel credentials or invite access."],
      ["DNS access", "Ability to update records and verification entries."],
      ["CMS access", "Admin-level access for content and settings."],
      ["Analytics access", "Google Analytics or equivalent property access."],
      ["Search console access", "Search performance and indexing visibility."],
      ["Email or SMTP details", "Outgoing email configuration details."],
      ["Third-party integration access", "Payment, CRM, automation, or API credentials."]
    ],
    "Trust and marketing proof": [
      ["Testimonials", "Approved quotes with client names and titles."],
      ["Client logos", "Permissioned logos for social proof sections."],
      ["Case studies", "Structured proof stories with business outcomes."],
      ["Review links", "Live profile links from trusted review platforms."],
      ["Certifications", "Professional or compliance credentials."],
      ["Awards or press mentions", "Recognition badges or publication references."],
      ["Social media profile links", "Official and active social channels."]
    ],
    "Legal and business information": [
      ["Company legal name", "Registered legal entity name for documentation."],
      ["Address", "Official business location and mailing details."],
      ["Tax or VAT number", "Required tax identifiers for invoicing or compliance."],
      ["Privacy policy", "Current and approved privacy disclosures."],
      ["Terms and conditions", "Service terms and user agreement text."],
      ["Cookie policy", "Cookie use disclosures and consent language."],
      ["Required disclaimers", "Industry-specific notice or liability text."],
      ["Industry-specific legal notes", "Regulated language required for the business."]
    ]
  };

  const statuses = ["Missing", "Requested", "Received", "Reviewed", "Approved", "Blocked"];
  const priorities = ["Critical", "Important", "Optional"];

  function buildChecklist() {
    const wrapper = document.getElementById("asset-groups");
    Object.entries(assetData).forEach(([category, items]) => {
      const group = document.createElement("section");
      group.className = "asset-group";
      group.innerHTML = `<h3 class="asset-group__title">${category}</h3>`;

      items.forEach(([name, desc]) => {
        const row = document.createElement("div");
        row.className = "asset-row";

        row.innerHTML = `
          <div><div class="asset-row__name">${name}</div></div>
          <div class="asset-row__desc">${desc}</div>
          <label class="field"><span>Priority</span><select class="asset-priority">${priorities.map(p => `<option value="${p}">${p}</option>`).join("")}</select></label>
          <label class="field"><span>Status</span><select class="asset-status">${statuses.map(s => `<option value="${s}">${s}</option>`).join("")}</select></label>
          <label class="field"><span>Notes</span><input type="text" placeholder="Dependencies, owner, due date" /></label>
        `;

        group.appendChild(row);
      });

      wrapper.appendChild(group);
    });
  }

  function getReadinessLabel(percent) {
    if (percent <= 30) return "Not ready to start";
    if (percent <= 60) return "Partially ready";
    if (percent <= 85) return "Production can start carefully";
    return "Ready for production";
  }

  function getRecommendation(percent, blockedCount) {
    if (blockedCount > 0) return "Blocked items detected. Resolve blocked access and critical dependencies first.";
    if (percent <= 30) return "Initiate a focused client follow-up for essential files and technical access.";
    if (percent <= 60) return "Continue collection and review. Confirm all critical assets before scheduling production.";
    if (percent <= 85) return "Production can begin in controlled phases while remaining gaps are closed.";
    return "Intake is strong. Final verification can be completed and production can proceed confidently.";
  }

  function updateDashboard() {
    const selects = Array.from(document.querySelectorAll(".asset-status"));
    const total = selects.length;
    const delivered = selects.filter((s) => ["Received", "Reviewed", "Approved"].includes(s.value)).length;
    const approved = selects.filter((s) => s.value === "Approved").length;
    const blocked = selects.filter((s) => s.value === "Blocked").length;
    const percentage = total ? Math.round((delivered / total) * 100) : 0;

    document.getElementById("total-assets").textContent = String(total);
    document.getElementById("received-assets").textContent = String(delivered);
    document.getElementById("approved-assets").textContent = String(approved);
    document.getElementById("blocked-assets").textContent = String(blocked);
    document.getElementById("readiness-percent").textContent = `${percentage}%`;
    document.getElementById("readiness-label").textContent = getReadinessLabel(percentage);
    document.getElementById("readiness-recommendation").textContent = getRecommendation(percentage, blocked);
  }

  function init() {
    buildChecklist();
    document.addEventListener("change", (event) => {
      if (event.target.classList.contains("asset-status")) {
        updateDashboard();
      }
    });
    updateDashboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
