# Newcomer Jobline — Frontend

A fully responsive, animated React + Vite + Tailwind CSS frontend for **Newcomer Jobline**,
a job board connecting newcomers/immigrants with inclusive Canadian employers.

## Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom brand design tokens: navy / gold / teal)
- **Framer Motion** for animations & page transitions
- **React Icons** (Hi2, Fa6, Pi sets)
- **React Router v6** for client-side routing

## Getting Started

```bash
npm install
npm run dev
```

Then open http://localhost:5173

To build for production:

```bash
npm run build
npm run preview
```

## Pages
- `/` — Home
- `/browse-jobs` — Browse Jobs (search, filters, pagination)
- `/post-job` — Post a Job (2-step employer form)
- `/employers` — Employers (benefits, pricing, testimonials)
- `/about` — About Us
- `/contact` — Contact Us (form, info cards, map)

## Reusable Component Library

**Common (`src/components/common`)**
`Button`, `Card`, `Input`, `Textarea`, `Select`, `Badge`, `SectionHeading`,
`Container`, `IconBox`, `StatCard` (animated counters), `Accordion`,
`PageHero`, `FAQSection`

**Layout (`src/components/layout`)**
`Navbar` (sticky + animated mobile drawer), `Footer`

**Jobs (`src/components/jobs`)**
`JobCard`, `SearchBar`, `FilterSidebar`, `Pagination`

**Home / About / Contact / Employers / Forms**
Section-specific building blocks composed on top of the common library
(Hero, HowItWorks, Testimonials carousel, CTASection, MissionValues,
StorySection, ContactForm, PostJobForm, PricingPlans, BenefitsGrid, etc.)

## Notes
- All job/employer data is mocked in `src/data/` — swap with a real API easily.
- Brand colors, fonts, and shadows are defined centrally in `tailwind.config.js`.
- The project was hand-built without a live `npm install` in the sandbox
  (no network access there) — dependency versions are pinned to stable
  releases in `package.json`. Run `npm install` locally to fetch them.
