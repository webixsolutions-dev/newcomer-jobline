import { useState } from "react";
import { FiBookmark, FiTrash2, FiEye, FiSend } from "react-icons/fi";
import { Card, Button, ConfirmDialog } from "../ui/Primitives";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";
import { mockSavedJobs } from "../../mock/savedJobs";

export default function SavedJobs() {
  const { status, data, error, retry } = useAsync(() => mockSavedJobs, { deps: [] });
  const [saved, setSaved] = useState(null);
  const [toRemove, setToRemove] = useState(null);

  const list = saved ?? data;

  function confirmRemove() {
    setSaved((list ?? data).filter((s) => s.job_id !== toRemove.job_id));
    setToRemove(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Saved Jobs</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Jobs you've bookmarked to apply to later.</p>
      </div>

      <DataStateGate
        status={status}
        error={error}
        retry={retry}
        empty={
          list && list.length === 0 ? (
            <Card>
              <EmptyState
                icon={FiBookmark}
                title="No saved jobs yet"
                description="Tap the bookmark icon on any job listing to save it here."
              />
            </Card>
          ) : null
        }
      >
        {list && list.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {list.map((saved) => {
              const job = saved.job;
              const unavailable = ["expired", "closed", "removed"].includes(job.status);

              return (
                <Card key={saved.job_id} className={`p-5 ${unavailable ? "opacity-70" : ""}`}>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-semibold" style={{ color: "var(--color-primary)" }}>{job.title}</p>
                      <p className="truncate text-sm" style={{ color: "var(--color-text-muted)" }}>{job.company_name}</p>
                    </div>
                    {unavailable && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: "var(--status-closed-bg)", color: "var(--status-closed-text)" }}
                      >
                        {job.status === "expired" ? "Expired" : job.status === "closed" ? "Closed" : "Removed"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {job.is_remote ? "Remote" : `${job.location_city}, ${job.location_province}`}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <FiEye size={14} /> View
                    </Button>
                    <Button variant="primary" disabled={unavailable} className="flex-1" title={unavailable ? "This job is no longer accepting applications" : undefined}>
                      <FiSend size={14} /> Apply
                    </Button>
                    <button
                      onClick={() => setToRemove(saved)}
                      aria-label="Remove saved job"
                      className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border"
                      style={{ borderColor: "var(--color-border)", color: "var(--status-rejected-text)" }}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </DataStateGate>

      <ConfirmDialog
        open={!!toRemove}
        title="Remove saved job?"
        description={`"${toRemove?.job.title}" will be removed from your saved list.`}
        confirmLabel="Remove"
        danger
        onConfirm={confirmRemove}
        onCancel={() => setToRemove(null)}
      />
    </div>
  );
}
