import { motion } from "framer-motion"
import { HiOutlineMapPin } from "react-icons/hi2"

const MapPlaceholder = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative h-64 sm:h-72 w-full overflow-hidden rounded-2xl border border-navy-100 shadow-card bg-navy-50"
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 400 300">
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 30} x2="400" y2={i * 30} stroke="#7f9abd" strokeWidth="1" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="300" stroke="#7f9abd" strokeWidth="1" />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-2xl text-navy-900 shadow-soft">
            <HiOutlineMapPin />
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-700 shadow-card">
            123 Main Street, Toronto
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MapPlaceholder
