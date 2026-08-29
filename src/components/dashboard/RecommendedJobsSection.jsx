import JobCard from "../jobs/JobCard";
import { useDashboardData } from "../../context/DashboardDataContext";
import { mockRecommendedJobs } from "../../data/mockRecommendedJobs";

/**
 * Recommended jobs grid with apply/save wired through DashboardDataContext.
 */
const RecommendedJobsSection = ({ jobs = mockRecommendedJobs }) => {
  const dashboard = useDashboardData();

  return (
    <section>
      <div className="mb-5">
        <h2 className="font-heading text-xl font-bold text-navy-900">Recommended Jobs</h2>
        <p className="mt-1 text-sm text-navy-500">Jobs selected for you.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            compact
            dashboardMode
            isApplied={dashboard.isJobApplied(job.id)}
            isSaved={dashboard.isJobSaved(job.id)}
            onApply={() => dashboard.applyToJob(job)}
            onToggleSave={() => dashboard.toggleSaveJob(job)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedJobsSection;
