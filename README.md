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

## Changelog

### Module 2: Post a Job (v0.2)
- **New page**: `/post-job` fully built out, replacing Module 1 placeholder.
  Sections: Hero → Feature Grid → Job Posting Form + Benefits Sidebar → How Posting Works → Why Employers Choose Us → Stats Strip → Employer FAQ (2×2 grid) → Ready to Hire CTA Band.
- **Global Footer redesigned**: `Footer.jsx` updated to dark navy background (`bg-navy-900`), 3 link columns, dark circular social icons, X/Twitter replaces Instagram, "Terms of Service" standardized (was "Terms of Use").
- **New reusable components added**:
  - `IconTextCard` (exported from `WhyEmployersChooseUs.jsx`) — icon-left/text-right card pattern for use across future pages.
  - `EmployerFAQCard` — 2×2 grid FAQ with icon-left toggle, different visual from Homepage accordion but same open/close behaviour pattern.
- **New data files**: `src/data/employerBenefits.js`, `src/data/postingSteps.js`, `src/data/whyEmployersChooseUs.js`, `src/data/employerFaqs.js`.
- **Nav active-state**: Navbar "Post a Job" button now uses `useLocation` to render an active underline when on `/post-job` (route-driven, not hardcoded).
- **Images** (place in `public/`):
  - `postjobhero.webp` — office team + laptop, Post a Job hero
  - `readytohire.webp` — 4 professionals at table, Ready to Hire CTA band

### Module 3: Employers (v0.3)
- **New page**: `/employers` fully built out, replacing Module 1 placeholder.
  Sections: Hero → Feature Grid → Built for Employers split → Highlights Row → Why Choose Us → How It Works flow → Stats Strip → FAQ → CTA Band.
- **Footer variants**: `Footer.jsx` updated to use `useLocation` to determine which design to render (`light` for `/employers`, `navy` for others).
- **New reusable components added**:
  - `DecorativeShape` — SVG blob/curve component for background accents, positionable via props.
- **New data files**: `src/data/employerFeatureHighlights.js`, `src/data/builtForEmployersBenefits.js`, `src/data/employerHighlights.js`, `src/data/whyChooseUsItems.js`, `src/data/howItWorksSteps.js`, `src/data/employersFaqs.js`.
- **Images** (place in `public/`):
  - `employers-hero.webp` — 4 professionals at laptop with "Stronger Teams. Better Together" text
  - `built-for-employers.webp` — team meeting
  - `hire-cta-two-people.webp` — 2 professionals at laptop

### Module 4: Contact Us (v0.4)
- **New page**: `/contact` fully built out, replacing Module 1 placeholder.
  Sections: Hero (with fallback image container) → Info Cards Row → Contact Form + Sidebar (with static map) → Support Options Grid → FAQ → Next Step Mini CTA → Final CTA Band.
- **Footer reconciliation**: `Footer.jsx` navy variant updated to standardize on Instagram (replacing X), "Terms of Use", and refreshed description copy.
- **New reusable components added**:
  - `MapPlaceholder` — clean static visual approximation of an embedded map with CSS-drawn streets and a transit pin, using an image fallback layer.
- **New data files**: `src/data/contactInfoCards.js`, `src/data/supportOptions.js`, `src/data/contactFaqs.js`.
- **Images** (place in `public/images/`):
  - `contact-hero.jpg` — 4 professionals with "NEW OPPORTUNITIES" wall poster
  - `contact-map-placeholder.jpg` — static map graphic

### Module 5: Browse Jobs (v0.5)
- **New pages**: `/jobs` (Browse Jobs) fully built out, and a placeholder for `/jobs/:jobId` (Job Detail).
  Sections: Hero with SearchBar → QuickFilterPills → Feature Highlights → FilterSidebar (left) & JobList (right) → Categories Grid → How It Works → Career Resources → Success Stories Carousel → Mini CTA → FAQ Section.
- **Advanced Filtering State**: Implemented `useJobFilters` hook to handle client-side filtering, sorting, and pagination over the mock dataset.
- **Footer Finalization**: Reconciled the footer into a single, canonical navy/4-column version matching Module 1's layout but Module 4's styling/content (dynamic copyright year, language selector added). Module 3's `variant="light"` remains in the codebase unused, pending a final decision. Noted `.ca` vs `.com` email domain discrepancy (defaulted to `.ca`).
- **New data files**: `src/data/mockJobs.js` (dataset for filtering/pagination), `src/data/jobQuickFilters.js`, `src/data/jobsCategories.js`, `src/data/jobsCareerResources.js`, `src/data/successStories.js`, `src/data/jobsFaqs.js`.
- **Images** (place in `public/images/`):
  - `browse-jobs-hero.jpg` — 4 professionals, Toronto skyline
  - `testimonial-fatima.jpg` — Fatima A. headshot
  - `testimonial-michael.jpg` — Michael T. headshot
  - Note: Company logo placeholders live under `public/images/company-logos/` (e.g. `maple-office-solutions.svg`) with an initial-based CSS fallback if missing.

### Module 6: About Us (v0.6)
- **New page**: `/about` (About Us) fully built out, replacing the Module 1 placeholder.
  Sections: Hero → Our Story → How We Help → Employer Partnership → Impact Stats Banner → Next Step CTA → Support Info Row (page-local).
- **Reusable Split Layout**: Created `AboutSplitSection.jsx` to DRY up the hero-style split section blocks (Hero, Story, Next Step CTA).
- **Page-Local Support Row**: Added `AboutSupportInfoRow.jsx` to render the 3-column mentorship/employer info and contact details above the footer.
- **Images** (place in `public/images/`):
  - `about-hero.jpg` — 4 professionals at laptop with Canadian flag
  - `about-story.jpg` — Team photo
  - `about-testimonial-priya.jpg` — Priya S. testimonial photo
  - `about-next-step.jpg` — 4 professionals with "Stronger Together" wall text
- **Design Review Flags**:
  - The design reference for Module 6 shows a simpler/lighter footer layout (with only 2 link columns and localized address listings). In alignment with instructions, we have preserved Module 5's finalized canonical navy/4-column footer and implemented the custom column details locally inside `AboutSupportInfoRow.jsx`. This discrepancy should be reviewed with the design source of truth before modifying the global footer architecture.

### Global Layout & Spacing Refactor (v0.7)
- **Container horizontal padding** reduced ~40% globally via Tailwind `container.padding` (DEFAULT 0.6rem, sm 0.9rem, lg 1.2rem, xl 1.5rem) and hero‑side padding classes (`.hero-left-pad` / `.hero-right-pad`) scaled proportionally at every breakpoint.
- **Vertical rhythm tokens** introduced in `src/index.css` (`--space-section-y: 2.5rem`, `--space-component-y: 1.2rem`, `--hero-top-offset: 4.5rem`) and reflected in Tailwind’s spacing scale (overridden `8/12/16/20/24` steps) so all section (`py-16`, `py-24`, …) and component gaps (`gap-8`, `gap-12`, …) are noticeably tighter while keeping button/input padding untouched.
- **Hero sections** on all six pages now share a single top offset (`var(--hero-top-offset)` = 72 px from the navbar) and identical left‑edge alignment; `PageHero` and `HeroSection` consume the CSS variables instead of hard‑coded values.
- **Result**: pages feel denser and more intentional, sections sit closer together without visual collision, and every hero lines up perfectly across the site. Mobile/tablet breakpoints receive the same proportional tightening.

## Notes
- All job/employer data is mocked in `src/data/` — swap with a real API easily.
- Brand colors, fonts, and shadows are defined centrally in `tailwind.config.js`.
- The project was hand-built without a live `npm install` in the sandbox
  (no network access there) — dependency versions are pinned to stable
  releases in `package.json`. Run `npm install` locally to fetch them.
