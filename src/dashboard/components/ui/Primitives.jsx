import { useState } from "react";
import { FiX } from "react-icons/fi";

export function Card({ children, className = "", ...rest }) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] ${className}`}
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Button({ variant = "primary", children, className = "", ...rest }) {
  const styles = {
    primary: { background: "var(--color-accent)", color: "var(--color-primary)" },
    secondary: { background: "var(--color-primary)", color: "#fff" },
    outline: { background: "transparent", color: "var(--color-primary)", border: "1px solid var(--color-border)" },
    danger: { background: "var(--status-rejected-text)", color: "#fff" },
    ghost: { background: "transparent", color: "var(--color-text-muted)" },
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={styles[variant]}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", danger, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <Card className="w-full max-w-sm p-6">
        <h3 className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>{title}</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant={danger ? "danger" : "secondary"} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </Card>
    </div>
  );
}

export function TagInput({ tags, onChange, placeholder = "Add a skill and press Enter" }) {
  const [value, setValue] = useState("");

  function addTag() {
    const v = value.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setValue("");
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-[var(--radius-md)] border p-2"
      style={{ borderColor: "var(--color-border)" }}
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(tags.filter((t) => t !== tag))}
          >
            <FiX />
          </button>
        </span>
      ))}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
        onBlur={addTag}
        placeholder={placeholder}
        className="min-w-[10rem] flex-1 border-none text-sm outline-none"
      />
    </div>
  );
}

export function Field({ label, children, hint, required, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium" style={{ color: "var(--color-primary)" }}>
        {label} {required && <span style={{ color: "var(--status-rejected-text)" }}>*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs" style={{ color: "var(--color-text-muted)" }}>{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-[var(--radius-md)] border px-3 py-2 text-sm outline-none transition focus:ring-2";
export const inputStyle = { borderColor: "var(--color-border)" };
