// src/pages/JobDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineMapPin, HiOutlineBriefcase, HiOutlineCurrencyDollar, HiOutlineBookmark, HiBookmark } from "react-icons/hi2";
import { getPublicJob, getServiceCareCategories, normalizeJob, applyToJob } from "../lib/jobs";
import { useAuth } from "../dashboard/auth/AuthContext";
import { useSavedJobs } from "../lib/SavedJobsContext";
import { readSession } from "../lib/auth/session";

/**
 * Dynamic detail page for individual job postings connecting to backend endpoints.
 */
const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();
  const { isSaved, toggleSaved } = useSavedJobs();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Application form/state
  const [coverLetter, setCoverLetter] = useState("");
  const [applyState, setApplyState] = useState({ loading: false, message: null, error: null });

  // Load details and record view
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setApplyState({ loading: false, message: null, error: null });

    Promise.all([
      getPublicJob(jobId),
      getServiceCareCategories()
    ])
      .then(([jobData, categories]) => {
        if (active) {
          const normalized = normalizeJob(jobData, categories);
          if (normalized) {
            setJob(normalized);
          } else {
            setError("Job not found");
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load job details");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setApplyState({ loading: false, message: null, error: "Please log in as a job seeker to apply." });
      return;
    }
    if (role !== "job_seeker") {
      setApplyState({ loading: false, message: null, error: "Only job seekers can apply to job postings." });
      return;
    }

    setApplyState({ loading: true, message: null, error: null });
    const token = readSession()?.access_token;

    try {
      await applyToJob(jobId, token, { cover_letter: coverLetter || undefined });
      setApplyState({ loading: false, message: "Your application was submitted successfully!", error: null });
      setCoverLetter("");
    } catch (err) {
      setApplyState({ loading: false, message: null, error: err.message || "Failed to submit application." });
    }
  };

  const saved = isSaved(jobId);

  async function handleSave() {
    if (!isAuthenticated || role !== "job_seeker") {
      navigate("/login", { state: { from: `/jobs/${jobId}` } });
      return;
    }
    try {
      await toggleSaved(job.id);
    } catch (saveError) {
      setApplyState({ loading: false, message: null, error: saveError.message });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4 pt-[72px]">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-navy-200 border-t-teal-700" aria-label="Loading job details" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-navy-50 flex flex-col items-center justify-center p-4 pt-[72px]">
        <div className="bg-white p-8 rounded-2xl shadow-card text-center max-w-lg w-full border border-navy-100">
          <p className="text-red-500 font-semibold mb-4">{error || "Job not found"}</p>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-colors"
          >
            <HiOutlineArrowLeft className="text-lg" />
            Back to Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  const fallbackInitial = job.company.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-navy-50 py-12 px-4 pt-[96px]">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-navy-500 hover:text-navy-900 font-semibold mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="text-lg" />
          Back to Browse Jobs
        </Link>

        <div className="bg-white rounded-3xl border border-navy-100 shadow-sm p-6 sm:p-10 flex flex-col gap-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6 border-b border-navy-100">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-navy-100 flex items-center justify-center bg-navy-50 text-navy-400 font-bold text-2xl shrink-0 relative">
                {fallbackInitial}
                {job.companyLogo && (
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-full h-full object-cover absolute inset-0 z-10"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-heading leading-tight">
                  {job.title}
                </h1>
                <p className="text-teal-700 font-bold mt-1 text-sm">{job.company}</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 border border-navy-200 hover:border-teal-600 rounded-xl text-sm font-semibold transition-all duration-200 hover:text-teal-700 bg-white"
            >
              {saved ? (
                <>
                  <HiBookmark className="text-lg text-teal-700" />
                  Saved
                </>
              ) : (
                <>
                  <HiOutlineBookmark className="text-lg text-navy-400" />
                  Save Job
                </>
              )}
            </button>
          </div>

          {/* Details row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                <HiOutlineMapPin className="text-xl" />
              </div>
              <div>
                <p className="text-xs text-navy-400 font-semibold uppercase tracking-wider">Location</p>
                <p className="text-navy-900 font-bold text-sm sm:text-base mt-0.5">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                <HiOutlineBriefcase className="text-xl" />
              </div>
              <div>
                <p className="text-xs text-navy-400 font-semibold uppercase tracking-wider">Job Type</p>
                <p className="text-navy-900 font-bold text-sm sm:text-base mt-0.5">{job.employmentType} ({job.workStyle})</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                <HiOutlineCurrencyDollar className="text-xl" />
              </div>
              <div>
                <p className="text-xs text-navy-400 font-semibold uppercase tracking-wider">Salary Range</p>
                <p className="text-navy-900 font-bold text-sm sm:text-base mt-0.5">
                  {job.salaryMin > 0 && job.salaryMax > 0
                    ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()} ${job.salaryCurrency}/${job.salaryPeriod === 'yearly' ? 'yr' : 'hr'}`
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-navy-900 font-heading">Job Description</h3>
            <p className="text-navy-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 pb-6 border-b border-navy-100">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-navy-50 text-navy-700 text-xs font-bold uppercase tracking-wider rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Apply section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-navy-900 font-heading">Apply for this Position</h3>
            
            <form onSubmit={handleApply} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you'd be a great fit for this job..."
                  className="w-full min-h-[120px] border border-navy-100 rounded-xl px-4 py-3 text-sm text-navy-900 placeholder-navy-300 outline-none focus:border-teal-600 transition-colors bg-white resize-y"
                  disabled={applyState.loading}
                />
              </div>

              {applyState.message && (
                <div className="p-4 bg-teal-50 text-teal-800 rounded-xl border border-teal-100 text-sm font-semibold">
                  {applyState.message}
                </div>
              )}

              {applyState.error && (
                <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100 text-sm font-semibold">
                  {applyState.error}
                </div>
              )}

              <button
                type="submit"
                className="inline-flex justify-center items-center px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-all duration-200 shadow-soft text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-fit"
                disabled={applyState.loading}
              >
                {applyState.loading ? "Submitting Application..." : "Submit Application"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
