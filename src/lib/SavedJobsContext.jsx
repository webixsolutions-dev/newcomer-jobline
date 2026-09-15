import { createContext, useContext, useEffect, useState } from "react";
import { getSeekerDashboard, saveJob, unsaveJob } from "./jobs";
import { readSession } from "./auth/session";
import { useAuth } from "../dashboard/auth/AuthContext";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());
  const [error, setError] = useState(null);
  const { role, isAuthenticated } = useAuth();

  useEffect(() => {
    let active = true;
    const token = readSession()?.access_token;
    if (!isAuthenticated || role !== "job_seeker" || !token) {
      setSavedIds(new Set());
      return undefined;
    }

    getSeekerDashboard(token)
      .then((data) => {
        if (active) setSavedIds(new Set((data?.savedJobIds || []).map(String)));
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      });

    return () => { active = false; };
  }, [isAuthenticated, role]);

  const isSaved = (jobId) => savedIds.has(String(jobId));

  async function toggleSaved(jobId) {
    const token = readSession()?.access_token;
    if (!token || role !== "job_seeker") {
      throw new Error("Sign in as a job seeker to save jobs.");
    }

    const id = String(jobId);
    const wasSaved = savedIds.has(id);
    setError(null);
    setSavedIds((current) => {
      const next = new Set(current);
      if (wasSaved) next.delete(id);
      else next.add(id);
      return next;
    });

    try {
      if (wasSaved) await unsaveJob(id, token);
      else await saveJob(id, token);
      return !wasSaved;
    } catch (requestError) {
      setSavedIds((current) => {
        const next = new Set(current);
        if (wasSaved) next.add(id);
        else next.delete(id);
        return next;
      });
      setError(requestError.message);
      throw requestError;
    }
  }

  return (
    <SavedJobsContext.Provider value={{ savedIds, isSaved, toggleSaved, error }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error("useSavedJobs must be used within SavedJobsProvider");
  return ctx;
}
