import { Card } from "../../dashboard/components/ui/Primitives";

export default function CompanyProfileForm({ profile }) {
  const rows = [
    ["Company name", profile.name],
    ["Website", profile.website],
    ["Registration number", profile.registration_number],
    ["Verification", profile.verification_status],
    ["Account status", profile.status],
  ];

  return (
    <Card className="space-y-5 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>{label}</p>
            <p className="mt-1 break-words font-semibold capitalize" style={{ color: "var(--color-primary)" }}>{value || "Not provided"}</p>
          </div>
        ))}
      </div>
      {profile.description && <div><p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>Description</p><p className="mt-2 text-sm leading-6" style={{ color: "var(--color-text)" }}>{profile.description}</p></div>}
      <p className="rounded-xl bg-slate-50 p-4 text-sm" style={{ color: "var(--color-text-muted)" }}>These verified company details are securely linked to your recruiter account. Contact support if they need to be updated.</p>
    </Card>
  );
}
