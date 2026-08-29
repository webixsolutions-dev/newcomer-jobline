// src/components/employers/BuiltForEmployersSection.jsx
import { motion } from "framer-motion";
import { BUILT_FOR_EMPLOYERS_BENEFITS } from "../../data/builtForEmployersBenefits";
import DecorativeShape from "../common/DecorativeShape";

/**
 * Built for Inclusive Employers section.
 * Left: heading + paragraph + 3 stacked benefit cards (icon-left, title-desc-right).
 * Right: rounded hero-style image.
 */
const BuiltForEmployersSection = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-white overflow-hidden min-h-[580px] flex items-center">
      {/* Decorative accent shape */}
      <DecorativeShape
        position="bottom-left"
        size="w-96 h-96"
        color="text-teal-50"
        className="-mb-24 opacity-80"
      />

      {/* ── Background Image (Desktop only) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-y-0 right-0 w-full lg:w-[65%] hidden lg:block overflow-hidden py-10"
        aria-hidden="true"
      >
        <div 
          className="w-full h-full overflow-hidden"
          style={{
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '20%',
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
          }}
        >
          <img
            src="/employers/built.webp"
            alt="Diverse team meeting and collaborating"
            className="w-full h-full object-cover object-right"
          />
        </div>
      </motion.div>

      {/* ── Foreground Content ── */}
      <div className="container-app w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Left: Content & Stacked Cards ── */}
          <div className="flex flex-col gap-8 col-span-1 lg:col-span-6 pr-4 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-navy-900 font-heading leading-tight">
                Built for Inclusive Employers
              </h2>
              <div className="w-10 h-1 bg-gold-500 rounded-full mt-4 mb-4" />
              <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
                Newcomer Jobline helps Canadian employers hire skilled newcomers
                with confidence. From recruitment support to inclusive hiring
                tools, we make it easier to build diverse teams and stronger
                workplaces across Canada.
              </p>
            </motion.div>

            {/* Stacked Cards */}
            <div className="flex flex-col gap-4">
              {BUILT_FOR_EMPLOYERS_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 border border-teal-100">
                    <benefit.icon className="text-2xl text-teal-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-base font-heading">
                      {benefit.title}
                    </h4>
                    <p className="text-navy-500 text-sm leading-relaxed mt-1">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Spacer Column on Desktop */}
          <div className="col-span-1 lg:col-span-6 hidden lg:block" />

          {/* ── Mobile-only Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[320px] sm:h-[400px] lg:hidden block col-span-1 mt-6"
          >
            <div 
              className="w-full h-full overflow-hidden"
              style={{
                borderTopLeftRadius: '50%',
                borderBottomLeftRadius: '20%',
                borderTopRightRadius: '1rem',
                borderBottomRightRadius: '1rem',
              }}
            >
              <img
                src="/employers/built.webp"
                alt="Diverse team meeting and collaborating"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BuiltForEmployersSection;
