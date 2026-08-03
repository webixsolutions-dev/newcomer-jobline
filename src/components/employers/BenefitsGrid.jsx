import { motion } from "framer-motion"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import { employerBenefits } from "../../data/content"

const BenefitsGrid = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="For Employers"
          title="Why Hire Through Newcomer Jobline"
          highlight="Newcomer Jobline"
          subtitle="Build a stronger, more diverse team while making a meaningful difference in your community."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {employerBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 rounded-2xl border border-navy-100 p-6 shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-2xl text-gold-600">
                <b.icon />
              </div>
              <h3 className="font-bold text-navy-900">{b.title}</h3>
              <p className="text-sm text-navy-500 leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default BenefitsGrid
