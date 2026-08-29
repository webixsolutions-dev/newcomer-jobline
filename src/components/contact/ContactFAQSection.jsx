// src/components/contact/ContactFAQSection.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { CONTACT_FAQS } from "../../data/contactFaqs";

/**
 * FAQ section for Contact page, sharing the cream background of the section above it.
 * Left: Eyebrow + Heading + Subtext.
 * Right: Single-column accordion list.
 */
const ContactFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-10 bg-white">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          
          {/* ── Left: Heading ── */}
          <div className="flex flex-col gap-4 sticky top-24">
            <div>
              <p className="text-teal-700 font-bold tracking-widest uppercase text-xs font-heading mb-2">
                FAQ
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-navy-500 text-base leading-relaxed">
              Quick answers to common questions about contacting our team.
            </p>
          </div>

          {/* ── Right: Accordion List ── */}
          <div className="flex flex-col gap-3">
            {CONTACT_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-colors duration-300 overflow-hidden bg-white shadow-sm ${
                    isOpen ? "border-teal-200" : "border-navy-100 hover:border-navy-200"
                  }`}
                >
                  <button
                    onClick={() => handleToggle(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-bold text-navy-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 flex items-center justify-center text-navy-700"
                    >
                      <HiChevronDown className="text-xl" />
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
                        <p className="px-6 pb-6 text-sm sm:text-base text-navy-500 leading-relaxed pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQSection;
