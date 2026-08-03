// src/data/content.js
import {
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineGlobeAlt,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAcademicCap,
  HiOutlineHandRaised,
} from "react-icons/hi2"

export const stats = [
  { icon: HiOutlineBriefcase, value: 1200, suffix: "+", label: "Jobs Posted" },
  { icon: HiOutlineBuildingOffice2, value: 340, suffix: "+", label: "Partner Employers" },
  { icon: HiOutlineUserGroup, value: 8500, suffix: "+", label: "Newcomers Placed" },
  { icon: HiOutlineGlobeAlt, value: 45, suffix: "+", label: "Countries Represented" },
]

export const howItWorks = [
  {
    icon: HiOutlineDocumentText,
    title: "Create Your Profile",
    description: "Sign up in minutes and build a profile that highlights your skills, experience, and goals.",
  },
  {
    icon: HiOutlineChatBubbleLeftRight,
    title: "Get Matched",
    description: "Our team and tools connect you with employers who value your background and are ready to hire.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Prepare & Apply",
    description: "Access resume support, interview coaching, and language resources tailored for newcomers.",
  },
  {
    icon: HiOutlineHandRaised,
    title: "Start Your Career",
    description: "Accept an offer and get ongoing support as you settle into your new role and community.",
  },
]

export const testimonials = [
  {
    name: "Amara Okafor",
    role: "Warehouse Associate at Maple Logistics",
    quote:
      "Newcomer Jobline helped me find a job within three weeks of arriving in Canada. The support team guided me through every step.",
    avatarColor: "bg-gold-500",
    initials: "AO",
  },
  {
    name: "Diego Fernandez",
    role: "Electrician Apprentice at Ironline",
    quote:
      "They helped me get my trade credentials recognized and connected me directly with an employer willing to sponsor my apprenticeship.",
    avatarColor: "bg-teal-600",
    initials: "DF",
  },
  {
    name: "Mei Lin Zhang",
    role: "Customer Support Rep at BrightLine",
    quote:
      "The interview coaching gave me the confidence I needed. Within a month I had two offers to choose from.",
    avatarColor: "bg-navy-700",
    initials: "MZ",
  },
]

export const faqs = [
  {
    question: "Is Newcomer Jobline free for job seekers?",
    answer:
      "Yes. Creating a profile, browsing jobs, and applying through Newcomer Jobline is always free for job seekers.",
  },
  {
    question: "Do I need Canadian work experience to apply?",
    answer:
      "No. Many of our partner employers welcome candidates without local experience and offer training and mentorship support.",
  },
  {
    question: "What documents do I need to get started?",
    answer:
      "Typically a valid work permit or permanent residency status, a resume, and any relevant certifications. Our team can help you prepare.",
  },
  {
    question: "Can I get help with my resume and interview skills?",
    answer:
      "Absolutely. We offer resume review workshops, mock interviews, and one-on-one coaching sessions tailored for newcomers.",
  },
]

export const employerBenefits = [
  {
    icon: HiOutlineUserGroup,
    title: "Access a Motivated Talent Pool",
    description: "Reach thousands of skilled, motivated newcomer candidates actively seeking work.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Diverse, Global Perspectives",
    description: "Build a stronger, more diverse team with candidates bringing global experience.",
  },
  {
    icon: HiOutlineHandRaised,
    title: "Dedicated Hiring Support",
    description: "Get guidance on credential recognition, onboarding, and inclusive hiring practices.",
  },
  {
    icon: HiOutlineBriefcase,
    title: "Simple Job Posting Tools",
    description: "Post, manage, and track applications through an easy-to-use employer dashboard.",
  },
]

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For small teams hiring occasionally.",
    features: ["1 active job posting", "30-day listing", "Basic applicant inbox", "Community support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$99",
    period: "/ month",
    description: "For growing teams hiring regularly.",
    features: [
      "10 active job postings",
      "60-day listings",
      "Featured placement",
      "Applicant tracking tools",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale hiring programs.",
    features: [
      "Unlimited job postings",
      "Dedicated account manager",
      "Custom onboarding support",
      "Employer branding page",
      "API access",
    ],
    highlighted: false,
  },
]

export const values = [
  {
    icon: HiOutlineHandRaised,
    title: "Compassion",
    description: "We meet every newcomer with empathy, understanding the challenges of starting over.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Inclusion",
    description: "We champion diverse, welcoming workplaces where every background is valued.",
  },
  {
    icon: HiOutlineAcademicCap,
    title: "Empowerment",
    description: "We equip newcomers with tools, skills, and confidence to build lasting careers.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Community",
    description: "We believe strong communities are built when everyone has the chance to contribute.",
  },
]