import Container from "../common/Container"
import StatCard from "../common/StatCard"
import { stats } from "../../data/content"

const StatsSection = () => {
  return (
    <section className="py-14 sm:py-20 bg-white relative z-10 -mt-10 sm:-mt-14">
      <Container>
        <div className="rounded-3xl bg-white shadow-soft border border-navy-100 px-4 py-8 sm:px-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default StatsSection
