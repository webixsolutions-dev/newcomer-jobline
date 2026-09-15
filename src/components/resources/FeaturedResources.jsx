// src/components/resources/FeaturedResources.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const FeaturedResources = ({ resources }) => {
  return (
    <section
      id="featured-resources"
      className="py-16 sm:py-20 bg-white scroll-mt-24"
    >
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
              Featured <span className="text-teal-700">Resources</span>
            </h2>
            <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
          </div>
          <a
            href="#featured-resources"
            className="flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800 transition-colors text-sm shrink-0"
          >
            View all resources <HiArrowRight className="text-base" />
          </a>
        </div>

        {resources.length === 0 ? (
          <p className="text-navy-500 text-center py-12">
            No featured resources match your search. Try a different keyword.
          </p>
        ) : (
          <div className="flex flex-col border border-navy-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            {resources.map((item, i) => (
              <motion.div
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 p-6 sm:px-8 scroll-mt-28 ${
                  i > 0 ? "border-t border-navy-100" : ""
                }`}
              >
                <div
                  className="shrink-0 w-full sm:w-[220px] md:w-[240px] aspect-[3/2] rounded-lg overflow-hidden border border-navy-100 bg-[#eef2f7]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy-900 text-base sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-navy-500 text-sm mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={item.link}
                  className="shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-navy-200 text-teal-700 font-semibold text-sm hover:bg-teal-50 hover:border-teal-300 transition-colors whitespace-nowrap w-full sm:w-auto"
                >
                  Read More <HiArrowRight className="text-base" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedResources;
