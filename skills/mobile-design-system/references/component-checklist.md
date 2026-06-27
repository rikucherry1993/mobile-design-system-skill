# Canonical foundations + component checklist (the stable catalogue)

This file is the **source of stability**. The catalogue a run produces is **determined by this
checklist — not improvised**. Every run, for the chosen platform's guideline, you **cover the whole
"Required" set below** (foundations + components). Don't ship fewer because a brief feels small, and
don't balloon past it with one-off inventions — extra components go under "Optional / extensions".

How to use it:
1. Platform → guideline: Android → **Material 3**, iOS → **Apple HIG**, cross-platform → **Material +
   MUI** (see `design-principles.md`).
2. Build **every Required foundation token group** and **every Required component** for that guideline.
3. Group/name them exactly under the guideline's categories below, so the `index.html` sidebar and the
   `SPECS` keys are the same shape on every run.
4. Add anything extra under that component's category and note it as an extension — never drop a
   Required item to make room.

A component "covered" means: a section in `index.html` with all its variants × states, a `styles.css`
class, and a `SPECS` entry (so Dev Mode + Copy-as-prompt include it). "Variants/states" are listed so
the count is stable too.

---

## A. Material 3 (Android)

### Foundations (token groups — all Required)
- **Color** — seed → tonal palettes → roles: `primary / on-primary / primary-container /
  on-primary-container`, same for `secondary`, `tertiary`, `error`; `surface`, `surface-variant`,
  surface containers (`lowest / low / container / high / highest`), `on-surface`, `on-surface-variant`,
  `outline`, `outline-variant`, `inverse-surface`, `inverse-on-surface`, `inverse-primary`,
  `background`, `scrim`, `shadow`.
- **Typography** — `display L/M/S`, `headline L/M/S`, `title L/M/S`, `body L/M/S`, `label L/M/S` (15).
- **Shape scale** — `none / extra-small / small / medium / large / extra-large / full`.
- **Elevation** — levels `0–5` (tonal + shadow).
- **State layers** — hover / focus / pressed / dragged opacities.
- **Spacing** — 4dp grid scale.
- **Motion** — easing set (standard/emphasized) + duration tokens.

### Components — Required
Group exactly by these Material categories.

**Actions**
- Common buttons — variants: `elevated / filled / filled-tonal / outlined / text`; states: enabled/hover/focus/pressed/disabled.
- Icon buttons — `standard / filled / tonal / outlined`; + toggle (selected/unselected).
- FAB — `regular / small / large / extended`.
- Segmented buttons — single & multi-select.

**Communication**
- Badge — small (dot) & large (number).
- Progress indicators — `linear`, `circular` (determinate/indeterminate).
- Snackbar — with/without action.
- Tooltip — `plain`, `rich`.

**Containment**
- Card — `elevated / filled / outlined`.
- Carousel.
- Divider — full / inset.
- Lists — one/two/three-line list items (+ leading/trailing).
- Bottom sheet — (standard/modal).
- Dialog — `basic`, `full-screen`.

**Navigation**
- Top app bar — `center-aligned / small / medium / large`.
- Navigation bar (bottom).
- Navigation rail.
- Navigation drawer — `standard / modal`.
- Tabs — `primary / secondary` (fixed/scrollable).
- Search — `bar` + `view`.
- Menu — dropdown.

**Selection**
- Checkbox (+ indeterminate).
- Chips — `assist / filter / input / suggestion`.
- Radio button.
- Switch.
- Slider — `continuous / discrete`, single & range.
- Date picker; Time picker.

**Text inputs**
- Text field — `filled / outlined`; states: empty/focused/filled/error/disabled; with label/helper/error/leading/trailing.

### Optional / extensions
Search suggestions, bottom app bar, split button, large/expressive variants, banners.

---

## B. Apple HIG (iOS)

### Foundations (token groups — all Required)
- **Color** — system colors (`red/orange/yellow/green/mint/teal/cyan/blue/indigo/purple/pink/brown`) +
  semantic: `label / secondaryLabel / tertiaryLabel / quaternaryLabel`, `systemBackground /
  secondarySystemBackground / tertiarySystemBackground`, grouped backgrounds, `separator /
  opaqueSeparator`, `link`, `fill` levels, `tint`.
- **Typography** — text styles: `largeTitle, title1, title2, title3, headline, subheadline, body,
  callout, footnote, caption1, caption2` (Dynamic Type).
- **Materials** — `ultraThin / thin / regular / thick / chrome` + vibrancy (used instead of heavy shadow).
- **Shape / corner radius** — continuous-corner scale.
- **Spacing & layout** — 8pt rhythm, layout margins, safe areas.
- **Iconography** — SF-style symbol set (weights/scales) as the inline sprite.
- **Elevation** — subtle shadow scale; **Motion** — standard durations/easing.

### Components — Required
Group by these HIG categories.

**Bars**
- Navigation bar (standard/large title).
- Tab bar.
- Toolbar.
- Search bar.

**Content / collections**
- Lists / tables — `plain / grouped / inset-grouped`; rows with leading/trailing, disclosure.
- Section header/footer.
- Cards (custom grouped container).
- Disclosure group.

**Controls**
- Buttons — `plain / gray / tinted / bordered / bordered-prominent / filled`; roles incl. destructive.
- Pull-down & pop-up menu buttons.
- Segmented control.
- Slider; Stepper.
- Toggle (switch).
- Pickers — `wheel / date / time`.
- Text field; Text editor (multiline).
- Progress — `bar`, `activity (spinner)`.
- Page control.

**Modality / presentation**
- Sheet (page/form).
- Action sheet.
- Alert.
- Popover.
- Context menu.
- Activity view (share sheet).

**Status**
- Badge.

### Optional / extensions
Color well, gauge, charts, rating, search tokens, sidebar (iPad), live activities.

---

## C. Cross-platform (Material + MUI)

Take Material's **token model** (foundations) and MUI's **component breakdown + prop conventions**
(`variant`, `size`, `color`) so one shared language covers both platforms.

### Foundations (token groups — all Required)
- **Palette** — `primary / secondary / error / warning / info / success` (each `main / light / dark /
  contrastText`) + `text (primary/secondary/disabled)`, `background (default/paper)`, `divider`,
  `action (active/hover/selected/disabled/focus)`.
- **Typography** — `h1–h6, subtitle1, subtitle2, body1, body2, button, caption, overline`.
- **Spacing** — 8px `spacing()` scale.
- **Shape** — `borderRadius` scale.
- **Shadows** — elevation `0–24` (use a small subset, documented).
- **Breakpoints**, **z-index**, **transitions** (duration/easing).

### Components — Required (MUI catalogue)
Group by these MUI categories.

**Inputs**
- Button (`contained / outlined / text`, sizes, colors), Button group.
- Icon button.
- Floating action button.
- Checkbox; Radio group; Switch.
- Select; Autocomplete.
- Slider.
- Text field (`filled / outlined / standard`).
- Toggle button.
- Rating.

**Data display**
- Avatar; Badge; Chip.
- Divider; List; Table.
- Tooltip; Typography; Icon.

**Feedback**
- Alert; Dialog; Snackbar.
- Progress (`linear / circular`); Skeleton; Backdrop.

**Surfaces**
- App bar; Card; Paper; Accordion.

**Navigation**
- Bottom navigation; Drawer; Tabs.
- Menu; Link; Stepper; Speed dial.

**Layout primitives** (list as utilities, not “components”): Box, Container, Grid, Stack.

### Optional / extensions
Breadcrumbs, Pagination, Transfer list, Timeline, Masonry, Date/Time pickers (X), Charts (X).

---

## Stability rules (read before counting)
- The **Required list is the floor and the shape**: same categories, same component names, every run.
- It's fine if a small app won't use every component — the catalogue is a **starter system meant to
  be extended**, so completeness is the point.
- If the brief truly excludes a category (e.g. a single-screen utility with no navigation), still
  generate it but you may mark it "not yet used" — don't silently drop it, or the count drifts.
- Keep variant/state coverage consistent so two runs of the same guideline yield the same catalogue
  size, differing only in the **token values** (the theme).
