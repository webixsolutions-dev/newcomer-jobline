import { api } from "./api";

const EMPLOYMENT_LABELS = {
  full_time: "Full-Time",
  part_time: "Part-Time",
  contract: "Contract",
  temporary: "Temporary",
  internship: "Internship",
  seasonal: "Seasonal",
};

export function normalizeJob(job, categories = []) {
  if (!job) return null;

  const category = job.categories || categories.find((item) => Number(item.id) === Number(job.category_id));
  const company = job.companies || job.company || null;
  const location = job.is_remote
    ? "Remote, Canada"
    : [job.city, job.province].filter(Boolean).join(", ") || "Canada";
  const employmentType = EMPLOYMENT_LABELS[job.employment_type] || job.employment_type || "Not specified";
  const workStyle = job.workplace_type === "hybrid" ? "Hybrid" : job.is_remote ? "Remote" : "On-site";
  const tags = [employmentType, workStyle, ...(Array.isArray(job.skills) ? job.skills.slice(0, 3) : [])];
  const dateToUse = job.published_at || job.created_at;
  let postedAt = "Recently";

  if (dateToUse) {
    const diffMinutes = Math.max(0, Math.floor((Date.now() - new Date(dateToUse).getTime()) / 60_000));
    if (diffMinutes < 60) postedAt = `${Math.max(1, diffMinutes)}m ago`;
    else if (diffMinutes < 1_440) postedAt = `${Math.floor(diffMinutes / 60)}h ago`;
    else postedAt = `${Math.floor(diffMinutes / 1_440)}d ago`;
  }

  const logoPath = company?.logo_path || company?.logo_url;
  const companyLogo = /^https?:\/\//i.test(logoPath || "") ? logoPath : "/logo.png";

  return {
    id: String(job.id),
    title: job.title || "Untitled job",
    company: company?.name || "Employer",
    companyLogo,
    location,
    isRemote: Boolean(job.is_remote),
    employmentType,
    category: category?.name || "Other",
    workStyle,
    description: job.description || "",
    tags: [...new Set(tags.filter(Boolean))],
    postedAt,
    salaryMin: Number(job.salary_min || 0),
    salaryMax: Number(job.salary_max || 0),
    salaryCurrency: job.salary_currency || "CAD",
    salaryPeriod: job.salary_period || "yearly",
    raw: job,
  };
}

export async function getPublicDataset() {
  return api("/public/dataset");
}

export async function getServiceCareCategories() {
  const data = await api("/public/categories");
  return data?.items || [];
}

export async function getPublicJobs(params = {}) {
  const query = new URLSearchParams();
  const mappings = {
    q: params.q,
    location: params.location,
    category: params.category,
    type: params.type || params.employment_type,
    workplace: params.workplace,
    salary: params.salary,
    date: params.date,
    page: params.page,
    limit: params.limit || 60,
  };
  Object.entries(mappings).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, String(value));
  });
  return api(`/public/jobs?${query.toString()}`);
}

export async function getPublicJob(id) {
  const data = await api(`/public/jobs/${encodeURIComponent(id)}`);
  return data?.job || null;
}

export async function applyToJob(id, token, payload = {}) {
  return api(`/job-seeker/jobs/${encodeURIComponent(id)}/apply`, {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}

export async function getSeekerDashboard(token) {
  return api("/job-seeker/dashboard", {}, token);
}

export async function getRecommendedJobs(token, limit = 6) {
  return api(`/job-seeker/recommended-jobs?limit=${limit}`, {}, token);
}

export async function saveJob(id, token) {
  return api(`/job-seeker/jobs/${encodeURIComponent(id)}/save`, {
    method: "POST",
    body: JSON.stringify({}),
  }, token);
}

export async function unsaveJob(id, token) {
  return api(`/job-seeker/jobs/${encodeURIComponent(id)}/save`, { method: "DELETE" }, token);
}

export async function getResumes(token) {
  return api("/job-seeker/resumes", {}, token);
}

export async function registerResume(payload, token) {
  return api("/job-seeker/resumes", {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}

export async function updateProfile(payload, token) {
  return api("/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  }, token);
}

export async function getRecruiterDashboard(token) {
  return api("/recruiter/dashboard", {}, token);
}

export async function getRecruiterApplications(token, params = {}) {
  const query = new URLSearchParams({ page: String(params.page || 1), pageSize: String(params.pageSize || 100) });
  if (params.status && params.status !== "all") query.set("status", params.status);
  return api(`/recruiter/applications?${query}`, {}, token);
}

export async function createRecruiterJob(payload, token) {
  return api("/recruiter/jobs", { method: "POST", body: JSON.stringify(payload) }, token);
}

export async function updateRecruiterJob(id, payload, token) {
  return api(`/recruiter/jobs/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  }, token);
}

export async function updateApplicationStatus(id, status, token) {
  return api(`/recruiter/applications/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }, token);
}

export async function getApplicationResumeUrl(id, token) {
  return api(`/recruiter/applications/${encodeURIComponent(id)}/resume-url`, {}, token);
}
