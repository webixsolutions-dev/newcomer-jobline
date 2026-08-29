import { Link } from "react-router-dom";
import { useDashboardData } from "../../context/DashboardDataContext";

/**
 * Profile completion progress bar with link to My Profile when incomplete.
 */
const ProfileCompletenessBar = () => {
  const { profileCompleteness } = useDashboardData();

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-navy-900">Profile completeness</p>
          <p className="text-xs text-navy-500">
            A complete profile helps employers find you faster.
          </p>
        </div>
        <span className="text-lg font-extrabold text-teal-700">{profileCompleteness}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-600 to-gold-500 transition-all duration-500"
          style={{ width: `${profileCompleteness}%` }}
        />
      </div>
      {profileCompleteness < 100 && (
        <Link
          to="/dashboard/profile"
          className="mt-3 inline-flex text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          Complete your profile →
        </Link>
      )}
    </div>
  );
};

export default ProfileCompletenessBar;
