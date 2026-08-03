import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import PostJobForm from "../components/forms/PostJobForm"
import WhyPostSidebar from "../components/forms/WhyPostSidebar"
import FAQSection from "../components/common/FAQSection"
import StatsSection from "../components/home/StatsSection"

const postJobFaqs = [
  {
    question: "How much does it cost to post a job?",
    answer: "Your first job posting is completely free. Additional postings are available through our paid plans.",
  },
  {
    question: "How long does my job stay listed?",
    answer: "Job listings stay active for 30 days by default, and can be renewed or extended anytime from your dashboard.",
  },
  {
    question: "Can I edit my job posting after publishing?",
    answer: "Yes, you can edit or update any active job posting at any time from your employer dashboard.",
  },
  {
    question: "How do I get access to newcomer-specific hiring resources?",
    answer: "Once your account is set up, you'll get access to our inclusive hiring guide, credential recognition tips, and onboarding templates.",
  },
]

const PostJob = () => {
  return (
    <>
      <PageHero
        eyebrow="Post a Job"
        title="Reach Motivated Newcomer Talent"
        highlight="Newcomer Talent"
        subtitle="Post your job in minutes and connect with thousands of skilled newcomers ready to contribute to your team."
        crumb="Post a Job"
      />

      <StatsSection />

      <section className="py-8 sm:py-12 bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PostJobForm />
          </div>
          <div className="lg:col-span-1">
            <WhyPostSidebar />
          </div>
        </Container>
      </section>

      <FAQSection items={postJobFaqs} eyebrow="Employer FAQ" title="Questions About Posting" highlight="Posting" />
    </>
  )
}

export default PostJob
