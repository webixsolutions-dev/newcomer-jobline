// src/pages/Employers.jsx
import EmployersHero from "../components/employers/EmployersHero";
import EmployersFeatureGrid from "../components/employers/EmployersFeatureGrid";
import BuiltForEmployersSection from "../components/employers/BuiltForEmployersSection";
import EmployerHighlightsRow from "../components/employers/EmployerHighlightsRow";
import WhyChooseUsGrid from "../components/employers/WhyChooseUsGrid";
import HowItWorksNumbered from "../components/employers/HowItWorksNumbered";
import EmployerTrustStatsStrip from "../components/employers/EmployerTrustStatsStrip";
import EmployersHireCTABand from "../components/employers/EmployersHireCTABand";
import EmployersFAQSection from "../components/employers/EmployersFAQSection";

/**
 * Module 3: Employers page (/employers)
 * Composes all employers sub-sections.
 */
const Employers = () => {
  return (
    <>
      <EmployersHero />
      <EmployersFeatureGrid />
      <BuiltForEmployersSection />
      <EmployerHighlightsRow />
      <WhyChooseUsGrid />
      <HowItWorksNumbered />
      <EmployerTrustStatsStrip />
      <EmployersHireCTABand />
      <EmployersFAQSection />
    </>
  );
};

export default Employers;
