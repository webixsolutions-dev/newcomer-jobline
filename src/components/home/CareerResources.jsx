// src/components/home/CareerResources.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineHome,
} from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";

const RESOURCES = [
  {
    icon: HiOutlineDocumentText,
    title: "Resume Tips",
    desc: "Create a strong resume that highlights your skills and experience.",
    href: "/resources",
  },
  {
    icon: HiOutlineChatAlt2,
    title: "Interview Preparation",
    desc: "Build confidence and learn how to succeed in interviews.",
    href: "/resources",
  },
  {
    icon: HiOutlineHome,
    title: "Settlement Support",
    desc: "Find guidance on housing, healthcare, finances, and more.",
    href: "/resources",
  },
];

const CareerResources = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            Career <span className="text-teal-700">Resources</span> for
            Newcomers
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {RESOURCES.map((res, i) => (
            <motion.div
              key={res.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-6 rounded-2xl border border-navy-100 bg-white hover:border-teal-200 hover:shadow-card transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
                <res.icon className="text-2xl text-teal-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-navy-900 text-base">
                  {res.title}
                </h3>
                <p className="text-navy-400 text-sm mt-2 leading-relaxed">
                  {res.desc}
                </p>
              </div>
              <Link
                to={res.href}
                className="inline-flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800 text-sm transition-colors"
              >
                Learn More <HiArrowRight className="text-base" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerResources;
