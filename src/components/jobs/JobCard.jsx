// src/components/jobs/JobCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMapPin, HiOutlineBriefcase, HiOutlineBookmark, HiBookmark } from "react-icons/hi2";
import { useSavedJobs } from "../../lib/SavedJobsContext";

/**
 * Single job listing card.
 */
const JobCard = ({ job }) => {
  const { isSaved, toggleSaved } = useSavedJobs();
  const saved = isSaved(job.id);

  // Derive a basic fallback color/initials if logo fails
  const fallbackInitial = job.company.charAt(0).toUpperCase();
  const getBadgeColor = (title) => {
    if (title.includes("IT") || title.includes("Tech")) return "bg-teal-50 text-teal-700";
    if (title.includes("Health")) return "bg-gold-50 text-gold-700";
    if (title.includes("Hospitality")) return "bg-orange-50 text-orange-700";
    return "bg-navy-50 text-navy-700";
  };
  const badgeClass = getBadgeColor(job.category);

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 sm:p-6 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-all duration-300 relative group">
      
      {/* ── Left: Logo ── */}
      <div className="flex flex-col items-center sm:items-start shrink-0 w-24">
        <div className="w-14 h-14 rounded-full overflow-hidden border border-navy-100 flex items-center justify-center bg-white mb-2 shadow-sm relative">
          <div className="absolute inset-0 bg-navy-50 flex items-center justify-center text-navy-400 font-bold text-xl">
            {fallbackInitial}
          </div>
          {/* Logo image sits on top, if it fails fallback shows through */}
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              e.target.style.display = 'none'; // hide broken image so fallback shows
            }}
          />
        </div>
        <span className={`text-[10px] font-bold text-center sm:text-left leading-tight ${badgeClass.split(' ')[1]}`}>
          {job.company}
        </span>
      </div>

      {/* ── Middle: Info ── */}
      <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
        <Link to={`/jobs/${job.id}`} className="hover:underline">
          <h3 className="font-bold text-navy-900 text-lg mb-1">{job.title}</h3>
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-navy-500 mb-2 font-medium">
          <div className="flex items-center gap-1">
            <HiOutlineMapPin className="text-sm" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineBriefcase className="text-sm" />
            {job.employmentType}
          </div>
        </div>
        <p className="text-sm text-navy-600 mb-4 line-clamp-1">{job.description}</p>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-navy-50 text-navy-700 text-[10px] font-bold uppercase tracking-wider rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between mt-4 sm:mt-0 shrink-0">
        <div className="flex items-center gap-3 w-full justify-between sm:w-auto sm:justify-end">
          <span className="text-xs font-bold text-navy-400">{job.postedAt}</span>
          <button
            onClick={() => toggleSaved(job.id)}
            className="p-1.5 text-navy-400 hover:text-teal-700 transition-colors"
            aria-label="Save job"
          >
            {saved ? <HiBookmark className="text-xl text-teal-700" /> : <HiOutlineBookmark className="text-xl" />}
          </button>
        </div>
        <div className="mt-auto hidden sm:block">
          <Link
            to={`/jobs/${job.id}`}
            className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
      
      {/* Mobile Apply Button */}
      <div className="block sm:hidden w-full mt-4">
        <Link
          to={`/jobs/${job.id}`}
          className="w-full flex justify-center px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
        >
          Apply Now
        </Link>
      </div>

    </div>
  );
};

export default JobCard;
