import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../dashboard/auth/AuthContext";

/**
 * Route guard for Job Seeker dashboard routes.
 * - Not signed in → /sign-in (with return path in state)
 * - Employer (recruiter) role → /employer-dashboard
 */
export default function RequireAuth({ children }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50/30">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy-200 border-t-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  if (role === "recruiter") {
    return <Navigate to="/employer-dashboard" replace />;
  }

  if (role !== "job_seeker") {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
