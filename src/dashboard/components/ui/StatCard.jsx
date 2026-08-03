export default function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  const toneColor = tone === "accent" ? "var(--color-accent)" : "var(--color-secondary)";
  const toneBg = tone === "accent" ? "var(--status-pending-bg)" : "var(--color-secondary-light)";

  return (
    <div
      className="flex items-center gap-4 rounded-[var(--radius-lg)] p-5"
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl"
        style={{ background: toneBg, color: toneColor }}
      >
        <Icon />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold leading-tight" style={{ color: "var(--color-primary)" }}>
          {value}
        </p>
        <p className="truncate text-sm" style={{ color: "var(--color-text-muted)" }}>
          {label}
        </p>
      </div>
    </div>
  );
}
