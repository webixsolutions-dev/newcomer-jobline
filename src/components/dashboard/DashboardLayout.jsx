import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../dashboard/auth/AuthContext";
import { DashboardDataProvider } from "../../context/DashboardDataContext";
import DashboardSidebar, { DashboardMobileBar } from "./DashboardSidebar";

/**
 * Shared shell for all /dashboard/* routes: sidebar + mobile bar + content outlet.
 * Wraps children in DashboardDataProvider for centralized seeker state.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <DashboardDataProvider>
      <div className="flex min-h-screen bg-navy-50/30">
        <DashboardSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardMobileBar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </DashboardDataProvider>
  );
};

export default DashboardLayout;
