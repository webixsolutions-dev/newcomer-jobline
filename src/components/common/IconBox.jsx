const TONES = {
  navy: "bg-navy-900 text-white",
  gold: "bg-gold-500 text-navy-900",
  teal: "bg-teal-700 text-white",
  soft: "bg-gold-50 text-gold-600",
  softNavy: "bg-navy-50 text-navy-700",
}

const SIZES = {
  sm: "h-10 w-10 text-lg",
  md: "h-14 w-14 text-2xl",
  lg: "h-16 w-16 text-3xl",
}

const IconBox = ({ icon: Icon, tone = "soft", size = "md", rounded = "rounded-2xl" }) => {
  return (
    <div className={`flex items-center justify-center ${rounded} ${TONES[tone]} ${SIZES[size]} shrink-0`}>
      <Icon />
    </div>
  )
}

export default IconBox
