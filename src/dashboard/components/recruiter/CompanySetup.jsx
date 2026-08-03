import { useRef, useState } from "react";
import { FiUpload, FiFile, FiBriefcase } from "react-icons/fi";
import { Card, Button, Field, inputClass, inputStyle } from "../ui/Primitives";

export default function CompanySetup({ onCreated }) {
  const [form, setForm] = useState({ name: "", website: "", registration_number: "", description: "" });
  const [logo, setLogo] = useState(null);
  const [doc, setDoc] = useState(null);
  const logoRef = useRef(null);
  const docRef = useRef(null);

  const canSubmit = form.name.trim() && form.website.trim() && form.registration_number.trim();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreated({
      id: "cmp_new",
      ...form,
      logo_path: logo?.name || null,
      verification_status: "pending",
      rejection_reason: null,
      status: "active",
      created_at: new Date().toISOString(),
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
        >
          <FiBriefcase size={20} />
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>Set up your company</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
          You'll need a company on file before you can post jobs. It takes a minute.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submit} className="space-y-5">
          <Field label="Company name" required>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} style={inputStyle} placeholder="Northbridge Offices Inc." />
          </Field>
          <Field label="Website" required>
            <input value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} style={inputStyle} placeholder="https://yourcompany.com" />
          </Field>
          <Field label="Business registration number" required hint="Used to verify your company — never shown publicly">
            <input value={form.registration_number} onChange={(e) => update("registration_number", e.target.value)} className={inputClass} style={inputStyle} placeholder="BC1029384" />
          </Field>
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} className={inputClass} style={inputStyle} placeholder="What does your company do?" />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Logo">
              <button type="button" onClick={() => logoRef.current?.click()} className="flex w-full items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed p-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                <FiUpload size={16} /> {logo ? logo.name : "Upload logo"}
              </button>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
            </Field>
            <Field label="Verification document">
              <button type="button" onClick={() => docRef.current?.click()} className="flex w-full items-center gap-2 rounded-[var(--radius-md)] border-2 border-dashed p-3 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
                <FiFile size={16} /> {doc ? doc.name : "Upload document"}
              </button>
              <input ref={docRef} type="file" className="hidden" onChange={(e) => setDoc(e.target.files?.[0] || null)} />
            </Field>
          </div>

          <Button type="submit" disabled={!canSubmit} className="w-full">Create company & continue</Button>
        </form>
      </Card>
    </div>
  );
}
