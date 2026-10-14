# assets/

Images used by the top-level `README.md`, plus the plugin's directory icon.

| File | What it is |
|---|---|
| `icon.png` | 1024×1024 listing icon for Anthropic's plugin directory (set via `icon` in `.claude-plugin/plugin.json`) |

## `shots/`
| File | What it shows |
|---|---|
| `hero.webp` | First screen of each example (Stride / Margin / Atrium) side by side on a transparent background — the README hero |
| `01-concept.webp` | Stride's two-screen concept (first view + detail) on a transparent background |
| `01-guide.gif` | A scroll-through of the living style guide (foundations → components) |

### Regenerate `hero.webp` / `01-concept.webp`
1. In any headless browser at **2× device scale**, open each example's `design-system/concept.html`
   and wait for fonts (`document.fonts.ready`). Use each example's default theme (Stride is dark-first).
2. Screenshot the screen **element** — `.two .col:nth-child(N) .device` (`N = 1` first view,
   `N = 2` detail) — not the whole page.
3. Compose with Pillow: trim the 1px frame border, place the screens side by side with a 72px
   transparent gap, scale to the target width, and save as WebP (quality 90, alpha kept):

```python
from PIL import Image
shots = [Image.open(p).convert("RGBA") for p in ("stride.png", "margin.png", "atrium.png")]
shots = [s.crop((2, 2, s.width - 2, s.height - 2)) for s in shots]   # 1px border at 2x
gap = 72
w, h = sum(s.width for s in shots) + gap * (len(shots) - 1), max(s.height for s in shots)
out, x = Image.new("RGBA", (w, h), (0, 0, 0, 0)), 0
for s in shots:
    out.alpha_composite(s, (x, 0)); x += s.width + gap
out = out.resize((1800, round(h * 1800 / w)), Image.LANCZOS)   # 1360 for 01-concept (2 screens)
out.save("assets/shots/hero.webp", quality=90, method=6)
```
WebP rather than PNG: full-quality PNG is ~1.5 MB, and a 256-colour PNG bands the photographs.
