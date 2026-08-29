// src/components/employers/EmployerTrustStatsStrip.jsx
import { motion } from "framer-motion";
import { HiOutlineUserGroup, HiOutlineBriefcase, HiOutlineGlobeAlt } from "react-icons/hi2";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import StatCard from "../common/StatCard";

/**
 * Trust stats strip on light-teal-tinted background.
 * Layout: Trust statement (left) + 3 stats with vertical dividers.
 */
const EmployerTrustStatsStrip = () => {
  return (
    <section className="py-8 bg-teal-50/50 border-y border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-teal-100">
          
          {/* Trust Statement */}
          <div className="flex items-center gap-4 py-4 md:py-2 md:pr-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
              <FaCanadianMapleLeaf className="text-2xl" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-navy-900 font-heading leading-tight">
                Trusted by employers across Canada
              </p>
              <p className="text-xs text-navy-500 mt-1">
                Building stronger teams and communities together.
              </p>
            </div>
          </div>

          {/* Stat 1 */}
          <div className="flex items-center gap-4 py-4 md:py-2 md:px-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-teal-100 text-teal-700">
              <HiOutlineUserGroup className="text-2xl" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-navy-900 font-heading leading-none">
                5,000+
              </p>
              <p className="text-sm font-bold text-navy-900 mt-1">Job Seekers</p>
              <p className="text-xs text-navy-500 mt-0.5">Skilled newcomers ready to work.</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-4 py-4 md:py-2 md:px-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-teal-100 text-teal-700">
              <HiOutlineBriefcase className="text-2xl" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-navy-900 font-heading leading-none">
                1,200+
              </p>
              <p className="text-sm font-bold text-navy-900 mt-1">Employers</p>
              <p className="text-xs text-navy-500 mt-0.5">Across industries and all sizes.</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-4 py-4 md:py-2 md:pl-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white border border-teal-100 text-teal-700">
              <HiOutlineGlobeAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-navy-900 font-heading leading-tight">
                Nationwide Reach
              </p>
              <p className="text-xs text-navy-500 mt-1">Connecting talent and opportunities coast to coast.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmployerTrustStatsStrip;
