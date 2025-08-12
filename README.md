<div align="center">

# GreenPulse EV

Smart EV routing, charging optimization, and learning companions — built with Next.js, Prisma, and MySQL.

![App Thumbnail](public/readme/thumbnail.png)

</div>

## Overview

GreenPulse EV is a Next.js App Router project with authentication (signup/signin/signout), role-based access (student/teacher/admin), and a modern Tailwind UI. It includes a public landing page, protected app routes, and a JWT-based session set via HTTP-only cookies compatible with middleware.

## Features

- Public landing page with marketing sections and SEO metadata
- Authentication: signup, signin, signout using JWT (HTTP-only cookie)
- Role-based access control in middleware (student/teacher/admin)
- Protected routes (e.g., /admin, /teacher, /student, app pages)
- Forms with React Hook Form + Zod validation
- Prisma ORM (MySQL) with typed client
- Modern UI with Tailwind CSS and headless primitives
- Next.js App Router, server components, and edge-friendly middleware

## Tech Stack

- Next.js 15 (App Router), React 19, TypeScript 5
- Tailwind CSS v4
- Prisma + MySQL
- JWT (jsonwebtoken) for session tokens
- React Hook Form + Zod
- Radix Primitives (label/select), Heroicons/Lucide Icons

## Project Structure (excerpt)

```text
app/
   layout.tsx           # Root layout (AuthProvider, Navbar)
   page.tsx             # Authenticated dashboard
   landing/page.tsx     # Public landing page
   api/                 # Route handlers (signup, signin, auth/me, auth/signout)
components/
   landing/             # Hero, Features, CTA
   ui/                  # Reusable UI components
contexts/
   AuthContext.tsx      # Client auth state (login/logout/refresh)
lib/
   prisma.ts            # Prisma client
   jwt.ts               # JWT helpers and password hashing
middleware.ts          # Route protection + role enforcement
prisma/
   schema.prisma        # DB schema (User + Role)
```

## Setup

Prerequisites

- Node.js 18+ (LTS recommended)
- MySQL database (local or managed)

1) Install dependencies

```bash
npm install
```

2) Environment variables

Create `.env` (or `.env.local`) in the project root:

```bash
# Database (MySQL)
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"

# JWT signing secret (use a strong random value in production)
JWT_SECRET="replace-with-a-strong-secret"

# (Optional) Public app URL for absolute metadata (OG/Twitter)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3) Generate Prisma client and run migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

If using an existing DB, ensure it’s empty or aligned with `prisma/schema.prisma`.

4) Start the dev server

```bash
npm run dev
```

Visit http://localhost:3000.

## Running Migrations (production)

```bash
npx prisma migrate deploy
```

## Authentication Flow

- Signup (`POST /api/signup`):
   - Validates name, email, password; role defaults to `student` if omitted.
   - Hashes password (bcryptjs) and stores user in MySQL via Prisma.
- Signin (`POST /api/signin`):
   - Verifies credentials, signs a JWT `{ userId, email, role }` (1h expiry).
   - Sets `next-auth.session-token` (HTTP-only cookie) and a readable `role` cookie.
   - Returns user payload (without password).
- Me (`GET /api/auth/me`):
   - Reads the HTTP-only cookie, verifies JWT, returns user info.
- Signout (`POST /api/auth/signout`):
   - Clears the session and role cookies.

Middleware (`middleware.ts`):

- Public routes are allowed (e.g., `/landing`, `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, SEO routes).
- Unauthenticated access to protected routes redirects to `/sign-in`.
- Role-restricted routes (`/admin`, `/teacher`, `/student`) enforce roles using the `role` cookie when signed in.

Client Auth Context (`contexts/AuthContext.tsx`):

- Holds `user` and `loading` state.
- `refreshUser()` fetches `/api/auth/me` on mount.
- `login()` sets client state post-signin; `logout()` calls signout and navigates to `/sign-in`.

## Extending Roles and Features

Add a role

1) Update Prisma schema:

```prisma
enum Role {
   student
   teacher
   admin
   // add more here, e.g. manager
}
```

2) Use the new role in the `User` model and rerun migrations:

```bash
npx prisma migrate dev --name add-new-role
```

3) Update middleware checks (e.g., allow `/manager`).

4) Update UI and registration (`/api/signup`) to accept/select the new role.

Add a protected feature

- Create a new route under `app/feature/page.tsx`.
- Guard via middleware path rules (e.g., `/feature` for specific roles).
- On the client, use `useAuth()` to tailor UI by role.

## Known Issues / Tips

- Hydration warnings can occur if client-only state renders during SSR. We mitigate this by deferring client-only UI (e.g., Navbar waits for mount) and keeping landing sections server-friendly.
- Always include `credentials: 'include'` on fetch calls that need cookies.
- Use `NextResponse.redirect` and middleware for server-side redirects to avoid client/server mismatches.
- Use strong `JWT_SECRET` in production and rotate as needed.
- For DB schema changes, commit both `schema.prisma` and generated migrations.

## Scripts

```bash
npm run dev       # Start Next.js (dev)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Lint codebase
```

## License

Green Pulse © 2025 GreenPulse EV. See LICENSE (or replace with your organization’s license).

