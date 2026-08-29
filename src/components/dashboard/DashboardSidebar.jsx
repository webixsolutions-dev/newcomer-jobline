import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlineDocumentText,
  HiOutlineBookmark,
  HiOutlineUser,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineXMark,
  HiOutlineBars3,
} from "react-icons/hi2";
import { useAuth } from "../../dashboard/auth/AuthContext";
import DashboardUserCard from "./DashboardUserCard";
import SidebarNavItem from "./SidebarNavItem";

const WORKSPACE_LINKS = [
  { to: "/dashboard/overview", label: "Overview", icon: HiOutlineHome, end: true },
  { to: "/dashboard/find-jobs", label: "Find Jobs", icon: HiOutlineMagnifyingGlass },
  { to: "/dashboard/applications", label: "My Applications", icon: HiOutlineDocumentText },
  { to: "/dashboard/saved-jobs", label: "Saved Jobs", icon: HiOutlineBookmark },
  { to: "/dashboard/profile", label: "My Profile", icon: HiOutlineUser },
];

const NETWORK_LINKS = [
  { to: "/resources", label: "Settlement Resources" },
  { to: "#", label: "Mentorship", comingSoon: true },
];

function SidebarContent({ onNavigate, onLogout }) {
  const [networkOpen, setNetworkOpen] = useState(true);

  return (
    <>
      <div className="border-b border-navy-100 px-4 py-5">
        <Link to="/" className="inline-flex items-center" onClick={onNavigate}>
          <img src="/logo.png" alt="Newcomer Jobline" className="h-9 w-auto" />
        </Link>
        <div className="mt-4">
          <DashboardUserCard />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
          Workspace
        </p>
        <div className="space-y-1">
          {WORKSPACE_LINKS.map((link) => (
            <SidebarNavItem key={link.to} {...link} onClick={onNavigate} />
          ))}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={() => setNetworkOpen((v) => !v)}
            className="mb-2 flex w-full items-center justify-between px-3 text-[10px] font-bold uppercase tracking-wider text-navy-400"
          >
            Newcomer Network
            {networkOpen ? (
              <HiOutlineChevronUp className="text-sm" />
            ) : (
              <HiOutlineChevronDown className="text-sm" />
            )}
          </button>
          {networkOpen && (
            <div className="space-y-1">
              {NETWORK_LINKS.map((item) =>
                item.comingSoon ? (
                  <span
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-navy-400"
                  >
                    {item.label}
                    <span className="rounded-md bg-navy-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-navy-500">
                      Soon
                    </span>
                  </span>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-navy-100 px-3 py-4 space-y-1">
        <SidebarNavItem
          to="/dashboard/settings"
          label="Settings"
          icon={HiOutlineCog6Tooth}
          onClick={onNavigate}
        />
        <button
          type="button"
          onClick={() => {
            onLogout();
            onNavigate?.();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-navy-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <HiOutlineArrowRightOnRectangle className="text-lg text-navy-400" />
          Sign Out
        </button>
      </div>
    </>
  );
}

/**
 * Persistent left sidebar for the Job Seeker Dashboard.
 * Collapses to an off-canvas drawer on mobile/tablet.
 */
const DashboardSidebar = ({ open, onClose, onLogout }) => {
  const handleNavigate = () => onClose?.();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-navy-100 bg-white transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          className="absolute right-3 top-5 rounded-lg p-1.5 text-navy-500 hover:bg-navy-50 lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <HiOutlineXMark className="text-xl" />
        </button>
        <SidebarContent onNavigate={handleNavigate} onLogout={onLogout} />
      </aside>
    </>
  );
};

/** Mobile top bar with hamburger trigger. */
export function DashboardMobileBar({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between border-b border-navy-100 bg-white px-4 py-3 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-navy-700 hover:bg-navy-50"
        aria-label="Open menu"
      >
        <HiOutlineBars3 className="text-xl" />
      </button>
      <Link to="/">
        <img src="/logo.png" alt="Newcomer Jobline" className="h-8 w-auto" />
      </Link>
      <div className="w-10" />
    </div>
  );
}

export default DashboardSidebar;
