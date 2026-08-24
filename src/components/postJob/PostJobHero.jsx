// src/components/postJob/PostJobHero.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase, HiChatAlt2 } from "react-icons/hi";

/**
 * Hero section for the Post a Job page.
 * "Create a Job Post" button scrolls to the form section (smooth anchor).
 * "Contact Our Team" routes to /contact.
 */
const PostJobHero = ({ formRef }) => {
  const scrollToForm = () => {
    formRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative bg-white overflow-hidden pt-[72px] w-full">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] items-stretch gap-8">
          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="py-16 lg:py-20 flex flex-col justify-center gap-6 z-10 hero-left-pad"
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit bg-gold-50 text-gold-600">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Post a Job
            </span>

            {/* Headline — all navy, no highlight per spec */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              Post Jobs and Reach Newcomer Talent Across Canada
            </h1>

            <div className="w-10 h-1 bg-gold-500 rounded-full" />

            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-md">
              Connect your organization with skilled, motivated newcomers who are
              ready to contribute. Post your job in minutes and start receiving
              applications from across Canada.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiBriefcase className="text-xl" />
                Create a Job Post
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-full border-2 border-navy-900 transition-all duration-200 text-sm sm:text-base"
              >
                <HiChatAlt2 className="text-xl" />
                Contact Our Team
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Hero Image ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative hidden lg:block w-full h-full"
          >
            <img
              src="/postjobhero.webp"
              alt="Diverse professionals collaborating in an office"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PostJobHero;
