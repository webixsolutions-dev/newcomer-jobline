// src/components/home/HowItWorksSection.jsx
import { motion } from "framer-motion";
import {
  HiOutlineUserCircle,
  HiOutlineMagnifyingGlass,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi2";

const STEPS = [
  {
    num: 1,
    icon: HiOutlineUserCircle,
    title: "Create Profile",
    desc: "Build your free profile and highlight your skills and experience.",
  },
  {
    num: 2,
    icon: HiOutlineMagnifyingGlass,
    title: "Browse Jobs",
    desc: "Search jobs that match your skills, interests, and goals.",
  },
  {
    num: 3,
    icon: HiOutlineClipboardDocumentCheck,
    title: "Apply with Confidence",
    desc: "Apply easily and connect with employers who value diversity.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-10 sm:py-12 bg-white border-t border-navy-50">
      <div className="container-app">
        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            How It <span className="text-teal-700">Works</span>
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mt-2" />
        </div>

        {/* Steps row – desktop horizontal, mobile stacked */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-4 relative">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-start w-full lg:w-1/3 relative"
            >
              {/* Top row: number badge + icon card */}
              <div className="flex items-center gap-3 w-full">
                {/* Number badge */}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gold-600 font-extrabold text-sm font-heading">
                  {step.num}
                </span>

                {/* Icon card with checkmark */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF5EB]">
                  {/* inner white square card */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                    <step.icon className="text-xl text-navy-700" />
                  </div>
                  {/* green checkmark badge on inner card */}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600">
                    <HiCheckCircle className="text-white text-xs" />
                  </span>
                </div>
              </div>

              {/* Title & description left‑aligned under icon card */}
              <div className="mt-3 ml-11 w-full max-w-xs">
                <h3 className="font-bold text-navy-900 text-sm sm:text-base leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1 text-navy-400 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Connector between steps (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute left-full top-[2.5rem] -translate-y-1/2 w-8 border-t-2 border-dotted border-navy-300" />
              )}
            </motion.div>
          ))}

          {/* Right side image – kept from original design, now placed after steps on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block w-full lg:w-1/2 mt-8 lg:mt-0 rounded-2xl overflow-hidden shadow-soft"
          >
            <img
              src="/howitwork.webp"
              alt="Woman working on laptop"
              className="w-full h-64 object-cover"
            />
          </motion.div>
        </div>

        {/* Mobile image below steps */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden mt-8 rounded-2xl overflow-hidden shadow-soft"
        >
          <img
            src="/howitwork.webp"
            alt="Woman working on laptop"
            className="w-full h-56 object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;