// src/components/contact/ContactInfoCardsRow.jsx
import { motion } from "framer-motion";
import { CONTACT_INFO_CARDS } from "../../data/contactInfoCards";

/**
 * 3-card row directly below the hero.
 * Icon-on-top, teal tinted icon circle, title/desc, divider, contact details.
 */
const ContactInfoCardsRow = () => {
  return (
    <section className="relative mt-8 lg:-mt-12 z-20 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_INFO_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col p-6 sm:p-8 bg-white rounded-xl border border-navy-100 shadow-card hover:shadow-soft transition-shadow duration-300 h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                  <card.icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading">
                  {card.title}
                </h3>
              </div>
              
              <p className="text-navy-500 text-sm leading-relaxed mb-5">
                {card.desc}
              </p>

              <div className="h-px bg-navy-100 w-full mb-5" />

              <div className="mt-auto flex flex-col gap-1">
                {card.link ? (
                  <a
                    href={card.link}
                    className="font-bold text-teal-700 hover:text-teal-800 transition-colors text-sm sm:text-base break-words"
                  >
                    {card.detail}
                  </a>
                ) : (
                  <span className="font-bold text-teal-700 text-sm sm:text-base whitespace-pre-line">
                    {card.detail}
                  </span>
                )}
                <span className="text-navy-500 text-xs sm:text-sm mt-1">
                  {card.subDetail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCardsRow;
