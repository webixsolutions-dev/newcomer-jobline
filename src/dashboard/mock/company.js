/** @typedef {import('./types').Company} Company */

export const mockCompanyPending = {
  id: "cmp_001",
  name: "Northbridge Offices Inc.",
  website: "https://northbridgeoffices.ca",
  registration_number: "BC1029384",
  logo_path: null,
  description: "A growing property management firm hiring across BC.",
  verification_status: "pending",
  rejection_reason: null,
  status: "active",
  created_at: "2026-07-01T09:00:00.000Z",
};

export const mockCompanyVerified = {
  ...mockCompanyPending,
  verification_status: "verified",
};

export const mockCompanyRejected = {
  ...mockCompanyPending,
  verification_status: "rejected",
  rejection_reason:
    "Business registration number could not be matched to public records. Please re-upload a clearer verification document.",
};

/** null = recruiter hasn't created a company yet (forces Company Setup). */
export const mockCompanyNone = null;
