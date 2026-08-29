// src/components/about/OurStorySection.jsx
import { Link } from "react-router-dom";
import { HiOutlinePhone } from "react-icons/hi2";
import AboutSplitSection from "./AboutSplitSection";
import { ABOUT_VALUE_CARDS } from "../../data/aboutValueCards";
import { ABOUT_STATS } from "../../data/aboutStats";

/**
 * Our Story split section + "What We Stand For" cards + stats strip underneath.
 */
const OurStorySection = () => {
  const buttons = (
    <Link
      to="/contact"
      className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500 hover:bg-orange-50 text-orange-500 font-bold rounded-xl transition-colors text-sm shadow-sm"
    >
      <HiOutlinePhone className="text-lg" />
      Contact Us
    </Link>
  );

  return (
    <>
      {/* Story Split */}
      <AboutSplitSection
        eyebrowText="OUR STORY"
        headingParts={{
          normal: "Built to Support",
          highlighted: "Newcomers Across Canada",
        }}
        paragraph="Newcomer Jobline was created to remove barriers and open doors for newcomers seeking meaningful employment in Canada. We connect job seekers with inclusive employers, help them settle into the workforce, and build a stronger, more diverse Canada—together."
        buttons={buttons}
        image="/aboutus/built.webp"
        altText="Team working at laptop"
        compact={true}
        isReverse={false}
      />

      {/* Values & Stats */}
      <section className="pb-16 bg-white">
        <div className="container-app">
          
          {/* Values Heading */}
          <div className="text-center mb-12">
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs sm:text-sm relative block pb-3">
              WHAT WE STAND FOR
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-orange-400"></span>
            </span>
          </div>

          {/* 3 Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ABOUT_VALUE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex flex-col p-8 bg-white border border-navy-100 rounded-2xl shadow-sm hover:shadow-card transition-shadow duration-300 relative group"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white mb-6 shrink-0 ${card.colorClass}`}
                  >
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 font-heading mb-3 relative">
                    {card.title}
                    <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-teal-600"></span>
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed mt-4">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Strip */}
          <div className="bg-teal-50 border border-teal-100/50 rounded-2xl py-8 px-6 sm:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-teal-200/60">
              {ABOUT_STATS.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`flex flex-row items-center gap-5 ${
                      idx > 0 ? "pt-6 md:pt-0 md:pl-10" : ""
                    }`}
                  >
                    {/* Circle Icon wrapper */}
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-teal-100/65 text-teal-800 flex-shrink-0 shadow-sm">
                      <Icon className="text-2.5xl sm:text-3.5xl" />
                    </div>

                    {/* Content Block */}
                    <div className="flex flex-col text-left">
                      <span className="text-2.5xl sm:text-3.5xl font-extrabold text-teal-800 font-heading leading-tight">
                        {stat.value}
                      </span>
                      <span className="text-navy-900 font-bold text-sm sm:text-base mt-0.5">
                        {stat.label}
                      </span>
                      <span className="text-navy-500 text-xs sm:text-sm mt-0.5 leading-tight">
                        {stat.subtext}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default OurStorySection;
