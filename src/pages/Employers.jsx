import { Link } from "react-router-dom"
import { HiArrowRight, HiOutlineBuildingOffice2 } from "react-icons/hi2"
import PageHero from "../components/common/PageHero"
import Button from "../components/common/Button"
import StatsSection from "../components/home/StatsSection"
import BenefitsGrid from "../components/employers/BenefitsGrid"
import PricingPlans from "../components/employers/PricingPlans"
import Testimonials from "../components/home/Testimonials"
import FAQSection from "../components/common/FAQSection"
import CTASection from "../components/home/CTASection"

const employerFaqs = [
  {
    question: "What kind of candidates can I expect?",
    answer:
      "Our platform connects you with skilled, motivated newcomers across a wide range of industries and experience levels, all ready to contribute to Canadian workplaces.",
  },
  {
    question: "Do you help with credential recognition?",
    answer:
      "We provide resources and guidance to help employers understand and evaluate international credentials and experience.",
  },
  {
    question: "Is there a contract or commitment required?",
    answer: "No long-term contract is required. You can post a single job for free or choose a monthly plan that fits your hiring needs.",
  },
]

const Employers = () => {
  return (
    <>
      <PageHero
        eyebrow="For Employers"
        title="Hire Skilled Newcomer Talent"
        highlight="Newcomer Talent"
        subtitle="Build a stronger, more diverse workforce by connecting with motivated newcomers ready to grow with your business."
        crumb="Employers"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button as={Link} to="/post-job" variant="primary" icon={HiArrowRight}>
            Post a Job
          </Button>
          <Button as={Link} to="/contact" variant="outlineLight" icon={HiOutlineBuildingOffice2}>
            Talk to Sales
          </Button>
        </div>
      </PageHero>

      <StatsSection />
      <BenefitsGrid />
      <PricingPlans />
      <Testimonials />
      <FAQSection items={employerFaqs} eyebrow="Employer FAQ" title="Common Employer Questions" highlight="Employer" />
      <CTASection />
    </>
  )
}

export default Employers
