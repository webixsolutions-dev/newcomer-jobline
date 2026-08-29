// src/data/supportOptions.js
import {
  HiOutlineUserCircle,
  HiOutlineBriefcase,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa6";

export const SUPPORT_OPTIONS = [
  {
    icon: HiOutlineUserCircle,
    title: "Job Seeker Support",
    desc: "Get help with your account, job search, applications, and more.",
    buttonText: "Contact Support",
    buttonVariant: "primary", // maps to solid teal for this specific page
    buttonIcon: "mail",
    action: "scroll",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Employer Inquiries",
    desc: "Questions about posting jobs, plans, billing, or your account.",
    buttonText: "Contact Support",
    buttonVariant: "outline",
    buttonIcon: "mail",
    action: "scroll",
  },
  {
    icon: FaRegHandshake,
    title: "Partnerships",
    desc: "Explore partnership or collaboration opportunities.",
    buttonText: "Learn More →",
    buttonVariant: "outline",
    buttonIcon: "none",
    action: "link",
    href: "/about",
  },
  {
    icon: HiOutlineQuestionMarkCircle,
    title: "General Questions",
    desc: "Have a general question? We're happy to help.",
    buttonText: "Contact Support",
    buttonVariant: "outline",
    buttonIcon: "mail",
    action: "scroll",
  },
];
