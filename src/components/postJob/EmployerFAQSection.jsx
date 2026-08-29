// src/components/postJob/EmployerFAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { EMPLOYER_FAQS } from "../../data/employerFaqs";

/**
 * 2x2 grid FAQ for employers.
 * Visual treatment differs from the Homepage single-column accordion:
 * - Each card has a circular icon on the left.
 * - Question (bold) + chevron toggle on the right.
 * - Answer expands below with animation.
 * Toggle logic is kept as a simple local hook pattern,
 * matching the same open/close behavior as the shared Accordion.
 */

/** Individual FAQ card component */
const EmployerFAQCard = ({ faq, isOpen, onToggle }) => {
  return (
    <div
      className={`rounded-2xl border transition-colors duration-300 overflow-hidden bg-white ${
        isOpen ? "border-gold-300" : "border-navy-100"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-5 text-left"
      >
        {/* Left: circular icon */}
        <div
          className={`flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? "bg-gold-100 text-gold-600" : "bg-navy-50 text-navy-600"
          }`}
        >
          <faq.icon className="text-xl" />
        </div>

        {/* Middle: question text */}
        <span className="flex-1 font-semibold text-navy-900 text-sm sm:text-base leading-snug">
          {faq.question}
        </span>

        {/* Right: chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
            isOpen ? "bg-gold-500 text-navy-900" : "bg-navy-50 text-navy-700"
          }`}
        >
          <HiChevronDown className="text-base" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm sm:text-base text-navy-500 leading-relaxed pl-[72px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EmployerFAQSection = () => {
  // Open index — -1 means none open; matches Accordion's toggle behavior
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned heading (per spec: unlike centered Homepage FAQ) */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit bg-teal-50 text-teal-700 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
            FAQ for Employers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            Frequently Asked Questions
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
        </div>

        {/* 2×2 grid of FAQ cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EMPLOYER_FAQS.map((faq, i) => (
            <EmployerFAQCard
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmployerFAQSection;
