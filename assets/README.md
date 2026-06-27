# assets/

Images used by the top-level `README.md`.

## `shots/`
| File | What it shows |
|---|---|
| `01-app.png` / `02-app.png` / `03-app.png` | First-view phone of each example (Stride / Margin / Atrium) — the gallery carousel |
| `01-concept.png` | A full two-screen concept (first view + detail) |
| `01-guide.gif` | A scroll-through of the living style guide (foundations → components) |

Regenerate with headless Chrome (+ Pillow for the GIF):
```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=900,960 --virtual-time-budget=6000 \
  --screenshot=assets/shots/01-concept.png \
  "file://$(pwd)/examples/01-stride-cityscape/design-system/concept.html"
```
