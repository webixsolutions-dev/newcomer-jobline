// src/data/jobQuickFilters.js
import { HiOutlineHome, HiOutlineBriefcase, HiOutlineBuildingOffice, HiOutlineCommandLine, HiOutlineHeart, HiOutlineFaceSmile } from "react-icons/hi2";
import { FaBellConcierge } from "react-icons/fa6";

export const JOB_QUICK_FILTERS = [
  { label: "Remote Jobs", icon: HiOutlineHome, filterType: "workStyle", filterValue: "Remote" },
  { label: "Full-Time", icon: HiOutlineBriefcase, filterType: "employmentType", filterValue: "Full-Time" },
  { label: "Office Jobs", icon: HiOutlineBuildingOffice, filterType: "category", filterValue: "Office & Administration" },
  { label: "IT Jobs", icon: HiOutlineCommandLine, filterType: "category", filterValue: "Technology & IT" },
  { label: "Hospitality", icon: FaBellConcierge, filterType: "category", filterValue: "Hospitality" },
  { label: "Healthcare", icon: HiOutlineHeart, filterType: "category", filterValue: "Healthcare Support" },
  { label: "Customer Service", icon: HiOutlineFaceSmile, filterType: "category", filterValue: "Customer Service" },
];
