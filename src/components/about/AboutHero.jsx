// src/components/about/AboutHero.jsx
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlinePhone } from "react-icons/hi2";
import { motion } from "framer-motion";
import { ABOUT_MISSION_CARDS } from "../../data/aboutMissionCards";

/**
 * About Hero matching the site-wide hero layout (same as Home, Browse Jobs, Employers, Contact).
 * Includes Mission, Vision, Impact cards row underneath.
 */
const AboutHero = () => {
  const buttons = (
    <>
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors text-sm shadow-sm"
      >
        <HiOutlineMagnifyingGlass className="text-lg" />
        Browse Jobs
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500 hover:bg-orange-50 text-orange-500 font-bold rounded-xl transition-colors text-sm shadow-sm"
      >
        <HiOutlinePhone className="text-lg" />
        Contact Us
      </Link>
    </>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-20 pb-16 w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] items-stretch gap-12">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-center gap-6 py-16 lg:py-20 hero-left-pad"
            >
              <span className="text-teal-700 font-bold uppercase tracking-wider text-xs sm:text-sm relative pb-1.5 w-fit">
                ABOUT US
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-teal-700"></span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-navy-900 font-heading">
                About <span className="text-teal-700">Newcomer Jobline</span>
              </h1>
              <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-lg">
                Newcomer Jobline connects talented newcomers with inclusive employers across Canada. We're here to help you find meaningful opportunities, build stronger careers, and create a brighter future.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">{buttons}</div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hidden lg:block w-full aspect-[16/9] relative"
            >
              <img
                src="/aboutus/hero.webp"
                alt="4 professionals at laptop with Canadian flag in background"
                className="absolute inset-0 w-full h-full object-cover object-left"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Cards Row */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_MISSION_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col p-8 bg-white border border-navy-100 rounded-2xl shadow-sm hover:shadow-card transition-shadow duration-300 relative group"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white mb-6 shrink-0 ${card.colorClass}`}
                  >
                    <Icon className="text-2xl" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-navy-900 font-heading mb-3 relative">
                    {card.title}
                    <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-orange-400"></span>
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed mt-4">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
