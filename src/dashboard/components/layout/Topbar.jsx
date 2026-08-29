import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiBell, FiChevronDown, FiLogOut, FiUser, FiExternalLink } from "react-icons/fi";

export default function Topbar({ role, onMenuClick, unreadCount, userName, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white page-gutters"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <FiMenu size={22} style={{ color: "var(--color-primary)" }} />
        </button>
        <span className="hidden text-sm font-medium sm:inline" style={{ color: "var(--color-text-muted)" }}>
          {role === "recruiter" ? "Recruiter Dashboard" : "Job Seeker Dashboard"}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          to="/"
          className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:flex"
          style={{ borderColor: "var(--color-border)", color: "var(--color-secondary)" }}
        >
          <FiExternalLink size={13} /> View site
        </Link>

        <Link
          to={`/dashboard/${role}/notifications`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "var(--color-bg)" }}
          aria-label="Notifications"
        >
          <FiBell style={{ color: "var(--color-primary)" }} />
          {unreadCount > 0 && (
            <span
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white"
              style={{ background: "var(--status-rejected-text)" }}
            >
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "var(--color-secondary)" }}
            >
              {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </span>
            <span className="hidden text-sm font-medium sm:inline" style={{ color: "var(--color-primary)" }}>
              {userName}
            </span>
            <FiChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-[var(--radius-md)] border bg-white py-1 shadow-lg"
                style={{ borderColor: "var(--color-border)" }}
              >
                <Link
                  to={`/dashboard/${role}/profile`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[var(--color-bg)]"
                  style={{ color: "var(--color-text)" }}
                >
                  <FiUser size={15} /> Profile & Settings
                </Link>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-[var(--color-bg)]"
                  style={{ color: "var(--status-rejected-text)" }}
                >
                  <FiLogOut size={15} /> Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
