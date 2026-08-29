// src/components/employers/EmployersFeatureGrid.jsx
import { motion } from "framer-motion";
import { EMPLOYER_FEATURE_HIGHLIGHTS } from "../../data/employerFeatureHighlights";

/**
 * 4-card feature grid row placed under the hero on the Employers page.
 * Alternating icon backgrounds (teal / gold).
 */
const EmployersFeatureGrid = () => {
  return (
    <section className="relative mt-8 lg:-mt-12 z-20 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EMPLOYER_FEATURE_HIGHLIGHTS.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 sm:p-8 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft transition-all duration-300"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.bg} flex-shrink-0`}
              >
                <feature.icon className={`text-3xl ${feature.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading mb-2">
                  {feature.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployersFeatureGrid;
