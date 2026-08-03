import { mockJobs } from "./jobs";

/** @typedef {import('./types').SavedJob} SavedJob */

export const mockSavedJobs = [
  {
    user_id: "usr_001",
    job_id: "job_102",
    saved_via_site_id: 2,
    created_at: "2026-07-11T09:00:00.000Z",
    job: mockJobs[1],
  },
  {
    user_id: "usr_001",
    job_id: "job_103",
    saved_via_site_id: 2,
    created_at: "2026-06-02T09:00:00.000Z",
    job: mockJobs[2], // expired — must still render, muted
  },
];
