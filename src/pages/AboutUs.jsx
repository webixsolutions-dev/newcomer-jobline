import PageHero from "../components/common/PageHero"
import StorySection from "../components/about/StorySection"
import MissionValues from "../components/about/MissionValues"
import TeamStats from "../components/about/TeamStats"
import Testimonials from "../components/home/Testimonials"
import CTASection from "../components/home/CTASection"

const AboutUs = () => {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Helping Newcomers Build Careers in Canada"
        highlight="Careers"
        subtitle="Newcomer Jobline exists to close the gap between talented newcomers and the employers who need them."
        crumb="About Us"
      />
      <StorySection />
      <MissionValues />
      <TeamStats />
      <Testimonials />
      <CTASection />
    </>
  )
}

export default AboutUs
