---
name: mobile-design-system
description: >-
  Bootstrap a complete, extendable design system for a BRAND-NEW mobile app and let the
  user pick a theme fast. The reference guideline is chosen by target platform — Android →
  Material Design, iOS → Apple HIG, cross-platform → Material Design + MUI — and is used for
  how it divides design tokens and components. Produces a token layer
  (color/spacing/typography/radii/elevation) and a full listing of every component (atomic +
  composed), delivered as an interactive HTML living style guide with a Figma-style Dev Mode
  inspector and per-component "Copy as prompt" buttons, plus a two-screen concept mockup (subjects drawn from
  the app's purpose) showing how the components compose into a screen — so the user can quickly decide
  to KEEP the theme or SWITCH to a freshly generated one, which is cheap because only the token layer
  changes. Accepts multimodal input (screenshots, images, reference URLs, brand colors) to derive the
  theme, and never infers the app's purpose from the folder/repo. Framework-agnostic (Flutter, React
  Native, SwiftUI, Jetpack Compose, Web) with no default framework. Use when starting a new mobile app
  from scratch and the user wants tokens + a component catalogue and a quick theme direction.
---

# Mobile Design System Generator

Generate a coherent, principled, **extendable** design system for a **brand-new** mobile app
and ship it as a self-contained, interactive HTML **living style guide** so the user can pick a
theme fast and any agent can later implement it in any language.

This skill is for **greenfield apps only**. We do **not** handle migrating an existing design or
mirroring an existing codebase into a new design system, and we do **not** design specific screens
or screen-to-screen flows. The job is: **design tokens + a full listing of all components**, plus a
two-screen concept mockup (a first view + a detail page) that shows how those components combine into
real screens.

## When to use
- A new mobile app is starting and there is no design system yet.
- The user wants to choose a theme direction quickly (palette, type, shape, density) and get a
  ready-to-extend token layer + component catalogue.

Out of scope: migrating from an existing design, reverse-engineering an existing app's UI into a DS,
laying out real product screens, or wiring multi-screen navigation/prototypes.

## Working rules
- App purpose, audience, platform, and theme come only from the user's input or explicit
  confirmation — not from the folder name, repo, surrounding files, or git. The only thing you take
  from the environment is where to write the output folder.
- Do not narrate or justify your process. Just ask the question or do the work — don't preface it
  with what you will or won't do, or why.

## Inputs to gather (ask only what's missing)
Gather these **through interactive `AskUserQuestion` prompts**, never as a plain-text numbered list
for the user to answer in prose. Each question gives the user a real input box (the free-text
field), so they can type as much as they want. **Ask open-ended things as one open question at a
time** — frame quick-pick options where they genuinely help, but always rely on the free-text input
for the substance. Don't cram several questions into one wall of text.

What to find out:
1. **App purpose / what it is** — what the app does and who it's for. Ask this first if unknown, as a
   single open question with a free-text box. Drives the theme options and the concept-mockup subject.
2. **Target platform** — selects the reference guideline:
   - **Android** → reference **Material Design (Material 3)**
   - **iOS** → reference **Apple Human Interface Guidelines (HIG)**
   - **Cross-platform** → reference **Material Design + MUI** (Material's tokens/components, with
     MUI's pragmatic component breakdown for a single shared language)

   "Reference" here means: **follow how that guideline divides design tokens and components** —
   which token groups exist, what the semantic roles are, which atomic vs composed components are
   canonical, and how they are named. It does **not** mean copying that guideline's exact look.
3. **Visual references / style brief (multimodal — see below)**: any mix of adjectives, hard
   constraints ("rounded, flat, no black outlines, blue-toned"), brand/primary color, light/dark,
   **plus images and links** the user provides. This is the "pick a theme fast" part.
4. **Density / audience** if relevant (compact vs comfortable; accessibility needs).
5. **Eventual framework** (Flutter / RN / SwiftUI / Compose / Web) — optional, and **not assumed**.
   The HTML is the source of truth; components are implementable in any language via **Copy as
   prompt**. There is **no default framework** — if the user names one, surface it first in the
   Copy-as-prompt selector; if not, leave the selector platform-neutral, don't pick Flutter for them.

For anything not answered, pick a sensible default and proceed.

### Multimodal visual input (accept and use it)
The theme brief can arrive as more than words. Actively accept and incorporate:
- **Images / screenshots / photos / mockups** the user pastes or points to a path → **Read** them
  and extract palette, type feel, shape/roundness, density, and overall mood.
- **URLs** — a website, a Dribbble/Behance/Figma/Pinterest link, a competitor app page, a brand
  site → **WebFetch** the page to pull colors, tone, and structure cues. (Load `WebFetch` via
  ToolSearch if needed.) If a link can't be fetched, ask the user to describe it or attach a screenshot.
- **Other visual references** — a brand palette, a moodboard, an existing logo.

Translate every reference into **token decisions** (color roles, radii, elevation, type), never a
pixel-copy. If references conflict or are ambiguous, summarize what you extracted and confirm before
building. If no visual reference is given, work from the worded brief plus the app purpose.

## Generate theme options dynamically (do NOT offer a fixed menu)
The style choices you present are **never a hardcoded list**. Generate 2–4 candidate **theme
directions on the fly** from the actual inputs — the app's purpose, audience, platform, and every
multimodal reference (images/URLs/brand colors) the user gave. Each candidate is a short, named
direction (e.g. "Warm & editorial", "Crisp utilitarian", "Calm dark-first") with its own seed
color, shape language (roundness), elevation style (flat vs shadow), and type feel — each tailored
to *this* app, not a generic palette. Present them with `AskUserQuestion` (use option `preview`s to
show a tiny swatch/word sketch when helpful). If the user already gave one clear direction, skip the
menu and just confirm it. Whatever they pick becomes the `:root` token set.

**Ground the directions in real design knowledge — strongly prefer reading
`references/style-color-library.md` before you write tokens.** It's not mandatory, but on any brief
that isn't already pinned to exact colours you should **actually open the file** and use it: map the
user's hint (a style word, era, mood, brand, architect, screenshot/URL) to its style archetypes
(Scandinavian, Swiss, Bauhaus, mid-century, brutalist, editorial, Japandi…) and **derive the palette
with one of its authoritative methods** (OKLCH/HCT tonal ramp from the seed, or a named system like
Radix/Open Color, ColorBrewer, Le Corbusier's *Polychromie*, traditional palettes) rather than
eyeballing hexes. This is what makes the result feel professionally grounded instead of arbitrary.

- **When to lean on it hardest:** vague/short briefs ("make it calm / architectural / mid-century /
  premium") — that's where the library does the most work.
- **When to defer:** if the user gives **concrete brand colours**, those win — use the library only
  for the *neighbouring* decisions (neutral tint, accent harmony, shape/type), don't override their hues.
- **It's a backstop database — never lecture the user with the vocabulary or citations**; just let it
  shape the token values. Surface a term only if it actually helps the user decide.
- **Self-check:** after picking a direction you should be able to name, to yourself, the archetype and
  the colour-derivation method you drew on. If you can't, you didn't really use it — go read it.

## Design principles — read `references/design-principles.md`
Pick the reference guideline by platform (above), then obey general usability on top of it: WCAG
contrast, ≥44–48dp touch targets, a single spacing scale, clear type hierarchy, explicit interaction
states, motion with purpose. Summarize the chosen theme direction to the user in 3–6 lines before
building.

## The catalogue is fixed by a checklist — read `references/component-checklist.md`
**This is what keeps every run stable.** The foundations and components you produce are **determined
by the canonical checklist for the chosen guideline** (Material 3 / Apple HIG / Material + MUI), not
improvised per brief. Every run you **cover the whole "Required" set** in that file — same categories,
same component names, same variant/state coverage — so two runs of the same guideline yield the **same
catalogue size and shape**, differing only in the **token values** (the theme). Never ship fewer
because a brief feels small (it's a starter system meant to be extended), and never balloon past the
list with one-off inventions — extras go under "Optional / extensions". Mirror the checklist's
categories in the `index.html` sidebar and the `SPECS` keys.

## Architecture — read `references/ds-architecture.md`
Two outputs, three layers — **extendable from day one**. The **token groups and the component list
come from the checklist above** (which mirrors the chosen guideline's breakdown):
- **Tokens**: semantic color roles, spacing scale, typography, radii, elevation/shadow, motion.
- **Atomic components**: button, chip, text field, icon, avatar, switch, badge, tab, list item…
- **Composed components**: cards, app bars, bottom navigation, sheets, carousels, tiles…
Document explicitly how to add a new token / component later. Cover the Required set; grow by convention.

## Deliverables — read `references/build-living-styleguide.md`
A self-contained `design-system/` folder:
- **`styles.css`** — the token layer as CSS variables + component classes. Single source of styles.
- **`index.html`** — living style guide: foundations (colors/type/spacing/radii/elevation) + a
  **complete listing of every component** with its variants/states. Includes:
  - **Dev Mode** inspector (toggle): click any component → right panel shows its **properties**
    (name/type/default), **design tokens used** (swatch + value, click to copy), **metrics**, and
    the **source reference** — like Figma Dev Mode.
  - **Copy as prompt**: two scopes — per **component** (each prompt is "add or update": modify the
    existing component in place to match the spec, or create it if missing — the common case is
    changing an existing system), and one **⤓ Install design system** button (scaffold-from-zero or
    update-all-to-match, foundation-first then components against the shared token layer, per Pencil's
    spawn-agents rule). A target-language selector; any agent can build/extend it in any language.
- **`concept.html`** — a **two-screen** concept mockup shown side by side: a **first view** (the
  app's home/overview/entry screen) **and a detail page** (a primary entity opened up), composed
  purely from the design system's components, to show how the catalogue assembles into real screens.
  **Pick the subjects from the app's stated purpose** (a recipe app → a recipe feed + a recipe detail;
  a banking app → an account home + a transaction/card detail), not a generic default — and vary the
  layout (see `build-living-styleguide.md`; don't make both a vertical card-list). Its purpose is to
  let the user **decide on a theme fast** — keep it, tweak it, or switch to another (see *Theme
  decision loop*). Both are illustrative **static** screens — **not** an interactive prototype, **not**
  a navigation graph, and **not** a spec for those screens.
  - **Reachable from `index.html`**: the style guide's sidebar has a prominent **"Concept preview"**
    link (`href="concept.html"`) at the top, so the user reaches the mockup straight from the
    catalogue instead of hunting for a separate file.
  - **Easy return**: `concept.html` carries a clear **"← Back to style guide"** link
    (`href="index.html"`) so the user bounces back to the catalogue in one click.
- **`icons.html`** — the icon set as an **inline SVG sprite**, themed by tokens (see *Icons* below).

### Icons (greenfield → no project SVGs to link)
This is a brand-new app, so there are **no project asset files to reference**. Instead, ship an
**inline SVG icon sprite** (`icons.html`), and embed a copy of it at the top of `index.html` and
`concept.html` so both are self-contained. Rules:
- Icons are **token-driven**: `fill:none; stroke:currentColor; stroke-width:var(--icon-stroke)`, so
  they re-theme with everything else (thin SF-like vs heavier Material — just change the token).
- Geometry is original, **drawn in the style of classic open icon sets** — **Lucide/Feather** (MIT)
  for stroke style, **Material Symbols** (Apache-2.0) for Material. Pick the style by platform:
  Android/cross-platform → Material/outlined; iOS → thinner stroke, more rounding (SF-like).
- **Never embed Apple SF Symbols** assets (Apple's license forbids redistributing them as SVG) —
  approximate the SF look with an open set instead.
- **Never use emoji as UI icons.** (Emoji are fine only as throwaway *content* placeholders, e.g. a
  reaction in sample text — never for buttons, nav, or affordances.)
- If a needed glyph is missing from the sprite, **look up a classic open set online for the shape**
  (e.g. fonts.google.com/icons, lucide.dev) and add a new `<symbol>` — don't invent a sloppy path.

Use the scaffolds in `templates/` (`styles.css`, `index.html`, `concept.html`, `icons.html`). The
`index.html` template already contains the reusable Dev Mode + Copy-as-prompt machinery — you
fill the `SPECS` data object and the component sections.

## Process
1. **Gather inputs from the user** via interactive `AskUserQuestion` prompts (free-text input box),
   one open question at a time — app purpose, platform, multimodal visual references. Read images
   and WebFetch URLs the user provides.
2. **Pick the reference guideline by platform** (Material / HIG / Material + MUI), then open
   `references/component-checklist.md` — its **Required set for that guideline is the exact catalogue
   to build** (categories, components, foundations). Don't redecide the list per brief.
3. **Generate theme directions dynamically** from those inputs and **confirm one** with the user in
   3–6 lines (palette, type, shape, elevation, density) — not a fixed menu. **Unless the user pinned
   exact colours, read `references/style-color-library.md` first** and derive the directions from its
   archetypes + colour methods (see "Generate theme options dynamically" above) — don't eyeball hexes.
4. **Write `styles.css` tokens** — cover **every Required foundation token group** from the checklist.
   Derive the colour ramp from the chosen library method (e.g. OKLCH tones off the seed); then run the
   `design-principles.md` §1 harmony pass (paired `--on-*`, math-checked contrast, tinted neutrals).
5. **Build atomic components** — every Required atomic from the checklist, all variants/states.
6. **Build composed components** — every Required composed component from the checklist (not a sample).
7. **Wire Dev Mode + Copy as prompt**: fill the `SPECS` object per component
   (`name, file, desc, props[], tokens[], metrics[]`); register sections + classes. Order the
   Copy-as-prompt language selector by the user's stated framework (if any) — no Flutter default.
8. **Build `concept.html`**: **two screens side by side — a first view + a detail page** — subjects
   chosen from the app's purpose, assembled only from DS components. **Choose a screen TYPE and a
   COMPOSITION for each — and make the two visibly different** (don't ship two vertical card-lists).
   Avoid reflexively building the "app bar → tabs → card list → bottom nav" home-feed for the first
   view (it's the most over-used layout; see `build-living-styleguide.md`). The detail page typically
   drops bottom nav for a back bar + sticky CTA. Mix from: detail/reader, map, dashboard, player,
   compose/form, profile grid, onboarding, checkout, feed — plus a composition move (full-bleed hero,
   asymmetry, overlap, raised sheet, big-type, 2-col grid, negative space). Wire the **sidebar
   "Concept preview" link** in `index.html` and the **"← Back to style guide" link** in `concept.html`.
9. **Hand off + auto-open** — write the files, then **open `index.html` in the browser for the user**
   (`open design-system/index.html` on macOS; `xdg-open` on Linux; `start` on Windows). Also give the
   paths; the files are self-contained, openable via `file://`.
10. **Theme decision gate** — let the user view the concept (reachable from index), then decide fast
    (see below).
11. **Document extendability** in a short `design-system/README.md` (how to add tokens/components).

## Theme decision loop (a core capability)
The concept mockup exists so the user can **decide on a theme fast**. After auto-opening
`index.html` (concept is one click away via the sidebar link), present the choice **explicitly with
`AskUserQuestion`** every time — this is the interaction that lets the user reject a look and move on:
- **Keep this theme** → proceed to document/finalize.
- **Tweak it** → adjust a few values (e.g. accent color, roundness, density) and tell them to reopen
  (or re-open the browser for them).
- **Switch to a different theme** → this is the important one. **Generate fresh candidate directions**
  (dynamically, from the original inputs plus any new reference/feedback the user gives), let the user
  pick one with `AskUserQuestion`, then regenerate the token layer. **Keep looping** — re-present the
  keep / tweak / switch choice after every switch until the user explicitly keeps a theme.

Switching themes is **cheap by design**: everything visual is a token, so a new theme means
**editing only the token layer (`styles.css` `:root` variables)** — the component classes, the
`index.html` catalogue, and `concept.html` all stay the same and instantly reflect the new look.
The user just refreshes (or you re-open the browser) and decides again. Loop until they keep a theme.

To make switching even more tangible, you may ship 2–4 candidate directions as alternate token sets
(`:root[data-theme="warm"]` override blocks) and add a small theme `<select>` switcher to
`index.html`/`concept.html`, so the user flips between live themes in the browser and compares before
committing — still without touching any component.

## Quality bar
- **Per-theme palette harmony is THE bar** (see `references/design-principles.md` §1). Whatever theme
  is on screen must be harmonious and readable on its own — don't rely on "you can switch themes."
  Every fill has a paired `--on-*` foreground; **contrast is verified with math** (WCAG ratio from the
  hex), neutrals are tinted toward the brand temperature, accents are derived harmonically.
- **Reads like a real product, not abstract colour blocks** (§1b): real domain content (no
  lorem/empty rectangles), layered tinted shadows + hairline borders, a surface/depth ladder, one
  signature/expressive moment per surface, crafted micro-states. Type has a personality (display +
  text pairing, real modular scale, tuned tracking/leading).
- Faithful to the chosen theme; **use the inline SVG icon sprite, never emoji** for UI icons.
- **Catalogue = the Required set in `references/component-checklist.md`** for the chosen guideline —
  same categories/components/coverage every run. Stable count; never just a few samples, never
  improvised inflation. Differences between runs live in the **token values**, not the component list.
- No clipping — reserve space for shadows inside horizontal scroll rows.
- Every color/size referenced by **token name**, never a magic value.
- Touch targets ≥ 44pt/48dp; contrast checked by math, not by rendering.
- Self-contained and openable via `file://` in a browser — no build step, no server.

## Handoff
No screenshot/verification step. When the files are written, **auto-open `index.html` in the user's
browser** (`open` / `xdg-open` / `start` by OS) and give them the paths. From `index.html` the
**concept preview** is one click away (sidebar link), and the concept page links back. The files are
self-contained (`file://`, no build, no server). Then run the theme decision loop above.
