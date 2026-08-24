// src/data/employerHighlights.js
import {
  HiOutlineBuildingOffice2,
  HiOutlineStar,
  HiOutlineUserCircle,
} from "react-icons/hi2";

export const EMPLOYER_HIGHLIGHTS = [
  {
    icon: HiOutlineBuildingOffice2,
    title: "Industry Hiring Categories",
    desc: "Explore talent by industry and find the right fit for your business needs.",
    link: "/jobs",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    icon: HiOutlineStar,
    title: "Success Stories",
    desc: "See how Canadian employers are building stronger, more inclusive teams.",
    link: "/about",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
  {
    icon: HiOutlineUserCircle,
    title: "Candidate Matching",
    desc: "Connect with pre-screened, skilled newcomers ready to contribute and grow.",
    link: "/jobs",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
];
