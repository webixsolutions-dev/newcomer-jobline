// src/components/contact/SupportOptionsGrid.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineArrowRight } from "react-icons/hi2";
import { SUPPORT_OPTIONS } from "../../data/supportOptions";

/**
 * "We're Here to Help" 4-card row on a cream-tinted background.
 */
const SupportOptionsGrid = ({ formRef }) => {
  const handleScroll = (e) => {
    e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 bg-white">
      <div className="container-app">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-teal-700 font-bold tracking-widest uppercase text-xs font-heading mb-2">
            SUPPORT OPTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading mb-4 leading-tight">
            We're Here to Help
          </h2>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl">
            Choose the option that best fits your needs. Our team is ready to assist you.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUPPORT_OPTIONS.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col p-6 bg-white rounded-xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300 h-full"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700 mb-5">
                <option.icon className="text-2xl" />
              </div>
              
              {/* Text */}
              <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading mb-2">
                {option.title}
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-6 flex-1">
                {option.desc}
              </p>

              {/* Button */}
              {option.action === "scroll" ? (
                <button
                  onClick={handleScroll}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold rounded-lg transition-colors text-sm ${
                    option.buttonVariant === "primary"
                      ? "bg-teal-700 hover:bg-teal-800 text-white"
                      : "bg-transparent text-navy-900 border-2 border-navy-200 hover:border-navy-900"
                  }`}
                >
                  {option.buttonIcon === "mail" && <HiOutlineEnvelope className="text-base -mt-0.5" />}
                  {option.buttonText}
                </button>
              ) : (
                <Link
                  to={option.href}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold rounded-lg transition-colors text-sm ${
                    option.buttonVariant === "primary"
                      ? "bg-teal-700 hover:bg-teal-800 text-white"
                      : "bg-transparent text-navy-900 border-2 border-navy-200 hover:border-navy-900"
                  }`}
                >
                  {option.buttonText}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportOptionsGrid;
