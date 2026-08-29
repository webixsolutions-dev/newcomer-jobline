import { useRef } from "react";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import JobSearchBar from "../../components/jobs/JobSearchBar";
import QuickFilterPills from "../../components/jobs/QuickFilterPills";
import FilterSidebar from "../../components/jobs/FilterSidebar";
import JobResultsHeader from "../../components/jobs/JobResultsHeader";
import JobList from "../../components/jobs/JobList";
import { useJobFilters } from "../../hooks/useJobFilters";
import { useDashboardData } from "../../context/DashboardDataContext";

/**
 * Dashboard Find Jobs — reuses Browse Jobs search/filter/pagination inside the dashboard shell.
 */
const FindJobsPage = () => {
  const {
    filters,
    updateFilters,
    clearFilters,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalJobs,
    currentJobs,
    loading,
    error,
  } = useJobFilters();

  const dashboard = useDashboardData();
  const listRef = useRef(null);

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Find Jobs"
        subtitle="Search and apply to opportunities matched to your profile."
      />

      <JobSearchBar updateFilters={updateFilters} listRef={listRef} />
      <QuickFilterPills updateFilters={updateFilters} listRef={listRef} />

      <section ref={listRef} className="scroll-mt-4">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
          <div className="w-full lg:w-1/4 lg:sticky lg:top-4">
            <FilterSidebar
              filters={filters}
              updateFilters={updateFilters}
              clearFilters={clearFilters}
            />
          </div>

          <div className="w-full lg:w-3/4">
            <JobResultsHeader
              totalJobs={totalJobs}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            {loading ? (
              <div className="py-12 text-center">
                <p className="font-medium text-navy-500">Loading jobs...</p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="font-medium text-red-500">{error}</p>
              </div>
            ) : (
              <JobList
                jobs={currentJobs}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                dashboardMode
                getJobProps={(job) => ({
                  isApplied: dashboard.isJobApplied(job.id),
                  isSaved: dashboard.isJobSaved(job.id),
                  onApply: () => dashboard.applyToJob(job),
                  onToggleSave: () => dashboard.toggleSaveJob(job),
                })}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindJobsPage;
