import { motion } from "framer-motion"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import { values } from "../../data/content"

const MissionValues = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Our Mission & Values"
          highlight="Mission"
          subtitle="We believe every newcomer deserves a fair chance to build a meaningful career and a new life."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col gap-4 rounded-2xl border border-navy-100 p-6 shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-700">
                <v.icon />
              </div>
              <h3 className="font-bold text-navy-900 text-lg">{v.title}</h3>
              <p className="text-sm text-navy-500 leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default MissionValues
