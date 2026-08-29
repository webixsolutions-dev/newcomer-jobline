// src/components/postJob/HowPostingWorks.jsx
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import { POSTING_STEPS } from "../../data/postingSteps";

/**
 * 4-step horizontal process section with connecting arrows.
 * Uses bordered white boxes on a cream band background.
 */
const HowPostingWorks = () => {
  return (
    <section className="py-16 sm:py-20 bg-navy-50/60">
      <div className="container-app">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit bg-gold-50 text-gold-600 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
            Step by Step
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            How Posting a Job Works
          </h2>
          <p className="text-navy-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
            Get your job in front of motivated newcomer candidates in just a few
            simple steps.
          </p>
          <div className="w-10 h-1 bg-gold-500 rounded-full mx-auto mt-4" />
        </div>

        {/* 4-step cards with arrows */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4">
          {POSTING_STEPS.map((step, i) => (
            <div
              key={step.num}
              className="flex flex-row sm:flex-col items-center sm:items-stretch flex-1 gap-4 sm:gap-0"
            >
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft transition-shadow duration-300 flex-1 w-full"
              >
                {/* Step number + icon */}
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 border-2 border-navy-100">
                    <step.icon className="text-3xl text-navy-700" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-navy-900 text-xs font-extrabold">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 text-base font-heading leading-snug">
                  {step.title}
                </h3>
                <p className="text-navy-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Arrow connector (not after last) */}
              {i < POSTING_STEPS.length - 1 && (
                <div className="flex-shrink-0 flex items-center justify-center sm:mt-[-48px] sm:mb-0 my-auto">
                  <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-gold-100 text-gold-600 mx-[-12px] z-10 relative">
                    <HiArrowRight className="text-sm" />
                  </div>
                  <div className="sm:hidden w-8 h-0.5 bg-navy-200 flex-shrink-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowPostingWorks;
