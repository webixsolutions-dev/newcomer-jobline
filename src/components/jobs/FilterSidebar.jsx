// src/components/jobs/FilterSidebar.jsx
import { useState, useEffect } from "react";
import {
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiChevronUp,
  HiChevronDown,
} from "react-icons/hi2";
import { FaLayerGroup } from "react-icons/fa6";
import { HiOutlineBriefcase, HiOutlineCurrencyDollar, HiOutlineHome } from "react-icons/hi2";
import { usePublicDataset } from "../../hooks/usePublicDataset";

const EMP_TYPES = ["Full-Time", "Part-Time", "Contract", "Temporary", "Internship"];
const WORK_STYLES = ["Remote", "Hybrid", "On-site"];

const FilterGroup = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-5 border-b border-navy-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className="text-navy-400 text-lg" />
          <span className="font-bold text-navy-900 text-sm">{title}</span>
        </div>
        {isOpen ? (
          <HiChevronUp className="text-navy-400 text-lg" />
        ) : (
          <HiChevronDown className="text-navy-400 text-lg" />
        )}
      </button>
      {isOpen && <div className="mt-4 flex flex-col gap-3">{children}</div>}
    </div>
  );
};

/**
 * Left sidebar for refining search results.
 */
const FilterSidebar = ({ filters, updateFilters, clearFilters }) => {
  const { dataset } = usePublicDataset();
  const categories = dataset?.categories || [];
  const [localFilters, setLocalFilters] = useState(filters);

  // Keep local state somewhat in sync if hero search updates filters
  useEffect(() => {
    setLocalFilters((prev) => ({ ...prev, ...filters }));
  }, [filters]);

  const handleCheckboxChange = (field, value) => {
    setLocalFilters((prev) => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleUpdate = () => {
    updateFilters(localFilters);
  };

  const isAllTypes =
    !localFilters.employmentTypesList || localFilters.employmentTypesList.length === 0;

  return (
    <div className="bg-white lg:bg-transparent lg:pr-6">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="font-bold text-navy-900 font-heading text-lg">
          Refine Your Search
        </h3>
        <button
          onClick={() => {
            clearFilters();
            setLocalFilters({
              keyword: "",
              location: "",
              category: "All categories",
              employmentType: "All types",
              employmentTypesList: [],
              salaryMin: "",
              salaryMax: "",
              workStyles: [],
            });
          }}
          className="text-teal-700 text-sm font-bold hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="bg-white rounded-2xl lg:border-none border border-navy-100 lg:p-0 p-5">
        {/* Location */}
        <FilterGroup title="Location" icon={HiOutlineMapPin}>
          <div className="relative mb-2">
            <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 text-lg" />
            <input
              type="text"
              placeholder="City, province, or remote"
              value={localFilters.location || ""}
              onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-navy-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-sm"
            />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={localFilters.workStyles?.includes("Remote") || false}
              onChange={() => handleCheckboxChange("workStyles", "Remote")}
              className="w-4 h-4 rounded border-navy-300 text-teal-700 focus:ring-teal-500"
            />
            <span className="text-sm text-navy-700">Remote (anywhere in Canada)</span>
          </label>
        </FilterGroup>

        {/* Job Category */}
        <FilterGroup title="Job Category" icon={FaLayerGroup}>
          <select
            value={localFilters.category || "All categories"}
            onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-navy-200 focus:border-teal-500 outline-none text-sm bg-white"
          >
            <option value="All categories">All categories</option>
            {categories.map((cat) => <option key={cat.id || cat.slug} value={cat.name}>{cat.name}</option>)}
          </select>
        </FilterGroup>

        {/* Employment Type */}
        <FilterGroup title="Employment Type" icon={HiOutlineBriefcase}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isAllTypes}
              onChange={() => setLocalFilters({ ...localFilters, employmentTypesList: [] })}
              className="w-4 h-4 rounded border-navy-300 text-teal-700 focus:ring-teal-500"
            />
            <span className="text-sm text-navy-900 font-medium">All types</span>
          </label>
          {EMP_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.employmentTypesList?.includes(type) || false}
                onChange={() => handleCheckboxChange("employmentTypesList", type)}
                className="w-4 h-4 rounded border-navy-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-sm text-navy-700">{type}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Salary Range */}
        <FilterGroup title="Salary Range" icon={HiOutlineCurrencyDollar}>
          <div className="flex items-center gap-2">
            <select
              value={localFilters.salaryMin || ""}
              onChange={(e) => setLocalFilters({ ...localFilters, salaryMin: e.target.value })}
              className="w-1/2 px-2 py-2 rounded-lg border border-navy-200 focus:border-teal-500 outline-none text-sm bg-white"
            >
              <option value="">Min salary</option>
              <option value="30000">$30k</option>
              <option value="50000">$50k</option>
              <option value="70000">$70k</option>
              <option value="90000">$90k</option>
            </select>
            <span className="text-navy-300">-</span>
            <select
              value={localFilters.salaryMax || ""}
              onChange={(e) => setLocalFilters({ ...localFilters, salaryMax: e.target.value })}
              className="w-1/2 px-2 py-2 rounded-lg border border-navy-200 focus:border-teal-500 outline-none text-sm bg-white"
            >
              <option value="">Max salary</option>
              <option value="40000">$40k</option>
              <option value="60000">$60k</option>
              <option value="80000">$80k</option>
              <option value="120000">$120k+</option>
            </select>
          </div>
        </FilterGroup>

        {/* Work Style */}
        <FilterGroup title="Work Style" icon={HiOutlineHome}>
          {WORK_STYLES.map((style) => (
            <label key={style} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.workStyles?.includes(style) || false}
                onChange={() => handleCheckboxChange("workStyles", style)}
                className="w-4 h-4 rounded border-navy-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-sm text-navy-700">{style}</span>
            </label>
          ))}
        </FilterGroup>

        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={handleUpdate}
            className="w-full flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <HiOutlineMagnifyingGlass className="text-lg" />
            Update Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
