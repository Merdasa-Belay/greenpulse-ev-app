
# GreenPulse EV App

Real-time AI Teaching Platform for engaging, topic-based learning experiences.

![App Thumbnail](public/readme/thumbnail.png)

## Overview

GreenPulse EV App is a Next.js App Router project that showcases interactive "Companions" (guided learning personas), a personal journey view, and a subscription flow. It uses a modern UI kit with headless primitives and a type-safe form stack.

## Features

- Companion cards and listing with categories and durations
- Create/edit companion flows (form with validation)
- Personal journey page and recent sessions
- Subscription page scaffold
- Responsive design with reusable UI components (buttons, inputs, table, etc.)

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4
- Radix UI primitives (select, label)
- React Hook Form + Zod (forms and validation)
- Framer Motion (animations)
- Lucide Icons

## Project Structure

```text
.
├── app/                       # Next.js App Router pages/layout
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles (Tailwind v4)
│   ├── page.tsx               # Home / Dashboard
│   ├── companions/
│   │   ├── page.tsx           # Companions index
│   │   ├── new/page.tsx       # Create companion
│   │   └── [id]/page.tsx      # Companion details
│   ├── my-journey/page.tsx    # Personal journey
│   ├── sign-in/page.tsx       # Sign-in placeholder
│   └── subscription/page.tsx  # Subscription page
├── components/
│   ├── CompanionCard.tsx
│   ├── CompanionForm.tsx
│   ├── CompanionsList.tsx
│   ├── CTA.tsx
│   ├── NavItems.tsx
│   └── ui/                    # Reusable UI primitives
│       ├── Navbar.tsx
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── textarea.tsx
├── constants/
│   ├── index.ts               # App constants and seed data
│   └── soundwaves.json        # Static JSON asset
├── lib/
│   └── utils.ts               # Utility helpers
├── public/
│   ├── icons/*.svg            # Icon set
│   ├── images/*.svg           # Images
│   └── readme/*.png           # README visuals
├── types/                     # Type declarations
│   ├── index.d.ts
│   └── vapi.d.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Getting Started

Prerequisites

- Node.js 18+ (recommend LTS) and npm

Install dependencies

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

Build for production

```bash
npm run build
npm start
```

Lint

```bash
npm run lint
```

## Environment Variables

This project doesn’t require environment variables by default. If you integrate external services (auth, APIs), create a `.env.local` file at the project root and add your keys there.

## Key Routes

- `/` – Dashboard (cards, recent sessions + CTA)
- `/companions` – Browse companions
- `/companions/new` – Create a companion
- `/companions/[id]` – Companion details
- `/my-journey` – Learning journey view
- `/subscription` – Subscription page
- `/sign-in` – Placeholder (no auth wired by default)

## UI and Patterns

- UI components live under `components/ui` and are designed to be composable and themeable.
- Forms use `react-hook-form` with `zod` validators defined alongside the form components.
- Tailwind v4 uses the new PostCSS plugin; global styles live in `app/globals.css`.

## Deployment

This is a standard Next.js App Router app. Recommended hosting: Vercel.

- Add any required environment variables in the hosting dashboard.
- Use the production build command `next build` and start with `next start`.

## Troubleshooting

- Ensure Node 18+ is installed.
- If styles don’t load, confirm Tailwind v4 is enabled via `@tailwindcss/postcss` and that `app/globals.css` is imported in `app/layout.tsx`.
- If the dev server caches oddly, delete `.next/` and restart:
   - `rm -rf .next` then `npm run dev`

## License

No license specified.

