import {
  HiOutlineDocumentText,
  HiOutlineBookmark,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { useDashboardData } from "../../context/DashboardDataContext";

const STAT_CONFIG = [
  { key: "applications", label: "Applications", icon: HiOutlineDocumentText, tone: "navy" },
  { key: "savedJobs", label: "Saved Jobs", icon: HiOutlineBookmark, tone: "gold" },
  { key: "interviews", label: "Interviews", icon: HiOutlineChatBubbleLeftRight, tone: "teal" },
  { key: "offers", label: "Offers", icon: HiOutlineCheckBadge, tone: "teal-solid" },
];

const TONE_CLASSES = {
  navy: "bg-navy-50 text-navy-700",
  gold: "bg-gold-100 text-gold-700",
  teal: "bg-teal-50 text-teal-700",
  "teal-solid": "bg-teal-700 text-white",
};

/**
 * Row of four stat cards driven by DashboardDataContext.
 */
const StatCardRow = () => {
  const { stats } = useDashboardData();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {STAT_CONFIG.map(({ key, label, icon: Icon, tone }) => (
        <div
          key={key}
          className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${TONE_CLASSES[tone]}`}
          >
            <Icon className="text-xl" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-navy-900">{stats[key]}</p>
            <p className="text-sm font-medium text-navy-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCardRow;
