import { FiFileText, FiBookmark, FiBell, FiArrowRight } from "react-icons/fi";
import { Card, Button } from "../ui/Primitives";
import StatCard from "../ui/StatCard";
import Badge from "../ui/Badge";
import { useAsync } from "../../hooks/useAsync";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { mockSeekerProfile, profileCompleteness } from "../../mock/profile";
import { mockMyApplications } from "../../mock/applications";
import { mockSavedJobs } from "../../mock/savedJobs";
import { mockSeekerNotifications } from "../../mock/notifications";
import { mockJobs } from "../../mock/jobs";
import { Link } from "react-router-dom";

export default function SeekerDashboardHome() {
  const { status, data, error, retry } = useAsync(
    () => ({
      profile: mockSeekerProfile,
      applications: mockMyApplications,
      saved: mockSavedJobs,
      notifications: mockSeekerNotifications,
      recommended: mockJobs.filter((j) => j.status === "active"),
    }),
    { deps: [] }
  );

  return (
    <div className="space-y-6">
      <DataStateGate status={status} error={error} retry={retry}>
        {data && <HomeContent {...data} />}
      </DataStateGate>
    </div>
  );
}

function HomeContent({ profile, applications, saved, notifications, recommended }) {
  const completeness = profileCompleteness(profile);
  const unread = notifications.filter((n) => !n.read_at).length;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
            Welcome back, {profile.full_name.split(" ")[0]}
          </h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Here's what's happening with your job search.
          </p>
        </div>
        {completeness < 100 && (
          <Card className="flex items-center gap-3 px-4 py-3">
            <div className="h-2 w-24 overflow-hidden rounded-full" style={{ background: "var(--color-border)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${completeness}%`, background: "var(--color-accent)" }}
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold" style={{ color: "var(--color-primary)" }}>
                Profile {completeness}% complete
              </p>
              <Link to="/dashboard/seeker/profile" className="text-xs font-medium" style={{ color: "var(--color-secondary)" }}>
                Add your skills to improve matches →
              </Link>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={FiFileText} label="Applications" value={applications.length} />
        <StatCard icon={FiBookmark} label="Saved jobs" value={saved.length} tone="accent" />
        <StatCard icon={FiBell} label="Unread notifications" value={unread} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Recent applications</h2>
            <Link to="/dashboard/seeker/applications" className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
              View all
            </Link>
          </div>
          {applications.length === 0 ? (
            <EmptyState title="No applications yet" description="Jobs you apply to will show up here." />
          ) : (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {applications.slice(0, 5).map((app) => (
                <li key={app.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                      {app.job_title}
                    </p>
                    <p className="truncate text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {app.company_name}
                    </p>
                  </div>
                  <Badge status={app.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Recommended jobs</h2>
            <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>Active now</span>
          </div>
          {recommended.length === 0 ? (
            <EmptyState title="Nothing to show yet" description="Check back soon for new listings." />
          ) : (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {recommended.slice(0, 5).map((job) => (
                <li key={job.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                      {job.title}
                    </p>
                    <p className="truncate text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {job.company_name} · {job.is_remote ? "Remote" : job.location_city}
                    </p>
                  </div>
                  <FiArrowRight style={{ color: "var(--color-text-muted)" }} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
