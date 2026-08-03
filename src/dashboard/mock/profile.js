/** @typedef {import('./types').Profile} Profile */

export const mockSeekerProfile = {
  id: "usr_001",
  role: "job_seeker",
  status: "active",
  email: "amara.osei@example.com",
  full_name: "Amara Osei",
  phone: "+1 (416) 555-0142",
  headline: "Executive Assistant | 5 yrs office administration",
  location_province: "Ontario",
  location_city: "Toronto",
  skills: ["Scheduling", "Data Entry", "Microsoft Excel", "Customer Service"],
  default_resume_path: null,
  created_at: "2025-11-02T09:00:00.000Z",
};

export const mockRecruiterProfile = {
  id: "usr_002",
  role: "recruiter",
  status: "active",
  email: "hiring@northbridgeoffices.ca",
  full_name: "Daniel Reyes",
  phone: "+1 (604) 555-0110",
  headline: null,
  location_province: "British Columbia",
  location_city: "Vancouver",
  skills: [],
  default_resume_path: null,
  created_at: "2025-09-14T09:00:00.000Z",
};

/** Profile completeness — used by the seeker dashboard-home nudge. */
export function profileCompleteness(profile) {
  const fields = [
    profile.phone,
    profile.headline,
    profile.location_city,
    profile.skills?.length > 0,
    profile.default_resume_path,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}
