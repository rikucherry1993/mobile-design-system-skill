# Stride — Design System

A warm, friendly **city-fitness** design system. Reference guideline: **Android → Material Design 3**
(M3 color roles, type scale, shape scale, elevation, state layers).

## Theme: "Cityscape" (derived from a reference image)
Built from a soft flat-illustration reference (weather cards with city-skyline blobs). Because the
reference gave concrete colours, the **style/colour library deferred to them** and was used only for
the neighbouring decisions: the **teal ↔ amber complementary pairing** (Itten), warm-tinted neutrals,
and the friendly flat-illustration direction.

- **Brand**: muted **teal** `--primary` `#2A7E7E`.
- **Warm city palette**: amber sun, terracotta, dusk slate — mostly inside the illustrations.
- **Signature**: wide flat **city-skyline blob illustrations** as token-driven inline SVG
  (`.illus--day / --dusk / --teal`) — used edge-to-edge as screen heroes.
- Soft warm off-white surfaces, slate ink, **large radii** (`--r-xl` 28), rounded **Nunito** display.

> Library use: concrete-colour brief → defer to brand; complementary teal↔amber harmony + warm neutrals.

## Files
```
design-system/
├── styles.css   # source of truth — M3 tokens + every component class + illustration tokens
├── index.html   # living style guide (Dev Mode + Copy-as-prompt)
├── concept.html # two concept screens — Today (first view) + Run detail
├── icons.html   # token-driven inline SVG sprite + the city illustrations
└── README.md
```
Open `index.html` in any browser (`file://`, no build).

## Palette harmony
Every fill ships a paired `on-*` foreground, each pair **WCAG-verified by math** (e.g. white-on-primary
4.7:1, on-secondary 5.3:1). Neutrals tinted warm; teal and amber stay in one muted band.

## The city illustration (signature)
A reusable inline SVG: an organic **blob** with a vertical gradient (`--illus-1 → --illus-2`), a **sun**
(`--sun`), soft **clouds** (`--cloud`), and a **skyline silhouette** (`--illus-sil`). Theme it per
instance with `.illus--day/--dusk/--teal`; each instance is given unique gradient ids by the helper.
Re-implement it as a token-driven vector in the target framework.

## Copy as prompt
- **Per component** — "add or update": modify the existing component in place to match, or create it.
- **⤓ Install design system** — one prompt: M3 theme (ColorScheme/type/shape/elevation + illustration
  tokens) first, then every component against the shared layer.

## Catalogue (Material 3 Required set)
**Actions**: Buttons (elevated/filled/tonal/outlined/text), Icon buttons, FAB (small/regular/large/
extended), Segmented buttons · **Communication**: Badge, Progress (linear/circular), Snackbar,
Tooltip (plain/rich) · **Containment**: Card (3), Carousel, Divider, Lists, Bottom sheet, Dialog ·
**Navigation**: Top app bar (sizes), Navigation bar, Navigation rail, Navigation drawer, Tabs
(primary/secondary), Search (bar/view), Menu · **Selection**: Checkbox, Chips (assist/filter/input/
suggestion), Radio, Switch, Slider (continuous/discrete), Date picker, Time picker · **Text inputs**:
Text field (filled/outlined).

## Extending
Add a token in `styles.css :root` (+ the dark block); add a component as a class + a `<section id="x">`
+ a `SPECS["x"]` entry (the Copy-as-prompt button auto-injects). Keep roles semantic; keep `on-*` pairs.
