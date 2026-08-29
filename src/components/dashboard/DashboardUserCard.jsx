import { useAuth } from "../../dashboard/auth/AuthContext";

const AVATAR_COLORS = [
  "bg-teal-700 text-white",
  "bg-gold-500 text-navy-900",
  "bg-navy-900 text-white",
];

function getInitial(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

function colorForName(name) {
  const code = (name || "").charCodeAt(0) || 0;
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

/**
 * Compact user identity card shown at the top of the dashboard sidebar.
 */
const DashboardUserCard = ({ roleLabel = "Job Seeker" }) => {
  const { profile } = useAuth();
  const name = profile?.full_name || profile?.fullName || "Job Seeker";
  const initial = getInitial(name);
  const avatarClass = colorForName(name);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50/60 p-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarClass}`}
      >
        {initial}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-navy-900">{name}</p>
        <p className="text-xs font-medium text-navy-500">{roleLabel}</p>
      </div>
    </div>
  );
};

export default DashboardUserCard;
