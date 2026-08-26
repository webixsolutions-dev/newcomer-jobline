// src/components/contact/ContactHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineMagnifyingGlass } from "react-icons/hi2";

/**
 * Contact Hero Section.
 * Includes full-width background image layout on desktop with object-right positioning.
 */
const ContactHero = ({ formRef }) => {
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gold-50 overflow-hidden pt-20 pb-16 w-full min-h-[520px] flex items-center">
      {/* ── Background Hero Image (Desktop only) ── */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <img
          src="/contactus/hero.webp"
          alt="Diverse professionals collaborating"
          className="w-full h-full object-cover object-right"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>

      {/* ── Foreground Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center gap-4 py-16 lg:py-20 col-span-1 lg:col-span-5 pr-4 lg:pr-8 max-w-[420px]"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.2] text-navy-900 font-heading">
              We're Here to Support Your Career Journey in Canada
            </h1>
            <p className="text-navy-500 text-sm sm:text-base leading-relaxed">
              Newcomer Jobline connects skilled newcomers with employers across
              Canada. Whether you're job seeking, hiring, or have a question,
              our team is here to help you take the next confident step.
            </p>

            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiOutlineEnvelope className="text-xl" />
                Send a Message
              </button>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-navy-900 border-2 border-navy-900 hover:bg-navy-900 hover:text-white font-bold rounded-full transition-all duration-200 text-sm sm:text-base"
              >
                <HiOutlineMagnifyingGlass className="text-xl" />
                Browse Jobs
              </Link>
            </div>
          </motion.div>

          {/* Spacer for desktop layout */}
          <div className="hidden lg:block lg:col-span-7" />

          {/* ── Mobile: Hero Image Placeholder ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full aspect-[16/9] lg:hidden block col-span-1"
          >
            <div className="w-full h-full bg-[#FDF9F3] overflow-hidden rounded-2xl">
              <img
                src="/contactus/hero.webp"
                alt="Four professionals smiling"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactHero;


