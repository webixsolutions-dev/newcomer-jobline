// src/data/postingSteps.js
import {
  HiOutlineUserCircle,
  HiOutlineDocumentText,
  HiOutlineRocketLaunch,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";

export const POSTING_STEPS = [
  {
    num: 1,
    icon: HiOutlineUserCircle,
    title: "Create Your Employer Account",
    desc: "Sign up for free and set up your employer profile in just a few minutes.",
  },
  {
    num: 2,
    icon: HiOutlineDocumentText,
    title: "Add Job Details",
    desc: "Fill in your job title, description, location, and requirements to attract the right candidates.",
  },
  {
    num: 3,
    icon: HiOutlineRocketLaunch,
    title: "Publish and Reach Candidates",
    desc: "Your job post goes live instantly and is seen by thousands of newcomers across Canada.",
  },
  {
    num: 4,
    icon: HiOutlineClipboardDocumentList,
    title: "Review Applications",
    desc: "Browse applications, shortlist candidates, and connect with your next great hire.",
  },
];
