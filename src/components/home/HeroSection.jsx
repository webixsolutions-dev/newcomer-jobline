// src/components/home/HeroSection.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiUserGroup,
  HiAcademicCap,
  HiGlobe,
  HiBookOpen,
} from "react-icons/hi";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { FaLayerGroup } from "react-icons/fa6";
import {
  HERO_JOB_SEARCH_BUTTON,
  HERO_JOB_SEARCH_BUTTON_WRAP,
  HERO_JOB_SEARCH_FIELD,
  HERO_JOB_SEARCH_FIELD_NARROW,
  HERO_JOB_SEARCH_SHELL,
} from "../jobs/heroJobSearchClasses";

const CATEGORIES = [
  "All categories",
  "Administration & Office",
  "Customer Service",
  "Technology & IT",
  "Skilled Trades",
  "Healthcare Support",
  "Hospitality",
];

const EMPLOYMENT_TYPES = [
  "All types",
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship",
];

const FEATURES = [
  {
    icon: HiUserGroup,
    title: "Inclusive Employers",
    desc: "Connect with employers who value diversity.",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    icon: HiAcademicCap,
    title: "Career Support",
    desc: "Access tools, guidance, and resources to grow.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
  {
    icon: HiGlobe,
    title: "Canada-Wide Opportunities",
    desc: "Find jobs in cities and communities across Canada.",
    color: "text-teal-700",
    bg: "bg-teal-50",
  },
  {
    icon: HiBookOpen,
    title: "Settlement-Friendly Resources",
    desc: "Helpful information for your settlement and career journey.",
    color: "text-gold-600",
    bg: "bg-gold-50",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All categories");
  const [employmentType, setEmploymentType] = useState("All types");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/browse-jobs", {
      state: { keyword, location, category, employmentType },
    });
  };

  return (
    <div className="relative bg-white overflow-hidden w-full">
      {/* ── Hero: white copy column + photo (matches homepage mock) ── */}
      <section className="relative overflow-hidden bg-white pt-[72px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[520px] items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy-padding flex flex-col justify-center gap-5 py-10 sm:py-14 lg:py-16 max-w-xl w-full min-w-0 bg-white z-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] text-navy-900 font-heading">
              Helping Newcomers Find
              <br />
              Jobs and Build Careers{" "}
              <span className="text-teal-700">in Canada</span>
            </h1>
            <div className="w-10 h-1 bg-gold-500 rounded-full" />
            <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-md">
              Newcomer Jobline connects skilled newcomers with inclusive
              employers, career support, and opportunities across Canada. Your
              future starts here.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-white font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiBriefcase className="text-xl shrink-0" />
                Browse Jobs
              </Link>
              <Link
                to="/employers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-teal-50 text-teal-700 font-bold rounded-full border-2 border-teal-700 transition-all duration-200 text-sm sm:text-base"
              >
                <HiOfficeBuilding className="text-xl shrink-0 text-teal-700" />
                For Employers
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-0 h-full"
          >
            <img
              src="/herohome.webp"
              alt="Diverse group of professionals in Canada"
              className="absolute inset-0 w-full h-full object-cover object-center lg:object-right"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Search bar (matches Browse Jobs spacing) ── */}
      <div className="relative z-20 w-full -mt-6 sm:-mt-10 pb-10">
        <div className="container-app">
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={HERO_JOB_SEARCH_SHELL}
          >
            <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-center divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
              <div className={HERO_JOB_SEARCH_FIELD}>
                <HiOutlineMagnifyingGlass className="text-navy-400 text-xl shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                    Keyword
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, skills, or company"
                    className="w-full bg-transparent text-navy-900 text-sm focus:outline-none placeholder:text-navy-400"
                  />
                </div>
              </div>

              <div className={HERO_JOB_SEARCH_FIELD}>
                <HiOutlineMapPin className="text-navy-400 text-xl shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, province, or remote"
                    className="w-full bg-transparent text-navy-900 text-sm focus:outline-none placeholder:text-navy-400"
                  />
                </div>
              </div>

              <div className={HERO_JOB_SEARCH_FIELD_NARROW}>
                <FaLayerGroup className="text-navy-400 text-lg shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-transparent text-navy-900 text-sm focus:outline-none cursor-pointer appearance-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={HERO_JOB_SEARCH_FIELD_NARROW}>
                <HiOutlineBriefcase className="text-navy-400 text-lg shrink-0" />
                <div className="flex flex-col w-full min-w-0">
                  <label className="text-[10px] font-bold text-navy-900 uppercase tracking-wider hidden sm:block">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full bg-transparent text-navy-900 text-sm focus:outline-none cursor-pointer appearance-none"
                  >
                    {EMPLOYMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={HERO_JOB_SEARCH_BUTTON_WRAP}>
                <button type="submit" className={HERO_JOB_SEARCH_BUTTON}>
                  <HiOutlineMagnifyingGlass className="text-lg" />
                  Search Jobs
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>

      <div className="container-app relative z-10 mt-8 sm:mt-10 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div
                className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full ${f.bg}`}
              >
                <f.icon className={`text-xl ${f.color}`} />
              </div>
              <div>
                <p className="font-bold text-navy-900 text-base md:text-[20px] font-heading mb-1">
                  {f.title}
                </p>
                <p className="text-navy-500 text-sm mt-1 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
