import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, Button, Field, inputClass, inputStyle } from "../ui/Primitives";
import Badge from "../ui/Badge";
import DeleteAccountSection from "../shared/DeleteAccountSection";

export default function CompanyProfile() {
  const { company } = useOutletContext();
  const [form, setForm] = useState(company);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  const badgeStatus = form.verification_status === "verified" ? "verified" : form.verification_status;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Company Profile</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Manage the details employers and Newcomer Jobline admins see.</p>
        </div>
        <Badge status={badgeStatus} />
      </div>

      {form.verification_status === "rejected" && form.rejection_reason && (
        <Card className="border p-4" style={{ borderColor: "var(--status-rejected-text)", background: "var(--status-rejected-bg)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--status-rejected-text)" }}>Verification rejected</p>
          <p className="mt-1 text-sm" style={{ color: "var(--status-rejected-text)" }}>{form.rejection_reason}</p>
        </Card>
      )}

      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="space-y-6">
        <Card className="space-y-5 p-6">
          <Field label="Company name" required>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} style={inputStyle} />
          </Field>
          <Field label="Website" required>
            <input value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} style={inputStyle} />
          </Field>
          <Field label="Business registration number">
            <input disabled value={form.registration_number} className={inputClass} style={{ ...inputStyle, background: "var(--color-bg)" }} />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={form.description || ""} onChange={(e) => update("description", e.target.value)} className={inputClass} style={inputStyle} />
          </Field>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>Saved.</span>}
        </div>
      </form>

      <DeleteAccountSection
        title="Delete account"
        description="This permanently removes your recruiter account."
        guardMessage="You're the sole owner of an active company. Transfer ownership or close the company before deleting your account."
      />
    </div>
  );
}
