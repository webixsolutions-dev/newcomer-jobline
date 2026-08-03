import { useState } from "react";
import { FiBell, FiCheck } from "react-icons/fi";
import { Card, Button } from "../ui/Primitives";
import DataStateGate, { EmptyState } from "../ui/DataStates";
import { useAsync } from "../../hooks/useAsync";

export default function NotificationsList({ source }) {
  const { status, data, error, retry } = useAsync(() => source, { deps: [] });
  const [items, setItems] = useState(null);
  const list = items ?? data;

  function markRead(id) {
    setItems((list ?? data).map((n) => (n.id === id ? { ...n, read_at: n.read_at || new Date().toISOString() } : n)));
  }

  function markAllRead() {
    setItems((list ?? data).map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })));
  }

  const unreadCount = list?.filter((n) => !n.read_at).length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Notifications</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllRead}>
            <FiCheck size={14} /> Mark all read
          </Button>
        )}
      </div>

      <Card>
        <DataStateGate
          status={status}
          error={error}
          retry={retry}
          empty={
            list && list.length === 0 ? (
              <EmptyState icon={FiBell} title="No notifications yet" description="Updates about your activity will appear here." />
            ) : null
          }
        >
          {list && list.length > 0 && (
            <ul className="divide-y" style={{ borderColor: "var(--color-border)" }}>
              {list
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((n) => (
                  <li
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className="flex cursor-pointer items-start gap-3 px-5 py-4 transition hover:bg-[var(--color-bg)]"
                  >
                    {!n.read_at && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--color-accent)" }} />
                    )}
                    <div className={`min-w-0 ${n.read_at ? "ml-5" : ""}`}>
                      <p
                        className={`text-sm ${n.read_at ? "font-normal" : "font-semibold"}`}
                        style={{ color: "var(--color-primary)" }}
                      >
                        {n.payload?.message}
                      </p>
                      <p className="mt-0.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                        {new Date(n.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </DataStateGate>
      </Card>
    </div>
  );
}
