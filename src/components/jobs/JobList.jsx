// src/components/jobs/JobList.jsx
import JobCard from "./JobCard";
import Pagination from "./Pagination";

/**
 * Maps the current page of jobs to JobCards and handles empty states.
 * Pass dashboardMode + handlers to enable apply/save-aware cards.
 */
const JobList = ({
  jobs,
  currentPage,
  totalPages,
  onPageChange,
  dashboardMode = false,
  getJobProps,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-navy-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-navy-400">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-navy-900 font-heading mb-2">
            No jobs found
          </h3>
          <p className="text-navy-500 max-w-sm">
            We couldn't find any jobs matching your current filters. Try adjusting
            your search criteria or clearing filters to see more results.
          </p>
        </div>
      ) : (
        <>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              dashboardMode={dashboardMode}
              {...(getJobProps ? getJobProps(job) : {})}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default JobList;
