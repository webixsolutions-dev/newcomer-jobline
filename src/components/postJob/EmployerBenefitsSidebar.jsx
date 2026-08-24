// src/components/postJob/EmployerBenefitsSidebar.jsx
import { motion } from "framer-motion";
import { EMPLOYER_BENEFITS } from "../../data/employerBenefits";

/**
 * Right-column "Why Post on Newcomer Jobline?" sidebar panel.
 * Shows 5 benefit rows: circle icon + teal bold title + description.
 */
const EmployerBenefitsSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="bg-navy-900 rounded-2xl p-6 sm:p-8 sticky top-24"
    >
      {/* Heading */}
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading leading-snug">
          Why Post on Newcomer Jobline?
        </h3>
        <p className="text-navy-200 text-sm mt-2 leading-relaxed">
          Join hundreds of employers already hiring newcomer talent across
          Canada.
        </p>
        <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
      </div>

      {/* Benefit rows */}
      <div className="flex flex-col gap-5">
        {EMPLOYER_BENEFITS.map((benefit, i) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-start gap-4"
          >
            {/* Circular icon */}
            <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/10">
              <benefit.icon className="text-xl text-teal-400" />
            </div>

            {/* Text */}
            <div>
              <p className="font-bold text-teal-400 text-sm leading-snug">
                {benefit.title}
              </p>
              <p className="text-navy-200 text-xs mt-1 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.aside>
  );
};

export default EmployerBenefitsSidebar;
