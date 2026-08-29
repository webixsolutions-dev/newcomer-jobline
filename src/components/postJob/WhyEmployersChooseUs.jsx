// src/components/postJob/WhyEmployersChooseUs.jsx
import { motion } from "framer-motion";
import { WHY_EMPLOYERS } from "../../data/whyEmployersChooseUs";

/**
 * 4-card row using icon-left / text-right "side-by-side" style (IconTextCard pattern).
 * Reusable — this pattern will be used on other pages too.
 */

/** Reusable IconTextCard component — icon left, text right */
export const IconTextCard = ({ icon: Icon, title, desc, color, bg }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft transition-shadow duration-300 h-full"
  >
    <div
      className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full ${bg}`}
    >
      <Icon className={`text-2xl ${color}`} />
    </div>
    <div className="flex flex-col gap-1">
      <h4 className="font-bold text-navy-900 text-sm sm:text-base font-heading leading-snug">
        {title}
      </h4>
      <p className="text-navy-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const WhyEmployersChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-navy-50/60 border-t border-navy-100">
      <div className="container-app">
        {/* Divider above */}
        <div className="w-full h-px bg-navy-100 mb-12" />

        {/* Sub-section heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-heading">
            Why Employers Choose Us
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mx-auto mt-3" />
        </div>

        {/* 4-card icon-text grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {WHY_EMPLOYERS.map((item) => (
            <IconTextCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEmployersChooseUs;
