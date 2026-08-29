import { FiSearch } from "react-icons/fi";
import { inputClass, inputStyle } from "../../dashboard/components/ui/Primitives";

const STATUS_OPTIONS = ["All", "Active", "Draft", "Closed"];

export default function JobPostingsFilterBar({ status, onStatusChange, search, onSearchChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onStatusChange(opt)}
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
            style={
              status === opt
                ? { background: "var(--color-primary)", color: "#fff" }
                : { background: "var(--color-bg)", color: "var(--color-text-muted)" }
            }
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="relative flex-1 sm:max-w-xs">
        <FiSearch
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title…"
          className={`${inputClass} pl-9`}
          style={inputStyle}
        />
      </div>
    </div>
  );
}
