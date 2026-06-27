# Design-system architecture: tokens → atomic → composed (extendable)

Three layers. Build the minimum useful set first; the structure must make adding more trivial.

**The token groups and component list come from `component-checklist.md`**, which enumerates the
Required foundations + components per guideline (Material 3 for Android, HIG for iOS, Material + MUI
for cross-platform — see `design-principles.md`). That checklist is the **stable, fixed catalogue**:
cover its whole Required set every run so the catalogue's size and shape don't drift — only the token
values change between themes. The lists below are an overview; the checklist is the authority.

## Layer 1 — Tokens (the source of truth)
Define as CSS variables in `styles.css` under `:root`. Group and name **semantically**.

- **Color**: brand/seed → roles: `--primary`, `--primary-strong`, `--on-primary`, `--secondary`,
  `--surface`, `--on-surface`, `--muted`, `--outline`, `--success`, `--error`, `--warning`,
  plus a neutral gray ramp (`--gray-50…900` or named: bg / surface / border / text-muted / text).
- **Spacing**: one scale, e.g. `--sp-2,4,8,12,16,20,24,32,48`. Optional fine "adjust" steps.
- **Typography**: `--font-body`, `--font-display`; classes `.t-display/.t-title/.t-body/.t-label`
  with size/weight/line-height/color.
- **Radius**: `--r-sm/md/lg/full`.
- **Elevation**: `--elev-0/1/2` (box-shadows) OR a documented "flat" decision.
- **Motion** (optional): `--dur-fast/base`, easing.

Rule: components reference tokens only. Changing a token reskins the whole system.

## Layer 2 — Atomic components
Smallest reusable pieces. A good starter set (add as needed):
button, icon-button, chip / tag, selectable chip, text field, switch/checkbox, radio, avatar,
badge, divider, icon, tab, list-item row, progress/spinner.

Each atomic component documents: **props** (with types + defaults), **variants** (e.g. primary/
secondary/danger), **states** (enabled/pressed/disabled/selected), and the **tokens** it consumes.

## Layer 3 — Composed components
Built from atomics + layout. Starter set: card / tile, app bar (top), bottom navigation, tab bar,
bottom sheet, dialog, list section, carousel, form section, empty/loading state.

## Extendability (design for growth from day one)
The system cannot have everything at first. Make growth a documented convention:
- **Add a token**: add the CSS variable in the right group; reference it — never inline.
- **Add an atomic component**: new CSS class block + a section in `index.html` + a `SPECS` entry
  (so Dev Mode + Copy-as-prompt cover it) + register its selector/section key.
- **Add a composed component**: same, built only from tokens + existing atomics.
- **Theming/dark mode**: add a `:root[data-theme="dark"]` token override block; components unchanged.
- **Naming**: keep semantic, not literal (`--primary`, not `--blue-500`, at the role layer).

Record these rules in the generated `design-system/README.md` so future contributors follow them.

## Mapping to native code
The HTML/CSS is the canonical spec. When implementing in a framework, mirror the layers:
- tokens → a constants/theme file (e.g. Dart `Colors`/`Spacing`, SwiftUI `Color`/`CGFloat`,
  Compose `MaterialTheme`, RN theme object),
- atomic/composed components → one widget/component each,
referencing the token layer by name. The per-component **Copy as prompt** output encodes exactly
this so any agent can generate faithful code.
