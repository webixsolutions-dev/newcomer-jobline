import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBriefcase, FiPlus, FiEye, FiEdit2, FiXCircle, FiRotateCw, FiTrash2 } from "react-icons/fi";
import { Card, Button, ConfirmDialog } from "../ui/Primitives";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";
import { mockJobs } from "../../mock/jobs";

export default function MyJobs() {
  const { status, data, error, retry } = useAsync(() => mockJobs, { deps: [] });
  const [jobs, setJobs] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const list = jobs ?? data;

  function setJobStatus(id, newStatus) {
    setJobs((list ?? data).map((j) => (j.id === id ? { ...j, status: newStatus } : j)));
  }

  function confirmDelete() {
    setJobs((list ?? data).filter((j) => j.id !== toDelete.id));
    setToDelete(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>My Jobs</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Manage every job post for your company.</p>
        </div>
        <Link to="/dashboard/recruiter/jobs/new">
          <Button><FiPlus size={15} /> Post a job</Button>
        </Link>
      </div>

      <Card>
        <DataStateGate
          status={status}
          error={error}
          retry={retry}
          empty={
            list && list.length === 0 ? (
              <EmptyState
                icon={FiBriefcase}
                title="You haven't posted any jobs yet"
                description="Create your first job post to start receiving applicants."
                action={<Link to="/dashboard/recruiter/jobs/new"><Button><FiPlus size={15} /> Post a job</Button></Link>}
              />
            ) : null
          }
        >
          {list && list.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                    <th className="px-5 py-3 font-medium">Title</th>
                    <th className="px-5 py-3 font-medium">Location</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Applicants</th>
                    <th className="px-5 py-3 font-medium">Posted</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((job) => (
                    <tr key={job.id} className="border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                      <td className="px-5 py-4">
                        <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{job.title}</p>
                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{job.category_name}</p>
                      </td>
                      <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>
                        {job.is_remote ? "Remote" : `${job.location_city}, ${job.location_province}`}
                      </td>
                      <td className="px-5 py-4"><Badge status={job.status} /></td>
                      <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>{job.applicant_count ?? 0}</td>
                      <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>
                        {new Date(job.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3 text-xs font-semibold">
                          <Link to="/dashboard/recruiter/applicants" title="View applicants" style={{ color: "var(--color-secondary)" }}>
                            <FiEye size={15} />
                          </Link>
                          <Link to={`/dashboard/recruiter/jobs/${job.id}/edit`} title="Edit" style={{ color: "var(--color-primary)" }}>
                            <FiEdit2 size={15} />
                          </Link>
                          {job.status === "active" && (
                            <button title="Close" onClick={() => setJobStatus(job.id, "closed")} style={{ color: "var(--status-pending-text)" }}>
                              <FiXCircle size={15} />
                            </button>
                          )}
                          {job.status === "expired" && (
                            <button title="Renew" onClick={() => setJobStatus(job.id, "active")} style={{ color: "var(--status-active-text)" }}>
                              <FiRotateCw size={15} />
                            </button>
                          )}
                          <button title="Delete" onClick={() => setToDelete(job)} style={{ color: "var(--status-rejected-text)" }}>
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DataStateGate>
      </Card>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this job post?"
        description={`"${toDelete?.title}" and its applicant history will be permanently removed.`}
        confirmLabel="Delete"
        danger
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
