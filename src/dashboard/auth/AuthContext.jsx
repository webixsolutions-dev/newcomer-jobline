import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../lib/api";
import { readSession, saveSession } from "../../lib/auth/session";

const AuthContext = createContext(null);

function identityFromMe(data) {
  if (!data?.profile) return null;
  return {
    ...data.profile,
    id: data.profile.id || data.user?.id,
    email: data.profile.email || data.user?.email,
    created_at: data.user?.createdAt,
  };
}

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const restoreSession = useCallback(async () => {
    const session = readSession();
    if (!session?.access_token) {
      setProfile(null);
      setLoading(false);
      return null;
    }

    setLoading(true);
    try {
      const me = await api("/auth/me", {}, session.access_token);
      const identity = identityFromMe(me);
      if (!identity) throw new Error("Your account profile is not ready.");
      setProfile(identity);
      saveSession({ ...session, user: identity });
      return identity;
    } catch (restoreError) {
      saveSession(null);
      setProfile(null);
      setError(restoreError.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  async function signIn(email, password) {
    setError(null);
    const data = await api("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password }),
    });

    if (!data?.session?.access_token) throw new Error("The server did not return a valid session.");
    saveSession(data.session);

    try {
      const me = await api("/auth/me", {}, data.session.access_token);
      const identity = identityFromMe(me);
      if (!identity) throw new Error("Your account profile is not ready.");
      setProfile(identity);
      saveSession({ ...data.session, user: identity });
      return identity;
    } catch (signInError) {
      saveSession(null);
      throw signInError;
    }
  }

  async function signUp(payload) {
    setError(null);
    const data = await api("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (data?.session?.access_token) {
      saveSession(data.session);
      await restoreSession();
    }

    return data;
  }

  function updateLocalProfile(nextProfile) {
    setProfile((current) => ({ ...current, ...nextProfile }));
    const session = readSession();
    if (session) saveSession({ ...session, user: { ...(session.user || {}), ...nextProfile } });
  }

  function logout() {
    saveSession(null);
    setProfile(null);
    setError(null);
  }

  const role = profile?.role || null;
  const value = {
    role,
    profile,
    isAuthenticated: Boolean(profile && readSession()?.access_token),
    loading,
    error,
    signIn,
    signUp,
    logout,
    restoreSession,
    updateLocalProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
