// src/data/employerFaqs.js
import {
  HiOutlineCurrencyDollar,
  HiOutlineClock,
  HiOutlinePencilSquare,
  HiOutlineUserGroup,
} from "react-icons/hi2";

export const EMPLOYER_FAQS = [
  {
    icon: HiOutlineCurrencyDollar,
    question: "How much does it cost to post a job?",
    answer:
      "Your first job posting is completely free. Additional postings and premium placement options are available through our affordable paid plans. Contact our team to learn about current promotions and employer packages.",
  },
  {
    icon: HiOutlineClock,
    question: "How quickly will my job go live?",
    answer:
      "Your job post goes live instantly after submission. There is no waiting period or lengthy approval process — once you hit publish, newcomers across Canada can see and apply to your role right away.",
  },
  {
    icon: HiOutlinePencilSquare,
    question: "Can I edit my posting later?",
    answer:
      "Yes! You can edit, update, or close any of your active job postings at any time through your employer dashboard. Changes are reflected immediately on the live listing.",
  },
  {
    icon: HiOutlineUserGroup,
    question: "Do you help with newcomer hiring?",
    answer:
      "Absolutely. We provide employers with inclusive hiring guides, credential recognition resources, and onboarding templates designed specifically for welcoming newcomers to Canadian workplaces.",
  },
];
