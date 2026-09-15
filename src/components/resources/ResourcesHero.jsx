// src/components/resources/ResourcesHero.jsx
import { motion } from "framer-motion";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const ResourcesHero = ({ searchQuery, onSearchChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const target = document.getElementById("resource-categories");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-[#f5f7fa] overflow-hidden w-full">
      <section className="relative overflow-hidden pt-[72px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[520px] items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy-padding flex flex-col justify-center gap-5 py-10 sm:py-14 lg:py-16 max-w-xl w-full min-w-0 bg-[#f5f7fa] z-10"
          >
            <span className="text-gold-600 font-bold uppercase tracking-widest text-xs sm:text-sm">
              Resources
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              Helpful Resources{" "}
              <span className="text-teal-700">for Newcomers</span>
            </h1>

            <div className="w-10 h-1 bg-gold-500 rounded-full" />

            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-md">
              Find helpful articles, tools, and guides designed to support your
              career journey in Canada — from job search and interviews to
              settlement and well-being.
            </p>
            <p className="text-navy-500 text-sm sm:text-base leading-relaxed max-w-md -mt-2">
              Browse categories below or search to discover resources tailored
              for newcomers like you.
            </p>

            <form onSubmit={handleSubmit} className="mt-2 max-w-md w-full">
              <label htmlFor="resources-search" className="sr-only">
                Search resources
              </label>
              <div
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl border border-teal-700/40 bg-white text-navy-900 text-sm shadow-sm focus-within:ring-2 focus-within:ring-teal-600/30 focus-within:border-teal-600"
              >
                <HiOutlineMagnifyingGlass
                  className="text-navy-300 text-xl shrink-0"
                  aria-hidden
                />
                <input
                  id="resources-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search resources..."
                  className="flex-1 min-w-0 bg-transparent border-0 p-0 text-navy-900 text-sm placeholder:text-navy-300 focus:outline-none focus:ring-0"
                />
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-0 h-full"
          >
            <img
              src="/resources/hero_resources_hijab_woman.webp"
              alt="Newcomer professional working on a laptop"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-right"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesHero;
