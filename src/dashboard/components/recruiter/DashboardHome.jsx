import { FiBriefcase, FiUsers, FiClock, FiBell } from "react-icons/fi";
import { Link, useOutletContext } from "react-router-dom";
import { Card } from "../ui/Primitives";
import StatCard from "../ui/StatCard";
import Badge from "../ui/Badge";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";
import { mockJobs } from "../../mock/jobs";
import { mockApplicants } from "../../mock/applications";
import { mockRecruiterNotifications } from "../../mock/notifications";

export default function RecruiterDashboardHome() {
  const { company } = useOutletContext();
  const { status, data, error, retry } = useAsync(
    () => ({ jobs: mockJobs, applicants: mockApplicants, notifications: mockRecruiterNotifications }),
    { deps: [] }
  );

  return (
    <DataStateGate status={status} error={error} retry={retry}>
      {data && <HomeContent company={company} {...data} />}
    </DataStateGate>
  );
}

function HomeContent({ company, jobs, applicants, notifications }) {
  const active = jobs.filter((j) => j.status === "active").length;
  const pendingReview = jobs.filter((j) => j.status === "pending_review").length;
  const unread = notifications.filter((n) => !n.read_at).length;

  const badgeVariant = {
    verified: "active",
    pending: "pending",
    rejected: "rejected",
  }[company.verification_status];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
            Welcome back, {company.name}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Here's how your hiring is going.</p>
        </div>
        <Badge status={company.verification_status === "verified" ? "verified" : company.verification_status === "pending" ? "pending" : "rejected"} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiBriefcase} label="Active jobs" value={active} />
        <StatCard icon={FiUsers} label="Total applicants" value={applicants.length} tone="accent" />
        <StatCard icon={FiClock} label="Pending review" value={pendingReview} />
        <StatCard icon={FiBell} label="Unread notifications" value={unread} />
      </div>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Recent applicants</h2>
          <Link to="/dashboard/recruiter/applicants" className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
            View all
          </Link>
        </div>
        {applicants.length === 0 ? (
          <EmptyState title="No applicants yet" description="Applicants across all your jobs will show up here." />
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {applicants.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{a.applicant_name}</p>
                  <p className="truncate text-xs" style={{ color: "var(--color-text-muted)" }}>Applied to {a.job_title}</p>
                </div>
                <Badge status={a.status} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
