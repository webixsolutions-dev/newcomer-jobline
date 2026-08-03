import { motion } from "framer-motion"
import { Search, MapPin, Grid3x3 } from "lucide-react"
import Button from "../common/Button"

/**
 * Reusable job search bar. Controlled via props so it can live in Hero or Browse Jobs page.
 */
const SearchBar = ({
  keyword,
  setKeyword,
  location,
  setLocation,
  category,
  setCategory,
  onSearch,
  light = false,
}) => {
  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault()
        onSearch?.()
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`w-full rounded-2xl p-4 sm:p-5 ${
        light ? "bg-white shadow-2xl" : "bg-white shadow-2xl border border-navy-100"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-semibold text-navy-700">Keyword</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 px-3 py-2.5">
            <Search className="w-5 h-5 text-navy-400 shrink-0" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              type="text"
              placeholder="Job title, skills, or company"
              className="w-full bg-transparent text-sm sm:text-base text-navy-900 placeholder:text-navy-400 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-semibold text-navy-700">Location</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 px-3 py-2.5">
            <MapPin className="w-5 h-5 text-navy-400 shrink-0" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="City, province, or remote"
              className="w-full bg-transparent text-sm sm:text-base text-navy-900 placeholder:text-navy-400 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-semibold text-navy-700">Category</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 px-3 py-2.5">
            <Grid3x3 className="w-5 h-5 text-navy-400 shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base text-navy-900 outline-none appearance-none"
            >
              <option value="">All categories</option>
              <option value="warehouse">Warehouse & Logistics</option>
              <option value="hospitality">Hospitality & Food Service</option>
              <option value="customer-service">Customer Service</option>
              <option value="trades">Skilled Trades</option>
              <option value="healthcare">Healthcare Support</option>
              <option value="admin">Administration</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="dark" size="md" icon={Search} className="w-full bg-amber-400 text-white sm:w-auto shrink-0">
          Search Jobs
        </Button>
      </div>
    </motion.form>
  )
}

export default SearchBar