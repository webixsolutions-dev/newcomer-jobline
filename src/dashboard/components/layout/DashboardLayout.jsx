import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ role, userName, unreadCount, onLogout, banner, outletContext }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Sidebar role={role} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          role={role}
          onMenuClick={() => setSidebarOpen(true)}
          unreadCount={unreadCount}
          userName={userName}
          onLogout={onLogout}
        />
        {banner}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet context={outletContext} />
          </div>
        </main>
      </div>
    </div>
  );
}
