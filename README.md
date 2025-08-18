# GreenPulse EV: Smart EV Routing & Learning Platform ✨

<div align="center">

![GreenPulse EV Banner](public/readme/thumbnail.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🔍 Overview
GreenPulse EV is a cutting-edge platform for EV owners featuring:
- 🚗 Smart routing optimized for EV charging
- ⚡ AI-powered charging optimization
- 👨‍🏫 Learning resources for EV enthusiasts
- 👥 Community features for knowledge sharing

Built with **Next.js App Router**, **Prisma ORM**, and **MySQL**, this full-stack solution includes:
- 🔐 JWT-based authentication with HTTP-only cookies
- 👥 Role-based access control (student/teacher/admin)
- 📱 Modern responsive UI with Tailwind CSS
- 🧩 Modular architecture for easy extensibility

## ✨ Key Features

### 🔐 Authentication & Security
- Signup/login with email/password
- JWT session tokens stored in HTTP-only cookies
- Password hashing with bcryptjs
- Session management API endpoints

### 👥 Role Management
- Student: Access learning resources
- Teacher: Create/manage educational content
- Admin: Manage users and platform settings
- Middleware-based route protection

### 🚀 Technical Highlights
- Next.js 15 App Router architecture
- Prisma ORM with MySQL database
- React Hook Form + Zod validation
- Radix UI primitives for accessible components
- Optimized build for Vercel deployment

## 🛠️ Tech Stack

| Category         | Technologies                                                                 |
|------------------|------------------------------------------------------------------------------|
| **Core**         | Next.js 15, React 19, TypeScript 5                                           |
| **Database**     | Prisma ORM, MySQL                                                            |
| **Styling**      | Tailwind CSS v4, CSS Modules                                                 |
| **Authentication**| JWT (jsonwebtoken), bcryptjs, HTTP-only cookies                              |
| **Forms**        | React Hook Form, Zod schema validation                                       |
| **UI Components**| Radix Primitives, Heroicons, Lucide Icons                                    |
| **Deployment**   | Vercel, Docker (compatible)                                                  |

## 📂 Project Structure

```text
app/
├── layout.tsx           # Root layout (AuthProvider, Navbar)
├── page.tsx             # Authenticated dashboard
├── landing/             # Public landing pages
│   └── page.tsx
├── api/                 # API route handlers
│   ├── signup/
│   ├── signin/
│   ├── auth/            # Auth endpoints
│   │   ├── me/
│   │   └── signout/
components/
├── landing/             # Marketing components
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── CTA.tsx
├── ui/                  # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
contexts/
└── AuthContext.tsx      # Client auth state management
lib/
├── prisma.ts            # Prisma client instance
└── jwt.ts               # JWT helpers & password hashing
prisma/
└── schema.prisma        # DB schema (User + Role)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- MySQL database (local or cloud)
- npm 9+

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/greenpulse-ev.git
cd greenpulse-ev
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file
cp .env.example .env
```

Update your `.env` file with:
```env
# Database configuration
DATABASE_URL="mysql://user:password@localhost:3306/greenpulse"

# JWT configuration
JWT_SECRET="your_strong_secret_here"

# Optional: App URL for metadata
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Initialize database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000 to explore the application!

## 🔄 Production Deployment

1. Build the application:
```bash
npm run build
```

2. Run database migrations:
```bash
npx prisma migrate deploy
```

3. Start production server:
```bash
npm run start
```

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Database

    Client->>Server: POST /api/signup (credentials)
    Server->>Database: Create user (hashed password)
    Server-->>Client: Set session cookie, 201 Created

    Client->>Server: POST /api/signin (credentials)
    Server->>Database: Verify credentials
    Server-->>Client: Set session cookie, 200 OK

    Client->>Server: GET /api/auth/me
    Server->>Server: Verify JWT from cookie
    Server-->>Client: User data (200 OK)

    Client->>Server: POST /api/auth/signout
    Server-->>Client: Clear cookies, 200 OK
```

## 🧩 Extending the Platform

### Adding New Roles
1. Update Prisma schema:
```prisma
enum Role {
  student
  teacher
  admin
  fleet_manager  // New role
}
```

2. Run migration:
```bash
npx prisma migrate dev --name add_fleet_manager_role
```

3. Update middleware:
```typescript
// middleware.ts
if (path.startsWith('/fleet') {
  if (role !== 'fleet_manager') {
    return redirect('/unauthorized');
  }
}
```

### Creating Protected Routes
1. Create new route:
```text
app/fleet/dashboard/page.tsx
```

2. Add middleware protection:
```typescript
// middleware.ts
export const config = {
  matcher: [
    '/fleet/:path*',
    // ...existing paths
  ]
}
```

## 💡 Pro Tips
- Use `npm run lint` to catch code quality issues early
- Always include `credentials: 'include'` for authenticated fetch requests
- Refresh user data after critical actions using `refreshUser()` from AuthContext
- For complex forms, leverage React Hook Form's `useFormContext`
- Use `next dev --turbo` for faster development iterations

## 📜 License
GreenPulse EV © 2025 GreenPulse EV. All rights reserved.

