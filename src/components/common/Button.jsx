import { motion } from "framer-motion"

const VARIANTS = {
  primary:
    "bg-gold-500 text-navy-900 hover:bg-gold-400 shadow-soft focus-visible:ring-gold-300",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-soft focus-visible:ring-navy-400",
  outline:
    "bg-transparent text-navy-900 border-2 border-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-300",
  outlineLight:
    "bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-navy-900 focus-visible:ring-white",
  ghost:
    "bg-transparent text-navy-700 hover:bg-navy-50 focus-visible:ring-navy-200",
  teal:
    "bg-teal-700 text-white hover:bg-teal-800 shadow-soft focus-visible:ring-teal-300",
}

const SIZES = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm sm:text-base gap-2",
  lg: "px-8 py-4 text-base sm:text-lg gap-2.5",
}

/**
 * Advanced reusable Button
 * Props: variant, size, icon (react-icon component), iconPosition, as ('button' | 'a' | Link), to/href, fullWidth, loading
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  as: Component = "button",
  fullWidth = false,
  loading = false,
  className = "",
  ...props
}) => {
  const base =
    "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={fullWidth ? "w-full" : "inline-block"}
    >
      <Component
        className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${
          fullWidth ? "w-full" : ""
        } ${className}`}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className="text-lg shrink-0" />}
            <span>{children}</span>
            {Icon && iconPosition === "right" && <Icon className="text-lg shrink-0" />}
          </>
        )}
      </Component>
    </motion.div>
  )
}

export default Button
