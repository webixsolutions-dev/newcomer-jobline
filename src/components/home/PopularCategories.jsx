// src/components/home/PopularCategories.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineClipboardList,
  HiOutlinePhoneIncoming,
  HiOutlineDesktopComputer,
  HiOutlineHeart,
} from "react-icons/hi";
import {
  HiArrowRight,
  HiOutlineWrench,
  HiOutlineCake,
} from "react-icons/hi2";
import { usePublicDataset } from "../../hooks/usePublicDataset";

const CATEGORY_ICONS = [HiOutlineClipboardList, HiOutlinePhoneIncoming, HiOutlineDesktopComputer, HiOutlineWrench, HiOutlineHeart, HiOutlineCake];

const PopularCategories = () => {
  const { dataset, loading } = usePublicDataset();
  const categories = (dataset?.categories || []).slice(0, 6);
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-app">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
              Popular <span className="text-teal-700">Job</span> Categories
            </h2>
            <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
          </div>
          <Link
            to="/jobs"
            className="flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800 transition-colors text-sm shrink-0"
          >
            View all categories <HiArrowRight className="text-base" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl border border-navy-100 bg-navy-50" />
          ))}
          {!loading && categories.map((cat, i) => {
            const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
            return (
            <motion.div
              key={cat.id || cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center text-center gap-4 p-5 rounded-2xl border border-navy-100 bg-white hover:border-teal-200 hover:shadow-card transition-all duration-200 h-full"
              >
                {/* Icon circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <Icon className="text-2xl text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-navy-400 text-xs mt-1.5 leading-relaxed">
                    Browse current {cat.name.toLowerCase()} opportunities.
                  </p>
                </div>
              </Link>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
