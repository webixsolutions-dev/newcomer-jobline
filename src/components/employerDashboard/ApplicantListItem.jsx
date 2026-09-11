import { useState } from "react";
import { FiFileText, FiArrowRight, FiX } from "react-icons/fi";
import { Card, Button, ConfirmDialog } from "../../dashboard/components/ui/Primitives";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicantListItem({
  applicant,
  onAdvance,
  onReject,
  onViewProfile,
  showJobTitle = true,
}) {
  const [confirmReject, setConfirmReject] = useState(false);
  const isFinal = ["hired", "rejected", "withdrawn"].includes(applicant.stage);

  const appliedLabel = new Date(applicant.appliedDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onViewProfile(applicant)}
              className="text-left font-semibold hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              {applicant.name}
            </button>
            {showJobTitle && (
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Applied for {applicant.jobTitle}
              </p>
            )}
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Applied {appliedLabel}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onViewProfile(applicant)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "var(--color-secondary)" }}
            >
              <FiFileText size={14} />
              {applicant.resumeFilename}
            </button>
            <ApplicationStatusBadge stage={applicant.stage} />
            {!isFinal && (
              <>
                <Button variant="outline" onClick={() => onAdvance(applicant.id)} className="text-xs">
                  <FiArrowRight size={14} /> Advance
                </Button>
                <Button variant="ghost" onClick={() => setConfirmReject(true)} className="text-xs">
                  <FiX size={14} /> Reject
                </Button>
              </>
            )}
            <Button variant="ghost" onClick={() => onViewProfile(applicant)}>
              View Profile
            </Button>
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmReject}
        title="Reject this applicant?"
        description={`${applicant.name} will be moved to Rejected. You can still view their profile later.`}
        confirmLabel="Reject"
        danger
        onConfirm={() => { onReject(applicant.id); setConfirmReject(false); }}
        onCancel={() => setConfirmReject(false)}
      />
    </>
  );
}
