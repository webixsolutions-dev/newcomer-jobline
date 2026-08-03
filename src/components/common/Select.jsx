import { useId } from "react"
import { HiChevronDown } from "react-icons/hi2"

const Select = ({ label, icon: Icon, options = [], className = "", containerClassName = "", ...props }) => {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-navy-800">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 text-lg pointer-events-none" />}
        <select
          id={id}
          className={`w-full appearance-none rounded-xl border border-navy-200 bg-navy-50/40 px-4 py-3 text-sm sm:text-base text-navy-900 outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-100 ${
            Icon ? "pl-11" : ""
          } pr-10 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
      </div>
    </div>
  )
}

export default Select
