// src/components/employers/EmployersHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiOutlinePhone } from "react-icons/hi2";

const EmployersHero = () => {
  return (
    <section className="relative bg-gold-50 overflow-hidden pt-20 pb-16 w-full min-h-[520px] flex items-center">
      {/* ── Background Hero Image (Desktop only) ── */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <img
          src="/employers/hero.webp"
          alt="Diverse professionals collaborating"
          className="w-full h-full object-cover object-right"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* ── Foreground Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center gap-6 py-16 lg:py-20 col-span-1 lg:col-span-5 pr-4 lg:pr-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              Hire Newcomer Talent Across Canada
            </h1>

            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-lg">
              Connect with skilled newcomers, build inclusive teams, and grow your
              business with a simple hiring platform designed for Canadian
              employers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                to="/post-job"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiBriefcase className="text-xl" />
                Post a Job
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-teal-700 border-2 border-teal-700 hover:bg-teal-700 hover:text-white font-bold rounded-full transition-all duration-200 text-sm sm:text-base"
              >
                <HiOutlinePhone className="text-xl" />
                Contact Sales
              </Link>
            </div>
          </motion.div>

          {/* Right column spacer on desktop */}
          <div className="hidden lg:block lg:col-span-7" />
        </div>
      </div>
    </section>
  );
};

export default EmployersHero;

