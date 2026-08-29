// src/components/contact/NextStepMiniCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiBriefcase } from "react-icons/hi2";

/**
 * Next Step Mini CTA - thin tinted band directly below FAQ.
 * Placed within the same background flow in the composition.
 */
const NextStepMiniCTA = () => {
  return (
    <section className="pb-16 sm:pb-24 bg-gold-50">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="bg-teal-50 border border-teal-100 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* Left: Icon and Text */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white mt-1 sm:mt-0">
              <HiBriefcase className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 font-heading mb-1 leading-tight">
                Ready to Take the Next Step?
              </h3>
              <p className="text-navy-500 text-sm sm:text-base">
                Browse jobs to find your next opportunity or post a job to connect with great talent.
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <Link
              to="/browse-jobs"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors text-sm shadow-sm whitespace-nowrap"
            >
              <HiOutlineMagnifyingGlass className="text-lg" />
              Browse Jobs
            </Link>
            <Link
              to="/post-job"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-navy-900 border border-navy-200 hover:border-navy-900 font-bold rounded-lg transition-colors text-sm shadow-sm whitespace-nowrap"
            >
              <HiBriefcase className="text-lg" />
              Post a Job
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NextStepMiniCTA;
