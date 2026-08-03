import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { HiChevronRight } from "react-icons/hi2"
import Container from "../common/Container"

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Decorative dot-grid background, consistent with TeamStats */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 text-sm font-medium text-navy-300"
        >
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <HiChevronRight className="h-3.5 w-3.5 text-navy-500" />
          <span className="text-white">About Us</span>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> About Us
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          Helping Newcomers Build <span className="text-gold-400">Meaningful Careers</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-base leading-relaxed text-navy-300 sm:text-lg"
        >
          We connect skilled newcomers with inclusive employers across Canada, offering the
          support, resources, and opportunities needed to build a lasting career.
        </motion.p>
      </Container>
    </section>
  )
}

export default AboutHero
