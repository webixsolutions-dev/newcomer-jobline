import { FiInbox, FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export function LoadingState({ rows = 3, label = "Loading…" }) {
  return (
    <div role="status" aria-label={label} className="space-y-3 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-14 w-full animate-pulse rounded-[var(--radius-md)]"
          style={{ background: "var(--color-border)" }}
        />
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon = FiInbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
        style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
      >
        <Icon />
      </div>
      <div>
        <p className="font-semibold" style={{ color: "var(--color-primary)" }}>
          {title}
        </p>
        {description && (
          <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--color-text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ message = "Something went wrong. Please try again.", onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
        style={{ background: "var(--status-rejected-bg)", color: "var(--status-rejected-text)" }}
      >
        <FiAlertTriangle />
      </div>
      <p className="font-semibold" style={{ color: "var(--color-primary)" }}>
        Couldn't load this
      </p>
      <p className="max-w-sm text-sm" style={{ color: "var(--color-text-muted)" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          style={{ background: "var(--color-primary)" }}
        >
          <FiRefreshCw /> Retry
        </button>
      )}
    </div>
  );
}

/** Wraps { status, data, error, retry } from useAsync and dispatches to the right state. */
export default function DataStateGate({ status, error, retry, empty, children }) {
  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState message={error} onRetry={retry} />;
  if (empty) return empty;
  return children;
}
