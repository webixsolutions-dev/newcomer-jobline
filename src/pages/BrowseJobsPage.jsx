// src/pages/BrowseJobsPage.jsx
import { useRef } from "react";
import JobsHero from "../components/jobs/JobsHero";
import JobSearchBar from "../components/jobs/JobSearchBar";
import QuickFilterPills from "../components/jobs/QuickFilterPills";
import JobsFeatureHighlights from "../components/jobs/JobsFeatureHighlights";
import FilterSidebar from "../components/jobs/FilterSidebar";
import JobResultsHeader from "../components/jobs/JobResultsHeader";
import JobList from "../components/jobs/JobList";
import JobsCategoriesGrid from "../components/jobs/JobsCategoriesGrid";
import JobsHowItWorks from "../components/jobs/JobsHowItWorks";
import JobsCareerResources from "../components/jobs/JobsCareerResources";
import SuccessStoriesCarousel from "../components/jobs/SuccessStoriesCarousel";
import HireTalentMiniCTA from "../components/jobs/HireTalentMiniCTA";
import JobsFAQSection from "../components/jobs/JobsFAQSection";
import { useJobFilters } from "../hooks/useJobFilters";

/**
 * Module 5: Browse Jobs Page (/jobs)
 */
const BrowseJobsPage = () => {
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

  const listRef = useRef(null);

  return (
    <>
      <JobsHero />
      <JobSearchBar updateFilters={updateFilters} listRef={listRef} />
      <QuickFilterPills updateFilters={updateFilters} listRef={listRef} />
      <JobsFeatureHighlights />
      
      {/* ── Main Results Section ── */}
      <section className="py-8 sm:py-12 bg-navy-50/30 scroll-mt-20" ref={listRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Sidebar */}
            <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
              <FilterSidebar
                filters={filters}
                updateFilters={updateFilters}
                clearFilters={clearFilters}
              />
            </div>
            
            {/* Right Results */}
            <div className="w-full lg:w-3/4 flex flex-col">
              <JobResultsHeader
                totalJobs={totalJobs}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-navy-500 font-medium">Loading jobs...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 font-medium">{error}</p>
                </div>
              ) : (
                <JobList
                  jobs={currentJobs}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>

          </div>
        </div>
      </section>

      <JobsCategoriesGrid />
      <JobsHowItWorks />
      <JobsCareerResources />
      <SuccessStoriesCarousel />
      <HireTalentMiniCTA />
      <JobsFAQSection />
    </>
  );
};

export default BrowseJobsPage;
