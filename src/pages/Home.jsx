// src/pages/Home.jsx
import HeroSection from "../components/home/HeroSection";
import PopularCategories from "../components/home/PopularCategories";
import HowItWorksSection from "../components/home/HowItWorksSection";
import TrustedStatsStrip from "../components/home/TrustedStatsStrip";
import CareerResources from "../components/home/CareerResources";
import ForEmployersSection from "../components/home/ForEmployersSection";
import CareerJourneyCTA from "../components/home/CareerJourneyCTA";
import FAQSection from "../components/home/FAQSection";

const Home = () => {
  return (
    <>
      {/* 4.2 Hero + Search + Feature Highlights */}
      <HeroSection />

      {/* 4.3 Popular Job Categories */}
      <PopularCategories />

      {/* 4.4 How It Works */}
      <HowItWorksSection />

      {/* 4.5 Trusted Stats Strip */}
      <TrustedStatsStrip />

      {/* 4.6 Career Resources for Newcomers */}
      <CareerResources />

      {/* 4.7 For Employers */}
      <ForEmployersSection />

      {/* 4.9 Start Your Career Journey CTA */}
      <CareerJourneyCTA />

      {/* 4.10 FAQ Section */}
      <FAQSection />
    </>
  );
};

export default Home;
