// src/components/jobs/JobSearchBar.jsx
import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { FaLayerGroup } from "react-icons/fa6";
import { usePublicDataset } from "../../hooks/usePublicDataset";

const EMPLOYMENT_TYPES = [
  "All types",
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship",
];

/**
 * Extended search bar floating below the hero.
 */
const JobSearchBar = ({ updateFilters, listRef }) => {
  const { dataset } = usePublicDataset();
  const categories = dataset?.categories || [];
  const [localKeyword, setLocalKeyword] = useState("");
  const [localLocation, setLocalLocation] = useState("");
  const [localCategory, setLocalCategory] = useState("All categories");
  const [localEmpType, setLocalEmpType] = useState("All types");

  const handleSearch = () => {
    updateFilters({
      keyword: localKeyword,
      location: localLocation,
      category: localCategory,
      employmentType: localEmpType,
    });
    // Scroll to results
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative z-20 -mt-10 lg:-mt-16 mx-4 sm:mx-6 lg:mx-auto max-w-7xl">
      <div className="bg-white rounded-2xl sm:rounded-full shadow-card border border-navy-100 p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
          
          {/* Keyword */}
          <div className="flex items-center gap-3 w-full lg:w-1/4 px-4 py-3 sm:py-2">
            <HiOutlineMagnifyingGlass className="text-navy-400 text-xl shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                Keyword
              </label>
              <input
                type="text"
                placeholder="Job title, skills, or company"
                value={localKeyword}
                onChange={(e) => setLocalKeyword(e.target.value)}
                className="w-full bg-transparent text-navy-900 text-sm focus:outline-none placeholder:text-navy-400"
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 w-full lg:w-1/4 px-4 py-3 sm:py-2">
            <HiOutlineMapPin className="text-navy-400 text-xl shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                Location
              </label>
              <input
                type="text"
                placeholder="City, province, or remote"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full bg-transparent text-navy-900 text-sm focus:outline-none placeholder:text-navy-400"
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center gap-3 w-full sm:w-1/2 lg:w-1/5 px-4 py-3 sm:py-2">
            <FaLayerGroup className="text-navy-400 text-lg shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                Category
              </label>
              <select
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                className="w-full bg-transparent text-navy-900 text-sm focus:outline-none cursor-pointer appearance-none"
              >
                <option value="All categories">All categories</option>
                {categories.map((cat) => <option key={cat.id || cat.slug} value={cat.name}>{cat.name}</option>)}
              </select>
            </div>
          </div>

          {/* Employment Type */}
          <div className="flex items-center gap-3 w-full sm:w-1/2 lg:w-1/5 px-4 py-3 sm:py-2">
            <HiOutlineBriefcase className="text-navy-400 text-lg shrink-0" />
            <div className="flex flex-col w-full">
              <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                Employment Type
              </label>
              <select
                value={localEmpType}
                onChange={(e) => setLocalEmpType(e.target.value)}
                className="w-full bg-transparent text-navy-900 text-sm focus:outline-none cursor-pointer appearance-none"
              >
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button */}
          <div className="w-full lg:w-auto px-2 py-2 sm:py-0">
            <button
              onClick={handleSearch}
              className="w-full lg:w-auto flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold py-3.5 sm:py-3 px-8 rounded-xl sm:rounded-full transition-colors whitespace-nowrap"
            >
              <HiOutlineMagnifyingGlass className="text-lg" />
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
