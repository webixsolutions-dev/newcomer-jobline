// src/dashboard/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { mockSeekerProfile, mockRecruiterProfile } from "../mock/profile";
import { api } from "../../lib/api";
import { readSession, saveSession } from "../../lib/auth/session";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read session on mount
  useEffect(() => {
    const session = readSession();
    if (session && session.access_token) {
      // Set initial user info from session
      setRole(session.user?.role || null);
      setProfile(session.user || null);

      // Verify session token by fetching profile
      api("/v1/auth/me", {}, session.access_token)
        .then((user) => {
          setRole(user.role);
          setProfile(user);
          // Update cached session
          saveSession({ ...session, user });
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to restore session, token might have expired:", err);
          // Try to refresh token
          if (session.refresh_token) {
            api("/v1/auth/refresh", {
              method: "POST",
              body: JSON.stringify({ refresh_token: session.refresh_token }),
            })
              .then((newSession) => {
                saveSession(newSession);
                setRole(newSession.user?.role || null);
                setProfile(newSession.user || null);
                setLoading(false);
              })
              .catch((refreshErr) => {
                console.error("Refresh token failed:", refreshErr);
                // Clear session on refresh failure
                saveSession(null);
                setRole(null);
                setProfile(null);
                setLoading(false);
              });
          } else {
            saveSession(null);
            setRole(null);
            setProfile(null);
            setLoading(false);
          }
        });
    } else {
      // Check legacy mock role
      const legacyRole = localStorage.getItem("newcomer_jobline_dashboard_role");
      if (legacyRole === "job_seeker" || legacyRole === "recruiter") {
        setRole(legacyRole);
        setProfile(legacyRole === "recruiter" ? mockRecruiterProfile : mockSeekerProfile);
      }
      setLoading(false);
    }
  }, []);

  // Mock login (role picker fallback)
  function login(nextRole) {
    setRole(nextRole);
    setProfile(nextRole === "recruiter" ? mockRecruiterProfile : mockSeekerProfile);
    localStorage.setItem("newcomer_jobline_dashboard_role", nextRole);
    saveSession(null); // clear real token session when using mock
  }

  // Real backend sign in
  async function signIn(username, password) {
    setError(null);
    try {
      const data = await api("/v1/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (data && data.session) {
        saveSession(data.session);
        setRole(data.user?.role || null);
        setProfile(data.user || null);
        localStorage.removeItem("newcomer_jobline_dashboard_role");
        return data.user;
      } else {
        throw new Error("Invalid session response");
      }
    } catch (err) {
      setError(err.message || "Failed to log in");
      throw err;
    }
  }

  // Real backend sign up
  async function signUp(fullName, email, password, targetRole) {
    setError(null);
    try {
      return await api("/v1/auth/register", {
        method: "POST",
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          role: targetRole,
        }),
      });
    } catch (err) {
      setError(err.message || "Failed to sign up");
      throw err;
    }
  }

  function logout() {
    setRole(null);
    setProfile(null);
    saveSession(null);
    localStorage.removeItem("newcomer_jobline_dashboard_role");
  }

  const value = {
    role,
    profile,
    isAuthenticated: Boolean(role),
    login,
    logout,
    signIn,
    signUp,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
