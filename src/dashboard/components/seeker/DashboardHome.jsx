import { FiFileText, FiBookmark, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Card } from "../ui/Primitives";
import StatCard from "../ui/StatCard";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useSeekerDashboard } from "../../hooks/useSeekerDashboard";

export default function SeekerDashboardHome() {
  const { status, data, error, retry } = useSeekerDashboard({ recommendations: true });
  return (
    <div className="space-y-6">
      <DataStateGate status={status} error={error} retry={retry}>
        {data && <HomeContent data={data} />}
      </DataStateGate>
    </div>
  );
}

function HomeContent({ data }) {
  const profile = data.profile || {};
  const applications = data.applications || [];
  const recommended = data.recommended || [];
  const firstName = profile.full_name?.split(" ")[0] || "there";

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Welcome back, {firstName}</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Here is your live activity from Newcomer Jobline.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={FiFileText} label="Applications" value={data.metrics?.applications || 0} />
        <StatCard icon={FiBookmark} label="Saved jobs" value={data.metrics?.savedJobs || 0} tone="accent" />
        <StatCard icon={FiBriefcase} label="Interviews" value={data.metrics?.interviews || 0} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Recent applications</h2>
            <Link to="/dashboard/seeker/applications" className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>View all</Link>
          </div>
          {applications.length === 0 ? <EmptyState title="No applications yet" description="Jobs you apply to will show up here." /> : (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {applications.slice(0, 5).map((application) => (
                <li key={application.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{application.jobs?.title || "Job"}</p>
                    <p className="truncate text-xs" style={{ color: "var(--color-text-muted)" }}>{application.jobs?.companies?.name || "Employer"}</p>
                  </div>
                  <Badge status={application.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Recommended jobs</h2>
            <Link to="/jobs" className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>Browse all</Link>
          </div>
          {recommended.length === 0 ? <EmptyState title="Nothing to show yet" description="Complete your profile or check back for new listings." /> : (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {recommended.map((job) => (
                <li key={job.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{job.title}</p>
                    <p className="truncate text-xs" style={{ color: "var(--color-text-muted)" }}>{job.company} · {job.location}</p>
                  </div>
                  <Link to={`/jobs/${job.id}`} aria-label={`View ${job.title}`}><FiArrowRight style={{ color: "var(--color-text-muted)" }} /></Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
