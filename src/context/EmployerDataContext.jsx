import { createContext, useContext, useMemo, useState } from "react";
import { mockEmployerJobPostings } from "../data/mockJobPostings";
import { mockEmployerApplicants } from "../data/mockApplicants";
import { getNextEmployerStage } from "../data/pipelineStages";

const STORAGE_KEY = "newcomer_jobline_employer_data";

const defaultCompanyProfile = {
  name: "Northbridge Offices Inc.",
  logoFilename: null,
  industry: "Real Estate & Property Management",
  size: "51-200",
  website: "https://northbridgeoffices.ca",
  location: "Vancouver, BC",
  description:
    "Northbridge Offices provides modern workspace solutions across British Columbia, supporting growing teams with flexible office environments.",
};

function readStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors in mock mode
  }
}

function countApplicantsForJob(applicants, jobId) {
  return applicants.filter((a) => a.jobId === jobId).length;
}

function withApplicantCounts(postings, applicants) {
  return postings.map((p) => ({
    ...p,
    applicantCount: countApplicantsForJob(applicants, p.id),
  }));
}

const EmployerDataContext = createContext(null);

export function EmployerDataProvider({ children }) {
  const stored = readStoredData();

  const [jobPostings, setJobPostings] = useState(
    stored?.jobPostings ?? mockEmployerJobPostings
  );
  const [applicants, setApplicants] = useState(stored?.applicants ?? mockEmployerApplicants);
  const [companyProfile, setCompanyProfile] = useState(
    stored?.companyProfile ?? defaultCompanyProfile
  );
  const [flashMessage, setFlashMessage] = useState(null);

  function save(next) {
    const payload = {
      jobPostings: next.jobPostings ?? jobPostings,
      applicants: next.applicants ?? applicants,
      companyProfile: next.companyProfile ?? companyProfile,
    };
    persistData(payload);
    if (next.jobPostings) setJobPostings(next.jobPostings);
    if (next.applicants) setApplicants(next.applicants);
    if (next.companyProfile) setCompanyProfile(next.companyProfile);
  }

  function showFlash(message) {
    setFlashMessage(message);
    setTimeout(() => setFlashMessage(null), 4000);
  }

  function createJobPosting(data, status = "Active") {
    const id = `ep_${Date.now()}`;
    const posting = {
      id,
      ...data,
      status,
      postedDate: new Date().toISOString(),
      applicantCount: 0,
    };
    const next = [posting, ...jobPostings];
    save({ jobPostings: next });
    showFlash(status === "Draft" ? "Draft saved." : "Job posting published.");
    return posting;
  }

  function updateJobPosting(id, data, status) {
    const next = jobPostings.map((p) =>
      p.id === id
        ? {
            ...p,
            ...data,
            ...(status ? { status } : {}),
          }
        : p
    );
    save({ jobPostings: next });
    showFlash("Job posting updated.");
  }

  function closeJobPosting(id) {
    const next = jobPostings.map((p) => (p.id === id ? { ...p, status: "Closed" } : p));
    save({ jobPostings: next });
    showFlash("Job posting closed.");
  }

  function deleteJobPosting(id) {
    const nextPostings = jobPostings.filter((p) => p.id !== id);
    const nextApplicants = applicants.filter((a) => a.jobId !== id);
    save({ jobPostings: nextPostings, applicants: nextApplicants });
    showFlash("Job posting deleted.");
  }

  function advanceApplicantStage(id) {
    const next = applicants.map((a) => {
      if (a.id !== id) return a;
      const nextStage = getNextEmployerStage(a.stage);
      return { ...a, stage: nextStage };
    });
    save({ applicants: next });
  }

  function rejectApplicant(id) {
    const next = applicants.map((a) => (a.id === id ? { ...a, stage: "rejected" } : a));
    save({ applicants: next });
    showFlash("Applicant rejected.");
  }

  function updateApplicantStage(id, stage) {
    const next = applicants.map((a) => (a.id === id ? { ...a, stage } : a));
    save({ applicants: next });
  }

  function updateApplicantNotes(id, notes) {
    const next = applicants.map((a) => (a.id === id ? { ...a, notes } : a));
    save({ applicants: next });
  }

  function updateCompanyProfile(data) {
    const next = { ...companyProfile, ...data };
    save({ companyProfile: next });
    showFlash("Company profile saved.");
  }

  const stats = useMemo(() => {
    const activePostings = jobPostings.filter((p) => p.status === "Active").length;
    const totalApplicants = applicants.length;
    const interviewsScheduled = applicants.filter((a) => a.stage === "interview").length;
    const positionsFilled = applicants.filter((a) => a.stage === "offer").length;
    return { activePostings, totalApplicants, interviewsScheduled, positionsFilled };
  }, [jobPostings, applicants]);

  const postingsWithCounts = useMemo(
    () => withApplicantCounts(jobPostings, applicants),
    [jobPostings, applicants]
  );

  const value = {
    jobPostings: postingsWithCounts,
    applicants,
    companyProfile,
    stats,
    flashMessage,
    createJobPosting,
    updateJobPosting,
    closeJobPosting,
    deleteJobPosting,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
    updateCompanyProfile,
    getJobPosting: (id) => postingsWithCounts.find((p) => p.id === id),
    getApplicantsForJob: (jobId) =>
      applicants.filter((a) => a.jobId === jobId).sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
      ),
  };

  return (
    <EmployerDataContext.Provider value={value}>{children}</EmployerDataContext.Provider>
  );
}

export function useEmployerData() {
  const ctx = useContext(EmployerDataContext);
  if (!ctx) throw new Error("useEmployerData must be used within EmployerDataProvider");
  return ctx;
}
