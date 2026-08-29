// src/components/employers/HowItWorksNumbered.jsx
import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "../../data/howItWorksSteps";

/**
 * 3-step numbered horizontal flow with dotted connector lines.
 * Shares the cream background with WhyChooseUsGrid above it in the page composition.
 */
const HowItWorksNumbered = () => {
  return (
    <section className="pb-16 sm:pb-20 bg-navy-50">
      <div className="container-app">
        
        {/* Horizontal rule with centered text */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-teal-700/20 flex-1 max-w-[200px]" />
          <h3 className="text-xl font-bold text-navy-900 font-heading">
            How It Works
          </h3>
          <div className="h-px bg-teal-700/20 flex-1 max-w-[200px]" />
        </div>

        {/* 3 Steps */}
        <div className="flex flex-col md:flex-row items-start justify-between relative">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col md:flex-row items-start gap-4 flex-1 relative z-10 w-full mb-8 md:mb-0"
            >
              <div className="flex items-center gap-4">
                {/* Number Badge */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white font-bold font-heading shadow-md">
                  {step.num}
                </div>

                {/* Light Circle Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white border border-teal-100 shadow-sm text-teal-700 relative">
                  <step.icon className="text-3xl" />
                </div>
              </div>

              {/* Text content */}
              <div className="mt-2 md:mt-1 max-w-[220px]">
                <h4 className="font-bold text-navy-900 text-base leading-snug mb-1 font-heading">
                  {step.title}
                </h4>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Dotted line connector for desktop */}
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[140px] right-4 border-t-[3px] border-dotted border-teal-200/60 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksNumbered;
