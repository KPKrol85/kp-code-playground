const packs = [
  { id: '01', name: 'Executive Glass', vibe: 'SaaS • Business', useCase: 'Premium glassmorphism style for SaaS dashboards, landing pages, and modern business websites.', desc: 'Translucent layers, frosted edges, and refined hover lift create a premium interface presence.', variants: ['primary','secondary','ghost','outline','soft'] },
  { id: '02', name: 'Studio Minimal', vibe: 'Portfolio • Editorial', useCase: 'Clean, quiet, editorial style for portfolios, agencies, and minimal brand websites.', desc: 'Minimal contrast and restrained typography for polished, distraction-free layouts.', variants: ['primary','secondary','ghost','outline','subtle'] },
  { id: '03', name: 'Neon Pulse', vibe: 'Tech • Cyber', useCase: 'Dark, energetic, neon-accent style for tech products, AI tools, and cyber dashboards.', desc: 'Electric accents, glow reactions, and dark surfaces make interactions feel alive.', variants: ['primary','secondary','ghost','outline','glow'] },
  { id: '04', name: 'Commerce Prime', vibe: 'Ecommerce • Sales', useCase: 'Conversion-focused style for ecommerce, pricing pages, and product cards.', desc: 'High-clarity warm tones and energetic hover cues support conversion-focused CTAs.', variants: ['primary','secondary','ghost','outline','deal'] },
  { id: '05', name: 'Editorial Luxe', vibe: 'Luxury • Content', useCase: 'Elegant typography-first style for premium blogs, magazines, personal brands, and luxury pages.', desc: 'Refined serif influence and subtle motion designed for premium reading experiences.', variants: ['primary','secondary','ghost','outline','quiet'] },
  { id: '06', name: 'Soft SaaS', vibe: 'Onboarding • Productive', useCase: 'Friendly rounded style for SaaS apps, onboarding screens, and productivity tools.', desc: 'Rounded geometry and calm blues deliver approachable action controls.', variants: ['primary','secondary','ghost','outline','soft'] },
  { id: '07', name: 'Finance Trust', vibe: 'B2B • Professional', useCase: 'Stable, trustworthy, professional style for finance, legal, consulting, and B2B websites.', desc: 'Conservative color hierarchy and secure visual language suited for trust-first interfaces.', variants: ['primary','secondary','ghost','outline','secure'] },
  { id: '08', name: 'Creative Gradient', vibe: 'Campaign • Launch', useCase: 'Expressive gradient style for creative studios, campaigns, and launch pages.', desc: 'Color-rich gradients with dynamic elevation for expressive marketing moments.', variants: ['primary','secondary','ghost','outline','gradient'] },
  { id: '09', name: 'System Dark', vibe: 'Devtools • Admin', useCase: 'Clean dark UI style for developer tools, dashboards, internal systems, and admin panels.', desc: 'Utility-first dark styling with precise states for data-dense interfaces.', variants: ['primary','secondary','ghost','outline','muted'] },
  { id: '10', name: 'Luxury Edge', vibe: 'Premium • Bold', useCase: 'Sharp premium style for high-end products, fashion, architecture, and bold brand websites.', desc: 'Hard edges, metallic tones, and dramatic contrast for high-end brand direction.', variants: ['primary','secondary','ghost','outline','accent'] }
];

const selector = document.getElementById('packSelector');
const gallery = document.getElementById('galleryGrid');
const copyStatus = document.getElementById('copyStatus');
const preview = {
  number: document.getElementById('previewNumber'),
  name: document.getElementById('previewName'),
  useCase: document.getElementById('previewUseCase'),
  desc: document.getElementById('previewDesc'),
  buttons: document.getElementById('previewButtons'),
  classList: document.getElementById('classList'),
  snippet: document.getElementById('htmlSnippet'),
  cssGuidance: document.getElementById('cssGuidance')
};

const renderButtons = (pack) => pack.variants.map(v => `<button class="btn-${pack.id} btn-${pack.id}--${v}">${v}</button>`).join('');

function setActivePack(id) {
  const pack = packs.find(p => p.id === id);
  document.querySelectorAll('.pack-chip').forEach(chip => chip.setAttribute('aria-pressed', chip.dataset.id === id ? 'true' : 'false'));
  preview.number.textContent = pack.id;
  preview.name.textContent = pack.name;
  preview.useCase.textContent = pack.useCase;
  preview.desc.textContent = pack.desc;
  preview.buttons.innerHTML = renderButtons(pack);
  preview.classList.textContent = [`btn-${pack.id}`, ...pack.variants.map(v => `btn-${pack.id}--${v}`)].join('\n');
  preview.snippet.textContent = pack.variants.map(v => `<button class="btn-${pack.id} btn-${pack.id}--${v}">${v[0].toUpperCase()}${v.slice(1)}</button>`).join('\n');
  preview.cssGuidance.innerHTML = `Copy the section titled “Button Pack ${pack.id} — ${pack.name}” from <code>css/style.css</code>.`;
}

packs.forEach((pack, index) => {
  const chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'pack-chip';
  chip.dataset.id = pack.id;
  chip.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
  chip.innerHTML = `<strong>${pack.id} — ${pack.name}</strong><br><span>${pack.vibe}</span>`;
  chip.addEventListener('click', () => setActivePack(pack.id));
  chip.addEventListener('keydown', (event) => {
    if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = packs.findIndex(p => p.id === chip.dataset.id);
    const nextIndex = (currentIndex + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + packs.length) % packs.length;
    selector.querySelectorAll('.pack-chip')[nextIndex].focus();
  });
  selector.appendChild(chip);

  const card = document.createElement('article');
  card.className = 'gallery-card';
  card.innerHTML = `<h3>${pack.id} — ${pack.name}</h3><p>${pack.vibe}</p><div class="gallery-row">${renderButtons(pack)}</div>`;
  gallery.appendChild(card);
});

document.querySelectorAll('[data-copy-target]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const target = document.getElementById(btn.dataset.copyTarget);
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      copyStatus.textContent = 'Copied to clipboard.';
      setTimeout(() => { copyStatus.textContent = ''; }, 1800);
    } catch {
      copyStatus.textContent = 'Clipboard unavailable in this browser context.';
    }
  });
});

setActivePack('01');
