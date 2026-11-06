// ============================================================
// CLASP: student theme list, used by theme pickers.
// Colours here are only for the preview swatches; the real
// values live in theme.css.
// ============================================================

export const THEMES = [
  { id: 'light',    name: 'Clean light', desc: 'Bright, calm and simple',          bg: '#f7f8fa', surface: '#ffffff', primary: '#2563eb', text: '#111827', dark: false },
  { id: 'midnight', name: 'Midnight',    desc: 'Dark navy, easy on the eyes',      bg: '#0b1220', surface: '#111a2e', primary: '#38bdf8', text: '#e6edf7', dark: true  },
  { id: 'calm',     name: 'Calm study',  desc: 'Warm paper with sage green',       bg: '#f7f4ee', surface: '#fffdf8', primary: '#4f7a5f', text: '#2b2a26', dark: false },
  { id: 'bright',   name: 'Bright',      desc: 'Bold purple and pink',             bg: '#f4f1ff', surface: '#ffffff', primary: '#6d28d9', text: '#1e1238', dark: false },
  { id: 'edge',     name: 'Edge',        desc: 'Dark with violet highlights',      bg: '#0f1020', surface: '#17182b', primary: '#7c74ff', text: '#eceefe', dark: true  },
  { id: 'spark',    name: 'Spark',       desc: 'Warm and friendly orange',         bg: '#fff8f1', surface: '#ffffff', primary: '#f2662b', text: '#2b2118', dark: false },
  { id: 'focus',    name: 'Focus',       desc: 'Minimal, no distractions',         bg: '#f6f7f7', surface: '#ffffff', primary: '#0f766e', text: '#18201f', dark: false },
];

export function themeById(id) {
  return THEMES.find(t => t.id === id) || THEMES.find(t => t.id === 'edge');
}

// Colour used for a student's avatar/initials
export function themeColour(id) {
  return themeById(id).primary;
}

// Small preview card markup (used by the pickers)
export function themeSwatchHtml(t, selected) {
  return `<button type="button" class="theme-swatch${selected ? ' selected' : ''}" data-theme-id="${t.id}" aria-pressed="${selected}">
    <span class="theme-swatch-preview" style="background:${t.bg};">
      <span style="background:${t.surface};border-color:${t.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};">
        <span style="background:${t.primary};"></span>
        <span style="background:${t.text};opacity:.18;"></span>
        <span style="background:${t.text};opacity:.12;width:60%;"></span>
      </span>
    </span>
    <span class="theme-swatch-name">${t.name}</span>
    <span class="theme-swatch-desc">${t.desc}</span>
  </button>`;
}

export const THEME_SWATCH_CSS = `
.theme-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
.theme-swatch { display: flex; flex-direction: column; gap: 4px; text-align: left; padding: 8px; border-radius: var(--radius-card); border: 2px solid var(--color-border); background: var(--color-surface); color: var(--color-text); cursor: pointer; font: inherit; }
.theme-swatch:hover { border-color: var(--color-text-faint); }
.theme-swatch.selected { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-glow); }
.theme-swatch-preview { display: block; height: 58px; border-radius: calc(var(--radius-card) - 6px); padding: 8px; }
.theme-swatch-preview > span { display: flex; flex-direction: column; gap: 5px; height: 100%; border-radius: 6px; padding: 7px; border: 1px solid; }
.theme-swatch-preview > span > span { display: block; height: 6px; border-radius: 4px; width: 80%; }
.theme-swatch-preview > span > span:first-child { width: 40%; height: 8px; }
.theme-swatch-name { font-family: var(--font-ui); font-weight: 700; font-size: 0.84rem; margin-top: 2px; }
.theme-swatch-desc { font-size: 0.72rem; color: var(--color-text-muted); line-height: 1.35; }
`;
