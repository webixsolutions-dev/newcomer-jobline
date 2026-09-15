// src/components/employers/EmployersHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiOutlinePhone } from "react-icons/hi2";

const EmployersHero = () => {
  return (
    <section className="hero-page-section bg-gold-50">
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
      <div className="container-app w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-page-content gap-6"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full aspect-[16/9] lg:hidden block col-span-1"
          >
            <div className="w-full h-full overflow-hidden rounded-2xl">
              <img
                src="/employers/hero.webp"
                alt="Diverse professionals collaborating"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmployersHero;

