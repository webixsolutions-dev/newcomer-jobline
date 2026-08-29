import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../auth/AuthContext";
import { EmployerDataProvider, useEmployerData } from "../../context/EmployerDataContext";

function FlashBanner() {
  const { flashMessage } = useEmployerData();
  if (!flashMessage) return null;
  return (
    <div
      className="border-b px-4 py-3 text-center text-sm font-medium lg:px-8"
      style={{
        background: "var(--color-secondary-light)",
        color: "var(--color-secondary)",
        borderColor: "var(--color-border)",
      }}
    >
      {flashMessage}
    </div>
  );
}

function EmployerDashboardLayout() {
  const { profile, logout } = useAuth();
  const { companyProfile } = useEmployerData();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <DashboardLayout
        role="recruiter"
        sidebarVariant="employer"
        userName={profile?.full_name || "Recruiter"}
        roleLabel="Employer"
        companyName={companyProfile.name}
        unreadCount={0}
        onLogout={handleLogout}
        banner={<FlashBanner />}
      />
    </div>
  );
}

/** Employer dashboard shell: auth + EmployerDataContext + layout. */
export default function EmployerDashboardShell() {
  return (
    <EmployerDataProvider>
      <EmployerDashboardLayout />
    </EmployerDataProvider>
  );
}
