import { statusVariant, statusLabel } from "../../theme/theme";

const VARIANT_STYLES = {
  active: { bg: "var(--status-active-bg)", text: "var(--status-active-text)" },
  pending: { bg: "var(--status-pending-bg)", text: "var(--status-pending-text)" },
  closed: { bg: "var(--status-closed-bg)", text: "var(--status-closed-text)" },
  rejected: { bg: "var(--status-rejected-bg)", text: "var(--status-rejected-text)" },
};

/**
 * Renders a status badge from a raw backend enum string (e.g. "active",
 * "pending_review", "shortlisted"). Colors always come from the shared
 * network-wide palette — never pass a custom color in.
 */
export default function Badge({ status, children }) {
  const variant = VARIANT_STYLES[statusVariant[status]] || VARIANT_STYLES.closed;
  const label = children || statusLabel[status] || status;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap"
      style={{ background: variant.bg, color: variant.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: variant.text }} />
      {label}
    </span>
  );
}
