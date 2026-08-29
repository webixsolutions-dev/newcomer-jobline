// src/components/jobs/JobsHowItWorks.jsx
import { HiOutlineUserCircle, HiOutlineMagnifyingGlass, HiOutlinePaperAirplane } from "react-icons/hi2";

const STEPS = [
  {
    num: "1",
    icon: HiOutlineUserCircle,
    title: "Create Your Profile",
    desc: "Sign up and build your profile. Add your skills, experience, and certifications.",
  },
  {
    num: "2",
    icon: HiOutlineMagnifyingGlass,
    title: "Browse Jobs",
    desc: "Search newcomer-friendly jobs and filter by location, category, or job type.",
  },
  {
    num: "3",
    icon: HiOutlinePaperAirplane,
    title: "Apply with Confidence",
    desc: "Apply to jobs that match your goals and get job-ready resources along the way.",
  },
];

/**
 * 3-step row with arrow connectors.
 */
const JobsHowItWorks = () => {
  return (
    <section className="py-10 sm:py-16 bg-gold-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-16 items-center">
          
          {/* ── Left: Heading ── */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight">
              How It Works
            </h2>
            <p className="text-navy-500 text-base leading-relaxed">
              Getting a job in Canada is easier with the right support. Follow
              three simple steps to get started.
            </p>
          </div>

          {/* ── Right: Steps ── */}
          <div className="relative flex flex-col sm:flex-row gap-6 lg:gap-8">
            {/* Arrows behind cards (hidden on mobile) */}
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-px bg-transparent -translate-y-1/2 z-0">
              <div className="absolute left-[30%] w-6 text-navy-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute left-[65%] w-6 text-navy-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="relative z-10 flex-1 flex flex-col p-6 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300"
              >
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  {step.num}
                </div>
                
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700 mb-5 ml-2">
                  <step.icon className="text-2xl" />
                </div>
                
                {/* Text */}
                <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading mb-2">
                  {step.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default JobsHowItWorks;
