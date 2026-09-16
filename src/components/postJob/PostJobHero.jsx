// src/components/postJob/PostJobHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiChatAlt2 } from "react-icons/hi";

/**
 * Hero section for the Post a Job page — split layout (copy left, photo right).
 * "Create a Job Post" scrolls to the form section (smooth anchor).
 * "Contact Our Team" routes to /contact.
 */
const PostJobHero = ({ formRef }) => {
  const scrollToForm = () => {
    formRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[520px] items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-copy-padding flex flex-col justify-center gap-6 py-10 sm:py-14 lg:py-20 max-w-xl w-full min-w-0"
        >
          <span className="text-gold-600 font-bold uppercase tracking-widest text-xs sm:text-sm">
            Post a Job
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.12] text-navy-900 font-heading">
            Post Jobs and Reach Newcomer Talent Across Canada
          </h1>

          <p className="text-navy-500 text-base sm:text-lg leading-relaxed">
            Newcomer Jobline helps employers connect with motivated and skilled
            newcomers ready to contribute. Post your job today and build a more
            inclusive and diverse workforce.
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-lg transition-all duration-200 shadow-soft text-sm sm:text-base"
            >
              <HiBriefcase className="text-xl shrink-0" />
              Create a Job Post
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-lg border border-navy-900 transition-all duration-200 text-sm sm:text-base"
            >
              <HiChatAlt2 className="text-xl shrink-0" />
              Contact Our Team
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-0 h-full"
        >
          <img
            src="/postjobhero.webp"
            alt="Diverse professionals collaborating in an office"
            className="absolute inset-0 w-full h-full object-cover object-center lg:object-right"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PostJobHero;
