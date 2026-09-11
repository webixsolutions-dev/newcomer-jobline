// src/components/jobs/JobsCategoriesGrid.jsx
import { Link } from "react-router-dom";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { usePublicDataset } from "../../hooks/usePublicDataset";

/**
 * 6-card category grid (visually distinct from Module 1).
 */
const JobsCategoriesGrid = () => {
  const { dataset, loading } = usePublicDataset();
  const categories = (dataset?.categories || []).slice(0, 6);
  return (
    <section className="py-10 sm:py-16 bg-navy-50/40">
      <div className="container-app">
        
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight mb-4">
            Popular Job Categories
          </h2>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl">
            Explore in-demand roles across Canada and find opportunities that match your skills and experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {loading && Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-2xl border border-navy-100 bg-white" />
          ))}
          {!loading && categories.map((cat, index) => (
            <div
              key={cat.id || cat.slug}
              className="flex flex-col p-6 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300"
            >
              {/* Icon */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full mb-6 ${
                  index % 2
                    ? "bg-gold-50 text-gold-700"
                    : "bg-teal-50 text-teal-700"
                }`}
              >
                <HiOutlineBriefcase className="text-2xl" />
              </div>
              
              {/* Text */}
              <h3 className="font-bold text-navy-900 text-lg leading-tight font-heading mb-3">
                {cat.name}
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed mb-6 flex-1">
                Browse current opportunities in {cat.name.toLowerCase()}.
              </p>

              {/* Link */}
              <Link
                to={`/jobs?category=${encodeURIComponent(cat.name)}`}
                className="font-bold text-teal-700 hover:text-teal-800 transition-colors text-sm flex items-center gap-1"
              >
                Browse Jobs <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JobsCategoriesGrid;
