import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  role,
  userName,
  unreadCount = 0,
  onLogout,
  banner,
  outletContext,
  sidebarVariant,
  roleLabel,
  companyName,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--color-bg)" }}>
      <Sidebar
        role={role}
        variant={sidebarVariant}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userName={userName}
        roleLabel={roleLabel}
        companyName={companyName}
        onLogout={onLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          role={role}
          onMenuClick={() => setSidebarOpen(true)}
          unreadCount={unreadCount}
          userName={userName}
          onLogout={onLogout}
        />
        {banner}
        <main className="flex-1 page-gutters py-4 lg:py-8">
          <div className="mx-auto max-w-6xl">
            <Outlet context={outletContext} />
          </div>
        </main>
      </div>
    </div>
  );
}
