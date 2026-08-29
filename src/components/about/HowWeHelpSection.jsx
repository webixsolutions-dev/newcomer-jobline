// src/components/about/HowWeHelpSection.jsx
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlinePhone } from "react-icons/hi2";
import { SUPPORT_PROCESS_STEPS } from "../../data/supportProcessSteps";

/**
 * 2-column "How We Help" section with a 4-step process flow on the right.
 */
const HowWeHelpSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-navy-100">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2.3fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Text */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs sm:text-sm">
              HOW WE HELP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-navy-900 font-heading">
              Helping Newcomers Build Careers with{" "}
              <span className="text-teal-700">Confidence</span>
            </h2>
            <p className="text-navy-500 text-sm sm:text-base leading-relaxed">
              We make the job search journey easier for newcomers in Canada.
              From creating your profile to connecting with the right employers,
              we're here to support you every step of the way.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors text-sm shadow-sm"
              >
                <HiOutlineMagnifyingGlass className="text-lg" />
                Browse Jobs
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500 hover:bg-orange-50 text-orange-500 font-bold rounded-xl transition-colors text-sm shadow-sm"
              >
                <HiOutlinePhone className="text-lg" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right 4-step process flow */}
          <div className="flex flex-col gap-6 w-full">
            <h3 className="text-xl font-bold text-navy-900 font-heading relative pb-2 w-fit">
              Our Support Process
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-orange-400"></span>
            </h3>
            
            <div className="relative w-full">
              {/* Dotted horizontal connector line (hidden on mobile) */}
              <div className="hidden sm:block absolute left-12 right-12 top-[14px] border-t-2 border-dotted border-navy-200 z-0" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {SUPPORT_PROCESS_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.num} className="flex flex-col items-center w-full">
                      {/* Number Badge */}
                      <div className="h-7 w-7 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-xs mb-5 shadow-sm z-10 shrink-0">
                        {step.num}
                      </div>

                      {/* Card Container */}
                      <div className="flex flex-col items-center text-center p-5 bg-white border border-navy-100 rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 w-full flex-1 min-h-[220px]">
                        {/* Icon inside tinted circle */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700 mb-4 shadow-sm shrink-0">
                          <Icon className="text-2xl" />
                        </div>

                        {/* Content */}
                        <h4 className="font-bold text-navy-900 text-base mb-1 font-heading">
                          {step.title}
                        </h4>
                        <p className="text-navy-500 text-xs sm:text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
