// src/components/resources/PopularResourceCategories.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const PopularResourceCategories = ({ categories }) => {
  return (
    <section
      id="resource-categories"
      className="py-16 sm:py-20 bg-[#f7f9fb] scroll-mt-24"
    >
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
              Popular Resource{" "}
              <span className="text-teal-700">Categories</span>
            </h2>
            <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
          </div>
          <a
            href="#resource-categories"
            className="flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800 transition-colors text-sm shrink-0"
          >
            View all categories <HiArrowRight className="text-base" />
          </a>
        </div>

        {categories.length === 0 ? (
          <p className="text-navy-500 text-center py-12">
            No categories match your search. Try a different keyword.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const cardContent = (
                <>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={cat.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5 sm:p-6 flex gap-4 items-start">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <Icon className="text-2xl" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-navy-900 text-base sm:text-lg leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-navy-500 text-sm mt-1.5 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </>
              );

              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={cat.link}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card hover:border-teal-200 transition-all duration-200 overflow-hidden"
                  >
                    {cardContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularResourceCategories;
