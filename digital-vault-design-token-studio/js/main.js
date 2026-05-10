const presets = {
  "Minimal SaaS": { foundation: "light", accent: "#2563eb", spacing: 1, radius: 1, shadow: 0, motion: 1 },
  "Enterprise Dashboard": { foundation: "dark", accent: "#0ea5e9", spacing: 1, radius: 0, shadow: 1, motion: 0 },
  "Editorial Magazine": { foundation: "light", accent: "#a21caf", spacing: 2, radius: 0, shadow: 0, motion: 0 },
  "Premium Dark UI": { foundation: "dark", accent: "#7c3aed", spacing: 1, radius: 1, shadow: 2, motion: 1 },
  "Luxury Brand": { foundation: "dark", accent: "#d4a017", spacing: 2, radius: 2, shadow: 2, motion: 1 },
  "Startup Landing": { foundation: "light", accent: "#f43f5e", spacing: 1, radius: 2, shadow: 1, motion: 2 },
  "Developer Tooling": { foundation: "dark", accent: "#22c55e", spacing: 0, radius: 1, shadow: 1, motion: 0 },
  "Modern Portfolio": { foundation: "light", accent: "#7c3aed", spacing: 2, radius: 2, shadow: 1, motion: 1 }
};
const els = {
  presetSelect: document.getElementById("presetSelect"), projectName: document.getElementById("projectName"), brandName: document.getElementById("brandName"),
  projectType: document.getElementById("projectType"), interfaceStyle: document.getElementById("interfaceStyle"), namingConvention: document.getElementById("namingConvention"),
  accentColor: document.getElementById("accentColor"), foundation: document.getElementById("foundation"), spacingDensity: document.getElementById("spacingDensity"),
  radiusIntensity: document.getElementById("radiusIntensity"), shadowIntensity: document.getElementById("shadowIntensity"), motionIntensity: document.getElementById("motionIntensity"),
  previewGrid: document.getElementById("previewGrid"), tokenOutput: document.getElementById("tokenOutput"), reportContent: document.getElementById("reportContent")
};
let currentTab = "css";
Object.keys(presets).forEach(name => els.presetSelect.add(new Option(name, name)));
function alpha(hex, a){const n=parseInt(hex.slice(1),16);return`rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
function scale(base, step){return `${(base*step).toFixed(2)}rem`;}
function buildTokens(){
  const dark = els.foundation.value === "dark";
  const accent = els.accentColor.value;
  const spacingBase = [0.25,0.5,0.75][+els.spacingDensity.value];
  const radiusBase = [0.375,0.75,1.25][+els.radiusIntensity.value];
  const shadowY = [10,18,24][+els.shadowIntensity.value];
  const duration = [140,220,320][+els.motionIntensity.value];
  return {
    color:{bg:dark?"#0b1020":"#f8fafc",surface:dark?"#121a2d":"#ffffff",surfaceElevated:dark?"#172033":"#f1f5f9",text:dark?"#f8fafc":"#0f172a",textMuted:dark?"#94a3b8":"#475569",border:alpha(accent,0.3),accent,accentHover:alpha(accent,0.88),success:"#22c55e",danger:"#ef4444"},
    type:{fontSans:"Inter, Segoe UI, sans-serif",fs01:"0.75rem",fs02:"0.875rem",fs03:"1rem",fs04:"1.125rem",fs05:"1.25rem",fs06:"clamp(1.5rem, 1.2rem + 1vw, 2rem)",lhHeading:"1.2",lhBody:"1.6",letterTight:"-0.02em",letterWide:"0.04em"},
    space:{s1:scale(spacingBase,1),s2:scale(spacingBase,2),s3:scale(spacingBase,3),s4:scale(spacingBase,4),s5:scale(spacingBase,6),s6:scale(spacingBase,8)},
    radius:{sm:`${radiusBase/2}rem`,md:`${radiusBase}rem`,xl:`${radiusBase*2}rem`,pill:"999px"},
    shadow:{soft:`0 ${shadowY}px ${shadowY*2}px rgba(15,23,42,0.16)`,card:`0 ${shadowY+6}px ${shadowY*3}px rgba(15,23,42,0.2)`},
    motion:{fast:`${Math.round(duration*0.7)}ms`,base:`${duration}ms`,easeStandard:"cubic-bezier(0.2, 0, 0, 1)",easeEmphasized:"cubic-bezier(0.16, 1, 0.3, 1)"},
    z:{base:1,dropdown:20,sticky:40,modal:80,toast:100},
    components:{buttonRadius:"var(--radius-pill)",buttonPaddingX:"var(--space-5)",cardPadding:"var(--space-6)",inputPaddingY:"var(--space-2)",badgeRadius:"var(--radius-sm)"}
  };
}
function cssTokens(t){ return `:root {\n  --color-bg: ${t.color.bg};\n  --color-surface: ${t.color.surface};\n  --color-surface-elevated: ${t.color.surfaceElevated};\n  --color-text: ${t.color.text};\n  --color-text-muted: ${t.color.textMuted};\n  --color-border: ${t.color.border};\n  --color-accent: ${t.color.accent};\n  --color-accent-hover: ${t.color.accentHover};\n  --color-success: ${t.color.success};\n  --color-danger: ${t.color.danger};\n\n  --fs-01: ${t.type.fs01}; --fs-02: ${t.type.fs02}; --fs-03: ${t.type.fs03}; --fs-04: ${t.type.fs04}; --fs-05: ${t.type.fs05}; --fs-06: ${t.type.fs06};\n  --lh-heading: ${t.type.lhHeading}; --lh-body: ${t.type.lhBody}; --letter-tight: ${t.type.letterTight}; --letter-wide: ${t.type.letterWide};\n\n  --space-1: ${t.space.s1}; --space-2: ${t.space.s2}; --space-3: ${t.space.s3}; --space-4: ${t.space.s4}; --space-5: ${t.space.s5}; --space-6: ${t.space.s6};\n  --radius-sm: ${t.radius.sm}; --radius-md: ${t.radius.md}; --radius-xl: ${t.radius.xl}; --radius-pill: ${t.radius.pill};\n  --shadow-soft: ${t.shadow.soft}; --shadow-card: ${t.shadow.card};\n  --duration-fast: ${t.motion.fast}; --duration-base: ${t.motion.base};\n  --ease-standard: ${t.motion.easeStandard}; --ease-emphasized: ${t.motion.easeEmphasized};\n  --z-base: ${t.z.base}; --z-dropdown: ${t.z.dropdown}; --z-sticky: ${t.z.sticky}; --z-modal: ${t.z.modal}; --z-toast: ${t.z.toast};\n}`; }
function markdownDoc(t){return `# ${els.projectName.value} · Token Report\n\n## Project Summary\n- Brand/System: **${els.brandName.value}**\n- Type: **${els.projectType.value}**\n- Style: **${els.interfaceStyle.value}**\n- Naming Convention: **${els.namingConvention.value}**\n\n## Token Philosophy\nSemantic token naming separates role from hue/size and improves maintainability across themes and component libraries.\n\n## Quality Rules\n**Bad**: \`--blue\`, \`--big-space\`, \`--cool-shadow\`\n**Good**: \`--color-accent\`, \`--space-6\`, \`--shadow-card\`\n\n## Accessibility Notes\n- Keep body copy contrast high against \`--color-bg\`.\n- Use reduced motion by mapping interactions to \`--duration-fast\` or disabling transitions where needed.\n\n## CSS Tokens\n\`\`\`css\n${cssTokens(t)}\n\`\`\``}
function render(){
  const t=buildTokens();
  document.documentElement.style.setProperty("--accent",t.color.accent);document.documentElement.style.setProperty("--accent-hover",t.color.accentHover);
  els.previewGrid.innerHTML = `<div class="preview-item"><h3>Buttons</h3><button class="vault-btn">Primary Action</button></div>
  <div class="preview-item"><h3>Badge + Alert</h3><span class="preview-badge">Stable Release</span><div class="preview-alert">Token architecture validated for semantic scaling and theme portability.</div></div>
  <div class="preview-item"><h3>Card</h3><p style="margin:0;color:var(--muted)">Card padding uses component-level mapping with role-based spacing tokens.</p></div>
  <div class="preview-item"><h3>Input</h3><input type="text" value="Search tokens" aria-label="Token search preview" /></div>`;
  const outputs = {css: cssTokens(t), json: JSON.stringify(t,null,2), md: markdownDoc(t)};
  els.tokenOutput.textContent = outputs[currentTab];
  els.reportContent.innerHTML = `<p><strong>Architecture recommendation:</strong> Keep foundations (color/type/space/radius/shadow/motion/z) separated from component aliases to prevent brittle token coupling.</p>
  <ul><li>Use semantic names for portability between themes.</li><li>Avoid hardcoded pixel values in components.</li><li>Document contrast and reduced-motion behavior in implementation guides.</li></ul>
  <h3>Component Mapping</h3><pre>${JSON.stringify(t.components,null,2)}</pre>`;
  [...document.querySelectorAll('[data-export]')].forEach(btn=>btn.onclick=()=>navigator.clipboard.writeText(outputs[btn.dataset.export]));
  [...document.querySelectorAll('[data-download]')].forEach(btn=>btn.onclick=()=>{const type=btn.dataset.download;const blob=new Blob([outputs[type]],{type:'text/plain'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${els.brandName.value.toLowerCase().replace(/\s+/g,'-')}-tokens.${type}`;a.click();URL.revokeObjectURL(a.href);});
}
els.presetSelect.addEventListener("change",()=>{const p=presets[els.presetSelect.value];els.foundation.value=p.foundation;els.accentColor.value=p.accent;els.spacingDensity.value=p.spacing;els.radiusIntensity.value=p.radius;els.shadowIntensity.value=p.shadow;els.motionIntensity.value=p.motion;render();});
document.querySelectorAll('input,select,textarea').forEach(el=>el.addEventListener('input',render));
document.querySelectorAll('.vault-tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.vault-tab').forEach(t=>t.classList.remove('is-active'));tab.classList.add('is-active');currentTab=tab.dataset.tab;render();}));
document.getElementById('printReportBtn').addEventListener('click',()=>window.print());
els.presetSelect.value = "Premium Dark UI";els.presetSelect.dispatchEvent(new Event("change"));
