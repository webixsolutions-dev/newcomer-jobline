// src/components/home/FAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const FAQ_ITEMS = [
  {
    question: "How can Newcomer Jobline help me find a job in Canada?",
    answer:
      "Newcomer Jobline connects you with inclusive employers who actively seek diverse talent. We provide job listings, career resources, resume tips, and interview coaching tailored specifically for newcomers to Canada.",
  },
  {
    question: "Is Newcomer Jobline free for job seekers?",
    answer:
      "Yes, Newcomer Jobline is completely free for job seekers. You can create your profile, browse job listings, and access career resources at no cost.",
  },
  {
    question:
      "How do employers benefit from posting jobs on Newcomer Jobline?",
    answer:
      "Employers gain access to a motivated pool of skilled newcomer candidates with diverse international experience. Our platform helps companies build inclusive teams and benefit from fresh global perspectives.",
  },
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-navy-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-navy-900 text-sm sm:text-base pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <HiChevronDown className="text-navy-400 text-xl" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-navy-500 text-sm leading-relaxed border-t border-navy-100 pt-3 bg-white">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = ({ items = FAQ_ITEMS }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion items */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <FAQItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
