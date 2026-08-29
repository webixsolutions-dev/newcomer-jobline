/** Employer-facing pipeline stages (recruiter view). */
export const EMPLOYER_PIPELINE_STAGES = [
  "new",
  "reviewed",
  "shortlisted",
  "interview",
  "offer",
  "rejected",
];

/** Seeker-facing labels shown in the Job Seeker Dashboard. */
export const SEEKER_STAGE_LABELS = {
  submitted: "Applied",
  viewed: "In Review",
  shortlisted: "Shortlisted",
  interviewing: "Interview",
  offered: "Offer",
  rejected: "Not Selected",
};

/** Employer-facing labels shown in the Employer Dashboard. */
export const EMPLOYER_STAGE_LABELS = {
  new: "New",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

/** Map seeker backend enums → employer pipeline stage. */
export const SEEKER_TO_EMPLOYER_STAGE = {
  submitted: "new",
  viewed: "reviewed",
  shortlisted: "shortlisted",
  interviewing: "interview",
  offered: "offer",
  rejected: "rejected",
  hired: "offer",
};

/** Map employer pipeline stage → seeker backend enum (for future API sync). */
export const EMPLOYER_TO_SEEKER_STAGE = {
  new: "submitted",
  reviewed: "viewed",
  shortlisted: "shortlisted",
  interview: "interviewing",
  offer: "offered",
  rejected: "rejected",
};

export function getNextEmployerStage(current) {
  const idx = EMPLOYER_PIPELINE_STAGES.indexOf(current);
  if (idx < 0 || idx >= EMPLOYER_PIPELINE_STAGES.length - 2) return current;
  return EMPLOYER_PIPELINE_STAGES[idx + 1];
}
