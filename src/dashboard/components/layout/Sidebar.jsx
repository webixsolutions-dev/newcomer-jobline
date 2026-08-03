import { NavLink } from "react-router-dom";
import {
  FiHome, FiFileText, FiBookmark, FiUser, FiBell, FiBriefcase,
  FiUsers, FiSettings, FiX,
} from "react-icons/fi";
import { theme } from "../../theme/theme";

const seekerLinks = [
  { to: "/dashboard/seeker", label: "Dashboard", icon: FiHome, end: true },
  { to: "/dashboard/seeker/applications", label: "My Applications", icon: FiFileText },
  { to: "/dashboard/seeker/saved", label: "Saved Jobs", icon: FiBookmark },
  { to: "/dashboard/seeker/notifications", label: "Notifications", icon: FiBell },
  { to: "/dashboard/seeker/profile", label: "Profile & Settings", icon: FiUser },
];

const recruiterLinks = [
  { to: "/dashboard/recruiter", label: "Dashboard", icon: FiHome, end: true },
  { to: "/dashboard/recruiter/jobs", label: "My Jobs", icon: FiBriefcase },
  { to: "/dashboard/recruiter/applicants", label: "Applicants", icon: FiUsers },
  { to: "/dashboard/recruiter/notifications", label: "Notifications", icon: FiBell },
  { to: "/dashboard/recruiter/company", label: "Company Profile", icon: FiSettings },
];

export default function Sidebar({ role, open, onClose }) {
  const links = role === "recruiter" ? recruiterLinks : seekerLinks;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "var(--color-success)" }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold"
              style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
            >
              {theme.logoInitials}
            </div>
            <span className="text-base font-bold text-white">{theme.siteName}</span>
          </div>
          <button className="text-white lg:hidden" onClick={onClose} aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "text-[var(--color-primary)]" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
              style={({ isActive }) => (isActive ? { background: "var(--color-accent)" } : undefined)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-5 text-xs text-white/50">
          One account. All partner sites.
        </div>
      </aside>
    </>
  );
}
