import { motion } from "framer-motion"
import { HiOutlineShieldCheck } from "react-icons/hi2"
import { employerBenefits } from "../../data/content"

const WhyPostSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 rounded-2xl bg-navy-900 p-6 sm:p-8 text-white h-fit lg:sticky lg:top-28"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-navy-900 text-xl">
          <HiOutlineShieldCheck />
        </div>
        <h3 className="text-lg font-bold">Why Post With Us?</h3>
      </div>
      <div className="flex flex-col gap-5">
        {employerBenefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-gold-400">
              <b.icon />
            </div>
            <div>
              <p className="font-semibold text-sm">{b.title}</p>
              <p className="text-xs text-navy-300 mt-1 leading-relaxed">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
        <p className="text-2xl font-extrabold text-gold-400">100% Free</p>
        <p className="text-xs text-navy-300 mt-1">for your first job posting</p>
      </div>
    </motion.aside>
  )
}

export default WhyPostSidebar
