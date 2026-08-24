// src/components/contact/ContactHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineMagnifyingGlass } from "react-icons/hi2";

/**
 * Contact Hero Section.
 * Includes local image placeholder approach with a cream background fallback.
 */
const ContactHero = ({ formRef }) => {
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gold-50 overflow-hidden pt-20 pb-16 w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] gap-12 lg:gap-16 items-stretch">
          
          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center gap-6 hero-left-pad py-12 lg:py-16"
          >
            <p className="text-teal-700 font-bold tracking-widest uppercase text-sm font-heading">
              CONTACT US
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              We're Here to Support Your Career Journey in Canada
            </h1>
            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-lg">
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

          {/* ── Right: Hero Image Placeholder ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full aspect-[16/9] lg:aspect-auto"
          >
            {/* 
              Image container with cream fallback background. 
              Once the image is available in public/images/ it will cover the background.
            */}
            <div className="w-full h-full bg-[#FDF9F3] overflow-hidden">
              <img
                src="/contactus/hero.webp"
                alt="Four professionals smiling, one holding a mug, with a poster saying New Opportunities Better Futures Together"
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
