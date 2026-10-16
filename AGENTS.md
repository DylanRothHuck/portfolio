# AGENTS.md

Personal portfolio site: a home page that looks like a Monet painting hanging in
a frame, with nearly invisible hotspots that reveal a symbol + title on hover and
navigate to pages styled as the environment where each project was made.

**Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS v4 + react-router-dom v7.

## Commands

Package manager is **Bun** (`bun.lock`, Bun 1.4.x). Do not use npm/yarn/pnpm.

```bash
bun install        # install deps
bun run dev        # Vite dev server with HMR
bun run build      # tsc -b && vite build  (type-check first, then bundle)
bun run lint       # oxlint
bun run preview    # serve the production build
```

There is **no test script and no test framework installed**.

- After editing `vite.config.ts`, restart the dev server (Vite reloads the
  config but a stale server can serve an unprocessed `@import 'tailwindcss'`,
  which strips every utility class and makes the page look broken).

## Architecture

```
index.html            # mounts #root, preloads JetBrains Mono from Google Fonts
src/main.tsx          # BrowserRouter + <App/>, imports index.css
src/App.tsx           # routes generated from the hotspot data + hidden <nav>
src/index.css         # Tailwind import, @theme tokens, base styles, custom classes
src/data/hotspots.ts  # SINGLE SOURCE OF TRUTH for the hotspots
src/data/academic.ts  # the "Sobre mi" academic record (subjects + grades)
src/components/
  Painting.tsx        # frame + painting + text + hotspots + dim; owns active state
  Hotspot.tsx         # one <a> hotspot (resting + active rendering)
  Symbols.tsx         # project emblem components (components only)
  symbolMap.ts        # name -> component lookup (kept separate for lint)
  DebugPicker.tsx     # ?debug drag-to-measure tool
  BackToPainting.tsx  # shared return control on inner pages
src/pages/
  Home.tsx            # renders <Painting/>
  Lar.tsx             # terminal/lab page
  Rothex.tsx          # recreation of the Rothex landing page + its story
  Reino.tsx           # recreation of the Reino game landing page
  About.tsx           # "Sobre mi" as a Moodle / UAP Campus Virtual course page
  Placeholder.tsx     # fallback page for hotspots without a bespoke page
public/painting.jpg   # the Monet painting (960x1193)
src/assets/icons/     # PNG project emblems (LAR, rothex, Reino, Tonutti, drh)
src/assets/reino/     # vendored Reino art (hero, cards, modes, screenshots)
src/assets/rothex-hero.jpg  # aerial farm photo used as the Rothex hero
```

### Inner pages

Each inner page has its **own visual language** and is intentionally unrelated to
the painting:

- `Lar.tsx` - simulated terminal/lab (dark, monospace).
- `Rothex.tsx` - recreates rothex.com.ar (Nunito, white/dark, orange hero title,
  blue `#3aa0f0` branch cards). Editable copy/links live in the component.
- `Reino.tsx` - recreates the game's landing page (dark green ground, gold rules,
  Cinzel headings, blackletter card numerals, Garamond body). Text data is in
  `src/data/reino.ts`; art is vendored from `~/Work/Umbrella/reino-web` into
  `src/assets/reino/` (cards/modes converted to WebP to keep the bundle small).
- `About.tsx` - Moodle/UAP Campus Virtual course page; data in
  `src/data/academic.ts`.

Every inner page shows its hotspot's symbol as the back-to-painting link (via
`BackToPainting`), which carries the `symbol` view-transition name.

### Symbols

Each hotspot's `symbol` (a `SymbolName`) maps through `symbolMap.ts` to a
component. All five are PNG emblems in `src/assets/icons/` (`LAR.png`,
`rothex.png`, `Reino.png`, `Tonutti.png`, `drh.png`) rendered as
`<img className="object-contain ...">`; they are light-on-transparent, so they
read on the dark dim. To swap an emblem, replace the import in `Symbols.tsx`.

### Data-driven hotspots

`src/data/hotspots.ts` drives everything. Coordinates are **percentages of the
painting box** (`x`, `y`, `w`, `h`), so they stay aligned at any size. Adding a
project = one object there; `App.tsx` auto-generates its route. Give it a bespoke
page by adding an entry to the `customPages` map in `App.tsx` keyed by hotspot
`id`; otherwise it renders `<Placeholder hotspot={...} />`.

Measure new coordinates with `?debug` (drag on the painting, copy the snippet).

## Non-obvious gotchas

- **Frame sizing uses a custom-property ratio.** `.painting-frame` height is
  `min(calc(100dvh - 2*var(--frame-m)), calc((100vw - 2*var(--frame-m)) / (var(--painting-ratio))))`.
  `--painting-ratio` expands to the token stream `960 / 1193`, so the `var()` MUST
  stay wrapped in parentheses. Without them the expression becomes
  `... / 960 / 1193` and the frame collapses to ~0 height (painting invisible).
  This is what guarantees the whole painting fits on any aspect ratio (wide
  desktop and portrait phone) with even margins, no crop, no letterbox.
- **Dim layering is deliberate.** Two dim layers (a `fixed` one behind the frame
  for the brown margin, an `absolute` one inside the frame for the painting) let
  the active hotspot sit above the dim (`z-40`) while the painting/text stay below
  it. Do not merge them into a single `fixed inset-0` layer, or the active hotspot
  would be dimmed too.
- **View Transitions use the name `symbol`.** The active hotspot's symbol and the
  destination page's `BackToPainting` symbol both set
  `viewTransitionName: 'symbol'`; only one element per page may carry it. Route
  links use `<Link viewTransition>`.
- **`symbols.tsx` must export only components.** The name→component map lives in
  `src/components/symbolMap.ts`; oxlint's `react/only-export-components` rule
  rejects mixing them in one file.
- **TypeScript is strict about syntax, not just types.** `verbatimModuleSyntax` +
  `erasableSyntaxOnly` mean type-only imports MUST use `import type`, and enums,
  namespaces, and constructor parameter properties are disallowed.
  `noUnusedLocals`/`noUnusedParameters` make `bun run build` fail on unused
  variables, not just type errors.
- **Import local modules with explicit extensions** (`allowImportingTsExtensions`),
  e.g. `import App from './App.tsx'`.
- **Project references:** `tsconfig.json` has no files; it references
  `tsconfig.app.json` (`src`) and `tsconfig.node.json` (`vite.config.ts`). New
  files outside those globs are not type-checked.
- **No global scroll on the home page.** `html, body { overflow: hidden }`; inner
  pages scroll inside their own `h-dvh overflow-y-auto` container.
- See `DECISIONS.md` for deviations from the original plan and deferred work
  (responsive WebP/AVIF images, `React.lazy` code-splitting, label flipping).

## Conventions

- Colors come from the `@theme` tokens in `index.css`: `--color-frame`,
  `--color-ink`, `--color-cream` (Tailwind classes `bg-frame`, `text-ink`,
  `text-cream`, ...). The `Lar` page deliberately uses its own dark palette.
- Layout uses Tailwind utilities; the few custom classes (`painting-frame`,
  `hotspot-window`, `symbol-in`, `label-in-*`) live in `index.css`.
- Lint is `oxlint` (`.oxlintrc.json`): `react/rules-of-hooks` (error),
  `react/only-export-components` (warn).
- Match existing style: 2-space indent, single quotes, no semicolons.
- Keep editable content in `data/hotspots.ts` and the `content` object at the top
  of each page file. Do not invent facts about the owner; use placeholder copy.
