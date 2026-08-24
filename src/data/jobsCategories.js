// src/data/jobsCategories.js
import {
  HiOutlineFolder,
  HiOutlineCommandLine,
  HiOutlineHeart,
} from "react-icons/hi2";
import { FaWrench, FaBellConcierge, FaHeadset } from "react-icons/fa6";

export const JOBS_CATEGORIES = [
  {
    title: "Office & Administration",
    icon: HiOutlineFolder,
    description: "Administrative, office support, and business operations roles.",
    paramValue: "Office & Administration",
    tint: "teal",
  },
  {
    title: "Customer Service",
    icon: FaHeadset,
    description: "Help people and build connections in dynamic customer-facing roles.",
    paramValue: "Customer Service",
    tint: "teal",
  },
  {
    title: "Technology & IT",
    icon: HiOutlineCommandLine,
    description: "IT support, software, data and tech roles for all skill levels.",
    paramValue: "Technology & IT",
    tint: "teal",
  },
  {
    title: "Skilled Trades",
    icon: FaWrench,
    description: "Construction, industrial, and skilled trade opportunities.",
    paramValue: "Skilled Trades",
    tint: "peach",
  },
  {
    title: "Healthcare Support",
    icon: HiOutlineHeart,
    description: "Healthcare assistants, personal support and care-related roles.",
    paramValue: "Healthcare Support",
    tint: "teal",
  },
  {
    title: "Hospitality",
    icon: FaBellConcierge,
    description: "Hotel, food service, and hospitality jobs across Canada.",
    paramValue: "Hospitality",
    tint: "peach",
  },
];
