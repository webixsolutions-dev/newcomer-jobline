/**
 * Page intro banner with eyebrow, title, and subtitle.
 * Uses the marketing site's soft navy/teal gradient treatment.
 */
const DashboardTopBanner = ({ eyebrow, title, subtitle }) => (
  <div className="relative overflow-hidden rounded-2xl border border-navy-100 bg-gradient-to-br from-navy-50 via-white to-teal-50/40 px-6 py-8 sm:px-8">
    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-200/30 blur-2xl" />
    <div className="pointer-events-none absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-teal-200/30 blur-2xl" />
    <div className="relative">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-teal-700">
          {eyebrow}
        </p>
      )}
      <h1 className="font-heading text-2xl font-extrabold text-navy-900 sm:text-3xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-navy-600 sm:text-base">{subtitle}</p>
      )}
    </div>
  </div>
);

export default DashboardTopBanner;
