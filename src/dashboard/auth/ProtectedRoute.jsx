import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * Gates a dashboard route by role.
 * - Not signed in  -> send to /login (remembers where they were headed).
 * - Signed in, wrong role -> send to their own dashboard instead of
 *   showing someone a role they don't have.
 */
export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, role: currentRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (currentRole !== role) {
    const redirect =
      currentRole === "recruiter"
        ? "/employer-dashboard/overview"
        : "/dashboard/seeker";
    return <Navigate to={redirect} replace />;
  }

  return children;
}
