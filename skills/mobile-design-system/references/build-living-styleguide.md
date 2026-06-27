# Building the living style guide + concept mockup

This is the "how" for the three deliverables. Start from `templates/` and fill them in.

## File layout (in the target project)
```
design-system/
├── styles.css   # tokens (:root CSS vars) + component classes — shared by all HTML files
├── index.html   # living style guide (links styles.css) + Dev Mode + Copy as prompt
├── concept.html # TWO concept screens (first view + detail) composed from the components
├── icons.html   # inline SVG icon sprite + showcase (links styles.css)
└── README.md    # structure + how to extend
```
All HTML files `<link rel="stylesheet" href="styles.css">` so there is one source of styles.

## Icons & assets (greenfield: no project files exist yet)
The app is brand-new, so there are **no project SVGs/images to link**. Provide icons as an **inline
SVG sprite** instead:
- `icons.html` holds the canonical sprite (`<symbol id="i-…" viewBox="0 0 24 24">`) plus a showcase
  grid. **Copy the sprite block to the top of `index.html` and `concept.html`** (right after
  `<body>`) so each file is self-contained under `file://`. Use it with
  `<svg class="ico"><use href="#i-home"/></svg>`.
- Icons are **token-driven** via `styles.css` (`.ico` + `--icon-size` / `--icon-stroke`):
  `fill:none; stroke:currentColor; stroke-width:var(--icon-stroke)`. Changing a token reskins every
  icon — same as the rest of the system, so they participate in the theme-switch loop.
- **Draw geometry in the style of classic open sets** — Lucide/Feather (MIT), Material Symbols
  (Apache-2.0). Style by platform: Android/cross-platform → Material/outlined; iOS → thinner stroke,
  rounder (SF-like). **Do not embed Apple SF Symbols** assets (license forbids redistribution) —
  approximate the look with an open set.
- Missing a glyph? Look up a classic open set online (fonts.google.com/icons, lucide.dev) for the
  shape and add a `<symbol>`. **Never** invent a sloppy path, and **never use emoji for UI icons**
  (emoji only as throwaway *content* placeholders, never for buttons/nav/affordances).
- Images/photos in the mockup: use a token-colored placeholder block (e.g. a gradient
  `var(--primary)→var(--secondary)`), not an external image.

## index.html — the living style guide
Sections, in order:
1. **Foundations**: Colors (swatch + name + value), Typography (rendered specimens + token name),
   Spacing (visual bars), Radius, Elevation, Icons (the sprite grid — or link `icons.html`).
2. **Atomic components**: one section each, showing every variant × state.
3. **Composed components**: one section each.

The set of components (and their categories/names) is **not improvised** — build the whole Required
list for the chosen guideline from `component-checklist.md`, in that file's category order, so the
sidebar and `SPECS` keys are the same shape on every run. Same catalogue size each time; only the
token values change between themes.

### Dev Mode inspector (Figma-style)
A toggle adds an inspectable mode: hovering a component outlines it; clicking opens a right-hand
**Inspector** panel showing, for that component:
- name + source file path,
- **Properties** (name, type, default, description),
- **Design tokens** used (color swatch + token name + value; click to copy),
- **Metrics** (radius, sizes, borders, shadow offsets, padding).

This is driven by a single `SPECS` JS object — one entry per component:
```js
SPECS.button = {
  name: 'Button', file: 'components/button.(dart|tsx|swift)',
  desc: 'Primary action; filled with a hard shadow that flips on press.',
  props: [ {n:'label',t:'String'}, {n:'variant',t:'primary|secondary|danger',def:'primary'},
           {n:'disabled',t:'bool',def:'false'} ],
  tokens:[ {r:'fill', n:'primary', v:'#2563EB', c:'#2563EB'},
           {r:'label type', n:'titleLarge', v:'Inter 700 / 20'} ],   // c = swatch color (omit for non-color)
  metrics:[ ['radius','12'], ['minHeight','52'], ['padding','h 16 · v 8'] ],
};
```
Components are selected by matching CSS class → spec key (event delegation), so you don't tag every
instance. Register each component's `(selector → key)` and add it to the hover-highlight CSS.

A **"Concept preview →"** link sits at the top of the sidebar (`href="concept.html"`) so the mockup
is reachable straight from the catalogue.

### Copy as prompt — two scopes
A target-language `<select>` (Flutter / React+TS / SwiftUI / Compose / RN / Web …). **Reorder the
list so the user's stated framework is first (pre-selected); if none was given, don't default to
Flutter** — the catalogue is framework-agnostic. Two scopes only (keep it to two buttons, no mode
toggle):

- **Per component** — a "Copy as prompt" button per section + in the inspector. The per-section button
  is **auto-injected for every section whose `id` matches a `SPECS` key** (a small loop in
  `index.html`), so no component is missed and you don't hand-place buttons — just give each component
  a `<section id="<key>">` and a `SPECS["<key>"]` entry. The prompt is self-contained from that
  `SPECS` entry: description, properties, exact tokens (named constants — no magic values), metrics,
  requirements. **Every component prompt is written "add or update": if a component with this role
  already exists, modify it *in place* to match the spec (the source of truth) and note breaking
  changes; otherwise create it.** This is the common case — changing/extending an existing system,
  not greenfield — so it's baked in unconditionally rather than behind a toggle.
- **⤓ Install design system** (top bar) — one prompt to scaffold **the entire system from zero, or
  update it all to match**. It is **foundation-first, then components**: build the token layer first
  and have every component import that **shared** layer rather than re-hardcoding values — the lesson
  borrowed from Pencil's `spawn_agents` rule (split the work across parallel workers, but read shared
  variables so nothing drifts; keep naming/states consistent). The foundation block is the whole
  `:root` token set read live via `getComputedStyle` (so it never drifts from `styles.css`) + the
  type scale + the harmony rules.

Copy via `navigator.clipboard`. The `templates/index.html` scaffold ships all of this (toggle,
inspector, language selector, `TOKEN_GROUPS`, `buildPrompt` / `copyFullSystem`). You fill `SPECS`, the
component sections, and the `TYPE` data; `TOKEN_GROUPS` reads values live so it needs no upkeep.

## concept.html — TWO concept screens (first view + detail)
Two static **concept screens shown side by side in device frames** — a **first view** (the app's
home/overview/entry point) **and a detail page** (a primary entity opened up) — assembled purely from
the design system's components, to show how the catalogue composes into real screens. They are
illustrative — **not** an interactive prototype, **not** a navigation graph, and **not** a spec for
those screens. Label each frame (e.g. "First view" / "Detail"); lay them out in a flex row that wraps.

Its real job is to drive a **fast theme decision**: the user looks at the rendered concepts and
either keeps the theme, asks for tweaks, or switches to a different theme entirely. Because the
screens are built only from token-driven component classes, **a theme switch only touches
`styles.css` `:root` tokens** — re-render the same `concept.html` and it instantly shows the new
look. Loop until the user settles on a theme (see SKILL.md *Theme decision loop*).
- **Reachable + returnable**: the page is opened from `index.html`'s sidebar link, and carries a
  fixed **"← Back to style guide"** link (`href="index.html"`) so the user moves between the two
  freely. Both are linked in the templates.
- **Make the two screens visibly different** — don't ship two vertical card-lists. The detail page
  usually drops bottom nav for a back bar + sticky CTA; the first view and the detail should use
  different screen types/compositions (below).
- Each device frame holds **one screen**. **Do NOT default to the same skeleton every time.**
  The reflexive "top app bar → segmented/chip tabs → vertical card list → bottom nav" home-feed is
  the single most over-used layout — avoid it unless the app genuinely is a tab-based feed, and even
  then vary the body. The template scaffold ships exactly that feed as a placeholder; **treat it as a
  thing to replace, not reskin.**
- **Pick a screen TYPE that best shows THIS app**, not always a home feed. Choose from (at least):
  *home/feed · detail-or-reader (one hero subject) · map/spatial · dashboard/overview (stat tiles +
  chart) · player/now-playing · create/compose/form (with stepper) · profile/collection grid ·
  onboarding/empty state · checkout/confirm.* A museum guide might be an artwork **detail** page or a
  **map**, not a feed; a finance app a **dashboard**; a meditation app a **player**.
- **Then pick a COMPOSITION move** so it isn't a symmetric vertical stack: full-bleed hero image/colour
  to the edges · an asymmetric / off-axis focal element · overlapping cards or a card bleeding off the
  edge · a partially-raised bottom sheet over content · a big-type editorial moment · a 2-col grid
  instead of a list · generous negative space around one focal action. Bottom nav is **optional** —
  drop it for detail/player/onboarding/checkout screens (use a back bar or a single primary CTA).
- **Subject = the app's stated purpose**, never a generic default. A recipe app → a recipe detail or
  feed; a banking app → an account dashboard; a chat app → a conversation. (Only keep blog content if
  the app really is a blog/reader.)
- Build it **only from DS component classes** (`.card`, `.chip`, `.btn`, `.appbar`,
  `.bottomnav`, list items, …) so it doubles as proof the components combine cleanly. No bespoke
  one-off styling beyond layout glue. (Variety comes from *which* components and *how* they're
  arranged — not from inventing new ones.)
- Optionally annotate which component each region uses (a thin caption) so the "composition" is
  legible — but keep it a clean mockup, not a wireframe with arrows.
- Static only: no `go()` / sheet toggling / navigation graph.

## Handoff (no screenshot step) + auto-open
The deliverables are self-contained HTML — there is **no render-verify / screenshot loop**. When the
files are written, **open the catalogue in the user's browser for them**, then give the paths:
- macOS: `open design-system/index.html`
- Linux: `xdg-open design-system/index.html`
- Windows: `start design-system/index.html`

From `index.html` the **concept preview** is one sidebar click away, and the concept page links back —
so the user only needs the one entry point. Both open via `file://`; no build, no server. Iterate on
the user's feedback, not on your own screenshots.

## Common pitfalls (learned)
- Don't use emoji for UI icons — use the inline SVG sprite (`icons.html`).
- Keep the sprite copied into each HTML file (self-contained); don't rely on external `.svg` refs
  that break under `file://`.
- Reserve space for hard shadows inside `overflow:auto` rows (a horizontal scroll that is
  `overflow-x:auto` forces `overflow-y` non-visible, clipping a drop shadow — add bottom padding).
- A container that paints a border does not always inset its child (CSS `box-shadow` ring vs
  bordered box; Flutter `DecoratedBox` vs `Container`) — verify gaps actually render.
- Keep selected/unselected component sizes constant to avoid layout jump (reserve ring/gap space).
