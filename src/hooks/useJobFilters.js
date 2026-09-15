// src/hooks/useJobFilters.js
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useServiceCareJobs } from "./useServiceCareJobs";

/**
 * Hook to manage complex search and filtering state over backend dynamic jobs data.
 */
export const useJobFilters = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const keywordFromUrl = searchParams.get("keyword") || searchParams.get("q") || "";
  const locationFromUrl = searchParams.get("location") || "";

  const [filters, setFilters] = useState({
    keyword: keywordFromUrl,
    location: locationFromUrl,
    category: categoryFromUrl || "All categories",
    employmentType: "All types",
    employmentTypesList: [], // For the sidebar checkboxes
    salaryMin: "",
    salaryMax: "",
    workStyles: [], // For the sidebar checkboxes
  });

  const [sortBy, setSortBy] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // FETCH JOBS FROM BACKEND DYNAMICALLY
  const { jobs, loading, error } = useServiceCareJobs({ limit: 100 });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const clearFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      category: "All categories",
      employmentType: "All types",
      employmentTypesList: [],
      salaryMin: "",
      salaryMax: "",
      workStyles: [],
    });
    setCurrentPage(1);
  };

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword search
      if (filters.keyword) {
        const query = filters.keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesDesc) return false;
      }

      // 2. Location
      if (filters.location) {
        const locQuery = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(locQuery)) return false;
      }

      // 3. Category
      if (filters.category && filters.category !== "All categories") {
        if (job.category !== filters.category) return false;
      }

      // 4. Employment Type (from dropdown/hero)
      if (filters.employmentType && filters.employmentType !== "All types") {
        if (job.employmentType !== filters.employmentType) return false;
      }

      // 5. Employment Type (from sidebar checkboxes)
      if (filters.employmentTypesList && filters.employmentTypesList.length > 0) {
        if (!filters.employmentTypesList.includes(job.employmentType)) return false;
      }

      // 6. Work Styles
      if (filters.workStyles && filters.workStyles.length > 0) {
        if (!filters.workStyles.includes(job.workStyle)) return false;
      }

      // 7. Salary range
      if (filters.salaryMin) {
        if (job.salaryMax < Number(filters.salaryMin)) return false;
      }
      if (filters.salaryMax) {
        if (job.salaryMin > Number(filters.salaryMax)) return false;
      }

      return true;
    });
  }, [jobs, filters]);

  // Sorting
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs];
    if (sortBy === "Most Recent") {
      return sorted.sort((a, b) => {
        const dateA = new Date(a.raw?.published_at || a.raw?.created_at || 0);
        const dateB = new Date(b.raw?.published_at || b.raw?.created_at || 0);
        return dateB - dateA;
      });
    } else if (sortBy === "Oldest") {
      return sorted.sort((a, b) => {
        const dateA = new Date(a.raw?.published_at || a.raw?.created_at || 0);
        const dateB = new Date(b.raw?.published_at || b.raw?.created_at || 0);
        return dateA - dateB;
      });
    } else if (sortBy === "Salary (High to Low)") {
      return sorted.sort((a, b) => b.salaryMax - a.salaryMax);
    }
    return sorted;
  }, [filteredJobs, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / itemsPerPage));
  const currentJobs = sortedJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    filters,
    updateFilters,
    clearFilters,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    totalJobs: sortedJobs.length,
    currentJobs,
    loading,
    error,
  };
};
