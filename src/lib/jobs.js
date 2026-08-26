// src/lib/jobs.js
import { api } from "./api";

/**
 * Normalizes a raw job object from the backend API into the format expected by frontend components.
 */
export function normalizeJob(job, categories = []) {
  if (!job) return null;

  // Find category name by category_id
  const categoryObj = categories.find((c) => Number(c.id) === Number(job.category_id));
  const categoryName = categoryObj ? categoryObj.name : "All categories";

  // Location string, e.g. "Toronto, ON"
  const location = job.city && job.province
    ? `${job.city}, ${job.province}`
    : job.city || job.province || (job.is_remote ? "Remote, Canada" : "Canada");

  // Determine workStyle from is_remote
  const workStyle = job.is_remote ? "Remote" : "On-site";

  // Determine tags
  const tags = [];
  if (job.employment_type) tags.push(job.employment_type);
  if (job.is_remote) tags.push("Remote");
  else tags.push("On-site");

  // Calculate relative posted date
  const dateToUse = job.published_at || job.created_at;
  let postedAt = "Recently";
  if (dateToUse) {
    const published = new Date(dateToUse);
    const now = new Date();
    const diffMs = now - published;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      postedAt = `${Math.max(1, diffMins)}m ago`;
    } else if (diffHours < 24) {
      postedAt = `${diffHours}h ago`;
    } else if (diffDays === 1) {
      postedAt = "Yesterday";
    } else {
      postedAt = `${diffDays}d ago`;
    }
  }

  return {
    id: String(job.id),
    title: job.title,
    company: job.company?.name || "Anonymous Employer",
    companyLogo: job.company?.logo_url || "/logo.png",
    location,
    isRemote: Boolean(job.is_remote),
    employmentType: job.employment_type || "Full-Time",
    category: categoryName,
    workStyle,
    description: job.description || "",
    tags,
    postedAt,
    salaryMin: Number(job.salary_min || 0),
    salaryMax: Number(job.salary_max || 0),
    salaryCurrency: job.salary_currency || "CAD",
    salaryPeriod: job.salary_period || "yearly",
    raw: job,
  };
}

/* ── API Endpoints Client Methods ── */

export async function getServiceCareCategories() {
  // Sector ID = 3 is used for ServiceCare/Newcomer context in shared taxonomy backend
  return api("/v1/taxonomy/categories?sector_id=3");
}

export async function getPublicJobs(params = {}) {
  const query = new URLSearchParams();
  if (params.q) query.append("q", params.q);
  if (params.category_id) query.append("category_id", params.category_id);
  if (params.city) query.append("city", params.city);
  if (params.province) query.append("province", params.province);
  if (params.employment_type) query.append("employment_type", params.employment_type);
  if (params.is_remote !== undefined) query.append("is_remote", String(params.is_remote));
  query.append("limit", String(params.limit || 100));

  const queryString = query.toString();
  return api(`/v1/jobs${queryString ? `?${queryString}` : ""}`);
}

export async function getPublicJob(id) {
  return api(`/v1/jobs/${id}`);
}

export async function recordJobView(id) {
  return api(`/v1/jobs/${id}/view`, { method: "POST", body: JSON.stringify({}) });
}

export async function applyToJob(id, token, payload = {}) {
  return api(`/v1/jobs/${id}/applications`, {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}

export async function getMyApplications(token) {
  return api("/v1/me/applications", {}, token);
}

export async function getMyCompanies(token) {
  return api("/v1/companies", {}, token);
}

export async function getEmployerJobs(token) {
  return api("/v1/employer/jobs", {}, token);
}

export async function getJobApplications(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/applications`, {}, token);
}

export async function getJobViews(jobId, token) {
  return api(`/v1/employer/jobs/${jobId}/views`, {}, token);
}

export async function createEmployerJob(payload, token) {
  return api("/v1/employer/jobs", {
    method: "POST",
    body: JSON.stringify(payload),
  }, token);
}
