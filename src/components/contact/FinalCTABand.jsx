// src/components/contact/FinalCTABand.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import DecorativeShape from "../common/DecorativeShape";

/**
 * Closing CTA Band (Solid teal, decorative maple leaf).
 */
const FinalCTABand = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-soft bg-teal-800 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-between"
        >
          {/* Decorative shapes */}
          {/* Leaf / abstract shape right */}
          <DecorativeShape
            position="bottom-right"
            size="w-96 h-96"
            color="text-teal-900"
            className="opacity-40 translate-x-12 translate-y-12"
            path="M50,-65C62,-55,68,-38,72,-22C76,-6,78,9,73,22C68,35,56,46,42,52C28,58,14,59,0,59C-14,59,-28,58,-40,51C-52,44,-62,31,-66,16C-70,1,-68,-16,-59,-29C-50,-42,-35,-51,-20,-60C-5,-69,10,-78,25,-77C40,-76,50,-65,50,-65Z"
          />
          {/* Subtle wave bottom left */}
          <DecorativeShape
            position="bottom-left"
            size="w-72 h-72"
            color="text-teal-700"
            className="opacity-50"
            viewBox="0 0 200 200"
            path="M0,200 C50,150 150,150 200,200 Z"
          />

          {/* ── Left: Content ── */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 w-full md:w-auto flex-1">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal-900 text-gold-400">
              <FaUserGroup className="text-4xl" />
            </div>
            
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight max-w-lg">
                Let's Build Your Next Opportunity Together
              </h2>
              <p className="text-teal-50 text-base sm:text-lg leading-relaxed max-w-lg mt-2">
                Whether you're looking for your next role or hiring great talent,
                Newcomer Jobline is here to help you move forward with confidence.
              </p>
            </div>
          </div>



          {/* ── Right: Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto relative z-10 shrink-0">
            <Link
              to="/jobs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-navy-900 font-bold rounded-xl transition-all duration-200 shadow-soft text-sm sm:text-base hover:bg-navy-50"
            >
              <HiOutlineMagnifyingGlass className="text-xl -mt-0.5" />
              Browse Jobs
            </Link>
            <Link
              to="/post-job"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all duration-200 shadow-soft text-sm sm:text-base"
            >
              <HiBriefcase className="text-xl -mt-0.5" />
              Post a Job
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTABand;
