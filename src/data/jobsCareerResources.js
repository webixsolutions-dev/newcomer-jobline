// src/data/jobsCareerResources.js
import { HiOutlineDocumentText, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { FaCanadianMapleLeaf } from "react-icons/fa6";

export const JOBS_CAREER_RESOURCES = [
  {
    title: "Resume Tips",
    desc: "Learn how to write a Canadian resume that gets noticed by employers.",
    icon: HiOutlineDocumentText,
    tint: "teal",
    link: "/resources",
  },
  {
    title: "Interview Preparation",
    desc: "Get tips and practice common Canadian interview questions with confidence.",
    icon: HiOutlineChatBubbleBottomCenterText,
    tint: "teal",
    link: "/resources",
  },
  {
    title: "Settlement Support",
    desc: "Find information on housing, banking, language training, and more.",
    icon: FaCanadianMapleLeaf,
    tint: "peach",
    link: "/resources",
  },
];
