// src/components/jobs/JobCard.jsx
import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import { useSavedJobs } from "../../lib/SavedJobsContext";
import { useOptionalDashboardData } from "../../context/DashboardDataContext";
import { useAuth } from "../../dashboard/auth/AuthContext";

/**
 * Single job listing card.
 * Supports optional dashboard mode with apply/save state from props or DashboardDataContext.
 */
const JobCard = ({
  job,
  compact = false,
  dashboardMode = false,
  isApplied: isAppliedProp,
  isSaved: isSavedProp,
  onApply,
  onToggleSave,
  saveLabel,
}) => {
  const { isAuthenticated, role } = useAuth();
  const savedJobsCtx = useSavedJobs();
  const dashboardCtx = useOptionalDashboardData();

  const inDashboard = dashboardMode || Boolean(dashboardCtx);
  const useDashboardActions = inDashboard && (onApply || dashboardCtx);

  const saved = isSavedProp ?? (
    useDashboardActions
      ? dashboardCtx?.isJobSaved(job.id)
      : savedJobsCtx.isSaved(job.id)
  );

  const applied = isAppliedProp ?? (
    useDashboardActions ? dashboardCtx?.isJobApplied(job.id) : false
  );

  const showDashboardApply =
    useDashboardActions &&
    (isAuthenticated && role === "job_seeker" || inDashboard);

  const fallbackInitial = job.company.charAt(0).toUpperCase();
  const getBadgeColor = (title) => {
    if (title.includes("IT") || title.includes("Tech")) return "bg-teal-50 text-teal-700";
    if (title.includes("Health")) return "bg-gold-50 text-gold-700";
    if (title.includes("Hospitality")) return "bg-orange-50 text-orange-700";
    return "bg-navy-50 text-navy-700";
  };
  const badgeClass = getBadgeColor(job.category);

  function handleToggleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave();
    } else if (dashboardCtx) {
      dashboardCtx.toggleSaveJob(job);
    } else {
      savedJobsCtx.toggleSaved(job.id);
    }
  }

  function handleApply(e) {
    e.preventDefault();
    if (onApply) {
      onApply();
    } else if (dashboardCtx) {
      dashboardCtx.applyToJob(job);
    }
  }

  const padding = compact ? "p-4 sm:p-5" : "p-5 sm:p-6";
  const logoSize = compact ? "w-12 h-12" : "w-14 h-14";

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 sm:gap-5 ${padding} bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-all duration-300 relative group`}
    >
      <div className={`flex flex-col items-center sm:items-start shrink-0 ${compact ? "w-20" : "w-24"}`}>
        <div
          className={`${logoSize} rounded-full overflow-hidden border border-navy-100 flex items-center justify-center bg-white mb-2 shadow-sm relative`}
        >
          <div className="absolute inset-0 bg-navy-50 flex items-center justify-center text-navy-400 font-bold text-xl">
            {fallbackInitial}
          </div>
          <img
            src={job.companyLogo}
            alt={`${job.company} logo`}
            className="w-full h-full object-cover relative z-10"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        <span
          className={`text-[10px] font-bold text-center sm:text-left leading-tight ${badgeClass.split(" ")[1]}`}
        >
          {job.company}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
        <Link to={`/jobs/${job.id}`} className="hover:underline">
          <h3 className={`font-bold text-navy-900 mb-1 ${compact ? "text-base" : "text-lg"}`}>
            {job.title}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-navy-500 mb-2 font-medium">
          <div className="flex items-center gap-1">
            <HiOutlineMapPin className="text-sm" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineBriefcase className="text-sm" />
            {job.employmentType}
          </div>
        </div>
        {!compact && (
          <p className="text-sm text-navy-600 mb-4 line-clamp-1">{job.description}</p>
        )}

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {job.tags.slice(0, compact ? 2 : job.tags.length).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-navy-50 text-navy-700 text-[10px] font-bold uppercase tracking-wider rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between mt-2 sm:mt-0 shrink-0 gap-3">
        <div className="flex items-center gap-3 w-full justify-between sm:w-auto sm:justify-end">
          <span className="text-xs font-bold text-navy-400">{job.postedAt}</span>
          <button
            type="button"
            onClick={handleToggleSave}
            className="p-1.5 text-navy-400 hover:text-teal-700 transition-colors"
            aria-label={saved ? "Unsave job" : "Save job"}
          >
            {saved ? (
              <HiBookmark className="text-xl text-teal-700" />
            ) : (
              <HiOutlineBookmark className="text-xl" />
            )}
          </button>
        </div>

        <div className="mt-auto hidden sm:block">
          {showDashboardApply && applied ? (
            <span className="inline-flex items-center gap-1.5 px-5 py-2 bg-teal-50 text-teal-700 text-sm font-bold rounded-lg border border-teal-100">
              <HiOutlineCheckCircle className="text-lg" />
              Applied
            </span>
          ) : showDashboardApply ? (
            <button
              type="button"
              onClick={handleApply}
              className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Apply Now
            </button>
          ) : (
            <Link
              to={`/jobs/${job.id}`}
              className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>

      <div className="block sm:hidden w-full">
        {showDashboardApply && applied ? (
          <span className="w-full flex justify-center items-center gap-1.5 px-6 py-2.5 bg-teal-50 text-teal-700 text-sm font-bold rounded-lg border border-teal-100">
            <HiOutlineCheckCircle className="text-lg" />
            Applied
          </span>
        ) : showDashboardApply ? (
          <button
            type="button"
            onClick={handleApply}
            className="w-full flex justify-center px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Apply Now
          </button>
        ) : (
          <Link
            to={`/jobs/${job.id}`}
            className="w-full flex justify-center px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Apply Now
          </Link>
        )}
        {saveLabel && saved && (
          <button
            type="button"
            onClick={handleToggleSave}
            className="mt-2 w-full text-center text-xs font-semibold text-red-600 hover:text-red-700"
          >
            {saveLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
