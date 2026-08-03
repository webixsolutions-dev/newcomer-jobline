import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Card, Button } from "../ui/Primitives";

export default function DeleteAccountSection({
  title = "Delete account",
  description = "This action is permanent and cannot be undone.",
  guardMessage,
}) {
  const [confirming, setConfirming] = useState(false);
  const [typed, setTyped] = useState("");
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return (
      <Card className="border p-6 text-center" style={{ borderColor: "var(--status-rejected-text)" }}>
        <p className="font-semibold" style={{ color: "var(--status-rejected-text)" }}>
          Account deletion requested.
        </p>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
          This is a mock — nothing was actually deleted.
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-4 border p-6" style={{ borderColor: "var(--status-rejected-bg)" }}>
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--status-rejected-bg)", color: "var(--status-rejected-text)" }}
        >
          <FiAlertTriangle />
        </div>
        <div>
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>{title}</h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{description}</p>
        </div>
      </div>

      {guardMessage ? (
        <div
          className="rounded-[var(--radius-md)] p-3 text-sm"
          style={{ background: "var(--status-pending-bg)", color: "var(--status-pending-text)" }}
        >
          {guardMessage}
        </div>
      ) : !confirming ? (
        <Button variant="danger" onClick={() => setConfirming(true)}>Delete my account</Button>
      ) : (
        <div className="space-y-3 rounded-[var(--radius-md)] border p-4" style={{ borderColor: "var(--status-rejected-text)" }}>
          <p className="text-sm" style={{ color: "var(--color-text)" }}>
            This will permanently remove your profile{description.includes("resume") ? ", resume, and application history" : " and all associated data"}.
            Type <strong>DELETE</strong> to confirm.
          </p>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border px-3 py-2 text-sm outline-none"
            style={{ borderColor: "var(--color-border)" }}
            placeholder="Type DELETE"
          />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => { setConfirming(false); setTyped(""); }}>Cancel</Button>
            <Button variant="danger" disabled={typed !== "DELETE"} onClick={() => setDeleted(true)}>
              Permanently delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
