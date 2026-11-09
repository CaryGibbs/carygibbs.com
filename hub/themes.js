// ============================================================
// LOBE LIMPET: student theme list, used by theme pickers.
// Colours here are only for the preview swatches; the real
// values live in theme.css.
// ============================================================

export const THEMES = [
  { id: 'edge',     name: 'Ember',       desc: 'Warm dark with limpet coral',      bg: '#15120f', surface: '#1f1b17', primary: '#ff8a65', text: '#f6efe8', dark: true  },
  { id: 'midnight', name: 'Deep Sea',    desc: 'Dark teal with coral',             bg: '#0a1c22', surface: '#10282f', primary: '#ff9b73', text: '#e8f4f4', dark: true  },
  { id: 'cosmic',   name: 'Cosmic',      desc: 'Deep plum night, coral and lilac', bg: '#170f20', surface: '#21162d', primary: '#ff8a65', text: '#f4ecfb', dark: true  },
  { id: 'light',    name: 'Daylight',    desc: 'Clean white, teal and coral',      bg: '#faf7f4', surface: '#ffffff', primary: '#0f5560', text: '#1c1917', dark: false },
  { id: 'calm',     name: 'Sage & Clay', desc: 'Warm paper, sage and clay',        bg: '#f5f3ec', surface: '#fffdf8', primary: '#3f6b55', text: '#24231f', dark: false },
  { id: 'bright',   name: 'Berry Pop',   desc: 'Bold plum with coral',             bg: '#fdf4f6', surface: '#ffffff', primary: '#8e2c6b', text: '#2a1422', dark: false },
  { id: 'spark',    name: 'Sunshine',    desc: 'Sunny and orange all the way',     bg: '#fff7ef', surface: '#ffffff', primary: '#c2410c', text: '#2b1d14', dark: false },
  { id: 'focus',    name: 'Ink',         desc: 'Minimal black and white',          bg: '#f7f7f6', surface: '#ffffff', primary: '#1c1917', text: '#1c1917', dark: false },
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
