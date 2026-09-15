// src/components/about/ImpactStatsBanner.jsx
import { FaUserGroup } from "react-icons/fa6";
import { usePublicDataset } from "../../hooks/usePublicDataset";

/**
 * Full-width tinted impact statistics banner.
 */
const ImpactStatsBanner = () => {
  const { dataset, loading } = usePublicDataset();
  const count = (items) => loading ? "—" : items?.length ?? 0;
  const stats = [
    { value: count(dataset?.jobs), label: "Active Jobs", colorClass: "text-teal-700" },
    { value: count(dataset?.companies), label: "Hiring Companies", colorClass: "text-gold-500" },
    { value: count(dataset?.categories), label: "Job Categories", colorClass: "text-teal-700" },
  ];
  return (
    <section className="pb-16 bg-white">
      <div className="container-app">
        <div className="bg-gold-50 border border-gold-200/50 rounded-2xl p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-10 items-center">
            
            {/* Left Block */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                <FaUserGroup className="text-xl" />
              </div>
              <p className="text-navy-700 text-sm sm:text-base leading-relaxed">
                Explore current opportunities and active employers through the
                Newcomer Jobline network.
              </p>
            </div>

            {/* Right Stat Items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gold-200/60">
              {stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center ${
                    idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                  }`}
                >
                  <span className={`text-2.5xl sm:text-3.5xl font-extrabold font-heading ${stat.colorClass}`}>
                    {stat.value}
                  </span>
                  <span className="text-navy-600 text-xs sm:text-sm mt-1 font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsBanner;
