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

const CATEGORIES = [
  {
    icon: HiOutlineClipboardList,
    title: "Administration & Office",
    desc: "Find roles in admin, office support and coordination.",
    slug: "administration-office",
  },
  {
    icon: HiOutlinePhoneIncoming,
    title: "Customer Service",
    desc: "Help customers and build strong communication skills.",
    slug: "customer-service",
  },
  {
    icon: HiOutlineDesktopComputer,
    title: "Technology & IT",
    desc: "Explore IT jobs for beginners and professionals.",
    slug: "technology-it",
  },
  {
    icon: HiOutlineWrench,
    title: "Skilled Trades",
    desc: "Find opportunities in high-demand skilled trades.",
    slug: "skilled-trades",
  },
  {
    icon: HiOutlineHeart,
    title: "Healthcare Support",
    desc: "Support healthcare teams and make a difference.",
    slug: "healthcare-support",
  },
  {
    icon: HiOutlineCake,
    title: "Hospitality",
    desc: "Discover jobs in hotels, restaurants and event services.",
    slug: "hospitality",
  },
];

const PopularCategories = () => {
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
            to="/browse-jobs"
            className="flex items-center gap-1.5 text-teal-700 font-semibold hover:text-teal-800 transition-colors text-sm shrink-0"
          >
            View all categories <HiArrowRight className="text-base" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                to={`/browse-jobs?category=${cat.slug}`}
                className="group flex flex-col items-center text-center gap-4 p-5 rounded-2xl border border-navy-100 bg-white hover:border-teal-200 hover:shadow-card transition-all duration-200 h-full"
              >
                {/* Icon circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 group-hover:bg-teal-100 transition-colors">
                  <cat.icon className="text-2xl text-teal-700" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-navy-400 text-xs mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
