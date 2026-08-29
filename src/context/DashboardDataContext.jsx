import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { mockApplications } from "../data/mockApplications";
import { mockJobs } from "../data/mockJobs";
import { mockSeekerProfile } from "../dashboard/mock/profile";

const DashboardDataContext = createContext(null);

/** Compute profile completion percentage for the progress bar. */
export function getProfileCompleteness(profile) {
  const checks = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.location,
    profile.resumeFilename,
    profile.skills?.length > 0,
    profile.experience?.length > 0,
    profile.education?.length > 0,
  ];
  const filled = checks.filter(Boolean).length;
  return Math.round((filled / checks.length) * 100);
}

const initialProfile = {
  fullName: mockSeekerProfile.full_name,
  email: mockSeekerProfile.email,
  phone: mockSeekerProfile.phone,
  location: `${mockSeekerProfile.location_city}, ${mockSeekerProfile.location_province}`,
  resumeFilename: null,
  skills: [...mockSeekerProfile.skills],
  experience: [
    {
      id: "exp-001",
      title: "Office Administrator",
      company: "Harbourview Medical Clinic",
      startDate: "2022-03",
      endDate: "2025-06",
      description: "Managed scheduling, patient records, and front-desk operations.",
    },
  ],
  education: [
    {
      id: "edu-001",
      institution: "George Brown College",
      degree: "Office Administration Certificate",
      startDate: "2020-09",
      endDate: "2021-06",
    },
  ],
};

const initialSavedJobs = mockJobs.filter((j) =>
  ["job-002", "job-005"].includes(j.id)
);

export function DashboardDataProvider({ children }) {
  const [applications, setApplications] = useState(() => [...mockApplications]);
  const [savedJobs, setSavedJobs] = useState(() => [...initialSavedJobs]);
  const [profile, setProfile] = useState(() => ({ ...initialProfile }));

  const savedJobIds = useMemo(
    () => new Set(savedJobs.map((j) => String(j.id))),
    [savedJobs]
  );

  const appliedJobIds = useMemo(
    () => new Set(applications.map((a) => String(a.jobId))),
    [applications]
  );

  const isJobSaved = useCallback(
    (jobId) => savedJobIds.has(String(jobId)),
    [savedJobIds]
  );

  const isJobApplied = useCallback(
    (jobId) => appliedJobIds.has(String(jobId)),
    [appliedJobIds]
  );

  const applyToJob = useCallback((job) => {
    const id = String(job.id);
    setApplications((prev) => {
      if (prev.some((a) => String(a.jobId) === id)) return prev;
      return [
        {
          id: `app-${Date.now()}`,
          jobId: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          status: "Applied",
          dateApplied: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ];
    });
  }, []);

  const withdrawApplication = useCallback((applicationId) => {
    setApplications((prev) => prev.filter((a) => a.id !== applicationId));
  }, []);

  const toggleSaveJob = useCallback((job) => {
    const id = String(job.id);
    setSavedJobs((prev) => {
      if (prev.some((j) => String(j.id) === id)) {
        return prev.filter((j) => String(j.id) !== id);
      }
      return [job, ...prev];
    });
  }, []);

  const removeSavedJob = useCallback((jobId) => {
    setSavedJobs((prev) => prev.filter((j) => String(j.id) !== String(jobId)));
  }, []);

  const updateProfile = useCallback((section, data) => {
    setProfile((prev) => {
      if (section === "personal") {
        return { ...prev, ...data };
      }
      if (section === "resume") {
        return { ...prev, resumeFilename: data.filename ?? null };
      }
      if (section === "skills") {
        return { ...prev, skills: data };
      }
      if (section === "experience") {
        return { ...prev, experience: data };
      }
      if (section === "education") {
        return { ...prev, education: data };
      }
      return { ...prev, ...data };
    });
  }, []);

  const stats = useMemo(() => {
    const interviews = applications.filter((a) => a.status === "Interview").length;
    const offers = applications.filter((a) => a.status === "Offer").length;
    return {
      applications: applications.length,
      savedJobs: savedJobs.length,
      interviews,
      offers,
    };
  }, [applications, savedJobs]);

  const profileCompleteness = useMemo(
    () => getProfileCompleteness(profile),
    [profile]
  );

  const value = {
    applications,
    savedJobs,
    profile,
    stats,
    profileCompleteness,
    isJobSaved,
    isJobApplied,
    applyToJob,
    withdrawApplication,
    toggleSaveJob,
    removeSavedJob,
    updateProfile,
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error("useDashboardData must be used within DashboardDataProvider");
  }
  return ctx;
}

/** Optional hook — returns null outside the dashboard provider (for public JobCard). */
export function useOptionalDashboardData() {
  return useContext(DashboardDataContext);
}
