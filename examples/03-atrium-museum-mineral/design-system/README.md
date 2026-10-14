# Atrium — Design System

A calm, mineral design system for **Atrium**, a museum & gallery guide (self-guided tours, floor
maps, audio). Reference: cross-platform → **Material 3 token model + MUI component breakdown**.

## Direction: "Polychromie rooms"
**Proposition** — for self-guided visitors, painting each exhibition as its own coloured room, and
composing the exhibitions like the squares of a modernist wool rug, makes "which room am I in"
visible at a glance while the artworks stay the richest thing on screen.

- **Reference** — the user supplied one image: a rug of ultramarine / near-black / ecru / mustard
  squares. Borrowed: **colour** (sampled by area) and its **square-block composition**. Not borrowed:
  the logo, wordmark or any identity of the source.
- **Color roles** — one interaction family: **ink** `--primary` `#201F26` (16.3:1 on white).
  Ultramarine `--secondary` carries meaning; mustard `--accent` marks now-playing and ratings.
  Base: cool lavender-grey `--bg` `#E4E4EB` (the rug's `#9897A4`, lifted) with cool-white `--surface` `#F8F8FB` — no warm cream.
- **Room tones** (the rug) — `--room-blue #495CB2` (30%) · `--room-ink #201F26` (27%) ·
  `--room-ecru #C4BCB4` (13%) · `--room-mustard #D0A749` (11%) · `--room-grey #9897A4` (8%), each
  with its `--on-room-*` (5.7–15.6:1). Content surfaces only, never chrome.
- **Signature** — the `.mosaic` layout: exhibitions placed as tiles on a 6-column rug grid
  (`--mosaic-cell` 60px), plain room-tone filler squares, no gaps, no radius. One signature per
  screen: the mosaic on the first view, the room wall (+ a thin rug edge) on the detail.
- **Type** — **Inter** is the reading face (body, nav, buttons, tabular numerals); **Spectral** only
  for exhibition and artwork titles.
- **Shape & depth** — medium radii (8–16) on components, square mosaic tiles; **tonal** elevation:
  no card shadows, shadow only on overlays. Flat fills only — no gradients, no grain.
- **Icons** — rounded outline, 1.75 stroke, round caps/joins to match Inter.
- **Dark theme** — "lights off": the rug's near-black becomes the room and every square drops to
  about half its light (blue `#2C3878`, mustard `#7E6427`, ecru `#4B4844`, grey `#3E3D48`), so the
  switch reads as a different state, not a tint. `theme.js` keeps the
  choice in sync between `index.html`, `concept.html` and `icons.html` (defaults to the OS setting).

## Artwork images
Artworks are shown whole (`.imgslot.fit`). All six are public domain (the NGA file is CC0), from
Wikimedia Commons, resized to ≤ 720px; the Duccio's gable background was made transparent.

| File | Work | Source |
|---|---|---|
| `art/whistler-blue-gold.jpg` | Whistler, *Nocturne: Blue and Gold – Old Battersea Bridge*, c. 1872–75 | [Commons](https://commons.wikimedia.org/wiki/File:James_McNeill_Whistler_-_Nocturne_en_bleu_et_or.jpg) |
| `art/whistler-falling-rocket.jpg` | Whistler, *Nocturne in Black and Gold: The Falling Rocket*, 1875 | [Commons](https://commons.wikimedia.org/wiki/File:Whistler-Nocturne_in_black_and_gold.jpg) |
| `art/whistler-blue-silver.jpg` | Whistler, *Nocturne: Blue and Silver – Chelsea*, 1871 | [Commons](https://commons.wikimedia.org/wiki/File:James_Abbott_McNeill_Whistler_-_Nocturne-_Blue_and_Silver_-_Chelsea_-_Google_Art_Project.jpg) |
| `art/monet-water-lilies.jpg` | Monet, *Water Lilies*, 1906 | [Commons](https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg) |
| `art/monet-footbridge.jpg` | Monet, *The Japanese Footbridge*, 1899 (CC0) | [Commons](https://commons.wikimedia.org/wiki/File:Claude_Monet,_The_Japanese_Footbridge,_1899,_NGA_74796.jpg) |
| `art/duccio-rucellai.webp` | Duccio, *Rucellai Madonna*, 1285 | [Commons](https://commons.wikimedia.org/wiki/File:Duccio_-_Maest%C3%A0_-_Google_Art_Project.jpg) |

## Files
```
design-system/
├── styles.css   # source of truth — :root tokens + every component class
├── index.html   # living style guide (Dev Mode inspector + Copy-as-prompt)
├── concept.html # two concept screens — exhibitions as a rug mosaic (first view) + artwork detail
├── icons.html   # token-driven inline SVG icon sprite + showcase
├── theme.js     # shared light/dark switch (remembered per browser)
├── art/         # public-domain artwork images (see above)
└── README.md
```
Open `index.html` in any browser (`file://`, no build). The **Concept preview** link is at the top
of the sidebar; the concept page links back.

## Palette harmony
1. **Every fill has a paired `--on-*` foreground**, chosen together (`--primary`/`--on-primary`,
   `--room-blue`/`--on-room-blue`, …).
2. **Contrast verified with math** — body ≥ 4.5:1, large/UI ≥ 3:1 (white on ink 16.3:1, on-error 6.3:1,
   ink on mustard 7.2:1, `--subtle` 3.1:1 is UI-only). The dark after-hours theme is checked the same way.

## Copy as prompt (two scopes)
- **Per component** — each prompt is "add or update": modify the existing component in place to match
  the spec, or create it if missing.
- **⤓ Install design system** (top bar) — one prompt to scaffold the whole system from zero *or*
  update it all to match: foundation-first, then components against the **shared** token layer.

## Extending the system
- **Add a token** — add the CSS variable to the right group in `styles.css :root` (and the
  `:root[data-theme="dark"]` block). If it's a fill, add its `--on-*` partner and check contrast.
- **Add a component** — new class block in `styles.css` (tokens only) + a `<section>` in `index.html`
  with every variant × state + a `SPECS` entry. Tag the demo with `data-insp="<key>"`.
- **Theming / dark mode** — the `:root[data-theme="dark"]` block (an after-hours gallery variant)
  overrides only tokens; components are untouched.

## Catalogue (MUI Required set)
**Inputs**: Button, Button group, Icon button, FAB, Checkbox, Radio, Switch, Select, Autocomplete,
Slider, Text field, Toggle button, Rating ·
**Data display**: Avatar, Badge, Chip, Divider, List, Table, Tooltip, Typography, Icon ·
**Feedback**: Alert, Dialog, Snackbar, Progress, Skeleton, Backdrop ·
**Surfaces**: Card, Paper, App bar, Accordion ·
**Navigation**: Bottom navigation, Drawer, Tabs, Menu, Link, Stepper, Speed dial.
