import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate } from "framer-motion"

/**
 * Animated counting stat card. value should be a number, suffix like "+" or "%".
 */
const StatCard = ({ icon: Icon, value, suffix = "", label, light = false }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.floor(v)),
      })
      return () => controls.stop()
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center text-center gap-2 p-6 rounded-2xl ${
        light ? "bg-white/5 border border-white/10" : "bg-navy-50 border border-navy-100"
      }`}
    >
      {Icon && (
        <div className={`mb-1 flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${light ? "bg-gold-500/20 text-gold-400" : "bg-gold-100 text-gold-600"}`}>
          <Icon />
        </div>
      )}
      <p className={`text-3xl sm:text-4xl font-extrabold ${light ? "text-white" : "text-navy-900"}`}>
        {display.toLocaleString()}
        <span className="text-gold-500">{suffix}</span>
      </p>
      <p className={`text-sm font-medium ${light ? "text-navy-200" : "text-navy-500"}`}>{label}</p>
    </motion.div>
  )
}

export default StatCard
