import { useEffect, useRef, useState } from "react";
import { FiFileText, FiUpload } from "react-icons/fi";
import { Card, Button, Field, TagInput, inputClass, inputStyle } from "../ui/Primitives";
import { useAuth } from "../../auth/AuthContext";
import { readSession } from "../../../lib/auth/session";
import { getResumes, registerResume, updateProfile } from "../../../lib/jobs";
import { uploadResumeObject } from "../../../lib/api";

export default function ProfileSettings() {
  const { profile: authProfile, updateLocalProfile } = useAuth();
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    headline: "",
    location_province: "",
    location_city: "",
    skills: [],
  });
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    setProfile({
      full_name: authProfile?.full_name || "",
      phone: authProfile?.phone || "",
      headline: authProfile?.headline || "",
      location_province: authProfile?.location_province || "",
      location_city: authProfile?.location_city || "",
      skills: Array.isArray(authProfile?.skills) ? authProfile.skills : [],
    });
    const token = readSession()?.access_token;
    if (!token) return;
    getResumes(token)
      .then((data) => setResumes(data?.items || []))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, [authProfile]);

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage(null);
  }

  async function handleSave(event) {
    event.preventDefault();
    const token = readSession()?.access_token;
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      const data = await updateProfile(profile, token);
      updateLocalProfile(data.profile);
      setMessage("Profile saved successfully.");
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleResume(file) {
    if (!file) return;
    if (file.type !== "application/pdf" || !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF resumes are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be 5 MB or smaller.");
      return;
    }

    const session = readSession();
    if (!session?.access_token || !authProfile?.id) return;
    setUploading(true);
    setError(null);
    setMessage(null);
    try {
      const path = await uploadResumeObject(file, authProfile.id, session.access_token);
      const registered = await registerResume({
        path,
        original_name: file.name,
        size_bytes: file.size,
        content_type: "application/pdf",
      }, session.access_token);
      const updated = await updateProfile({ default_resume_path: path }, session.access_token);
      updateLocalProfile(updated.profile);
      setResumes((current) => [registered.resume, ...current]);
      setMessage("Resume uploaded and set as your default.");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Profile & Settings</h1><p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Keep your real profile and resume up to date.</p></div>
      <form onSubmit={handleSave} className="space-y-6">
        <Card className="space-y-5 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Personal details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" required><input required value={profile.full_name} onChange={(e) => update("full_name", e.target.value)} className={inputClass} style={inputStyle} /></Field>
            <Field label="Phone"><input value={profile.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} style={inputStyle} /></Field>
            <Field label="Email" className="sm:col-span-2"><input disabled value={authProfile?.email || ""} className={inputClass} style={{ ...inputStyle, background: "var(--color-bg)" }} /></Field>
            <Field label="Professional headline" className="sm:col-span-2"><input value={profile.headline} onChange={(e) => update("headline", e.target.value)} className={inputClass} style={inputStyle} /></Field>
            <Field label="Province"><input value={profile.location_province} onChange={(e) => update("location_province", e.target.value)} className={inputClass} style={inputStyle} /></Field>
            <Field label="City"><input value={profile.location_city} onChange={(e) => update("location_city", e.target.value)} className={inputClass} style={inputStyle} /></Field>
          </div>
          <Field label="Skills" hint="Press Enter after each skill"><TagInput tags={profile.skills} onChange={(skills) => update("skills", skills)} /></Field>
        </Card>

        <Card className="space-y-4 p-6">
          <div><h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Resume</h2><p className="text-xs" style={{ color: "var(--color-text-muted)" }}>PDF only, maximum 5 MB. Files are stored privately.</p></div>
          <input ref={fileRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => handleResume(e.target.files?.[0])} />
          <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}><FiUpload /> {uploading ? "Uploading…" : "Upload PDF Resume"}</Button>
          {loading ? <div className="h-6 w-40 animate-pulse rounded bg-slate-200" /> : resumes.length === 0 ? <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>No resume uploaded yet.</p> : (
            <ul className="space-y-2">{resumes.map((resume) => <li key={resume.id} className="flex items-center gap-2 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--color-border)" }}><FiFileText style={{ color: "var(--color-secondary)" }} /><span className="truncate">{resume.original_name}</span>{resume.storage_path === authProfile?.default_resume_path && <span className="ml-auto text-xs font-semibold" style={{ color: "var(--color-secondary)" }}>Default</span>}</li>)}</ul>
          )}
        </Card>

        {error && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p>}
        {message && <p className="rounded-lg bg-teal-50 p-3 text-sm font-medium text-teal-800">{message}</p>}
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
      </form>
    </div>
  );
}
