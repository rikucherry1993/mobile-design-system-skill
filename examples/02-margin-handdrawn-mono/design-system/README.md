# Margin — Design System

A **monochrome, hand-drawn** design system for a personal **reading & notes** app (read, listen,
download, share, and keep marginalia). Reference guideline: cross-platform → **Material 3 token model
+ MUI component breakdown**.

## Theme: "Inkprint"
Derived from two hand-drawn B&W references. Per the **style/colour library**, this is **Brutalist ×
Editorial**: thick black outlines, hard offset shadows, heavy expressive display type, and hand-drawn
line illustrations. Because it's monochrome there's no colour decision — the library informed
**shape, type, and decoration** instead.

- **Ink on paper**: `--ink #14110D` on warm `--paper #FAF7F0`, plus an inverse **ink card** (black/white).
- **Outlines**: a 2px `--stroke` ink border is the look; large radii + pills; flat with a **hard
  offset shadow** (`--shadow-hard`) for emphasis.
- **Type**: heavy **Space Grotesk** display · **Inter** body · **Lora** serif for reading · **Caveat**
  handwriting for reading notes.
- **Signature**: hand-drawn **line illustrations** (open book, reader, listen, stack) as inline SVG
  with `stroke:currentColor` (they invert on the ink card), plus sparkle + wavy-underline doodles.
- **Monochrome status**: severity is shown by **treatment** (raised / dashed / inverted) + icon, not hue.

> Library use: monochrome → no palette; brutalist × editorial archetypes drove outlines, hard shadows,
> heavy display type, serif reading face, and the hand-drawn illustrations.

## Files
```
design-system/
├── styles.css   # source of truth — tokens + every component class + illustration styles
├── index.html   # living style guide (Dev Mode + Copy-as-prompt)
├── concept.html # two concept screens — Home (first view) + Reader (marginalia)
├── icons.html   # token-driven inline SVG sprite + hand-drawn illustrations
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
`<section id="x">` + a `SPECS["x"]` entry (the Copy-as-prompt button auto-injects). Keep the 2px
outline, keep `on-*` pairs, keep it monochrome.
