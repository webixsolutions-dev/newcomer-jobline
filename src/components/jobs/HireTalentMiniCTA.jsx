// src/components/jobs/HireTalentMiniCTA.jsx
import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { HiOutlineBriefcase, HiOutlineEnvelope } from "react-icons/hi2";

/**
 * Tinted inline CTA band for employers.
 */
const HireTalentMiniCTA = () => {
  return (
    <section className="pb-10 sm:pb-16 bg-white">
      <div className="container-app">
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Content */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm mt-1 sm:mt-0">
              <FaUserGroup className="text-2xl" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-teal-900 font-heading mb-2 leading-tight">
                Looking to hire newcomer talent?
              </h3>
              <p className="text-teal-800 text-sm sm:text-base max-w-lg">
                Access diverse talent, build inclusive teams, and grow your business.
                Post a job today or contact our team to learn more.
              </p>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
            <Link
              to="/post-job"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-colors text-sm shadow-sm whitespace-nowrap"
            >
              <HiOutlineBriefcase className="text-lg" />
              Post a Job
            </Link>
            <Link
              to="/contact"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-800 border border-teal-700/30 hover:border-teal-700 font-bold rounded-xl transition-colors text-sm shadow-sm whitespace-nowrap"
            >
              <HiOutlineEnvelope className="text-lg" />
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HireTalentMiniCTA;
