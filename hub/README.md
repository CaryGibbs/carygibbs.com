# Clasp — Revision Hub v2.0

> Revision that sticks.

A multi-user gamified GCSE revision platform built with HTML/CSS/JS, Firebase, and GitHub Pages.

## Live URL
`https://carygibbs.com/hub`

## Firebase Project
`clasp-hub` — europe-west1 — Blaze plan

## File Structure
```
/hub
├── index.html          ← Landing / login page
├── hub.html            ← Student hub (Phase 4)
├── parent.html         ← Parent dashboard (Phase 6)
├── admin.html          ← Admin panel (Phase 3)
├── theme.css           ← All CSS variables and base styles
├── brand.js            ← Brand config (name, logo, colours)
├── firebase-config.js  ← Firebase initialisation
├── database.rules.json ← Firebase security rules
└── assets/
    └── images/
        ├── brand/      ← Logo, favicon, hero
        ├── ui/         ← Icons, decorative elements
        └── subjects/   ← Subject illustrations
```

## Themes
Set `data-theme` on `<body>`:
- `edge`   — Dark gamified (young teenager, default)
- `spark`  — Bright playful (younger child)
- `focus`  — Clean minimal (older/serious student)
- `parent` — Professional light (parent dashboard)

## Build Phases
- ✅ Phase 1 — Foundation (this commit)
- ⬜ Phase 2 — Auth & user model
- ⬜ Phase 3 — Content & admin panel
- ⬜ Phase 4 — Student quiz engine
- ⬜ Phase 5 — Gamification
- ⬜ Phase 6 — Parent dashboard
```
