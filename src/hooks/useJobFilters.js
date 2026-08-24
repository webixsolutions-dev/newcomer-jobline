// src/hooks/useJobFilters.js
import { useState, useMemo } from "react";
import { mockJobs } from "../data/mockJobs";
import { useSearchParams } from "react-router-dom";

/**
 * Hook to manage complex search and filtering state over mock job data.
 */
export const useJobFilters = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
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
    return mockJobs.filter((job) => {
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
  }, [filters]);

  // Sorting
  const sortedJobs = useMemo(() => {
    const sorted = [...filteredJobs];
    // In a real app we'd sort by actual date fields. 
    // Here we'll just reverse them or leave them since they are mocked nicely.
    if (sortBy === "Most Recent") {
      // default mock order is roughly recent to old
      return sorted; 
    } else if (sortBy === "Oldest") {
      return sorted.reverse();
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
  };
};
