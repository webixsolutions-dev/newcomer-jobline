// src/components/resources/ResourcesHelpCTA.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineSupport } from "react-icons/hi";

const ResourcesHelpCTA = () => {
  return (
    <section className="pb-16 sm:pb-24 bg-white">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="bg-teal-50 border border-teal-100 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10"
        >
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full lg:flex-1">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white border border-teal-100 text-teal-700 shadow-sm">
              <HiOutlineSupport className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 font-heading leading-tight">
                Need more help?
              </h2>
              <p className="text-navy-500 text-sm sm:text-base mt-1 leading-relaxed">
                Our team is here to support you on your journey.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl transition-colors text-sm sm:text-base shadow-sm whitespace-nowrap"
          >
            <HiOutlinePhone className="text-lg" />
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesHelpCTA;
