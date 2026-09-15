import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase } from "lucide-react"
import Container from "../common/Container"
import Button from "../common/Button"

const CTASection = () => {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-14 sm:px-16 sm:py-16 text-center"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
          <motion.div
            className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-navy-900">
              <Briefcase className="w-7 h-7" />
            </div>
            <h2 className="max-w-xl text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Ready to Start Your Career Journey in Canada?
            </h2>
            <p className="max-w-lg text-navy-200 text-base sm:text-lg">
              Join thousands of newcomers who found meaningful work through Newcomer Jobline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <Button as={Link} to="/jobs" variant="primary" icon={ArrowRight}>
                Browse Jobs
              </Button>
              <Button as={Link} to="/contact" variant="outlineLight">
                Contact Us
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default CTASection
