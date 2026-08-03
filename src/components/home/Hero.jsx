// src/components/home/Hero.jsx
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Sparkles, ArrowRight, Users, Building2, CheckCircle2 } from "lucide-react";
import Container from "../common/Container";
import Button from "../common/Button";
import SearchBar from "../jobs/SearchBar";

const Hero = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    navigate("/browse-jobs", { state: { keyword, location } });
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36 sm:pb-32 min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/90 to-navy-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      {/* Animated Orbs */}
      <motion.div
        className="pointer-events-none absolute top-10 right-[8%] h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-[5%] h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative flex flex-col items-center lg:items-start gap-8 sm:gap-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-gold-300 backdrop-blur-sm border border-white/10"
        >
          <Sparkles className="w-4 h-4" />
          Welcoming Newcomers to Meaningful Careers
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl text-center lg:text-start text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white"
        >
          Find Your Next{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-500">
            Job Opportunity
          </span>{" "}
          as a Newcomer
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-center lg:text-start text-base sm:text-lg text-navy-100 leading-relaxed"
        >
          Newcomer Jobline connects immigrants and newcomers with employers who value your
          experience — with resume help, interview coaching, and a community that has your back.
        </motion.p>



        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
        >
          <Button as={Link} to="/browse-jobs" variant="primary" size="md" icon={ArrowRight}>
            Browse All Jobs
          </Button>
          <Button as={Link} to="/employers" variant="outlineLight" size="md">
            I'm Hiring
          </Button>
        </motion.div>



        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-2 text-navy-100"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Users className="w-5 h-5 text-gold-400" />
            <span>10,000+ Newcomers Placed</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Building2 className="w-5 h-5 text-gold-400" />
            <span>500+ Trusted Employers</span>
          </div>
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <CheckCircle2 className="w-5 h-5 text-gold-400" />
            <span>Free to Use</span>
          </div>
        </motion.div>


        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-3xl"
        >
          <SearchBar
            keyword={keyword}
            location={location}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
