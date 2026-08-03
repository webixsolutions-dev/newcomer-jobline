import { useId } from "react"

const Textarea = ({ label, error, className = "", containerClassName = "", ...props }) => {
  const id = useId()
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-navy-800">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={5}
        className={`w-full rounded-xl border bg-navy-50/40 px-4 py-3 text-sm sm:text-base text-navy-900 placeholder:text-navy-400 outline-none transition-all duration-200 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-100 resize-none ${
          error ? "border-red-400" : "border-navy-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  )
}

export default Textarea
