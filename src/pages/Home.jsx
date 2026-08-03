import Hero from "../components/home/Hero"
import StatsSection from "../components/home/StatsSection"
import CategoryGrid from "../components/home/CategoryGrid"
import HowItWorks from "../components/home/HowItWorks"
import FeaturedJobs from "../components/home/FeaturedJobs"
import Testimonials from "../components/home/Testimonials"
import CTASection from "../components/home/CTASection"
import FAQSection from "../components/common/FAQSection"
import { faqs } from "../data/content"

const Home = () => {
  return (
    <>
      <Hero />
      <StatsSection />
      <CategoryGrid />
      <HowItWorks />
      <FeaturedJobs />
      <Testimonials />
      <FAQSection items={faqs} />
      <CTASection />
    </>
  )
}

export default Home
