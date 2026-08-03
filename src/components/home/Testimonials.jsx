import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import { testimonials } from "../../data/content"

const Testimonials = () => {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const go = (dir) => {
    setDirection(dir)
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  }

  const t = testimonials[index]

  return (
    <section className="py-20 sm:py-28 bg-hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <Container className="relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Success Stories"
          title="Newcomers Who Found Their Footing"
          highlight="Footing"
          subtitle="Real stories from people who started their Canadian career journey with us."
          light
        />

        <div className="relative max-w-3xl mx-auto w-full">
          <Quote className="w-12 h-12 text-gold-500/30 mx-auto mb-6" />
          <div className="relative min-h-[220px] sm:min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center text-center gap-6"
              >
                <p className="text-lg sm:text-2xl font-medium text-white leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${t.avatarColor} text-sm font-bold text-white`}
                  >
                    {t.initials}
                  </span>
                  <div className="text-left">
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-sm text-navy-200">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-navy-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-gold-500" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-navy-900 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Testimonials
