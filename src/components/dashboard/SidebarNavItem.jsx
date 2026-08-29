import { NavLink } from "react-router-dom";

/**
 * Single sidebar nav link with route-driven active state
 * (tinted background + left accent bar, matching marketing Navbar feel).
 */
const SidebarNavItem = ({ to, label, icon: Icon, end = false, onClick }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
        isActive
          ? "bg-teal-50 text-navy-900"
          : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
      }`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-teal-700" />
        )}
        <Icon className={`text-lg shrink-0 ${isActive ? "text-teal-700" : "text-navy-400"}`} />
        {label}
      </>
    )}
  </NavLink>
);

export default SidebarNavItem;
