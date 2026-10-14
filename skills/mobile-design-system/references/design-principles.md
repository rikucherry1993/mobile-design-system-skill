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

## 1. Color — hierarchy first, harmony by construction
Decide which content/action deserves attention **before** selecting hues. Then build the palette so
harmony and readability are *structural*, not lucky. Make the one theme in front of the user
correct — don't lean on "you can switch themes".

- **Color as hierarchy.** Use one dominant interaction family. Secondary/accent roles stay
  subordinate unless the visual premise calls for multiple families — they exist for meaning, not
  as compulsory decoration. Selection pills, tonal buttons and active navigation share the primary
  family by default. Images also consume attention: one interaction family can coexist with rich
  photography. "Energetic" does not require complementary chrome, colored navigation and colored
  cards.
- **Pair every fill with its foreground.** Each surface/fill role ships an `--on-*` partner chosen
  **at the same time** as the fill. Primary↔on-primary, surface↔on-surface, success↔on-success, …
  Never introduce a fill without deciding the text color that sits on it. When an accent color is
  used as text on a surface, give it a text-safe `*-ink` variant (e.g. `--primary-ink`) instead of
  reusing the fill value.
- **Verify contrast with math, not by eye (and not by screenshot).** For every `--x` / `--on-x` pair,
  compute the WCAG ratio from the hex and **adjust the token until it passes**: body text ≥ 4.5:1,
  large/display text ≥ 3:1, UI borders/icons ≥ 3:1. The formula (cheap to do on scratch):
  relative luminance `L = 0.2126·R + 0.7152·G + 0.0722·B` where each channel `c` (sRGB 0–1) is
  `c≤0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`; ratio `= (Llight+0.05)/(Ldark+0.05)`. If a pair
  fails, darken/lighten the foreground (or the fill) and recompute. Check **disabled and selected**
  states, nested surfaces, image overlays and dark mode too, not just the default pair.
- **Purposeful neutrals.** A neutral gray is legitimate. Tinting neutrals toward the brand
  temperature (warm grey, blue-grey, toned paper) is a choice that needs a reason in the
  direction's proposition — not a universal rule. No universal tint, chroma spread or fashionable
  palette is proof of taste.
- **Derive accents harmonically, don't pick them at random.** From the seed, build secondary/accent
  via a consistent hue relationship (analogous ±30°, or a single complementary) in a perceptual
  space (OKLCH/HCT), and keep roles in a shared saturation/lightness band.
- **User-specified colors win.** Keep a pinned brand hex; only extreme lightness may be adjusted by
  derivation, and say so.
- **Flat backgrounds.** Keep backgrounds and large surfaces as flat fills unless the user expressly
  asks for another treatment — no decorative gradients or "washes".
- **Avoid the generated-look clusters** unless the brief asks for them: cream ground + terracotta
  accent; near-black + acid-green accent; violet primary + blue secondary (the purple-gradient look).
- Expose **roles, never raw hex** at call sites. Use the chosen guideline's role set as the checklist
  (primary/on-primary, secondary, surface/on-surface, outline, error/success/warning + their `--on-*`).

## 1b. Make it read as a real product, not abstract colour blocks
A catalogue of flat swatches and empty rectangles looks like a theme test, not an app. What makes it
read as a product is hierarchy and real content, not added decoration:
- **One first-read focal point and one main action per screen.** If everything is a card or tinted
  panel, remove a container first. One expressive feature (an oversized headline, a full-bleed
  image, generous negative space) needs ordinary neighbors.
- **Real content, not lorem/placeholders.** Believable domain-specific copy, names, numbers, and
  states (a real balance, a real recipe title, a real timestamp), at representative lengths. Never
  invent discount evidence, ratings, stock urgency or delivery promises to make a screen attractive.
- **Imagery with intent.** Decide crop, scale and role. A token-colored placeholder is a labelled
  placeholder, not finished product photography. Never present a reference image as a licensed
  asset, and never copy a competitor's identity.
- **Elevation is a decision, not a default.** Choose flat, hairline, tonal or shadow per direction
  and apply it consistently. If shadows are used, keep them soft and consistent; don't stack a
  border *and* a shadow on every card by reflex.
- **Optical, not mathematical, alignment**: nudge icons/baselines with fine `--opt-*` steps; give
  round shapes a touch of overshoot.
- **Micro-states that signal craft**: a real 2px focus ring with an offset gap, hover/pressed
  feedback, motion with a little overshoot (`--ease-spring`) rather than linear.

## 2. Typography — reading face first
Start with the actual language and reading task. A single well-set family is a complete system;
familiar workhorse fonts are valid, and novelty is not a quality metric.
- **Body, navigation, buttons, functional titles and price numerals use a readable text face.**
  Display/headline styles may carry a separate expressive face — use it sparingly and justify it
  by a specific role. Display typography must not spread into every label.
- **Choose weight, size, leading and line length together.** Mirror the guideline's scale
  (Material's display/title/body/label or HIG's text styles); 5–8 styles is plenty. Build a
  hierarchy of headline, section title, body, label and price — don't use an oversized headline
  for every group. A large modular scale is not automatically "premium".
- **Tune tracking & leading per step**: tighter on big display, airy leading on body, wider tracking
  on small caps/labels.
- **CJK.** Default Chinese to a readable sans (Noto Sans SC); Japanese to Zen Kaku Gothic New /
  Noto Sans JP. A handwriting, brush or high-contrast literary face needs an explicit brand
  requirement, a restricted display role and real glyph coverage — never infer it from age, a warm
  palette or an architectural reference. CJK display leading/tracking must accommodate the glyphs;
  functional UI stays in the reading face.
- **Test with real copy**: currency/decimals, punctuation, small labels, two-line names, long action
  labels and 200% zoom. The specimen is actual product copy, not an alphabet or a generic slogan.

## 2b. Spacing & composition — semantic roles
- Use **semantic spacing roles** on top of the scale: `--gap-related` (label↔value, ~8px),
  `--gap-section` (between content groups, ~24px), `--gap-major` (between major sections, ~32px),
  `--layout-gutter` (screen edges, ~24px). Related spacing must be smaller than section spacing.
  Don't choose a different gap for every card; density changes these roles consistently.
- Align related content to shared edges. A deliberate full-bleed section uses `.bleed` with
  `.inset` for its text, instead of arbitrary margins inside every component.
- Keep repeated units consistent while major sections differ enough to create rhythm.

## 3. Shape & elevation
- A small radius scale (e.g. none / sm / md / lg / full). Pick one shape language.
- Decide shadow vs flat vs tonal. Material leans tonal+shadow; HIG leans materials/subtle depth.
  Define a small elevation scale and apply it consistently.

## 3b. Iconography (greenfield → inline SVG sprite, never emoji)
The app is new, so there are no project icon files. Ship a **token-driven inline SVG sprite**
(`icons.html`) — `stroke:currentColor; stroke-width:var(--icon-stroke)` so icons re-theme with the
system. Draw in the style of **classic open sets** (Lucide/Feather MIT, Material Symbols
Apache-2.0); **don't redistribute Apple SF Symbols**; **never use emoji for UI icons**.
- **Separate glyph size from touch area.** Glyphs normally occupy 20–24px (`--icon-size`); inline
  icons use `--icon-inline` (18px); functional targets use at least `--target-min` (48px).
- **Choose the icon family deliberately, in relation to the type**: rounded outline for softer text,
  angular (butt caps, miter joins) for geometric text, duotone when a restrained filled mass
  supports hierarchy. Encode it as tokens (`--icon-stroke`, `--icon-cap`, `--icon-join`,
  `--icon-fill`). Platform default: Android/cross-platform → Material/outlined; iOS → thinner,
  rounder (SF-like).
- Keep repeated icons on one grid and one treatment — don't mix families on the same navigation row.

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

## 7. Language
Default app copy is English. Ask once whether another primary language is required, and keep that
separate from the conversation language. Localize the sample content before judging wrapping — an
English mockup is no proof of CJK typography quality.

## 8. Evidence of applying a reference
For each direction, be able to state which source it draws on (a user reference, or an entry in
`style-color-library.md`), the principle borrowed, and where it is visible in the concept, e.g.
"Swiss typographic style → shared left alignment and a strong reading hierarchy → the feed uses one
left grid; the price is secondary to the product". For an architectural cue, name its spatial
consequence (proportion, quiet space, material contrast), not only its palette. A source name alone
does not demonstrate use. With no supplied reference, say the basis is an internal exploratory
principle, not user-approved research.

## Output of this step
Before building, write 3–6 lines to the user: the **reference guideline** (from the platform), the
direction's one-sentence proposition, the color direction (with the seed/brand), type direction,
shape language (rounded?), and elevation style (flat / hairline / tonal / shadow). Get a quick confirmation, then build.
