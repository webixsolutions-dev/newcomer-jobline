// src/lib/auth/session.js

const SESSION_KEY = "newcomer_jobline.session";

export function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      if (session.access_token) {
        localStorage.setItem("newcomer_jobline_token", session.access_token);
      }
    } else {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem("newcomer_jobline_token");
    }
  } catch (e) {
    console.error("Failed to save session:", e);
  }
}
