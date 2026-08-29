// src/components/postJob/HireCTABand.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiChatAlt2 } from "react-icons/hi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

/**
 * Ready to Hire CTA Band.
 * Left: icon + heading + subtext + 2 buttons.
 * Right: team collaboration image.
 * "Post a Job" scrolls to the form; "Contact Sales" routes to /contact.
 */
const HireCTABand = ({ formRef }) => {
  const scrollToForm = () => {
    formRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-12 sm:py-16 bg-navy-50/60">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-navy-100 shadow-soft"
        >
          {/* ── Left: CTA content ── */}
          <div className="flex flex-col justify-center gap-6 px-8 sm:px-12 py-12 bg-navy-900">
            {/* Icon badge */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30">
              <HiOutlineRocketLaunch className="text-3xl text-gold-400" />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
                Ready to Hire Newcomer Talent?
              </h2>
              <div className="w-10 h-1 bg-gold-500 rounded-full mt-4" />
            </div>

            <p className="text-navy-200 text-base leading-relaxed max-w-md">
              Join hundreds of Canadian employers who trust Newcomer Jobline to
              connect them with skilled, motivated newcomer candidates ready to
              contribute.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiBriefcase className="text-lg" />
                Post a Job
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white border-2 border-white/40 hover:bg-white hover:text-navy-900 font-bold rounded-full transition-all duration-200 text-sm sm:text-base"
              >
                <HiChatAlt2 className="text-lg" />
                Contact Sales
              </Link>
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="h-64 lg:h-auto overflow-hidden">
            <img
              src="/readytohire.webp"
              alt="Diverse team of professionals collaborating at a table"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HireCTABand;
