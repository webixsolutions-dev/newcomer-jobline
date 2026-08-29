// src/pages/AboutUs.jsx
import AboutHero from "../components/about/AboutHero";
import OurStorySection from "../components/about/OurStorySection";
import HowWeHelpSection from "../components/about/HowWeHelpSection";
import EmployerPartnershipRow from "../components/about/EmployerPartnershipRow";
import ImpactStatsBanner from "../components/about/ImpactStatsBanner";
import NextStepCTASection from "../components/about/NextStepCTASection";

/**
 * Module 6: About Us Page (/about)
 */
const AboutUs = () => {
  return (
    <>
      <AboutHero />
      <OurStorySection />
      <HowWeHelpSection />
      <EmployerPartnershipRow />
      <ImpactStatsBanner />
      <NextStepCTASection />
    </>
  );
};

export default AboutUs;
