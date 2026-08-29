/** Grid wrapper for dashboard stat cards. */
export default function StatCardRow({ children, columns = 4 }) {
  const colClass =
    columns === 3
      ? "sm:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return <div className={`grid grid-cols-1 gap-4 ${colClass}`}>{children}</div>;
}
