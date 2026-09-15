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
    <section className="hero-page-section bg-gradient-to-br from-slate-50 via-[#eef4f8] to-white">
      <div className="container-app w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-page-content lg:max-w-none"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-navy-900 font-heading">
              Helpful Resources{" "}
              <span className="text-teal-700">for Newcomers</span>
            </h1>

            <p className="text-navy-500 text-sm sm:text-base leading-relaxed mt-4 max-w-lg">
              Find helpful articles, tools, and guides designed to support your
              career journey in Canada — from job search and interviews to
              settlement and well-being.
            </p>
            <p className="text-navy-500 text-sm sm:text-base leading-relaxed mt-3 max-w-lg">
              Browse categories below or search to discover resources tailored
              for newcomers like you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 max-w-md w-full">
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
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-1 lg:col-span-7 w-full"
          >
            <div className="w-full aspect-[4/3] lg:aspect-auto lg:min-h-[340px] rounded-2xl overflow-hidden shadow-card">
              <img
                src="/resources/hero_resources_hijab_woman.webp"
                alt="Newcomer professional working on a laptop"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;
