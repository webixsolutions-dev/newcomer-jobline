// src/components/home/CareerJourneyCTA.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiBriefcase, HiOfficeBuilding } from "react-icons/hi";

const CareerJourneyCTA = () => {
  return (
    <section className="py-10 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-navy-50 border border-navy-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: text + buttons */}
            <div className="flex flex-col justify-center gap-5 px-8 py-10 lg:py-14">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight">
                  Start Your Career Journey
                  <br />
                  in <span className="text-teal-700">Canada</span>
                </h2>
                <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
              </div>
              <p className="text-navy-500 text-sm sm:text-base leading-relaxed max-w-sm">
                Thousands of opportunities and the right support to help
                newcomers succeed. Your new career starts here.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/browse-jobs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
                >
                  <HiBriefcase className="text-lg" />
                  Browse Jobs
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-full border-2 border-navy-900 transition-all duration-200 text-sm sm:text-base"
                >
                  <HiOfficeBuilding className="text-lg" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right: Toronto skyline image */}
            <div className="h-56 lg:h-auto overflow-hidden">
              <img
                src="/startcareer.webp"
                alt="Toronto skyline waterfront"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerJourneyCTA;
