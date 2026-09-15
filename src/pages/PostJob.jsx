// src/pages/PostJob.jsx
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../dashboard/auth/AuthContext";
import PostJobHero from "../components/postJob/PostJobHero";
import PostJobFeatureGrid from "../components/postJob/PostJobFeatureGrid";
import JobPostingForm from "../components/postJob/JobPostingForm";
import EmployerBenefitsSidebar from "../components/postJob/EmployerBenefitsSidebar";
import HowPostingWorks from "../components/postJob/HowPostingWorks";
import WhyEmployersChooseUs from "../components/postJob/WhyEmployersChooseUs";
import EmployerStatsStrip from "../components/postJob/EmployerStatsStrip";
import EmployerFAQSection from "../components/postJob/EmployerFAQSection";
import HireCTABand from "../components/postJob/HireCTABand";

/**
 * Module 2: Post a Job page (/post-job)
 * Composes all postJob sub-sections.
 * formRef is passed down so Hero and CTA Band can scroll to the form.
 */
const PostJob = () => {
  // Ref attached to the form section for smooth-scroll from hero / CTA buttons
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  async function continueToDashboard() {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/employer-dashboard/post-a-job" } });
      return;
    }
    if (role !== "recruiter") throw new Error("Sign in with an employer account to post jobs.");
    navigate("/employer-dashboard/post-a-job");
  }

  return (
    <>
      {/* 5.1 Hero */}
      <PostJobHero formRef={formRef} />

      {/* 5.2 Feature Grid (4 cards, white background) */}
      <PostJobFeatureGrid />

      {/* 5.3 Job Posting Form + Benefits Sidebar — two-column layout */}
      <section
        ref={formRef}
        id="post-job-form"
        className="py-12 sm:py-16 bg-white scroll-mt-20"
      >
        <div className="container-app">
          {/* Section heading above the two-column layout */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit bg-gold-50 text-gold-600 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              Get Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-heading">
              Post Your Job Listing
            </h2>
            <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
          </div>

          {/* Two-column: Form (65%) + Sidebar (35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            <JobPostingForm onSubmit={continueToDashboard} />
            <EmployerBenefitsSidebar />
          </div>
        </div>
      </section>

      {/* 5.4 How Posting Works (cream tinted band) */}
      <HowPostingWorks />

      {/* 5.4 Why Employers Choose Us (4 icon-text cards) */}
      <WhyEmployersChooseUs />

      {/* 5.4 Stats Strip (wide white card within cream band) */}
      <EmployerStatsStrip />

      {/* 5.5 FAQ for Employers (2x2 grid, white background) */}
      <EmployerFAQSection />

      {/* 5.6 Ready to Hire CTA Band */}
      <HireCTABand formRef={formRef} />
    </>
  );
};

export default PostJob;
