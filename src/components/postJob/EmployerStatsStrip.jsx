// src/components/postJob/EmployerStatsStrip.jsx
import { motion } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
} from "react-icons/hi2";
import { usePublicDataset } from "../../hooks/usePublicDataset";

/**
 * Wide stats strip card (white background within the cream band).
 * Reuses the stat-display pattern from TrustedStatsStrip.
 */
const EmployerStatsStrip = () => {
  const { dataset, loading } = usePublicDataset();
  const count = (items) => loading ? "—" : items?.length ?? 0;
  const stats = [
    { icon: HiOutlineUserGroup, value: count(dataset?.jobs), label: "Active Jobs", desc: "Live openings on this portal" },
    { icon: HiOutlineBuildingOffice2, value: count(dataset?.companies), label: "Hiring Companies", desc: "Active employers in the network" },
    { icon: HiOutlineGlobeAlt, value: count(dataset?.categories), label: "Job Categories", desc: "Career areas available to candidates" },
    { icon: HiOutlineHeart, value: null, label: "Inclusive Hiring Network", desc: "Building stronger, more diverse teams" },
  ];
  return (
    <section className="py-10 sm:py-12 bg-navy-50/60">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-navy-100 shadow-card overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 px-6 py-7"
              >
                {/* Icon */}
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-navy-50">
                  <stat.icon className="text-xl text-navy-700" />
                </div>

                {/* Text */}
                <div>
                  {stat.value && (
                    <p className="text-2xl font-extrabold text-navy-900 font-heading leading-tight">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmployerStatsStrip;
