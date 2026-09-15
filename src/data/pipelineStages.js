/** Employer-facing pipeline stages (recruiter view). */
export const EMPLOYER_PIPELINE_STAGES = [
  "submitted",
  "viewed",
  "shortlisted",
  "interviewing",
  "offered",
  "hired",
  "rejected",
  "withdrawn",
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
  submitted: "New",
  viewed: "Reviewed",
  shortlisted: "Shortlisted",
  interviewing: "Interview",
  offered: "Offer",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

/** Map seeker backend enums → employer pipeline stage. */
export const SEEKER_TO_EMPLOYER_STAGE = {
  submitted: "submitted",
  viewed: "viewed",
  shortlisted: "shortlisted",
  interviewing: "interviewing",
  offered: "offered",
  rejected: "rejected",
  hired: "hired",
  withdrawn: "withdrawn",
};

/** Map employer pipeline stage → seeker backend enum (for future API sync). */
export const EMPLOYER_TO_SEEKER_STAGE = {
  submitted: "submitted",
  viewed: "viewed",
  shortlisted: "shortlisted",
  interviewing: "interviewing",
  offered: "offered",
  hired: "hired",
  rejected: "rejected",
  withdrawn: "withdrawn",
};

export function getNextEmployerStage(current) {
  const idx = EMPLOYER_PIPELINE_STAGES.indexOf(current);
  const progressionEnd = EMPLOYER_PIPELINE_STAGES.indexOf("hired");
  if (idx < 0 || idx >= progressionEnd) return current;
  return EMPLOYER_PIPELINE_STAGES[idx + 1];
}
