import { motion } from "framer-motion"

/**
 * Generic animated card wrapper used across the site.
 * Props: hover (bool - lift on hover), padding, className
 */
const Card = ({ children, hover = true, padding = "p-6", className = "", ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -6, boxShadow: "0 20px 40px -16px rgba(11,37,69,0.25)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`bg-white rounded-2xl border border-navy-100 shadow-card ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
