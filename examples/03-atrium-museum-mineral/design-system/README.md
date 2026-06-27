# Atrium — Design System

A calm, mineral design system for **Atrium**, a museum & gallery guide (self-guided tours, floor
maps, audio). Reference: cross-platform → **Material 3 token model + MUI component breakdown**.

## Theme: "Mineral & Architectural"
The palette is reasoned from the **library** (`references/style-color-library.md`): the
**architectural / mineral** brief maps to **Le Corbusier's *Polychromie Architecturale*** keyboard —
plaster neutrals, slate-blue, ochre, warm umber, mineral green/sienna, one warm low-chroma
temperature. The ramp was reasoned in **OKLCH** (constant low chroma, varying tone) and then run
through the `design-principles.md` §1 harmony pass (paired `--on-*`, WCAG-checked by math).

**Light plaster base + per-exhibition tones.** Rather than one flat background, each exhibition page
takes a **tone that harmonises with its artwork** — deep **navy** (`--tone-navy`) for dark works,
**terracotta** (`--tone-clay`) for warm ones, **sage** for greens, plaster for light works — so the
app "varies but stays in harmony with the art on the page." Each tone ships an `--on-tone-*` cream
(≥7:1). Toggle `[data-theme="dark"]` for a full after-hours gallery. Type pairs editorial **Spectral**
serif with **Inter**; restrained architectural radii.

> Archetype: Le Corbusier *Polychromie* (mineral keyboard) · Method: OKLCH tonal ramp + WCAG math.

### Imagery & 质感 (drawn artworks, not placeholders)
The UI chrome stays restrained and mineral; **colour and life come from the art** — like a real
gallery (white walls, vivid works). Paintings are **drawn inline-SVG pieces** (`sunflowers`, `starry`,
`portrait`, `wheatfield`) rendered by the `artwork()` helper with a **canvas-grain filter**
(`#paintGrain`) + vignette for texture. They live in a gallery **`.artframe`** (mat + thin frame +
inner glass) and fill any `.artwin[data-art]`. To use **real public-domain images** instead, drop an
`<img>` into the same `.artwin` — the frame/texture still apply. See the **Artworks** foundation
section and the concept (full-bleed hero, exhibition cards, framed ticket thumbnails).

## Files
```
design-system/
├── styles.css   # source of truth — :root tokens + every component class
├── index.html   # living style guide (Dev Mode inspector + Copy-as-prompt)
├── concept.html # two concept screens — Exhibitions (first view) + Artwork detail (drawn paintings)
├── icons.html   # token-driven inline SVG icon sprite + showcase
└── README.md
```
Open `index.html` in any browser (`file://`, no build). The **Concept preview** link is at the top
of the sidebar; the concept page links back.

## Palette harmony
1. **Every fill has a paired `--on-*` foreground**, chosen together (`--primary`/`--on-primary`, …).
2. **Contrast verified with math** — body ≥ 4.5:1, large/UI ≥ 3:1 (e.g. white-on-primary 5.7:1,
   on-error 6.2:1, dark-on-warning ~5:1). The swatches show each pair so the ratio is auditable.
Neutrals are warm plaster; accents stay in one mineral band; shadows are soft, ink-tinted, layered.

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
