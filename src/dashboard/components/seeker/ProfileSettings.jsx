import { useRef, useState } from "react";
import { FiUpload, FiFile, FiTrash2 } from "react-icons/fi";
import { Card, Button, Field, TagInput, inputClass, inputStyle } from "../ui/Primitives";
import DeleteAccountSection from "../shared/DeleteAccountSection";
import { mockSeekerProfile } from "../../mock/profile";

export default function ProfileSettings() {
  const [profile, setProfile] = useState(mockSeekerProfile);
  const [resume, setResume] = useState(null); // { name, uploadedAt }
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  function update(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  function onFilePick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResume({ name: file.name, uploadedAt: new Date().toISOString() });
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
            <Field label="Email">
              <input disabled value={profile.email} className={inputClass} style={{ ...inputStyle, background: "var(--color-bg)" }} />
            </Field>
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
              <input value={profile.phone || ""} onChange={(e) => update("phone", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field label="Headline" hint="A short tagline shown to employers" className="sm:col-span-2">
              <input value={profile.headline || ""} onChange={(e) => update("headline", e.target.value)} className={inputClass} style={inputStyle} placeholder="e.g. Executive Assistant | 5 yrs experience" />
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

        <Card className="space-y-4 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Resume</h2>
          {resume ? (
            <div className="flex items-center justify-between rounded-[var(--radius-md)] border p-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center gap-3">
                <FiFile size={20} style={{ color: "var(--color-secondary)" }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>{resume.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    Uploaded {new Date(resume.uploadedAt).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>Replace</Button>
                <button type="button" onClick={() => setResume(null)} aria-label="Remove resume" style={{ color: "var(--status-rejected-text)" }}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed p-8 text-sm"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            >
              <FiUpload size={22} style={{ color: "var(--color-secondary)" }} />
              Click to upload your resume (PDF)
            </button>
          )}
          <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={onFilePick} />
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit">Save changes</Button>
          {saved && <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>Saved.</span>}
        </div>
      </form>

      <DeleteAccountSection
        title="Delete account"
        description="This permanently removes your profile, resume, and application history."
      />
    </div>
  );
}
