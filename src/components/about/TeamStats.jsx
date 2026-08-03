import Container from "../common/Container"
import StatCard from "../common/StatCard"
import { HiOutlineUserGroup, HiOutlineBuildingOffice2, HiOutlineMapPin, HiOutlineFaceSmile } from "react-icons/hi2"

const teamStats = [
  { icon: HiOutlineUserGroup, value: 8500, suffix: "+", label: "Newcomers Placed" },
  { icon: HiOutlineBuildingOffice2, value: 340, suffix: "+", label: "Partner Employers" },
  { icon: HiOutlineMapPin, value: 30, suffix: "+", label: "Cities Across Canada" },
  { icon: HiOutlineFaceSmile, value: 96, suffix: "%", label: "Satisfaction Rate" },
]

const TeamStats = () => {
  return (
    <section className="py-20 sm:py-24 bg-navy-900 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {teamStats.map((stat) => (
            <StatCard key={stat.label} {...stat} light />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TeamStats
