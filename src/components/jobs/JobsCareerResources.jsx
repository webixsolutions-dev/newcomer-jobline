// src/components/jobs/JobsCareerResources.jsx
import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { JOBS_CAREER_RESOURCES } from "../../data/jobsCareerResources";

/**
 * 3-card resources row with bottom inline banner.
 */
const JobsCareerResources = () => {
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-start mb-12">
          {/* ── Left: Heading ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight">
              Career Resources for Newcomers
            </h2>
            <p className="text-navy-500 text-base leading-relaxed">
              Access free tools and guidance to help you start and grow your career in Canada.
            </p>
          </div>

          {/* ── Right: Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOBS_CAREER_RESOURCES.map((res) => (
              <Link
                key={res.title}
                to={res.link}
                className="flex flex-col p-6 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      res.tint === "peach"
                        ? "bg-gold-50 text-gold-700"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    <res.icon className="text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-900 text-base mb-1">
                      {res.title}
                    </h3>
                    <p className="text-navy-500 text-sm leading-relaxed mb-4">
                      {res.desc}
                    </p>
                    <span className="text-navy-300 group-hover:text-teal-700 transition-colors">
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom Banner ── */}
        <div className="bg-navy-50/50 border border-navy-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
              <FaUserGroup className="text-xl" />
            </div>
            <p className="text-navy-700 text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-navy-900 mr-2">New to Canada?</span>
              You're not alone. We connect newcomers with inclusive employers and the resources you need to succeed.
            </p>
          </div>
          <Link
            to="/resources"
            className="shrink-0 font-bold text-teal-700 hover:text-teal-800 transition-colors text-sm sm:text-base flex items-center gap-1"
          >
            Explore All Resources <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default JobsCareerResources;
