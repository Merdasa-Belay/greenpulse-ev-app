# GreenPulse EV: In‑Person EV Training & Services ✨

<div align="center">

![GreenPulse EV Banner](public/readme/thumbnail.png)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?style=for-the-badge&logo=prisma)](https://prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)](https://mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🔍 Overview
GreenPulse EV is a single‑page marketing site for in‑person EV training and service offerings in Ethiopia. It highlights:
- 🛠️ Hands‑on training paths and live labs
- 🔋 EV service & maintenance offerings
- 📍 Localized program details and contact info
- 📱 Modern, responsive design

Built with **Next.js App Router** and **Tailwind CSS**, this project is optimized for fast, SEO‑friendly deployment.

## ✨ Key Features

### 🧠 Training & Service Highlights
- Structured learning paths for in‑person classes
- Industry readiness focus with live case studies
- On‑site appointment requests and contact flow

### 🚀 Technical Highlights
- Next.js 15 App Router architecture
- Tailwind CSS v4 styling
- SEO metadata + structured data
- Optimized build for Vercel deployment

## 🛠️ Tech Stack

| Category         | Technologies                                                                 |
|------------------|------------------------------------------------------------------------------|
| **Core**         | Next.js 15, React 19, TypeScript 5                                           |
| **Styling**      | Tailwind CSS v4                                                              |
| **Animations**   | Framer Motion                                                                |
| **UI Components**| Radix Primitives, Heroicons, Lucide Icons                                    |
| **Deployment**   | Vercel, Docker (compatible)                                                  |

## 📂 Project Structure

```text
app/
├── layout.tsx           # Root layout
├── page.tsx             # Single‑page landing
├── not-found.tsx        # Not found page
pages/
├── robots.txt.ts        # Robots endpoint
└── sitemap.xml.ts       # Sitemap endpoint
components/
├── landing/             # Marketing components
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── CTA.tsx
└── ui/                  # Reusable UI components
  ├── button.tsx
  ├── card.tsx
  └── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
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
# Optional: App URL for metadata
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000 to explore the application!

## 🔄 Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm run start
```
## 💡 Pro Tips
- Use `npm run lint` to catch code quality issues early
- Use `next dev --turbo` for faster development iterations

## 📜 License
GreenPulse EV © 2025 GreenPulse EV. All rights reserved.

