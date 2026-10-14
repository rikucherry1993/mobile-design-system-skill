# assets/

Images used by the top-level `README.md`, plus the plugin's directory icon.

| File | What it is |
|---|---|
| icon.png | 1024×1024 listing icon for Anthropic's plugin directory (set via `icon` in `.claude-plugin/plugin.json`) |

## `shots/`
| File | What it shows |
|---|---|
| hero.webp | First screen of each example (Stride / Margin / Atrium) side by side on a transparent background — the README hero |
| 01-concept.webp | Stride's two-screen concept (first view + detail) on a transparent background |
| 01-guide.gif | A scroll-through of the living style guide (foundations → components) |

### Regenerate the hero and concept images
1. In any headless browser at 2× device scale, open each example's design-system/concept.html and wait
   for fonts (document.fonts.ready). Use each example's default theme (Stride is dark-first).
2. Screenshot the screen element (.two .col:nth-child(N) .device — N = 1 first view, N = 2 detail),
   not the whole page.
3. With Pillow: trim the 1px frame border, place the screens side by side with a 72px transparent gap,
   scale to 1800px wide for the hero (three screens) or 1360px for the concept (two screens), and save
   as WebP at quality 90 with alpha kept.

WebP rather than PNG: full-quality PNG is about 1.5 MB, and a 256-colour PNG bands the photographs.
