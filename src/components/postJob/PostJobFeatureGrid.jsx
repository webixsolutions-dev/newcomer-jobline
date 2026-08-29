// src/components/postJob/PostJobFeatureGrid.jsx
import { motion } from "framer-motion";
import {
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
  HiOutlineStar,
  HiOutlineDocumentCheck,
} from "react-icons/hi2";

/**
 * 4-card feature grid directly below the hero.
 * Matches the icon-on-top card style from the Homepage feature highlights.
 */
const FEATURES = [
  {
    icon: HiOutlineUserGroup,
    title: "Inclusive Hiring",
    desc: "Build a stronger team by hiring from a diverse pool of newcomer talent.",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Canada-Wide Reach",
    desc: "Your job post is seen by newcomers across Canada who are ready to work.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
  {
    icon: HiOutlineStar,
    title: "Qualified Candidates",
    desc: "Connect with skilled and motivated professionals from a variety of industries.",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    icon: HiOutlineDocumentCheck,
    title: "Simple Posting Process",
    desc: "Post your job in minutes with an easy and straightforward process.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
];

const PostJobFeatureGrid = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-2xl border border-navy-100 shadow-card hover:shadow-soft transition-shadow duration-300"
            >
              {/* Circular icon */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full ${f.bg} flex-shrink-0`}
              >
                <f.icon className={`text-2xl ${f.color}`} />
              </div>

              {/* Title + teal underline accent */}
              <div className="flex flex-col items-center gap-2">
                <h3 className="font-bold text-navy-900 text-base leading-tight font-heading">
                  {f.title}
                </h3>
                <div className="w-8 h-0.5 bg-teal-500 rounded-full" />
              </div>

              <p className="text-navy-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostJobFeatureGrid;
