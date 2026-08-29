import JobCard from "../jobs/JobCard";
import { useDashboardData } from "../../context/DashboardDataContext";

/**
 * Saved job row — reuses JobCard in compact dashboard mode with Remove action.
 */
const SavedJobListItem = ({ job }) => {
  const dashboard = useDashboardData();

  return (
    <JobCard
      job={job}
      compact
      dashboardMode
      isApplied={dashboard.isJobApplied(job.id)}
      isSaved
      onApply={() => dashboard.applyToJob(job)}
      onToggleSave={() => dashboard.removeSavedJob(job.id)}
      saveLabel="Remove from Saved"
    />
  );
};

export default SavedJobListItem;
