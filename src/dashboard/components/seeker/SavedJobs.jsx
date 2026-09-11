import { FiBookmark, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card, Button } from "../ui/Primitives";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useSeekerDashboard } from "../../hooks/useSeekerDashboard";
import { useSavedJobs } from "../../../lib/SavedJobsContext";

export default function SavedJobs() {
  const { status, data, error, retry } = useSeekerDashboard();
  const { toggleSaved } = useSavedJobs();
  const list = data?.savedJobs || [];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Saved Jobs</h1><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Jobs you bookmarked to review later.</p></div>
      <DataStateGate status={status} error={error} retry={retry} empty={list.length === 0 && status === "success" ? <Card><EmptyState icon={FiBookmark} title="No saved jobs yet" description="Use the bookmark icon on any job listing to save it here." /></Card> : null}>
        {list.length > 0 && <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{list.map((saved) => {
          const job = saved.jobs;
          if (!job) return null;
          const location = job.is_remote ? "Remote" : [job.city, job.province].filter(Boolean).join(", ");
          return <Card key={saved.job_id} className="p-5"><p className="font-semibold" style={{ color: "var(--color-primary)" }}>{job.title}</p><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{job.companies?.name || "Employer"}</p><p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>{location || "Canada"}</p><div className="mt-4 flex gap-2"><Link className="flex-1" to={`/jobs/${job.id}`}><Button variant="outline" className="w-full"><FiEye size={14} /> View</Button></Link><Button variant="ghost" onClick={async () => { await toggleSaved(job.id); retry(); }} aria-label="Remove saved job"><FiTrash2 size={14} /> Remove</Button></div></Card>;
        })}</div>}
      </DataStateGate>
    </div>
  );
}
