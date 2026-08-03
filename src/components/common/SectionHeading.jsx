import { motion } from "framer-motion"

/**
 * Reusable section heading with eyebrow label, title (with optional highlighted word), and subtitle.
 * Props: eyebrow, title, highlight (word inside title to color gold), subtitle, align ('center' | 'left'), light (for dark backgrounds)
 */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  light = false,
  className = "",
}) => {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left"

  const renderTitle = () => {
    if (!highlight) return title
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-gold-500">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment} ${className}`}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-widest uppercase px-4 py-1.5 rounded-full w-fit ${
            light ? "bg-white/10 text-gold-300" : "bg-gold-50 text-gold-600"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? "text-navy-100" : "text-navy-500"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading
