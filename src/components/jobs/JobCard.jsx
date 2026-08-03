import { motion } from "framer-motion"
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineBanknotes,
  HiOutlineBuildingOffice2,
  HiArrowRight,
  HiOutlineBookmark,
} from "react-icons/hi2"
import Badge from "../common/Badge"
import Button from "../common/Button"
import {Link} from "react-router-dom"
const JobCard = ({ job, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card transition-shadow hover:shadow-soft"
    >
      {job.featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-900 shadow-soft">
          Featured
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700 text-xl">
            <HiOutlineBuildingOffice2 />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-900 group-hover:text-teal-700 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-navy-500">{job.company}</p>
          </div>
        </div>
        <button
          aria-label="Save job"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-100 text-navy-400 hover:border-gold-400 hover:text-gold-500 transition-colors"
        >
          <HiOutlineBookmark />
        </button>
      </div>

      <p className="text-sm text-navy-500 leading-relaxed line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-navy-500">
        <span className="flex items-center gap-1.5">
          <HiOutlineMapPin className="text-navy-400" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineClock className="text-navy-400" /> {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineBanknotes className="text-navy-400" /> {job.salary}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.tags?.map((tag) => (
          <Badge key={tag} tone="teal">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-navy-100 pt-4">
        <span className="text-xs font-medium text-navy-400">Posted {job.posted}</span>
        <Button size="sm" variant="secondary" icon={HiArrowRight}  >
          <Link to="/apply-now">

            Apply Now
          </Link>

        </Button>
      </div>
    </motion.article>
  )
}

export default JobCard
