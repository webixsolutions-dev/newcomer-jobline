import { Link } from "react-router-dom";
import { FiMoreVertical, FiEdit2, FiUsers, FiXCircle, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { Card, Button, ConfirmDialog } from "../../dashboard/components/ui/Primitives";
import JobPostingStatusBadge from "./JobPostingStatusBadge";

export default function JobPostingCard({
  posting,
  onClose,
  onDelete,
  compact = false,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const postedLabel = new Date(posting.postedDate).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isClosed = posting.status === "Closed";

  return (
    <>
      <Card className={`p-4 sm:p-5 ${compact ? "" : ""}`}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold" style={{ color: "var(--color-primary)" }}>
                {posting.jobTitle}
              </h3>
              <JobPostingStatusBadge status={posting.status} />
            </div>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {posting.location} · {posting.employmentType}
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Posted {postedLabel}
              {" · "}
              <Link
                to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
                className="font-medium"
                style={{ color: "var(--color-secondary)" }}
              >
                {posting.applicantCount} applicant{posting.applicantCount !== 1 ? "s" : ""}
              </Link>
            </p>
          </div>

          <div className="relative flex shrink-0 items-center gap-2">
            <Link to={`/employer-dashboard/post-a-job?edit=${posting.id}`}>
              <Button variant="outline" className="hidden sm:inline-flex">
                <FiEdit2 size={14} /> Edit
              </Button>
            </Link>
            <Link
              to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
              className="hidden sm:inline-flex"
            >
              <Button variant="ghost">
                <FiUsers size={14} /> Applicants
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border"
              style={{ borderColor: "var(--color-border)" }}
              aria-label="More actions"
            >
              <FiMoreVertical style={{ color: "var(--color-primary)" }} />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div
                  className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-[var(--radius-md)] border bg-white py-1 shadow-lg"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Link
                    to={`/employer-dashboard/post-a-job?edit=${posting.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--color-bg)]"
                    style={{ color: "var(--color-text)" }}
                  >
                    <FiEdit2 size={14} /> Edit
                  </Link>
                  <Link
                    to={`/employer-dashboard/job-postings/${posting.id}/applicants`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--color-bg)]"
                    style={{ color: "var(--color-text)" }}
                  >
                    <FiUsers size={14} /> View Applicants
                  </Link>
                  {!isClosed && (
                    <button
                      type="button"
                      onClick={() => { setMenuOpen(false); setConfirmClose(true); }}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-bg)]"
                      style={{ color: "var(--color-text)" }}
                    >
                      <FiXCircle size={14} /> Close Posting
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); setConfirmDelete(true); }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[var(--color-bg)]"
                    style={{ color: "var(--status-rejected-text)" }}
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmClose}
        title="Close this posting?"
        description="Closed postings stop accepting new applicants. You can still view existing applicants."
        confirmLabel="Close posting"
        onConfirm={() => { onClose(posting.id); setConfirmClose(false); }}
        onCancel={() => setConfirmClose(false)}
      />

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this posting?"
        description="This will permanently remove the job posting and cannot be undone."
        confirmLabel="Delete"
        danger
        onConfirm={() => { onDelete(posting.id); setConfirmDelete(false); }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}
