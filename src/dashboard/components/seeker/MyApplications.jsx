import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { Card, Button, ConfirmDialog } from "../ui/Primitives";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";
import { mockMyApplications } from "../../mock/applications";
import { mockJobs } from "../../mock/jobs";

const FINAL_STATES = ["hired", "rejected", "withdrawn"];

function jobFor(jobId) {
  return mockJobs.find((j) => j.id === jobId);
}

export default function MyApplications() {
  const { status, data, error, retry } = useAsync(() => mockMyApplications, { deps: [] });
  const [applications, setApplications] = useState(null);
  const [toWithdraw, setToWithdraw] = useState(null);

  const list = applications ?? data;

  function confirmWithdraw() {
    setApplications((list ?? data).map((a) => (a.id === toWithdraw.id ? { ...a, status: "withdrawn" } : a)));
    setToWithdraw(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>My Applications</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Every job you've applied to, across every partner site.
        </p>
      </div>

      <Card>
        <DataStateGate
          status={status}
          error={error}
          retry={retry}
          empty={
            list && list.length === 0 ? (
              <EmptyState
                icon={FiFileText}
                title="You haven't applied to any jobs yet"
                description="Browse open roles and your applications will show up here."
              />
            ) : null
          }
        >
          {list && list.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                    <th className="px-5 py-3 font-medium">Job</th>
                    <th className="px-5 py-3 font-medium">Applied</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((app) => {
                    const job = jobFor(app.job_id);
                    const jobUnavailable = job && ["expired", "closed", "removed"].includes(job.status);
                    const canWithdraw = !FINAL_STATES.includes(app.status);

                    return (
                      <tr key={app.id} className="border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                        <td className="px-5 py-4">
                          <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{app.job_title}</p>
                          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                            {app.company_name}
                            {jobUnavailable && (
                              <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
                                style={{ background: "var(--status-closed-bg)", color: "var(--status-closed-text)" }}>
                                {job.status === "expired" ? "Expired" : job.status === "closed" ? "Closed" : "Removed"}
                              </span>
                            )}
                          </p>
                        </td>
                        <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>
                          {new Date(app.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                        </td>
                        <td className="px-5 py-4"><Badge status={app.status} /></td>
                        <td className="px-5 py-4 text-right">
                          <button
                            disabled={!canWithdraw}
                            onClick={() => setToWithdraw(app)}
                            className="text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                            style={{ color: "var(--status-rejected-text)" }}
                            title={canWithdraw ? "Withdraw application" : "This application is already in a final state"}
                          >
                            Withdraw
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </DataStateGate>
      </Card>

      <ConfirmDialog
        open={!!toWithdraw}
        title="Withdraw this application?"
        description={`Northbridge and other employers won't be notified further about your application for "${toWithdraw?.job_title}". This can't be undone.`}
        confirmLabel="Withdraw"
        danger
        onConfirm={confirmWithdraw}
        onCancel={() => setToWithdraw(null)}
      />
    </div>
  );
}
