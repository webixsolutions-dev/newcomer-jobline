import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import JobCard from "../jobs/JobCard"
import Button from "../common/Button"
import { jobs } from "../../data/jobs"

const FeaturedJobs = () => {
  const featured = jobs.filter((j) => j.featured).slice(0, 3)

  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Fresh Opportunities"
          title="Featured Job Openings"
          highlight="Openings"
          subtitle="Hand-picked roles from employers who are ready to welcome newcomers to their teams."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button as={Link} to="/browse-jobs" variant="secondary" icon={ArrowRight}>
            View All Jobs
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedJobs
