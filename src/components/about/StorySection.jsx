import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { HiArrowRight } from "react-icons/hi2"
import Container from "../common/Container"
import Button from "../common/Button"

const StorySection = () => {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/50">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-navy-800 to-teal-800 flex items-center justify-center overflow-hidden shadow-soft">
            <div className="grid grid-cols-3 gap-3 p-8 w-full h-full opacity-90">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-soft p-5 flex items-center gap-3 border border-navy-100">
            <span className="text-3xl font-extrabold text-gold-500">8+</span>
            <span className="text-sm text-navy-600 font-medium leading-tight">
              Years supporting <br /> newcomer careers
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-600">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 leading-tight">
            Built by Newcomers, <span className="text-gold-500">For Newcomers</span>
          </h2>
          <p className="text-navy-500 leading-relaxed">
            Newcomer Jobline was founded by a team who experienced firsthand how difficult it can
            be to find a first job in a new country. What started as a small community resource
            has grown into a nationwide platform connecting thousands of newcomers with employers
            who value diverse experience.
          </p>
          <p className="text-navy-500 leading-relaxed">
            Today, we partner with hundreds of inclusive employers across Canada, offering not
            just job listings but resume support, interview coaching, and language resources —
            because finding a job is just the beginning of a bigger journey.
          </p>
          <Button as={Link} to="/contact" variant="secondary" icon={HiArrowRight} className="w-fit mt-2">
            Get in Touch
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}

export default StorySection
