# Design principles to obey

The generated design system is for a **brand-new** app. First pick the **reference guideline by
target platform**, then apply general usability on top. State the chosen theme direction up front.

## 0. Pick the reference guideline by platform (do this first)

| Target platform | Reference guideline |
|---|---|
| **Android** | **Material Design (Material 3)** |
| **iOS** | **Apple Human Interface Guidelines (HIG)** |
| **Cross-platform** | **Material Design + MUI** |

**What "reference" means here.** You are referencing the guideline for **how it divides design
tokens and components** — not for its exact visual look. Concretely, borrow from it:
- which **token groups** exist and what the **semantic roles** are (e.g. Material's color roles,
  type scale, elevation levels, shape scale; HIG's system colors, text styles, materials/vibrancy),
- which components count as **atomic vs composed**, and which ones are **canonical** for that
  platform,
- the **naming conventions** for tokens and components.

The app's actual look (palette, roundness, density) comes from the user's theme brief, layered on
top of this structure.

### Per-platform breakdown cues
- **Material Design 3 (Android)**: color = seed → tonal palettes → semantic roles
  (primary/secondary/tertiary/surface/on-* /outline/error…); type scale (display/headline/title/
  body/label); shape scale; elevation as tonal + shadow levels; components like FAB, top app bar,
  navigation bar, snackbar, chips, cards, bottom sheets.
- **Apple HIG (iOS)**: system/semantic colors (label/secondaryLabel/systemBackground/separator/
  tint…); text styles (largeTitle/title/headline/body/footnote/caption); SF Symbols iconography;
  materials & vibrancy instead of heavy shadows; components like navigation bar, tab bar, lists/
  insets-grouped tables, action sheets, segmented controls.
- **Cross-platform (Material + MUI)**: take Material's token model and role names; take MUI's
  pragmatic component catalogue and prop conventions (e.g. variants `contained/outlined/text`,
  `size`, `color`) so a single shared component language covers both platforms. Pick one language
  and stay consistent — don't mix iOS and Android idioms arbitrarily.

## 1. Color — harmony by construction (this is the bar)
The single thing that makes or breaks the system is whether **each individual theme's palette is
harmonious and readable**. Don't lean on "you can switch themes" — make the one in front of the user
correct. Build it so harmony is *structural*, not lucky:

- **Pair every fill with its foreground.** Each surface/fill role ships an `--on-*` partner chosen
  **at the same time** as the fill. Primary↔on-primary, surface↔on-surface, success↔on-success, …
  Never introduce a fill without deciding the text color that sits on it. This guarantees no
  unreadable combination can occur — the same trick shadcn/Material use.
- **Verify contrast with math, not by eye (and not by screenshot).** For every `--x` / `--on-x` pair,
  compute the WCAG ratio from the hex and **adjust the token until it passes**: body text ≥ 4.5:1,
  large/display text ≥ 3:1, UI borders/icons ≥ 3:1. The formula (cheap to do on scratch):
  relative luminance `L = 0.2126·R + 0.7152·G + 0.0722·B` where each channel `c` (sRGB 0–1) is
  `c≤0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`; ratio `= (Llight+0.05)/(Ldark+0.05)`. If a pair
  fails, darken/lighten the foreground (or the fill) and recompute. Check **disabled and selected**
  states too, not just default. (This is the "self-check" — done in math, so it costs no run time.)
- **Tint the neutrals toward the brand temperature.** Greys should carry a hint of the brand hue
  (warm grey for warm brands, cool/blue-grey for cool brands) — never pure `#888`. Tinted neutrals
  read as hand-mixed; pure grey reads as a machine default. Tint borders and shadows the same way.
- **Derive accents harmonically, don't pick them at random.** From the seed, build secondary/accent
  via a consistent hue relationship (analogous ±30°, or a single complementary), and pull every role
  toward a **shared saturation/lightness band** so the palette feels mixed by one hand. Material's
  seed→tonal-palette approach is a fine engine for this; the point is *one coherent temperature*.
- Expose **roles, never raw hex** at call sites. Use the chosen guideline's role set as the checklist
  (primary/on-primary, secondary, surface/on-surface, outline, error/success/warning + their `--on-*`).

## 1b. Make it read as a real product, not abstract colour blocks
A catalogue of flat swatches and empty rectangles looks like a theme test, not an app. Push the same
tokens until the output feels like a shipping product:
- **Real content, not lorem/placeholders.** Believable domain-specific copy, names, numbers, and
  states (a real balance, a real recipe title, a real timestamp). Specificity reads as designed.
- **Layered, tinted shadows + hairline borders**, not flat grey drops — a tight contact shadow plus a
  soft ambient one, tinted toward the ink/brand. Combine a subtle border *and* a soft shadow on cards.
- **Depth & surface ladder**: background → surface → sunken/well, plus a soft surface **wash** (a
  barely-there brand-tinted gradient) so large areas aren't a single dead fill.
- **Optical, not mathematical, alignment**: nudge icons/baselines with fine `--opt-*` steps; give
  round shapes a touch of overshoot. Humans align by eye, not by the 4px grid.
- **A signature moment per surface**: one expressive thing — an oversized display headline, a
  brand-tinted illustration/mascot slot, a full-bleed image, generous negative space — so the screen
  has a focal point instead of uniform density.
- **Micro-states that signal craft**: a real 2px focus ring with an offset gap, hover/pressed
  feedback, motion with a little overshoot (`--ease-spring`) rather than linear.

## 2. Typography — give it a personality
A clear type scale with consistent family/weight/size/line-height. Mirror the guideline's scale
(Material's display/title/body/label or HIG's text styles). 5–8 styles is plenty to start. To avoid
the generic look:
- **Pair a display face with a text face** — a workhorse for body (Inter/SF/Roboto) and a face with
  *character* for display/headlines. Don't set everything in one safe family at safe sizes.
- **Use a real modular scale** (~1.2–1.25 ratio) so steps relate; give one **oversized hero** moment.
- **Tune tracking & leading per step**: tight tracking + tight leading on big display, airy leading on
  body, wider tracking on small caps/labels. Hand-tuned type is one of the clearest "crafted" signals.

## 3. Shape & elevation
- A small radius scale (e.g. none / sm / md / lg / full). Pick one shape language.
- Decide shadow vs flat vs tonal. Material leans tonal+shadow; HIG leans materials/subtle depth.
  Define a small elevation scale and apply it consistently.

## 3b. Iconography (greenfield → inline SVG sprite, never emoji)
The app is new, so there are no project icon files. Ship a **token-driven inline SVG sprite**
(`icons.html`) — `stroke:currentColor; stroke-width:var(--icon-stroke)` so icons re-theme with the
system. Match the platform: Android/cross-platform → Material/outlined; iOS → thinner, rounder
(SF-like). Draw in the style of **classic open sets** (Lucide/Feather MIT, Material Symbols
Apache-2.0); **don't redistribute Apple SF Symbols**; **never use emoji for UI icons**.

## 4. State layers
Every interactive component needs enabled / hover|pressed / disabled (and selected/focused where
relevant).

## 5. Usability & accessibility (non-negotiable, on top of the guideline)
- **Contrast**: text/background ≥ 4.5:1 (≥ 3:1 for large text). Verify selected/disabled states too.
- **Touch targets**: ≥ 44pt (iOS) / 48dp (Android). Pad small icons up to target size.
- **Spacing rhythm**: one spacing scale used everywhere (e.g. 2/4/8/12/16/20/24/32). No ad-hoc px.
- **Hierarchy**: size, weight, and color encode importance consistently.
- **Feedback**: visible state for every action; loading and empty states exist.
- **Affordance**: tappable things look tappable; selection is unambiguous.
- **Consistency**: the same concept looks the same everywhere (one chip, one button family).

## 6. Token discipline
Everything visual is a **named token** or composed from tokens. No magic numbers/colors in
components. This is what makes the system themeable and extendable.

## Output of this step
Before building, write 3–6 lines to the user: the **reference guideline** (from the platform), the
chosen color direction (with the seed/brand), type direction, shape language (rounded?), and
elevation style (flat vs shadow). Get a quick confirmation, then build.
