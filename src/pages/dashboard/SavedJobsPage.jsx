import { Link } from "react-router-dom";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import SavedJobListItem from "../../components/dashboard/SavedJobListItem";
import Button from "../../components/common/Button";
import { useDashboardData } from "../../context/DashboardDataContext";

const SavedJobsPage = () => {
  const { savedJobs } = useDashboardData();

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Saved Jobs"
        subtitle="Jobs you've bookmarked for later."
      />

      {savedJobs.length === 0 ? (
        <div className="rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-sm">
          <p className="text-lg font-bold text-navy-900">No saved jobs yet</p>
          <p className="mt-2 text-sm text-navy-500">
            Save jobs you're interested in and come back to apply when you're ready.
          </p>
          <div className="mt-6">
            <Button as={Link} to="/dashboard/find-jobs">
              Find Jobs
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <SavedJobListItem key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
