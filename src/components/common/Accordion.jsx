import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { HiPlus } from "react-icons/hi2"

/**
 * Reusable accordion. items: [{ question, answer }]
 */
const Accordion = ({ items = [] }) => {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
              isOpen ? "border-gold-300 bg-gold-50/40" : "border-navy-100 bg-white"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
            >
              <span className="font-semibold text-navy-900 text-sm sm:text-base">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.3 }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isOpen ? "bg-gold-500 text-navy-900" : "bg-navy-50 text-navy-700"
                }`}
              >
                <HiPlus />
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
                  <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-navy-500 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
