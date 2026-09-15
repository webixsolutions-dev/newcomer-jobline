const STATUS_STYLES = {
  Active: {
    bg: "var(--color-secondary-light)",
    text: "var(--color-secondary)",
    border: "transparent",
  },
  Draft: {
    bg: "var(--status-closed-bg)",
    text: "var(--status-closed-text)",
    border: "transparent",
  },
  Closed: {
    bg: "transparent",
    text: "var(--color-primary)",
    border: "var(--color-primary)",
  },
  "Pending Review": {
    bg: "var(--status-pending-bg)",
    text: "var(--status-pending-text)",
    border: "transparent",
  },
  Expired: {
    bg: "var(--status-closed-bg)",
    text: "var(--status-closed-text)",
    border: "transparent",
  },
  Removed: {
    bg: "var(--status-rejected-bg)",
    text: "var(--status-rejected-text)",
    border: "transparent",
  },
};

/** Status pill for job postings: Active (teal), Draft (muted), Closed (outline navy). */
export default function JobPostingStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Draft;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{
        background: style.bg,
        color: style.text,
        border: style.border !== "transparent" ? `1px solid ${style.border}` : undefined,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: style.text }} />
      {status}
    </span>
  );
}
