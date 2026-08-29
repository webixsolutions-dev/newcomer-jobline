// src/components/home/HeroSection.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiBriefcase,
  HiOfficeBuilding,
  HiSearch,
  HiLocationMarker,
  HiViewGrid,
  HiUserGroup,
  HiAcademicCap,
  HiGlobe,
  HiBookOpen,
} from "react-icons/hi";

const CATEGORIES = [
  "All categories",
  "Administration & Office",
  "Customer Service",
  "Technology & IT",
  "Skilled Trades",
  "Healthcare Support",
  "Hospitality",
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", { keyword, location, category });
    navigate("/browse-jobs");
  };

  return (
    <section className="relative bg-white overflow-hidden pt-20 pb-10 w-full">
      {/* ── Two-column hero ── */}
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left: text content — left edge aligned with navbar logo */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="py-10 lg:py-12 flex flex-col justify-center gap-5 z-10 page-gutters lg:pl-[max(theme(spacing.24),calc((100vw-80rem)/2+theme(spacing.24)))]"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
              >
                <HiBriefcase className="text-xl" />
                Browse Jobs
              </Link>
              <Link
                to="/employers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-full border-2 border-navy-900 transition-all duration-200 text-sm sm:text-base"
              >
                <HiOfficeBuilding className="text-xl" />
                For Employers
              </Link>
            </div>
          </motion.div>

          {/* Right: hero image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative hidden lg:block w-full aspect-[16/9]"
          >
            <img
              src="/herohome.webp"
              alt="Diverse group of professionals in Canada"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-white via-white/40 to-transparent z-10 pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* ── Floating Search Card ── */}
      <div className="relative z-20 -mt-6 pb-0">
        <div className="container-app max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(11,37,69,0.14)] border border-navy-100 px-6 py-6"
          >
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.2fr_1.2fr_1fr_auto] gap-4 items-end">
                {/* Keyword */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Keyword
                  </label>
                  <div className="flex items-center gap-2 border border-navy-100 rounded-xl px-3 py-2.5 focus-within:border-teal-600 transition-colors bg-white">
                    <HiSearch className="text-navy-400 text-lg shrink-0" />
                    <input
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Job title, skills, or company"
                      className="flex-1 text-sm text-navy-900 placeholder-navy-300 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Location
                  </label>
                  <div className="flex items-center gap-2 border border-navy-100 rounded-xl px-3 py-2.5 focus-within:border-teal-600 transition-colors bg-white">
                    <HiLocationMarker className="text-navy-400 text-lg shrink-0" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, province, or remote"
                      className="flex-1 text-sm text-navy-900 placeholder-navy-300 outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-navy-500 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="flex items-center gap-2 border border-navy-100 rounded-xl px-3 py-2.5 focus-within:border-teal-600 transition-colors bg-white">
                    <HiViewGrid className="text-navy-400 text-lg shrink-0" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex-1 text-sm text-navy-900 outline-none bg-transparent appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Button inside container */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-colors text-sm w-full md:w-auto h-[46px] shrink-0"
                >
                  <HiSearch className="text-base" />
                  Search Jobs
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── Feature Highlights ── */}
      <div className="container-app max-w-5xl py-6">
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
    </section>
  );
};

export default HeroSection;
