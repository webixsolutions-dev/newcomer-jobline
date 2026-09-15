// src/components/jobs/JobsHero.jsx
import { motion } from "framer-motion";

/**
 * Hero section for Browse Jobs page.
 * Uses full-width background layout to display the complete Toronto skyline
 * and all four professionals on the right.
 */
const JobsHero = () => {
  return (
    <section className="hero-page-section bg-gold-50">
      {/* ── Background Hero Image (Desktop only) ── */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <img
          src="/browsejob/hero.webp"
          alt="4 professionals standing in front of Toronto skyline"
          className="w-full h-full object-cover object-right"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* ── Foreground Content ── */}
      <div className="container-app w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-page-content"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              Browse
              <br />
              Newcomer Jobs
              <br />
              <span className="text-teal-700">in Canada</span>
            </h1>
            
            <div className="w-12 h-1 bg-gold-500 rounded-full mt-4 mb-6" />
            
            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-md">
              Find newcomer-friendly jobs across Canada.
              <br className="hidden sm:block" />
              Connect with inclusive employers and discover
              <br className="hidden sm:block" />
              career opportunities that help you build
              <br className="hidden sm:block" />
              a successful future.
            </p>
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
                src="/browsejob/hero.webp"
                alt="4 professionals standing in front of Toronto skyline"
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

export default JobsHero;

