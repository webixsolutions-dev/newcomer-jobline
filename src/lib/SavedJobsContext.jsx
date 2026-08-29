// src/lib/SavedJobsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";
import { useAuth } from "../dashboard/auth/AuthContext";

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set());
  const { role, isAuthenticated } = useAuth();
  
  // Use mock-token if no backend token exists in local storage yet
  const token = localStorage.getItem("newcomer_jobline_token") || "mock-token";

  useEffect(() => {
    if (isAuthenticated && role === "job_seeker") {
      api("/v1/me/saved-jobs", {}, token)
        .then((data) => {
          const ids = new Set((data || []).map((s) => String(s.job_id)));
          setSavedIds(ids);
        })
        .catch((err) => {
          console.error("Failed to load saved jobs:", err);
        });
    } else {
      setSavedIds(new Set());
    }
  }, [isAuthenticated, role, token]);

  const isSaved = (jobId) => savedIds.has(String(jobId));

  const toggleSaved = async (jobId) => {
    const idStr = String(jobId);
    const wasSaved = savedIds.has(idStr);
    
    // Optimistic Update
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (wasSaved) next.delete(idStr);
      else next.add(idStr);
      return next;
    });

    try {
      if (wasSaved) {
        await api(`/v1/me/saved-jobs/${idStr}`, { method: "DELETE" }, token);
      } else {
        await api(`/v1/me/saved-jobs/${idStr}`, {
          method: "POST",
          body: JSON.stringify({}),
        }, token);
      }
    } catch (err) {
      console.error("Failed to toggle saved job:", err);
      // Rollback on error
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) next.add(idStr);
        else next.delete(idStr);
        return next;
      });
    }
  };

  const value = { savedIds, isSaved, toggleSaved };

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error("useSavedJobs must be used within SavedJobsProvider");
  return ctx;
}
