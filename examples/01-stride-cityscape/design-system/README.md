# Stride — Design System

A **trail & hiking** design system (hiking and trail running). Reference guideline: **Android →
Material Design 3** (M3 color roles, type scale, shape scale, elevation, state layers).

## Direction: "Topo HUD"
**Proposition** — for trail runners and hikers, dimming the real mountain photo and laying yellow
contours, the route and an instrument-like readout layer over it makes "how much climb is left, and
where am I" readable at a glance.

- **Reference** — one image: an outdoor poster, a faded misty mountain photo with a rough
  butter-yellow hand-drawn line on top (sampled: mist blue-grey ~57%, olive-black 17%, butter yellow
  `#F1E88C` 11%, earth brown, khaki). Borrowed (user-stated): faded outdoor **photography**, the
  **yellow hand-drawn line** (as routes and contours) and its **colours**. Not borrowed: the poster's
  type, layout, or any identity.
- **Dark-first** — `:root` is the dark theme (`--background` `#121410`, olive-black);
  `[data-theme="light"]` is a misty-day option (`#E2E7E7`). `theme.js` remembers the choice across
  `index.html`, `concept.html` and `icons.html`.
- **Actions** — **butter yellow** is the only interaction family: dark = yellow fill / ink text
  (13.7:1); light = ink fill / yellow text. In light, yellow containers get a hairline
  (`--container-edge`) because yellow is ≈ the misty ground (1.0:1). **Mist blue** (secondary) marks
  weather/water; **khaki** (tertiary) terrain.
- **Terrain layer (signature)** — real, faded photo (`.terrain > img`) under a flat scrim
  (`--photo-scrim`), yellow contours (`.topo`), the hand-drawn route (`.route`, completed part
  `.route-done`), position (`.you`) and summit (`.peak`); yellow and white stay ≥ 6:1 on it.
- **Readouts** — `.hud` / `.readout` in **IBM Plex Mono** (numerals + HUD labels only); **Inter** is
  the reading face.
- **Shape & depth** — r 2–4, hairline outlines; elevation levels 1–2 none, short dark shadow from
  level 3 (overlays). Flat fills only — the texture lives in the photos.
- **Icons** — thin technical outline: 1.5 stroke, butt caps, miter joins.
- **Density** — compact: `--gap-related` 8 · `--gap-section` 16 · `--gap-major` 24 · gutter 16;
  touch targets stay 48.

## Photos
Real outdoor photographs from Wikimedia Commons, all **public domain** or **CC0**, resized to ≤ 960px
with a baked faded treatment (lower saturation and contrast, lifted blacks, a slight mist-blue cast).

| File | Photo | License · source |
|---|---|---|
| photos/roys-peak-sunrise.jpg | Sunrise at Roys Peak, New Zealand | CC0 · [Commons](https://commons.wikimedia.org/wiki/File:Sunrise_at_Roy%27s_Peak_(Unsplash).jpg) |
| photos/fog-trail-markers.jpg | Looking for trail markers in low visibility | Public domain · [Commons](https://commons.wikimedia.org/wiki/File:Looking_for_trail_markers_in_low_visibility_conditions_(51484234243).jpg) |
| photos/tinkham-ridge.jpg | Hikers on Tinkham Mountain Ridge | Public domain · [Commons](https://commons.wikimedia.org/wiki/File:Hikers_on_Tinkham_Mountain_Ridge_(5)_(29351320781).jpg) |
| photos/dolomites-ridge.jpg | Hiking in the tall Dolomites | CC0 · [Commons](https://commons.wikimedia.org/wiki/File:Hiking_in_the_tall_Dolomites_(Unsplash).jpg) |
| photos/ridge-trail-nps.jpg | Hiker on a ridge trail (NPS photo) | Public domain · [Commons](https://commons.wikimedia.org/wiki/File:Hiker_ridge_mountain_people_trail_NPS_Photo_(16751838183).jpg) |

Trail figures in the concept (distances, ascent, times) are illustrative sample content.

## Files
```
design-system/
├── styles.css   # source of truth — M3 tokens (dark-first) + terrain layer + every component class
├── index.html   # living style guide (Dev Mode + Copy-as-prompt)
├── concept.html # two concept screens — Today (planned trail) + Live on the trail
├── icons.html   # token-driven inline SVG sprite
├── photos/      # public-domain / CC0 outdoor photos (see above)
├── theme.js     # shared dark/light switch (dark-first)
└── README.md
```
Open `index.html` in any browser (`file://`, no build).

## Palette harmony
Every fill ships a paired `on-*` foreground, each pair **WCAG-verified by math**: yellow on olive-black
14.7:1, ink on yellow 13.7:1, on-surface 15.0:1, mist blue 8.2:1, khaki 8.9:1; light theme on-surface
13.8:1. On photos, the flat scrim keeps yellow ≥ 6:1 and white ≥ 7:1.

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
