import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  createRecruiterJob,
  getApplicationResumeUrl,
  getPublicDataset,
  getRecruiterApplications,
  getRecruiterDashboard,
  updateApplicationStatus,
  updateRecruiterJob,
} from "../lib/jobs";
import { readSession } from "../lib/auth/session";
import { getNextEmployerStage } from "../data/pipelineStages";

const EmployerDataContext = createContext(null);

const EMPTY_COMPANY = {
  id: null,
  name: "",
  website: "",
  registration_number: "",
  description: "",
  verification_status: "pending",
  status: "pending",
};

const STATUS_LABELS = {
  active: "Active",
  pending_review: "Pending Review",
  closed: "Closed",
  expired: "Expired",
  removed: "Removed",
};

const EMPLOYMENT_LABELS = {
  full_time: "Full-Time",
  part_time: "Part-Time",
  contract: "Contract",
  temporary: "Temporary",
  internship: "Internship",
  seasonal: "Seasonal",
};

const EMPLOYMENT_VALUES = Object.fromEntries(Object.entries(EMPLOYMENT_LABELS).map(([key, value]) => [value, key]));

function salaryLabel(job) {
  if (job.salary_min == null && job.salary_max == null) return "";
  const min = job.salary_min != null ? Number(job.salary_min).toLocaleString() : "";
  const max = job.salary_max != null ? Number(job.salary_max).toLocaleString() : "";
  return `${job.salary_currency || "CAD"} ${min}${min && max ? " - " : ""}${max}`.trim();
}

function normalizePosting(job, company) {
  return {
    id: String(job.id),
    jobTitle: job.title || "Untitled job",
    companyName: job.companies?.name || company?.name || "Employer",
    location: job.is_remote ? "Remote" : [job.city, job.province].filter(Boolean).join(", ") || "Canada",
    jobCategory: job.categories?.name || String(job.category_id || ""),
    categoryId: job.category_id,
    employmentType: EMPLOYMENT_LABELS[job.employment_type] || job.employment_type || "",
    salaryRange: salaryLabel(job),
    jobDescription: job.description || "",
    status: STATUS_LABELS[job.status] || job.status,
    postedDate: job.published_at || job.created_at,
    applicantCount: job.applications_count || 0,
    raw: job,
  };
}

function normalizeApplicant(application) {
  const profile = application.profiles || {};
  return {
    id: String(application.id),
    jobId: String(application.job_id),
    jobTitle: application.jobs?.title || "Job",
    name: profile.full_name || "Candidate",
    headline: profile.headline || "Job seeker",
    email: profile.email || "Not provided",
    phone: profile.phone || "Not provided",
    stage: application.status,
    appliedDate: application.created_at,
    resumeFilename: application.resume_path?.split("/").pop() || "Resume",
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    experience: Array.isArray(profile.experience) ? profile.experience : [],
    education: Array.isArray(profile.education) ? profile.education : [],
    raw: application,
  };
}

function parseLocation(location) {
  const value = String(location || "").trim();
  if (/^remote/i.test(value)) return { workplace_type: "remote", is_remote: true, city: null, province: null };
  const parts = value.split(",").map((item) => item.trim()).filter(Boolean);
  return {
    workplace_type: "onsite",
    is_remote: false,
    city: parts[0] || null,
    province: parts.slice(1).join(", ") || null,
  };
}

function parseSalary(value) {
  const numbers = String(value || "").match(/\d[\d,]*/g)?.map((item) => Number(item.replace(/,/g, ""))) || [];
  return {
    salary_min: numbers[0] || null,
    salary_max: numbers[1] || numbers[0] || null,
    salary_currency: "CAD",
    salary_period: "yearly",
  };
}

export function EmployerDataProvider({ children }) {
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [companyProfile, setCompanyProfile] = useState(EMPTY_COMPANY);
  const [categories, setCategories] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [pipeline, setPipeline] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  function token() {
    const value = readSession()?.access_token;
    if (!value) throw new Error("Your session has expired. Please sign in again.");
    return value;
  }

  function showFlash(message) {
    setFlashMessage(message);
    window.setTimeout(() => setFlashMessage(null), 4500);
  }

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = token();
      const [dashboard, applications, dataset] = await Promise.all([
        getRecruiterDashboard(accessToken),
        getRecruiterApplications(accessToken),
        getPublicDataset(),
      ]);
      const company = dashboard.companies?.[0] || EMPTY_COMPANY;
      const publicJobs = new Map((dataset?.jobs || []).map((job) => [String(job.id), job]));
      const postings = (dashboard.jobs || []).map((job) => {
        const publicJob = publicJobs.get(String(job.id));
        return normalizePosting({ ...job, ...(publicJob || {}) }, company);
      });
      setCompanyProfile(company);
      setCategories(dataset?.categories || []);
      setJobPostings(postings);
      setApplicants((applications?.items || []).map(normalizeApplicant));
      setMetrics(dashboard.metrics || {});
      setPipeline(dashboard.pipeline || {});
    } catch (loadError) {
      setError(loadError.message || "Employer data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { reload(); }, [reload]);

  function formPayload(form) {
    const category = categories.find((item) => item.name === form.jobCategory || String(item.id) === String(form.jobCategory));
    if (!category) throw new Error("Choose a valid job category.");
    return {
      title: form.jobTitle.trim(),
      category_id: category.id,
      ...parseLocation(form.location),
      experience_level: "mid_level",
      employment_type: EMPLOYMENT_VALUES[form.employmentType] || form.employmentType,
      ...parseSalary(form.salaryRange),
      skills: [],
      description: form.jobDescription.trim(),
      audience_sites: [],
    };
  }

  async function createJobPosting(form) {
    try {
      await createRecruiterJob(formPayload(form), token());
      showFlash("Job posting published.");
      await reload();
    } catch (requestError) {
      showFlash(requestError.message);
      throw requestError;
    }
  }

  async function updateJobPosting(id, form) {
    try {
      await updateRecruiterJob(id, formPayload(form), token());
      showFlash("Job posting updated.");
      await reload();
    } catch (requestError) {
      showFlash(requestError.message);
      throw requestError;
    }
  }

  async function closeJobPosting(id) {
    try {
      await updateRecruiterJob(id, { status: "closed" }, token());
      showFlash("Job posting closed.");
      await reload();
    } catch (requestError) {
      showFlash(requestError.message);
    }
  }

  async function updateApplicantStage(id, status) {
    try {
      await updateApplicationStatus(id, status, token());
      setApplicants((current) => current.map((item) => item.id === String(id) ? { ...item, stage: status } : item));
      showFlash("Applicant stage updated.");
    } catch (requestError) {
      showFlash(requestError.message);
    }
  }

  function advanceApplicantStage(id) {
    const applicant = applicants.find((item) => item.id === String(id));
    const next = getNextEmployerStage(applicant?.stage);
    if (applicant && next !== applicant.stage) updateApplicantStage(id, next);
  }

  async function viewApplicantResume(id) {
    const preview = window.open("", "_blank");
    try {
      const result = await getApplicationResumeUrl(id, token());
      if (preview) preview.location = result.url;
      else window.open(result.url, "_blank", "noopener,noreferrer");
    } catch (requestError) {
      preview?.close();
      showFlash(requestError.message);
    }
  }

  const stats = useMemo(() => ({
    activePostings: metrics.activeJobs || 0,
    totalApplicants: metrics.applications || 0,
    interviewsScheduled: pipeline.interviewing || 0,
    positionsFilled: pipeline.hired || 0,
  }), [metrics, pipeline]);

  const value = {
    jobPostings,
    applicants,
    companyProfile,
    categories,
    stats,
    loading,
    error,
    flashMessage,
    reload,
    createJobPosting,
    updateJobPosting,
    closeJobPosting,
    deleteJobPosting: null,
    advanceApplicantStage,
    rejectApplicant: (id) => updateApplicantStage(id, "rejected"),
    updateApplicantStage,
    updateApplicantNotes: () => {},
    updateCompanyProfile: () => showFlash("Company profile editing is not available in the current backend API."),
    viewApplicantResume,
    getJobPosting: (id) => jobPostings.find((item) => item.id === String(id)),
    getApplicantsForJob: (jobId) => applicants.filter((item) => item.jobId === String(jobId)).sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)),
  };

  return <EmployerDataContext.Provider value={value}>{children}</EmployerDataContext.Provider>;
}

export function useEmployerData() {
  const ctx = useContext(EmployerDataContext);
  if (!ctx) throw new Error("useEmployerData must be used within EmployerDataProvider");
  return ctx;
}
