import { useId } from "react"

/**
 * Reusable text input with floating icon + label + error support.
 */
const Input = ({
  label,
  icon: Icon,
  error,
  className = "",
  containerClassName = "",
  ...props
}) => {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-navy-800">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-lg" />
        )}
        <input
          id={id}
          className={`w-full rounded-xl border bg-navy-50/40 px-4 py-3 text-sm sm:text-base text-navy-900 placeholder:text-navy-400 outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-100 ${
            Icon ? "pl-11" : ""
          } ${error ? "border-red-400" : "border-navy-200"} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  )
}

export default Input
