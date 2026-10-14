# Margin — Design System

A **reading & notes** design system (read, listen, download, share, and keep marginalia). Reference
guideline: cross-platform → **Material 3 token model + MUI component breakdown**.

## Direction: "Swiss margin"
**Proposition** — for readers who annotate, keeping the page a quiet black-and-white Swiss layout, so
the reader's own handwritten notes are the only colour, makes "where did I think something" visible
at a glance.

- **References** (two, user-supplied) — (1) a Swiss-typography poster: neutral grey paper with film
  grain, ink, a tight lowercase grotesk, an inverse black highlight block; (2) a hand-drawn character
  sheet: uneven black line people, one green marker accent, a black brush label. Borrowed: (1) colour,
  paper grain, typography; (2) the characters, the green, the brush label, handwriting. Not borrowed:
  either layout or any identity.
- **Colour** — ink `#1B1C1C` on grey paper `#E8E8E7` (13.9:1). **Ink** is the interaction family.
  **Green belongs to the reader**: `--note #448434` (underlines, margin dots — graphic only, 3.7:1),
  `--note-ink #336E27` (note text, 5.0:1 on paper), `--note-wash` (selected text). Status stays
  monochrome (heavy rule / plain / dashed / inverted + icon).
- **Type** — **Inter Tight** (a free stand-in for Neue Haas Grotesk) lowercase and tightly tracked for
  display and labels; **Inter** as the reading face (book text 18/1.72); **Caveat Brush** only for notes.
- **Shape & depth** — square (every radius 0), 1px rules, **no shadows**; emphasis via the inverse
  block (`.inverse`) and heavy rules.
- **Texture** — a film-like **paper grain** (user-requested): grain.png, a 128px tile of black and
  white specks at 0–8.5% alpha, laid over everything with normal blending — about the same grain as
  the poster (σ≈6.5 of 255) in both themes. None in the UI itself.
- **Characters** — hand-drawn line people (`stroke:currentColor` + a roughen filter) only for
  milestones and empty states; a black **brush label** (`.brush`) names sections.
- **Density** — airy: `--gap-related` 8 · `--gap-section` 32 · `--gap-major` 48 · gutter 24.
- **Dark theme** — the poster inverted (grey ink on near-black, notes in `#8CC57A`); `theme.js` keeps
  one choice across `index.html`, `concept.html` and `icons.html`.
- **Sample text** — the opening of Virginia Woolf's *The Waves* (1931; public domain in most countries).

## Files
```
design-system/
├── styles.css   # source of truth — tokens + every component class + illustration styles
├── index.html   # living style guide (Dev Mode + Copy-as-prompt)
├── concept.html # two concept screens — Library (first view) + Reader (marginalia)
├── icons.html   # token-driven inline SVG sprite + hand-drawn illustrations
├── theme.js     # shared light/dark switch
├── grain.png    # 128px paper-grain tile (black + white specks, σ≈6.5)
└── README.md
```
Open `index.html` in any browser (`file://`, no build). Try **Dark (inverted)** in the top-right.

## Palette harmony
Every fill ships its `on-*` pair (here mostly ink↔paper), **WCAG-verified by math** (paper-on-ink ≈ 16:1).

## Copy as prompt
- **Per component** — "add or update": modify the existing component in place to match, or create it.
- **⤓ Install design system** — one prompt: tokens first (incl. the illustration approach), then every
  component against the shared layer.

## Catalogue (MUI Required set)
**Inputs**: Button, Button group, Icon button, FAB, Checkbox, Radio, Switch, Select, Autocomplete,
Slider, Text field, Toggle button, Rating · **Data display**: Avatar, Badge, Chip, Divider, List,
Table, Tooltip · **Feedback**: Alert, Dialog, Snackbar, Progress, Skeleton · **Surfaces**: Card,
Paper, App bar, Accordion · **Navigation**: Bottom navigation, Drawer, Tabs, Menu, Link, Stepper,
Speed dial.

## Extending
Add a token in `styles.css :root` (+ the inverted dark block); add a component as a class + a
`<section id="x">` + a `SPECS["x"]` entry (the Copy-as-prompt button auto-injects). Keep the 1px
rules and square shapes, keep `on-*` pairs, and keep green for the reader's own marks only.
