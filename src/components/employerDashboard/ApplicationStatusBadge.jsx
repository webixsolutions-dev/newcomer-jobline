import { EMPLOYER_STAGE_LABELS } from "../../data/pipelineStages";

const STAGE_VARIANTS = {
  new: { bg: "var(--status-pending-bg)", text: "var(--status-pending-text)" },
  reviewed: { bg: "var(--status-pending-bg)", text: "var(--status-pending-text)" },
  shortlisted: { bg: "var(--status-active-bg)", text: "var(--status-active-text)" },
  interview: { bg: "var(--color-secondary-light)", text: "var(--color-secondary)" },
  offer: { bg: "var(--status-active-bg)", text: "var(--status-active-text)" },
  rejected: { bg: "var(--status-rejected-bg)", text: "var(--status-rejected-text)" },
};

/** Pipeline stage badge for employer-facing applicant views. */
export default function ApplicationStatusBadge({ stage }) {
  const variant = STAGE_VARIANTS[stage] || STAGE_VARIANTS.new;
  const label = EMPLOYER_STAGE_LABELS[stage] || stage;

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
