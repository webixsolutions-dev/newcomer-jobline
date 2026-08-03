import { motion } from "framer-motion"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import { categories, jobTypes, experienceLevels } from "../../data/jobs"

/**
 * Reusable filter sidebar for Browse Jobs page.
 */
const FilterGroup = ({ title, options, selected, onChange }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-sm font-bold text-navy-900">{title}</h4>
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2.5 cursor-pointer text-sm text-navy-500 hover:text-navy-900 transition-colors"
        >
          <input
            type="radio"
            name={title}
            checked={selected === option}
            onChange={() => onChange(option)}
            className="h-4 w-4 accent-gold-500"
          />
          {option}
        </label>
      ))}
    </div>
  </div>
)

const FilterSidebar = ({ filters, setFilters }) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-card h-fit lg:sticky lg:top-28"
    >
      <div className="flex items-center gap-2 border-b border-navy-100 pb-4">
        <HiOutlineAdjustmentsHorizontal className="text-xl text-gold-500" />
        <h3 className="text-base font-bold text-navy-900">Filter Jobs</h3>
      </div>

      <FilterGroup
        title="Category"
        options={categories}
        selected={filters.category}
        onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
      />
      <FilterGroup
        title="Job Type"
        options={jobTypes}
        selected={filters.type}
        onChange={(v) => setFilters((f) => ({ ...f, type: v }))}
      />
      <FilterGroup
        title="Experience"
        options={experienceLevels}
        selected={filters.experience}
        onChange={(v) => setFilters((f) => ({ ...f, experience: v }))}
      />

      <button
        onClick={() =>
          setFilters({ category: categories[0], type: jobTypes[0], experience: experienceLevels[0] })
        }
        className="text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors text-left"
      >
        Reset all filters
      </button>
    </motion.aside>
  )
}

export default FilterSidebar
