import { useState } from "react";
import { Card, Button, Field, TagInput, inputClass, inputStyle } from "../ui/Primitives";
import { mockSeekerProfile } from "../../mock/profile";

export default function ProfileSettings() {
  const [profile, setProfile] = useState(mockSeekerProfile);
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Profile & Settings</h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Keep this up to date — it's what employers see with every application.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="space-y-5 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Account</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role">
              <input disabled value={profile.role === "job_seeker" ? "Job Seeker" : "Recruiter"} className={inputClass} style={{ ...inputStyle, background: "var(--color-bg)" }} />
            </Field>
            <Field label="Member since">
              <input
                disabled
                value={new Date(profile.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                className={inputClass}
                style={{ ...inputStyle, background: "var(--color-bg)" }}
              />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Personal details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" required>
              <input value={profile.full_name} onChange={(e) => update("full_name", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field label="Phone">
              <input value={profile.phone || ""} onChange={(e) => update("phone", e.target.value)} className={inputClass} style={inputStyle} placeholder="e.g. +1 (416) 555-0142" />
            </Field>
            <Field label="Email" className="sm:col-span-2">
              <input disabled value={profile.email} className={inputClass} style={{ ...inputStyle, background: "var(--color-bg)" }} />
            </Field>
            <Field label="Province">
              <input value={profile.location_province || ""} onChange={(e) => update("location_province", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field label="City">
              <input value={profile.location_city || ""} onChange={(e) => update("location_city", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
          </div>
          <Field label="Skills" hint="Add multiple — press Enter after each one">
            <TagInput tags={profile.skills} onChange={(skills) => update("skills", skills)} />
          </Field>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>Saved.</span>}
        </div>
      </form>
    </div>
  );
}
