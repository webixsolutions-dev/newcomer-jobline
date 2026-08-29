import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import ApplicationListItem from "../../components/dashboard/ApplicationListItem";
import Button from "../../components/common/Button";
import { useDashboardData } from "../../context/DashboardDataContext";

const STATUS_OPTIONS = ["All", "Applied", "In Review", "Interview", "Offer", "Not Selected"];
const SORT_OPTIONS = ["Newest", "Oldest"];

const MyApplicationsPage = () => {
  const { applications, withdrawApplication } = useDashboardData();
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filtered = useMemo(() => {
    let list = [...applications];
    if (statusFilter !== "All") {
      list = list.filter((a) => a.status === statusFilter);
    }
    list.sort((a, b) => {
      const da = new Date(a.dateApplied);
      const db = new Date(b.dateApplied);
      return sortBy === "Newest" ? db - da : da - db;
    });
    return list;
  }, [applications, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="My Applications"
        subtitle="Track the status of every job you've applied to."
      />

      {applications.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm font-semibold text-navy-700">
            Status
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-100"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-navy-700">
            Sort
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-navy-200 bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold-500 focus:ring-4 focus:ring-gold-100"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-bold text-navy-900">No applications yet</p>
          <p className="mt-2 text-sm text-navy-500">
            When you apply to jobs, they'll appear here so you can track your progress.
          </p>
          <div className="mt-6">
            <Button as={Link} to="/dashboard/find-jobs">
              Browse Jobs
            </Button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center text-sm text-navy-500">
          No applications match the selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <ApplicationListItem
              key={app.id}
              application={app}
              onWithdraw={withdrawApplication}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
