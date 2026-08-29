// src/components/employers/WhyChooseUsGrid.jsx
import { WHY_CHOOSE_US_ITEMS } from "../../data/whyChooseUsItems";
import { IconTextCard } from "../postJob/WhyEmployersChooseUs"; 
import DecorativeShape from "../common/DecorativeShape";

/**
 * 4-card row (icon-on-top style per spec, but it says "reuse Card pattern").
 * Actually, spec says: "4-card row (icon-on-top, teal icons, white cards)"
 * Wait, the IconTextCard from Module 2 is side-by-side. 
 * I will build a standard icon-on-top grid here using standard markup.
 */
import { motion } from "framer-motion";

const WhyChooseUsGrid = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-navy-50 overflow-hidden">
      {/* Decorative accent shape top-right */}
      <DecorativeShape
        position="top-right"
        size="w-72 h-72"
        color="text-teal-100/50"
      />

      <div className="container-app relative z-10">
        {/* Centered Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold text-navy-900 font-heading leading-tight whitespace-normal md:whitespace-nowrap">
            Why Employers Choose Newcomer Jobline
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mx-auto mt-4 mb-6" />
          <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
            Attract, hire, and retain skilled newcomers who are ready to contribute.
            Newcomer Jobline makes inclusive recruitment simple—connecting employers
            with qualified talent across Canada while boosting your employer brand
            and community impact.
          </p>
        </div>

        {/* 4-card grid (icon-on-top) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 sm:p-8 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft transition-all duration-300"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${item.bg} flex-shrink-0`}
              >
                <item.icon className={`text-2xl ${item.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-navy-900 text-base leading-tight font-heading mb-2">
                  {item.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsGrid;
