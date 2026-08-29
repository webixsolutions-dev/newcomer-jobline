// src/components/employers/EmployerHighlightsRow.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EMPLOYER_HIGHLIGHTS } from "../../data/employerHighlights";

/**
 * 3-card row placed below the Built For Employers split section.
 * Middle card (Success Stories) has a distinct peach/gold icon.
 */
const EmployerHighlightsRow = () => {
  return (
    <section className="pb-16 sm:pb-24 bg-white relative z-10">
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {EMPLOYER_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={item.link}
                className="flex flex-row items-center gap-5 p-6 sm:p-8 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 h-full group"
              >
                <div
                  className={`flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full ${item.bg} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                >
                  <item.icon className={`text-2xl sm:text-3.5xl ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerHighlightsRow;
