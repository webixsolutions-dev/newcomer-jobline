import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card } from "../ui/Primitives";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useSeekerDashboard } from "../../hooks/useSeekerDashboard";

export default function MyApplications() {
  const { status, data, error, retry } = useSeekerDashboard();
  const applications = data?.applications || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>My Applications</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Track every application and its current hiring stage.</p>
      </div>
      <Card>
        <DataStateGate status={status} error={error} retry={retry} empty={applications.length === 0 && status === "success" ? <EmptyState icon={FiFileText} title="You haven't applied to any jobs yet" description="Browse open roles and your applications will show up here." /> : null}>
          {applications.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead><tr className="border-b text-xs uppercase" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}><th className="px-5 py-3">Job</th><th className="px-5 py-3">Applied</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Details</th></tr></thead>
                <tbody>{applications.map((application) => (
                  <tr key={application.id} className="border-b last:border-0" style={{ borderColor: "var(--color-border)" }}>
                    <td className="px-5 py-4"><p className="font-semibold" style={{ color: "var(--color-primary)" }}>{application.jobs?.title || "Job"}</p><p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{application.jobs?.companies?.name || "Employer"}</p></td>
                    <td className="px-5 py-4" style={{ color: "var(--color-text-muted)" }}>{new Date(application.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}</td>
                    <td className="px-5 py-4"><Badge status={application.status} /></td>
                    <td className="px-5 py-4 text-right"><Link to={`/jobs/${application.job_id}`} className="text-xs font-semibold" style={{ color: "var(--color-secondary)" }}>View job</Link></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </DataStateGate>
      </Card>
    </div>
  );
}
