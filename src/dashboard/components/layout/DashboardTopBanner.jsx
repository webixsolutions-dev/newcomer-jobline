/** Reusable dashboard page header — eyebrow, heading, subtitle. */
export default function DashboardTopBanner({ eyebrow, heading, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow && (
          <p
            className="mb-1 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-secondary)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
          {heading}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
