# Decisions

Deviations from the implementation plan, and why. Everything else follows the
plan (coordinates, tokens, file names, hotspot data).

## Stack

- **TypeScript, not JavaScript.** The repo was already a TypeScript Vite app
  (`tsconfig` project references, `.tsx` sources, `verbatimModuleSyntax` +
  `erasableSyntaxOnly`). Rewriting it to JS would have been destructive, so the
  plan was implemented in TSX instead.
- **Bun, not npm.** `bun.lock` is the lockfile and Bun 1.4.x is installed, so all
  commands use `bun run ...` (`bun install`, `bun run dev`, `bun run build`,
  `bun run lint`). `react-router-dom@7` was added with `bun add`.
- Tailwind v4 and `@tailwindcss/vite` were already dependencies; they are now
  wired up (`vite.config.ts` plugin + `@import 'tailwindcss'` in `index.css`).

## Structure

- The painting moved from `src/assets/Claude_Monet_Woman_with_a_Parasol.jpg` to
  `public/painting.jpg`, as the plan specifies (served at `/painting.jpg`).
- `src/App.css` and the template markup were deleted.
- The `symbols` lookup map lives in `src/components/symbolMap.ts` instead of
  `Symbols.tsx`, because oxlint's `react/only-export-components` rule (error-free
  but reported) forbids mixing component and non-component exports. `Symbols.tsx`
  now exports only components.

## Layout

- `container-type: inline-size` was dropped; the name/tag scale with
  `clamp()` + `vw` instead of `cqw`, so the frame does not need to be a
  container (and does not create an extra stacking context).
- `--painting-ratio` **must stay wrapped in parentheses** in the frame height:
  `calc((100vw - 2 * var(--frame-m)) / (var(--painting-ratio)))`. The custom
  property expands to the token stream `960 / 1193`; without the parens the
  division becomes `... / 960 / 1193` and the frame collapses to ~0 height.
- The dim is two layers: a `fixed inset-0` layer behind the frame (dims the brown
  margin) and an `absolute inset-0` layer inside the frame (dims the painting).
  This lets the active hotspot (`z-40`) sit above the dim while the painting and
  text stay below it, without the hotspot having to escape the frame's stacking
  context.

## Deferred / not implemented

- **§11 responsive images:** WebP/AVIF with `<picture>`/`srcset` is not done. It
  needs image tooling, and the plan forbids adding dependencies. The single
  `public/painting.jpg` is served directly (with `fetchpriority="high"`,
  `decoding="async"`). `React.lazy` code-splitting of inner pages is also not
  implemented; all pages ship in one bundle (~87 kB gzip).
- **§12 label flipping:** labels are placed on the side toward the canvas center
  (the plan's automatic rule) but are not measured/flipped with
  `getBoundingClientRect`. In practice the computed side keeps them on-screen.
- **§8 back transition:** returning to `/` uses the standard crossfade. The
  "symbol shrinks back into the hotspot" morph is not implemented, because the
  home page mounts with no active hotspot and therefore no element carrying the
  `symbol` view-transition name.
- On inner pages the hotspot's symbol is itself the back link (via
  `BackToPainting`), so exactly one element per page carries the `symbol` name.

## Content

- Inner pages contain placeholder copy only (`TODO: replace with real content`).
  No facts about the owner were invented.
- Home `<title>` is `Portfolio`; inner pages use `<title> - Portfolio`.
- **`/rothex` recreates the Rothex landing page** (`rothex.com.ar`, the owner's
  first web page, Feb 2021) and tells its story. The hero uses a real drone
  photo of the farm (`~/Pictures/granja/fotos/DJI_0001.JPG`, downscaled to
  `src/assets/rothex-hero.jpg`). The "Huevos Doble A" banner is a **CSS stand-in**
  (the real logo is an image the owner did not provide), and the eggs photo
  behind Misión/Visión/Filosofía is a **gradient stand-in** for the same reason.
  The Fundación paragraph ends with "..." because the source screenshot was cut
  off; do not invent the rest.
- **`/el-reino` recreates the Reino game landing page**, taking its palette,
  type and art from `~/Work/Umbrella/reino-web`. Assets were vendored and
  downscaled (cards/modes to WebP) into `src/assets/reino/`; text lives in
  `src/data/reino.ts`. The leaderboards, trailer and the two forms from the
  original were omitted (they need the RAPI backend).
- **"Sobre mi" (`/sobre-mi`) mimics the UAP Campus Virtual (Moodle)** from a
  screenshot the owner provided: navy top bar, gold "Campus Virtual" band, dark
  body, and course cards. The owner's ficha académica lives in
  `src/data/academic.ts` (subjects, grades, degree, status counts, averages) and
  is rendered as filterable course cards. Grades/status are shown verbatim from
  the ficha; nothing was invented.
- Hotspots are the owner's projects, in order: Practicas en LAR (`lar`),
  Rothex (`rothex`), El Reino (`reino`), Informatica Aplicada en Tonnuti
  (`tonnuti`), Sobre mi (`drh`).
- **Symbols are real PNG emblems**, copied from the owner's `~/Pictures` into
  `src/assets/icons/`: `LAR.png`, `rothex.png`, `Reino.png`, `Tonutti.png`,
  `drh.png`. All are white/light-on-transparent, so they read on the dark dim;
  `object-contain` preserves their aspect ratio. `LAR.png` and `drh.png` are small
  enough that Vite inlines them as data URLs.
- The earlier SVG stand-ins (geometric placeholders, an egg, a chip, and a
  UnifrakturCook blackletter R) have all been replaced by these PNGs, and the
  UnifrakturCook font was removed from `index.html`.

