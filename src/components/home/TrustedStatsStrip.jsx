// src/components/home/TrustedStatsStrip.jsx
import { motion } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const STATS = [
  {
    icon: HiOutlineUserGroup,
    value: "5K+",
    label: "Job Seekers",
    desc: "Finding jobs and building better futures.",
  },
  {
    icon: HiOutlineBuildingOffice2,
    value: "1K+",
    label: "Employers",
    desc: "Partnering with diverse talent across Canada.",
  },
  {
    icon: HiOutlineGlobeAlt,
    value: null,
    label: "Canada-Wide Opportunities",
    desc: "Jobs in cities and communities coast to coast.",
  },
];

const TrustedStatsStrip = () => {
  return (
    <section className="py-10 sm:py-12 bg-navy-50/40">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-2xl border border-navy-100 shadow-card overflow-hidden"
        >
          {/* Left: image + text */}
          <div className="flex flex-col sm:flex-row items-center gap-0 lg:gap-0 flex-shrink-0">
            <div className="w-full sm:w-56 lg:w-60 h-44 sm:h-full overflow-hidden flex-shrink-0">
              <img
                src="/trusted.webp"
                alt="Diverse professionals looking at laptop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 py-6 sm:py-8 bg-white">
              <p className="text-xl sm:text-2xl font-extrabold text-navy-900 font-heading leading-snug max-w-[200px]">
                Trusted by newcomers across{" "}
                <span className="text-teal-700">Canada</span>
              </p>
              <div className="w-8 h-1 bg-gold-500 rounded-full mt-3" />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-28 bg-navy-100 flex-shrink-0" />

          {/* Right: stats */}
          <div className="flex flex-col sm:flex-row gap-0 flex-1 w-full">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 flex items-start gap-4 px-6 py-6 ${
                  i < STATS.length - 1
                    ? "border-b sm:border-b-0 sm:border-r border-navy-100"
                    : ""
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 flex-shrink-0">
                  <stat.icon className="text-xl text-navy-700" />
                </div>
                <div>
                  {stat.value && (
                    <p className="text-2xl font-extrabold text-navy-900 font-heading">
                      {stat.value}
                    </p>
                  )}
                  <p className="font-bold text-navy-900 text-sm">
                    {stat.label}
                  </p>
                  <p className="text-navy-400 text-xs mt-0.5 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedStatsStrip;
