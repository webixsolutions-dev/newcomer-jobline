// src/components/jobs/JobResultsHeader.jsx
/**
 * Header for the job results section.
 */
const JobResultsHeader = ({ totalJobs, sortBy, setSortBy }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-extrabold text-navy-900 font-heading mb-1">
          Latest Jobs for Newcomers
        </h2>
        <p className="text-sm text-navy-500">
          Showing {totalJobs} newcomer-friendly jobs across Canada
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm shrink-0">
        <span className="text-navy-500">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-none bg-transparent font-bold text-navy-900 focus:outline-none cursor-pointer"
        >
          <option value="Most Recent">Most Recent</option>
          <option value="Oldest">Oldest</option>
          <option value="Salary (High to Low)">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default JobResultsHeader;
