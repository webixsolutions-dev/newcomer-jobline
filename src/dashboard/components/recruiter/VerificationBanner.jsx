import { FiClock, FiAlertOctagon, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function VerificationBanner({ company }) {
  if (!company || company.verification_status === "verified") return null;

  if (company.verification_status === "rejected") {
    return (
      <div
        className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between lg:px-8"
        style={{ background: "var(--status-rejected-bg)", borderColor: "var(--color-border)" }}
      >
        <div className="flex items-start gap-2">
          <FiAlertOctagon className="mt-0.5 shrink-0" style={{ color: "var(--status-rejected-text)" }} />
          <p className="text-sm" style={{ color: "var(--status-rejected-text)" }}>
            <strong>Verification rejected.</strong> {company.rejection_reason}
          </p>
        </div>
        <Link
          to="/dashboard/recruiter/company"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-1.5 text-sm font-semibold text-white"
          style={{ background: "var(--status-rejected-text)" }}
        >
          <FiEdit2 size={13} /> Edit & resubmit
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex items-start gap-2 border-b px-4 py-3 lg:px-8"
      style={{ background: "var(--status-pending-bg)", borderColor: "var(--color-border)" }}
    >
      <FiClock className="mt-0.5 shrink-0" style={{ color: "var(--status-pending-text)" }} />
      <p className="text-sm" style={{ color: "var(--status-pending-text)" }}>
        <strong>Your company is pending verification.</strong> You can prepare job posts, but they won't
        go live until you're verified.
      </p>
    </div>
  );
}
