# Style & colour reference library (internal backstop — not user-facing)

A curated map from **named styles / eras / moods / architects** to concrete **token implications**,
plus the **authoritative colour systems** to reason with. This is a *background knowledge base*:

- **Don't lecture the user with this vocabulary.** Never dump movement names, theory, or citations
  into the chat. When the user gives a hint ("Scandinavian", "muji", "brutalist", "like Barragán",
  "70s", "calm/clinical", a brand) silently map it to the relevant entries here and let it inform the
  token values you generate. Surface a term only if it genuinely helps the user choose.
- **Translate to tokens, never pixel-copy.** Every entry below resolves to decisions about palette
  *temperature*, saturation band, neutral tint, shape/roundness, elevation, type personality, and
  density — i.e. the `:root` token layer. It is a starting direction, then tuned to the brief.
- **Licensing:** prefer open/public-domain sources for any embedded values. Proprietary systems
  (Pantone, Sanzo Wada's book, NCS) are referenced by *approach* only — approximate, don't copy their
  tables. Hexes here are illustrative approximations to seed from, not authoritative reproductions.
- Still obey `design-principles.md`: harmony by construction (paired `--on-*`, WCAG-checked by math),
  tinted neutrals, one coherent temperature.

---

## A. Colour systems to reason with (authoritative)

**Perceptual colour spaces — use these to build ramps & guarantee contrast**
- **HCT** (Hue–Chroma–Tone, Google / Material 3) and **OKLCH / OKLab** (Björn Ottosson, 2020). Build
  tonal ramps and dark-mode by varying *tone/lightness* at fixed hue/chroma in a perceptual space, so
  steps look evenly spaced and contrast is predictable. Prefer OKLCH math when deriving a ramp from a
  seed; it avoids the muddy mid-tones you get interpolating in sRGB.

**Engineered, accessible UI palettes (open-source — safe to mirror the *method*)**
- **Radix Colors** (MIT) — 12-step scales designed so step 9 = solid bg, 11/12 = text; pairs are
  accessibility-tuned. Excellent model for a role ramp.
- **Open Color** (MIT), **Tailwind** palette, **IBM Carbon**, **Material ref palettes**, **Apple system
  colours** — well-balanced neutral + accent ramps to calibrate against.
- **ColorBrewer** (Cynthia Brewer, free) — perceptually ordered, **colour-blind-safe** sequential /
  diverging / qualitative sets. Use for any data-viz/chart tokens.

**Colour-theory canon (for *why* a combination works)**
- **Johannes Itten**, *The Art of Color* (Bauhaus) — the seven colour contrasts, the 12-hue wheel.
- **Josef Albers**, *Interaction of Color* — colour is relational; a swatch shifts with its neighbour
  (why we test `--on-*` against its actual background, not in isolation).
- **Faber Birren** — colour harmony & psychology; restrained, functional palettes.

**Historical / cultural named palettes (public domain — fine to seed from)**
- **Le Corbusier — *Polychromie Architecturale*** (1931 & 1959): an authoritative architectural colour
  system of 63 harmonised hues organised into mood "keyboards". The go-to when the user wants an
  *architectural* palette — calm, mineral, confidently harmonised earth/sky tones.
- **日本の伝統色 (Traditional Japanese colours)** & **Werner's Nomenclature of Colours** (1814) — for
  muted, natural, literary palettes (sage, indigo, clay, ash). Cited names, public domain.
- **Sanzo Wada**, *A Dictionary of Colour Combinations* — reference the *combination sensibility*
  (unexpected but harmonious pairings), don't copy the plates.

---

## B. Style / era archetypes → token DNA

Each entry: the design DNA you encode. Palettes are seed directions (approximate hexes), not copies.

- **Scandinavian / Nordic functionalism** — light, airy, desaturated; warm off-whites, greige & sage
  neutrals, one muted accent; soft radii; near-flat with whisper shadows; generous whitespace;
  humanist sans + maybe a soft serif. Cues: Aalto, muji, Hay. `bg ~#F4F5F1, ink ~#1F241E, accent muted`.
- **Japandi** — Scandinavian × Japanese; add wabi-sabi imperfection, clay/charcoal/oat, matte,
  natural texture, even more negative space.
- **Bauhaus / De Stijl** — primary red/blue/yellow on black/white, hard geometry, zero radius, flat,
  grid-driven, geometric sans. Use sparingly/expressively.
- **Swiss / International Typographic Style** (Müller-Brockmann) — strict grid, Helvetica/Akzidenz,
  red accent, lots of white, content-forward. Great for "clean / editorial / utilitarian".
- **Mid-century modern** — warm muted retro: mustard, teal, burnt orange, avocado, walnut-brown
  neutrals; medium radius; organic shapes. Cues: Eames, Verner Panton (saturate for the 60s pop).
- **Brutalism / neo-brutalism (web)** — raw, high-contrast, thick black borders, hard offset shadows,
  zero/low radius, system fonts, clashing-but-deliberate accents. Expressive, not calm.
- **Memphis (1980s)** — playful, saturated, squiggles/terrazzo, geometric confetti; high energy.
- **Art Deco** — black/cream + metallic gold/emerald/sapphire, symmetry, fine lines, high-contrast
  elegant display serifs.
- **Material (Google)** — tonal palettes from a seed, surface tints + elevation, FAB/nav-bar idioms.
- **Apple flat / HIG** — system greys, vibrancy/materials over heavy shadow, SF-like type, rounded.
- **Editorial / magazine** — big serif display, strong type hierarchy, restrained palette, full-bleed
  imagery, asymmetric layout. Good when the user wants "premium / content-led".
- **Clinical / fintech-trust** — cool blue-greys, high legibility, low saturation, tight grid,
  conservative radius; one trustworthy accent (blue/teal).
- **Y2K / aero / vaporwave** — glossy gradients, chrome, lilac/cyan/pink; nostalgic, high-saturation.

## C. Architect / designer cues (for "make it feel like …")
- **Dieter Rams / Braun** — "less but better": near-neutral, one functional accent, restrained.
- **Luis Barragán** — warm Mexican modernism: bougainvillea pink, ochre, lime-wash white, earth.
- **Tadao Ando** — concrete minimalism: cool greys, single light gesture, vast quiet.
- **Frank Lloyd Wright / organic** — earth & foliage: ochre, terracotta, forest, sandstone.
- **Le Corbusier** — see *Polychromie* above; mineral, sky, earth, confident harmony.

## D. Type pairing (quick reference)
- Pair a **display personality** with a **text workhorse** (e.g. Fraunces/Playfair × Inter; a grotesk
  display × a humanist text). Use a **modular scale** (1.2–1.333). Tighten tracking as size grows.
- Swiss/utilitarian → one neutral grotesk, weight for hierarchy. Editorial → high-contrast serif display.

---

## E. Hint → archetype mapping (use silently)
| User says… | Pull from |
|---|---|
| Scandinavian, Nordic, muji, calm, minimal, airy | Scandinavian / Japandi; Traditional JP colours; OKLCH ramp |
| clean, utilitarian, corporate, dashboard | Swiss style; Clinical/fintech; Carbon/Radix |
| premium, editorial, magazine, luxury | Editorial; Art Deco; serif display pairing |
| playful, fun, kids, bold | Memphis; Mid-century pop; saturated accent |
| raw, edgy, indie, statement | Brutalism / neo-brutalism |
| retro, vintage, 60s/70s | Mid-century modern; Memphis (80s); Y2K (00s) |
| architectural, mineral, earthy, "like \<architect>" | Le Corbusier *Polychromie*; Barragán/Ando/Wright cues |
| trustworthy, finance, medical, secure | Clinical/fintech-trust; cool blue-greys |
| nature, organic, wellness, calm | sage/clay/forest; Traditional JP; Wright/organic |

When a brand, screenshot, or URL is given, treat it as the strongest cue and reconcile it with the
nearest archetype above — then derive the token layer.
