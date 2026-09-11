import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuth } from "../auth/AuthContext";
import { EmployerDataProvider, useEmployerData } from "../../context/EmployerDataContext";
import { ErrorState } from "../components/ui/DataStates";

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
  const { companyProfile, loading, error, reload } = useEmployerData();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#eef2f7]"><div className="h-11 w-11 animate-spin rounded-full border-4 border-[#cbd8e7] border-t-[#0f766e]" aria-label="Loading employer dashboard" /></div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-[#eef2f7]"><ErrorState message={error} onRetry={reload} /></div>;
  }

  return (
    <div className="dashboard-shell">
      <DashboardLayout
        role="recruiter"
        sidebarVariant="employer"
        userName={profile?.full_name || "Recruiter"}
        roleLabel="Employer"
        companyName={companyProfile.name || "Employer"}
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
