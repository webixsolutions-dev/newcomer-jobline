const TONES = {
  gold: "bg-gold-50 text-gold-700 border-gold-200",
  navy: "bg-navy-50 text-navy-700 border-navy-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
  white: "bg-white/15 text-white border-white/30",
}

const Badge = ({ children, tone = "navy", icon: Icon, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-semibold ${TONES[tone]} ${className}`}
    >
      {Icon && <Icon className="text-sm" />}
      {children}
    </span>
  )
}

export default Badge
