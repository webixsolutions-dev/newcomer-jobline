/**
 * Seed applications for the Job Seeker Dashboard (frontend-only mock data).
 * Status values: Applied | In Review | Interview | Offer | Not Selected
 */
export const mockApplications = [
  {
    id: "app-001",
    jobId: "job-001",
    title: "Administrative Assistant",
    company: "Maple Office Solutions",
    location: "Toronto, ON",
    status: "In Review",
    dateApplied: "2026-08-12",
  },
  {
    id: "app-002",
    jobId: "job-003",
    title: "Junior IT Support Specialist",
    company: "TechBridge IT Services",
    location: "Vancouver, BC",
    status: "Interview",
    dateApplied: "2026-08-05",
  },
  {
    id: "app-003",
    jobId: "job-006",
    title: "Warehouse Coordinator",
    company: "NorthPoint Logistics",
    location: "Brampton, ON",
    status: "Not Selected",
    dateApplied: "2026-07-20",
  },
];
