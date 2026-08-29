// src/components/jobs/QuickFilterPills.jsx
import { JOB_QUICK_FILTERS } from "../../data/jobQuickFilters";

/**
 * Row of rounded pill buttons for quick filtering.
 */
const QuickFilterPills = ({ updateFilters, listRef }) => {
  const handleClick = (filterType, filterValue) => {
    updateFilters({ [filterType]: filterValue });
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container-app mt-6 sm:mt-8">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
        {JOB_QUICK_FILTERS.map((pill) => (
          <button
            key={pill.label}
            onClick={() => handleClick(pill.filterType, pill.filterValue)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-navy-100 hover:border-teal-500 hover:shadow-soft text-navy-700 hover:text-teal-700 font-bold text-sm rounded-full transition-all duration-200"
          >
            <pill.icon className="text-lg text-teal-700" />
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickFilterPills;
