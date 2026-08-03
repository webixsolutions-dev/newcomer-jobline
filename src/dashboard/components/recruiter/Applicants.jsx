import { useState } from "react";
import { FiUsers, FiFileText } from "react-icons/fi";
import { Card } from "../ui/Primitives";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";
import { mockApplicants, applicationPipeline } from "../../mock/applications";
import { statusLabel } from "../../theme/theme";

export default function Applicants() {
  const { status, data, error, retry } = useAsync(() => mockApplicants, { deps: [] });
  const [applicants, setApplicants] = useState(null);
  const list = applicants ?? data;

  function setApplicantStatus(id, newStatus) {
    setApplicants((list ?? data).map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Applicants</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Everyone who has applied across your job posts.</p>
      </div>

      <Card>
        <DataStateGate
          status={status}
          error={error}
          retry={retry}
          empty={
            list && list.length === 0 ? (
              <EmptyState icon={FiUsers} title="No applicants yet" description="Once candidates apply to your jobs, they'll show up here." />
            ) : null
          }
        >
          {list && list.length > 0 && (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {list.map((a) => {
                const isWithdrawn = a.status === "withdrawn";
                const isRejected = a.status === "rejected";
                return (
                  <li key={a.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{a.applicant_name}</p>
                      <p className="truncate text-sm" style={{ color: "var(--color-text-muted)" }}>{a.applicant_headline}</p>
                      <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        Applied to <strong>{a.job_title}</strong> ·{" "}
                        {new Date(a.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: "var(--color-secondary)" }}
                        title="Open placeholder resume"
                      >
                        <FiFileText size={14} /> View resume
                      </button>

                      {isWithdrawn ? (
                        <Badge status="withdrawn" />
                      ) : (
                        <select
                          value={a.status}
                          onChange={(e) => setApplicantStatus(a.id, e.target.value)}
                          className="rounded-[var(--radius-md)] border px-2.5 py-1.5 text-xs font-medium outline-none"
                          style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}
                        >
                          {applicationPipeline.map((s) => (
                            <option key={s} value={s}>{statusLabel[s]}</option>
                          ))}
                          <option value="rejected">{statusLabel.rejected}</option>
                        </select>
                      )}
                      {!isWithdrawn && <Badge status={a.status} />}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </DataStateGate>
      </Card>
    </div>
  );
}
