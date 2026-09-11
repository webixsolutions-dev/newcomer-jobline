import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../auth/AuthContext";

export function SeekerDashboardShell() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <DashboardLayout
        role="job_seeker"
        userName={profile?.full_name || "Job Seeker"}
        unreadCount={0}
        onLogout={handleLogout}
      />
    </div>
  );
}
