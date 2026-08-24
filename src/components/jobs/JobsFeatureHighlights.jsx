// src/components/jobs/JobsFeatureHighlights.jsx
import { FaUserGroup, FaCanadianMapleLeaf } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { PiPlant } from "react-icons/pi"; // Or similar for career support

const HIGHLIGHTS = [
  {
    icon: FaUserGroup,
    title: "Inclusive Employers",
    desc: "Work with employers who value diversity and inclusion.",
  },
  {
    icon: FaCanadianMapleLeaf,
    title: "Canada-Wide Opportunities",
    desc: "Find jobs in every province and territory.",
  },
  {
    icon: PiPlant,
    title: "Career Support",
    desc: "Access tools, resources, and guidance to grow your career.",
  },
  {
    icon: HiOutlineBookOpen,
    title: "Settlement-Friendly Jobs",
    desc: "Discover jobs that support your settlement and success.",
  },
];

/**
 * 4-item feature highlight row.
 */
const JobsFeatureHighlights = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 pb-8 sm:pb-10 border-b border-navy-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-800 text-gold-400">
              <item.icon className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-base mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-navy-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsFeatureHighlights;
