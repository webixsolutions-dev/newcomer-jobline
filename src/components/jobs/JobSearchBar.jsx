// src/components/jobs/JobSearchBar.jsx
import { useState } from "react";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin, HiOutlineBriefcase } from "react-icons/hi2";
import { FaLayerGroup } from "react-icons/fa6";
import { usePublicDataset } from "../../hooks/usePublicDataset";
import {
  HERO_JOB_SEARCH_BUTTON,
  HERO_JOB_SEARCH_BUTTON_WRAP,
  HERO_JOB_SEARCH_FIELD,
  HERO_JOB_SEARCH_FIELD_NARROW,
  HERO_JOB_SEARCH_SHELL,
} from "./heroJobSearchClasses";

const JOB_CATEGORIES = [
  "All categories",
  "Office & Administration",
  "Customer Service",
  "Technology & IT",
  "Skilled Trades",
  "Healthcare Support",
  "Hospitality",
];

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
  const categories = dataset?.categories?.length
    ? dataset.categories
    : JOB_CATEGORIES.filter((name) => name !== "All categories").map((name) => ({ name }));
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
    <div className="relative z-20 w-full -mt-6 sm:-mt-10 pb-2">
      <div className="container-app">
        <div className={HERO_JOB_SEARCH_SHELL}>
        <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
          
          {/* Keyword */}
          <div className={HERO_JOB_SEARCH_FIELD}>
            <HiOutlineMagnifyingGlass className="text-navy-400 text-xl shrink-0" />
            <div className="flex flex-col w-full min-w-0">
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
          <div className={HERO_JOB_SEARCH_FIELD}>
            <HiOutlineMapPin className="text-navy-400 text-xl shrink-0" />
            <div className="flex flex-col w-full min-w-0">
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
          <div className={HERO_JOB_SEARCH_FIELD_NARROW}>
            <FaLayerGroup className="text-navy-400 text-lg shrink-0" />
            <div className="flex flex-col w-full min-w-0">
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
          <div className={HERO_JOB_SEARCH_FIELD_NARROW}>
            <HiOutlineBriefcase className="text-navy-400 text-lg shrink-0" />
            <div className="flex flex-col w-full min-w-0">
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
          <div className={HERO_JOB_SEARCH_BUTTON_WRAP}>
            <button
              type="button"
              onClick={handleSearch}
              className={HERO_JOB_SEARCH_BUTTON}
            >
              <HiOutlineMagnifyingGlass className="text-lg" />
              Search Jobs
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
