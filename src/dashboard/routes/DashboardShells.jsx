import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import VerificationBanner from "../components/recruiter/VerificationBanner";
import CompanySetup from "../components/recruiter/CompanySetup";
import { useAuth } from "../auth/AuthContext";
import { mockSeekerNotifications, mockRecruiterNotifications } from "../mock/notifications";

const COMPANY_STORAGE_KEY = "newcomer_jobline_mock_company";

function readStoredCompany() {
  try {
    const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Job seeker dashboard shell: layout + auth wiring, nested routes render via <Outlet/>. */
export function SeekerDashboardShell() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = useMemo(
    () => mockSeekerNotifications.filter((n) => !n.read_at).length,
    []
  );

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <DashboardLayout
        role="job_seeker"
        userName={profile?.full_name || "Job Seeker"}
        unreadCount={unreadCount}
        onLogout={handleLogout}
      />
    </div>
  );
}

/**
 * Recruiter dashboard shell. A recruiter without a company on file is
 * routed straight to Company Setup (matches product spec 5.1) before
 * they can see the full dashboard chrome. The mock company is persisted
 * to localStorage so it survives a refresh once created.
 */
export function RecruiterDashboardShell() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(readStoredCompany);

  const unreadCount = useMemo(
    () => mockRecruiterNotifications.filter((n) => !n.read_at).length,
    []
  );

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleCompanyCreated(newCompany) {
    localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(newCompany));
    setCompany(newCompany);
  }

  if (!company) {
    return (
      <div className="dashboard-shell flex min-h-screen items-center justify-center p-4" style={{ background: "var(--color-bg)" }}>
        <div className="w-full">
          <CompanySetup onCreated={handleCompanyCreated} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-shell">
      <DashboardLayout
        role="recruiter"
        userName={profile?.full_name || "Recruiter"}
        unreadCount={unreadCount}
        onLogout={handleLogout}
        banner={<VerificationBanner company={company} />}
        outletContext={{ company }}
      />
    </div>
  );
}
