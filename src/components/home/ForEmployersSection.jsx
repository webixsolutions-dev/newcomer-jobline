// src/components/home/ForEmployersSection.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiBriefcase } from "react-icons/hi";

const ForEmployersSection = () => {
  return (
    <section className="py-4 sm:py-6 bg-white">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-navy-100 shadow-card"
        >
          {/* Left: text */}
          <div className="flex flex-col justify-center gap-5 px-8 py-10 lg:py-12 bg-white">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
                For <span className="text-teal-700">Employers</span>
              </h2>
              <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
            </div>
            <p className="text-navy-500 text-sm sm:text-base leading-relaxed max-w-md">
              Hire newcomer talent and strengthen your team. Newcomers bring
              diverse skills, global experience, and new perspectives to help
              your business grow.
            </p>
            <Link
              to="/post-job"
              className="inline-flex items-center gap-2 w-fit px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
            >
              <HiBriefcase className="text-lg" />
              Post a Job
            </Link>
          </div>

          {/* Right: image */}
          <div className="h-64 lg:h-auto overflow-hidden">
            <img
              src="/forempolyers.webp"
              alt="Diverse team of professionals collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForEmployersSection;
