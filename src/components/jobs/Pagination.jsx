// src/components/jobs/Pagination.jsx
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

/**
 * Numbered pagination with prev/next arrows.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:bg-navy-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronLeft className="text-lg" />
      </button>

      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-navy-400">
              ...
            </span>
          );
        }
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
              currentPage === page
                ? "bg-navy-900 text-white"
                : "border border-navy-200 text-navy-700 hover:bg-navy-50"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-navy-200 text-navy-500 hover:bg-navy-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <HiChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
