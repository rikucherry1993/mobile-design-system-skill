# Changelog

All notable changes to this skill are documented here. This project follows
[Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

- **MAJOR** — the skill's contract changes in a breaking way (deliverables removed/renamed, inputs
  reworked so old prompts behave differently).
- **MINOR** — new capability, backward compatible (e.g. a new template, a new input type).
- **PATCH** — wording/prompt tuning, template fixes, doc updates; no behavior change for the user.

## [Unreleased]

## [0.2.0] — 2026-06-27
- **Packaged as an installable Claude Code plugin** — added `.claude-plugin/plugin.json` + `marketplace.json`; the skill now lives at `skills/mobile-design-system/` (canonical plugin layout).
- Added `examples/` with generated design systems (Stride / Margin / Atrium).
- **Repo README rewritten** — professional structure with real screenshots of each example's concept
  and style guide (`assets/shots/`), clear install + usage, and the "why it's worth a try" pitch.
- **Palette harmony as the bar** — reframed `design-principles.md` §1 around harmony *by
  construction*: every fill ships a paired `--on-*` foreground, contrast verified with **math**
  (WCAG ratio from hex, no screenshots), neutrals tinted toward the brand temperature, accents
  derived harmonically.
- **"Real product, not abstract colour blocks"** (§1b) — real content over placeholders, layered
  tinted shadows + hairline borders, surface/depth ladder, a signature moment per surface, optical
  alignment, crafted micro-states; typography given a display+text personality and tuned tracking.
- `templates/styles.css` token layer expanded accordingly: full `--on-*` pairs (incl. status roles),
  tinted neutrals, layered tinted shadows, `--focus-ring`, `--opt-*` optical steps, `--wash`,
  `--ease-spring`, display/text font split, tuned type scale.
- **Copy-as-prompt: install + add-or-update.** One top-bar **⤓ Install design system** prompt
  (scaffold-from-zero *or* update-all-to-match — foundation-first, then components against the
  **shared** token layer, per Pencil's `spawn_agents` consistency rule; foundation block read live
  from `:root`). Every **per-component** prompt is now "add or update": modify the existing component
  in place to match the spec, or create it if missing — the common case is changing an existing
  system, not greenfield. Wired into `templates/index.html` and the `03-royalty-tracker-sage` example.
- **Authoritative style/colour knowledge base** — new `references/style-color-library.md`: an internal
  backstop mapping user hints (style/era/mood/brand/architect) to authoritative colour systems
  (OKLCH/HCT, Radix/Open Color, ColorBrewer, Le Corbusier *Polychromie*, traditional palettes) and
  style archetypes (Scandinavian, Swiss, Bauhaus, mid-century, brutalist, editorial, Japandi…). Used
  silently to ground palettes; the vocabulary is never exposed to the user.
- **Made the library load-bearing, not decorative** — `SKILL.md` now *strongly recommends* reading
  `style-color-library.md` and deriving the palette from its methods (OKLCH ramp etc.) on any brief
  that isn't pinned to exact colours, defers to concrete brand colours when given, and adds a
  self-check ("name the archetype + derivation method you used"). Process steps 3–4 reference it.
- **Concept-screen layout variety** — the concept mockup was converging on one skeleton (app bar →
  tab/chip row → card list → bottom nav). `build-living-styleguide.md`, `SKILL.md` step 8, and the
  `templates/concept.html` placeholder now require picking a screen **type** (detail/map/dashboard/
  player/form/profile/onboarding/checkout/feed) and a **composition** move (full-bleed hero,
  asymmetry, overlap, raised sheet, big-type, 2-col grid, negative space), with bottom nav optional —
  and explicitly call the home-feed the over-used default to avoid.
- **Concept now shows TWO screens** — a **first view + a detail page** side by side (was a single
  screen), made visibly different. Updated `SKILL.md`, `build-living-styleguide.md`, the
  `templates/concept.html` scaffold (two device frames), and the Atrium example.
- **Copy-as-prompt button on every component** — auto-injected into each section whose `id` matches a
  `SPECS` key (no more hand-placed buttons; none missed). Added a `Skeleton` SPECS entry.

## [0.1.0] — 2026-06-19
- Initial public version: token layer + full component catalogue as an interactive HTML living
  style guide (Dev Mode + Copy as prompt), one concept mockup, and the theme-decision loop.
- Multimodal theme input (screenshots / images / reference URLs).
- Platform-driven reference guideline (Material / HIG / Material + MUI); framework-agnostic output.
