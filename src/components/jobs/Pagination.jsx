import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 pt-6">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-600 disabled:opacity-40 hover:border-gold-400 hover:text-gold-600 transition-colors"
      >
        <HiChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-10 w-10 rounded-full text-sm font-semibold transition-colors ${
            p === page ? "bg-navy-900 text-white" : "text-navy-600 hover:bg-navy-50"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-600 disabled:opacity-40 hover:border-gold-400 hover:text-gold-600 transition-colors"
      >
        <HiChevronRight />
      </button>
    </div>
  )
}

export default Pagination
