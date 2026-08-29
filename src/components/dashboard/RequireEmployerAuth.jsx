import { Navigate } from "react-router-dom";
import { useAuth } from "../../dashboard/auth/AuthContext";

/**
 * Gates the employer dashboard stub — recruiters only.
 */
export default function RequireEmployerAuth({ children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50/30">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy-200 border-t-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role === "job_seeker") {
    return <Navigate to="/dashboard/overview" replace />;
  }

  return children;
}
