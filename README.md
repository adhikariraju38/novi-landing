# Novi landing page

A landing page for Novi, a project and task management tool for small, fast moving teams.
Built for the Veel frontend and design assessment.

**Live:** https://novi-landing-omega.vercel.app

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Node 20 or newer.

```bash
npm run build && npm start   # production build
npm run typecheck            # tsc --noEmit
npm run lint                 # eslint
npm run format               # prettier
```

## What's here

The three sections the brief asked for (hero, features, footer), plus some of the extras it
invited:

- **A working product mock.** The hero graphic is a small Novi you can actually use. Cards drag
  between columns with a mouse or the keyboard, and the Board, Threads and Timeline tabs switch.
  The same component is reused in the walkthrough section and the demo dialog.
- **A scroll-driven walkthrough.** The copy scrolls past a pinned workspace that changes view as
  you reach each step.
- **Pricing** with three tiers and a monthly/yearly toggle. Prices animate when you switch.
- **Four dialogs**: signup, contact, a demo walkthrough and a `⌘K` command palette. All four use
  the same Modal component. Every "Start free" and "Talk to the team" button opens one, so
  nothing on the page is a link to `#`.
- **Light and dark themes.** Picked up from the system, then remembered. Applied before first
  paint so there's no white flash on load.
- **Buttons with a press effect.** Each one sits on a 2px bottom edge that collapses when you
  click it.
- **Nav that tracks scroll position**, highlighting whichever section you're reading.
- **Reveals that replay.** Sections fade in when they enter the viewport and fade back out when
  they leave, so scrolling up and down replays them.
- **Custom 404 and error pages**, plus a top-level boundary for the case where the layout itself
  fails to render.

## Decisions

The reasoning behind all of this is in **[docs/DECISIONS.pdf](docs/DECISIONS.pdf)**, written as
questions and answers. The short version:

**Light and editorial rather than dark.** The brief calls Novi "one calm workspace", so I used a
warm paper background and Instrument Serif for the headings instead of the dark, glowing look
most tools in this category go for.

**The accent colour is Veel's.** `#4119F4`, sampled from the logo that came with the brief. It
lifts to `#7C5CFF` in dark mode, otherwise it doesn't have enough contrast.

**The hero graphic is a real board, not a screenshot.** Drag a card and it moves. It cost more
time than an image would have, but it demonstrates the product in a way a picture can't, and I
got three uses out of the same component.

**No UI library for the dialogs.** I wrote one Modal that handles focus trapping, scroll lock,
escape, and returning focus to whatever opened it, then used it for all four overlays. It's about
150 lines, which seemed cheaper than a dependency.

**I kept the brief's copy.** The headline, supporting line and all four feature descriptions are
used as written. I only wrote the section headings, the pricing copy and the closing lines.

## Structure

```
app/
  layout.tsx        fonts, metadata, theme bootstrap
  page.tsx          composes the sections
  globals.css       the design system: tokens, type scale, easings
  not-found.tsx     custom 404
  error.tsx         route error boundary
  global-error.tsx  last resort, self-contained styles
components/
  layout/           header, mobile sheet, footer, message screen
  sections/         hero, trust strip, features, walkthrough, pricing, closing CTA
  workspace/        the live mock: board, threads, timeline, drag state
  ui/               button, modal, palette, signup, contact, primitives
  icons/            hand-drawn icon set, no icon dependency
lib/
  content.ts        every string on the page
  motion.ts         shared easings, springs, variants
hooks/
docs/DECISIONS.pdf
```

If you only open two files, make them `app/globals.css`, which holds the whole design system as
CSS custom properties, and `lib/content.ts`, which holds every string on the page. Keeping copy
out of the components makes the section files much shorter.

## Checks

Against the production build:

- Lighthouse desktop: **100** performance, **100** accessibility, **100** best practices, **100** SEO
- Walked through in the browser at phone, tablet and desktop widths, 320 up to 1920, with no
  sideways scroll at any size and every tap target at or above 24px
- Keyboard only: every control reachable, cards move between columns with arrow keys, all four
  overlays trap focus and hand it back to whatever opened them
- `prefers-reduced-motion: reduce` removes movement without hiding content
- Clean console, with no errors and no hydration warnings

## Built with

Next.js 16 (App Router, static), React 19, TypeScript, Tailwind CSS 4, Motion, dnd-kit.
Type is Instrument Serif, Inter and JetBrains Mono, self-hosted through `next/font`.
