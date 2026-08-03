// Per-site theme config for the dashboard. Swapping this object (+ the
// :root CSS vars in index.css) is all that's needed to re-skin the shared
// dashboard components. Nothing in /components should import colors from
// anywhere else.
export const theme = {
  siteName: "Newcomer Jobline",
  tagline: "Your Career Starts Here",
  logoInitials: "NJ",
};

// Fixed status → badge variant mapping.
// Keys are the exact backend enum strings — do not rename.
export const statusVariant = {
  // Job status
  pending_review: "pending",
  active: "active",
  closed: "closed",
  expired: "closed",
  removed: "rejected",

  // Application status
  submitted: "pending",
  viewed: "pending",
  shortlisted: "active",
  interviewing: "active",
  offered: "active",
  hired: "active",
  rejected: "rejected",
  withdrawn: "closed",

  // Company verification status
  pending: "pending",
  verified: "active",
};

export const statusLabel = {
  pending_review: "Pending review",
  active: "Active",
  closed: "Closed",
  expired: "Expired",
  removed: "Removed",
  submitted: "Submitted",
  viewed: "Viewed",
  shortlisted: "Shortlisted",
  interviewing: "Interviewing",
  offered: "Offered",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  pending: "Pending",
  verified: "Verified",
};
