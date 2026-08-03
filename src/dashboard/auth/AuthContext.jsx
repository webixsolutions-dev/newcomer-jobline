import { createContext, useContext, useEffect, useState } from "react";
import { mockSeekerProfile, mockRecruiterProfile } from "../mock/profile";

/**
 * Mock authentication for the dashboard preview.
 *
 * There's no backend yet, so "logging in" just means the person picked a
 * role on /login. We stash that choice in localStorage so a refresh keeps
 * them signed in, and hand back the matching mock profile so the rest of
 * the dashboard (name, email, avatar initials) has something real to show.
 *
 * Swap this file's internals for a real API call + token once the backend
 * exists — nothing else in src/dashboard should need to change, since
 * everything else only talks to useAuth().
 */

const STORAGE_KEY = "newcomer_jobline_dashboard_role";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "job_seeker" || saved === "recruiter" ? saved : null;
  });

  useEffect(() => {
    if (role) localStorage.setItem(STORAGE_KEY, role);
    else localStorage.removeItem(STORAGE_KEY);
  }, [role]);

  const profile = role === "recruiter" ? mockRecruiterProfile : role === "job_seeker" ? mockSeekerProfile : null;

  function login(nextRole) {
    setRole(nextRole);
  }

  function logout() {
    setRole(null);
  }

  const value = { role, profile, isAuthenticated: Boolean(role), login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
