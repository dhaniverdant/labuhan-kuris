# Labuhan Kuris Village Portal

A full-stack village information and content-management portal for **Desa Labuhan Kuris, Sumbawa, Indonesia**. The application gives residents and visitors one place to explore the village profile, tourism destinations, population statistics, agriculture, local products, gallery, and contact information.

Behind the public website is a protected admin dashboard where authorized village staff can maintain published content without editing source code.

## Why this project matters

Village information is often spread across social media, static documents, and informal channels. This project turns that information into a responsive, maintainable website with:

- a clear public information experience;
- structured, database-backed content;
- role-restricted administration;
- image upload and publication workflows; and
- interactive data visualization.

It demonstrates an end-to-end implementation rather than a static landing page: UI, authentication, authorization, database access, file storage, server-side mutations, and continuous integration are all part of the repository.

## Main features

### Public portal

- Responsive home page with previews of the village's main content
- Village profile and local potential
- Tourism listing and dynamic destination detail pages
- Population summary cards and per-hamlet charts
- Agriculture and featured commodities
- Local MSME/UMKM product catalogue with WhatsApp ordering links
- Village gallery backed by cloud storage
- Contact details, service hours, social links, and an embedded map

### Admin dashboard

- Email/password authentication through Supabase Auth
- Additional authorization through an `admin_users` allowlist
- Create, edit, delete, publish, and order tourism, UMKM, and gallery content
- Maintain village statistics and contact information
- Upload JPG, PNG, or WebP images with type and size validation
- Refresh affected public pages immediately after content changes
- Row Level Security policies that separate public reads from admin writes

## Routes at a glance

| Route | Purpose |
| --- | --- |
| `/` | Public landing page and section previews |
| `/profil` | Village profile |
| `/wisata` | Published tourism destinations |
| `/wisata/[slug]` | Destination detail, location, map link, and sharing |
| `/statistik` | Village statistics and population charts |
| `/pertanian` | Agriculture potential |
| `/umkm` | Published local products |
| `/galeri` | Village photo gallery |
| `/kontak` | Contact, social media, office hours, and map |
| `/admin/login` | Administrator sign-in |
| `/admin` | Protected content-management dashboard |

## Technical highlights

- **Next.js 16 App Router** with TypeScript and React 19
- **Server Components** for database-backed public and admin pages
- **Server Actions** for authentication and CRUD mutations
- **Supabase SSR** for cookie-based sessions across server and browser contexts
- **PostgreSQL + Row Level Security** for protected content access
- **Supabase Storage** for tourism, UMKM, and gallery images
- **Recharts** for responsive population visualizations
- **Tailwind CSS 4** for the responsive interface
- **Dynamic metadata** for shareable tourism detail pages
- **GitHub Actions** pipeline that runs linting and a production build

## Architecture

```text
Public visitor
    │
    ▼
Next.js App Router ──────► Server Components ──────► Published Supabase data
    │
    └─ /admin ───────────► Supabase Auth + admin allowlist
                                  │
                                  ▼
                            Server Actions
                                  │
                     ┌────────────┴────────────┐
                     ▼                         ▼
              PostgreSQL + RLS          Supabase Storage
                     │                         │
                     └──────── route revalidation ────────► Updated public pages
```

The public data layer selects records marked as published and orders them for display. Admin pages verify the authenticated user against `admin_users` before exposing management tools. Mutations are performed on the server, and successful changes revalidate the related public and admin routes.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Backend | Supabase Auth, PostgreSQL, Storage |
| Charts | Recharts |
| Quality | ESLint, GitHub Actions |

## Run locally

### Prerequisites

- Node.js 20.9 or newer
- npm
- Access to the configured Supabase project, or a compatible Supabase project with the required tables, storage buckets, authentication, and RLS policies

### Installation

```bash
git clone <repository-url>
cd labuhan-kuris
npm ci
```

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

The `NEXT_PUBLIC_SITE_URL` value is used to generate absolute sharing metadata for tourism detail pages.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Database setup examples for statistics and UMKM data, storage, and RLS policies are available in [`docs/database`](./docs/database). The application also expects compatible `admin_users`, `wisata`, `galeri`, and `site_contact` resources in Supabase. Admin credentials are managed through Supabase Auth and are not stored in this repository.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |

## Project structure

```text
app/                 App Router pages, admin screens, and Server Actions
components/          Shared UI, home sections, admin inputs, and charts
data/                Static content used by informational sections
docs/database/       Supabase schema and policy examples
lib/supabase/        Browser/server clients and typed data-access helpers
public/              Static and responsive image assets
types/               Shared TypeScript types
proxy.ts             Supabase session refresh integration
```

## What to review

For a quick technical assessment, start with:

- `app/admin/` for authentication, authorization, CRUD workflows, and revalidation;
- `lib/supabase/` for SSR client setup and public data access;
- `app/wisata/[slug]/page.tsx` for dynamic routing and metadata;
- `components/charts/` for client-side visualization; and
- `.github/workflows/ci.yml` for the quality gate.

## Current scope

The interface is written in Indonesian because the intended users are the Labuhan Kuris community and domestic visitors. The project currently focuses on village content discovery and staff-managed publishing; automated tests and a complete one-command Supabase bootstrap are natural next steps.
