const variants = [
  "Minimal Tech",
  "SaaS Links",
  "Newsletter Focus",
  "Social Heavy",
  "Legal + Trust",
  "Dark Gradient",
  "Startup Compact",
  "Multi Column",
  "CTA Footer",
  "Digital Vault Signature"
];

const gallery = document.getElementById("footerGallery");
const picker = document.getElementById("footerPicker");

function buildFooter(index, title) {
  const card = document.createElement("section");
  card.className = "card";
  card.id = `footer-${index + 1}`;

  const chips = ["Kontakt", "Oferta", "FAQ", "RODO", "Blog"].slice(0, (index % 5) + 1)
    .map((text, i) => `<span class="chip t${(i % 5) + 1}">${text}</span>`)
    .join("");

  card.innerHTML = `
    <h2>#${index + 1} · ${title}</h2>
    <footer class="footer-demo" style="background: linear-gradient(120deg, hsl(${210 + index * 12} 45% 16%), hsl(${245 + index * 8} 52% 11%));">
      <div class="row"><strong class="highlight">KP_CODE</strong><span>Digital Vault UI</span></div>
      <div class="row">${chips}</div>
      <div class="row slim"><small>© 2026 KP Code</small><small>Wariant ${index + 1}/10</small></div>
    </footer>
  `;
  return card;
}

variants.forEach((name, idx) => {
  picker.insertAdjacentHTML("beforeend", `<option value="footer-${idx + 1}">${idx + 1}. ${name}</option>`);
  gallery.appendChild(buildFooter(idx, name));
});

picker.addEventListener("change", (event) => {
  const target = document.getElementById(event.target.value);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
