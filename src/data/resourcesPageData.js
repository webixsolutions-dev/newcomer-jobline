import {
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineHeart,
  HiOutlineIdentification,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { HiOutlineMap } from "react-icons/hi2";

export const RESOURCE_CATEGORIES = [
  {
    id: "job-search",
    title: "Job Search",
    description: "Tips and tools to find the right job in Canada.",
    image: "/resources/resource_job_search.webp",
    icon: HiOutlineClipboardList,
    link: "/jobs",
  },
  {
    id: "resume-cover-letter",
    title: "Resume & Cover Letter",
    description: "Guides and templates to create a strong application.",
    image: "/resources/resource_resume_cover_letter.webp",
    icon: HiOutlineIdentification,
    link: "/resources#featured-resume",
  },
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    description: "Practice and advice to ace your interviews.",
    image: "/resources/resource_interview_preparation.webp",
    icon: HiOutlineUserGroup,
    link: "/resources#featured-interview",
  },
  {
    id: "settlement-in-canada",
    title: "Settlement in Canada",
    description: "Helpful information for settling in your new home.",
    image: "/resources/resource_settlement_in_canada.webp",
    icon: HiOutlineMap,
    link: "/resources#featured-settlement",
  },
  {
    id: "skills-training",
    title: "Skills & Training",
    description: "Programs and resources to upskill and grow.",
    image: "/resources/resource_skills_training.webp",
    icon: HiOutlineBookOpen,
    link: "/resources#featured-training",
  },
  {
    id: "health-wellbeing",
    title: "Health & Well-being",
    description: "Support for your physical and mental well-being.",
    image: "/resources/resource_health_wellbeing.webp",
    icon: HiOutlineHeart,
    link: "/contact",
  },
];

export const FEATURED_RESOURCES = [
  {
    id: "featured-resume",
    title: "How to Write a Canadian Resume",
    description:
      "Learn how to format and customize your resume for Canadian employers.",
    image: "/resources/featured_canadian_resume.webp",
    link: "/contact",
  },
  {
    id: "featured-interview",
    title: "Interview Tips for Newcomers",
    description:
      "Prepare for common questions and make a strong first impression.",
    image: "/resources/featured_interview_tips.webp",
    link: "/contact",
  },
  {
    id: "featured-settlement",
    title: "Living in Canada: What You Need to Know",
    description:
      "Essential guidance on housing, healthcare, banking, and daily life.",
    image: "/resources/featured_living_in_canada.webp",
    link: "/about",
  },
  {
    id: "featured-training",
    title: "Free Training & Certification Programs",
    description:
      "Discover programs that help you gain skills and credentials in Canada.",
    image: "/resources/featured_training_certification_programs.webp",
    link: "/jobs",
  },
];
