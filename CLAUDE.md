# Influenzo Landing Page

Landing page built with React, TypeScript, Tailwind CSS v4, shadcn/ui, Motion and ESLint (Vite).

## Commands

- `npm run dev` start dev server
- `npm run build` typecheck + production build
- `npm run lint` / `npm run lint:fix` ESLint
- `npm run typecheck` TypeScript only
- `npx shadcn@latest add <component>` add a shadcn/ui component

Run `npm run lint` and `npm run build` before considering any task done.

## Tech Stack

- React 19 + TypeScript (strict), Vite
- Tailwind CSS v4 (`@tailwindcss/vite`, no `tailwind.config.js`; theme lives in CSS)
- shadcn/ui (style `base-nova`, components in `src/components/ui`)
- Motion (`import { motion } from 'motion/react'`) for animations
- ESLint flat config (`eslint.config.js`) with typescript-eslint
- TypeScript is pinned to 6.0.x because typescript-eslint does not yet support 7. Do not upgrade until it does.

## Project Structure

```
src/
  components/
    ui/        shadcn/ui primitives (generated; edit sparingly)
    shared/    reusable app components (e.g. fade-in.tsx)
    sections/  landing page sections (hero.tsx, pricing.tsx, ...)
  hooks/       custom hooks (use-*.ts)
  lib/         utilities (utils.ts with cn())
  types/       shared TypeScript types
  index.css    the ONLY global stylesheet
  App.tsx
  main.tsx
```

Use the `@/` alias for imports from `src` (e.g. `@/components/ui/button`). Avoid long `../../` paths.

## Rules

### Naming
- All file and folder names use **kebab-case** (`hero-section.tsx`, `use-scroll.ts`). No PascalCase or camelCase filenames.
- Components, interfaces and types: `PascalCase`. Variables and functions: `camelCase`. Constants: `UPPER_SNAKE_CASE`.
- Hooks start with `use` and live in files named `use-*.ts`.

### TypeScript
- **Never use `any`** (enforced by ESLint). Use `unknown` and narrow, generics, or proper types.
- No `@ts-ignore` / `@ts-expect-error` unless commented with the reason.
- No non-null assertions (`!`) except for `document.getElementById('root')` in `main.tsx`.
- Use `import type` for type-only imports.
- Prefer `interface` for object shapes and component props; name props `<Component>Props`.
- Type function return values for exported functions when not obvious.
- Do not use `enum`; use union types or `as const` objects.

### React
- Function components only, named exports (default export only for `App`).
- One component per file. File name matches the component (`FadeIn` -> `fade-in.tsx`).
- Keep components small; extract sections into `components/sections` and reuse via `components/shared`.
- No inline magic data in JSX; move content arrays to constants at the top of the file or into `src/lib`.
- Do not call hooks conditionally. Do not disable `react-hooks` lint rules.

### Styling
- **Do not create `App.css` or any other CSS file.** `src/index.css` is the single global stylesheet. Global styles, theme tokens (`@theme`), CSS variables and custom `@utility` classes go there.
- Style components with Tailwind utility classes only. No inline `style={{}}` unless the value is truly dynamic.
- Use `cn()` from `@/lib/utils` to merge conditional classes.
- Use theme tokens (`bg-background`, `text-muted-foreground`, `bg-primary`) instead of hard-coded colors.
- Use shadcn/ui components before building custom ones. Add them with the CLI, do not hand-copy.

### Design system
- Colors are defined once in `src/index.css`: brand scale `lavender-100`…`700`, plus `surface`, `surface-muted`, `ink`, and the shadcn tokens (`primary` is black, `ring`/`accent` are lavender). Never hard-code hex values in components.
- Font is **Mona Sans** (`@fontsource-variable/mona-sans`, set as `--font-sans`). Headings use `font-medium` with tight tracking (`tracking-[-0.04em]`).
- Every section heading uses `SectionHeading` (`components/shared/section-heading.tsx`): `h2` with the `heading-section` utility (3xl → 4xl → 5xl), description on the right, and the gradient divider (`split`, default). Use `variant="stacked"` only inside panels/columns. Never hand-write a section heading or size. The About statement uses `heading-section` directly. The hero `h1` is the only larger heading.
- Corner radii are generous (`rounded-xl` for buttons/inputs, `rounded-3xl` for large panels).

### Responsive layout
- Every page section wraps its content in `container mx-auto`. The `container` utility (defined in `index.css`) provides max-width per breakpoint and padding for mobile, tablet and desktop.
- Design **mobile-first**: base classes are mobile, then `sm:`/`md:` (tablet) and `lg:`/`xl:` (desktop).
- Test every change at mobile (~375px), tablet (~768px) and desktop (~1280px). No horizontal scroll.

### Animations
- Use `motion` (`motion/react`) for all animations. Do not add other animation libraries; `tw-animate-css` is only for shadcn internals.
- Reuse shared wrappers like `FadeIn` in `components/shared` before writing new animation code.
- Animate `opacity` and `transform` (x, y, scale, rotate) only. Avoid animating layout properties.
- Scroll-reveal animations use `whileInView` with `viewport={{ once: true }}`.
- Keep durations short (0.2s-0.6s). Respect reduced motion (wrap the app in `<MotionConfig reducedMotion="user">` when adding page-level animation).

### Code quality
- ESLint must pass with zero errors. Do not use `eslint-disable` without a reason comment.
- No `console.log` (`warn` and `error` allowed).
- Use `===` / `!==` only.
- No unused variables, imports or dead code.
- Use semantic HTML (`main`, `section`, `nav`, `footer`, `h1`-`h6` in order) and provide `alt` text and accessible labels.
