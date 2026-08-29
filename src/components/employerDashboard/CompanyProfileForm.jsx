import { useRef, useState } from "react";
import { FiUpload, FiFile, FiTrash2 } from "react-icons/fi";
import { Card, Button, Field, inputClass, inputStyle } from "../../dashboard/components/ui/Primitives";

const INDUSTRIES = [
  "Technology & IT",
  "Healthcare",
  "Hospitality & Tourism",
  "Real Estate & Property Management",
  "Finance & Accounting",
  "Retail",
  "Manufacturing",
  "Education & Training",
  "Logistics & Transportation",
  "Other",
];

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"];

export default function CompanyProfileForm({ profile, onSave }) {
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
    setSaved(false);
  }

  function onLogoPick(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    update("logoFilename", file.name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="space-y-5 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name" required className="sm:col-span-2">
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
              style={inputStyle}
              required
            />
          </Field>

          <Field label="Industry" required>
            <select
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
              className={inputClass}
              style={inputStyle}
            >
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </Field>

          <Field label="Company Size" required>
            <select
              value={form.size}
              onChange={(e) => update("size", e.target.value)}
              className={inputClass}
              style={inputStyle}
            >
              {COMPANY_SIZES.map((s) => (
                <option key={s} value={s}>{s} employees</option>
              ))}
            </select>
          </Field>

          <Field label="Website">
            <input
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="https://"
            />
          </Field>

          <Field label="Headquarters Location" required>
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="City, Province"
            />
          </Field>

          <Field label="Company Description" className="sm:col-span-2">
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={`${inputClass} resize-none`}
              style={inputStyle}
              placeholder="Tell candidates about your company culture and mission…"
            />
          </Field>
        </div>

        <Field label="Company Logo">
          {form.logoFilename ? (
            <div
              className="flex items-center justify-between rounded-[var(--radius-md)] border p-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex items-center gap-3">
                <FiFile size={20} style={{ color: "var(--color-secondary)" }} />
                <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  {form.logoFilename}
                </p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                  Replace
                </Button>
                <button
                  type="button"
                  onClick={() => update("logoFilename", null)}
                  aria-label="Remove logo"
                  style={{ color: "var(--status-rejected-text)" }}
                >
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
              Click to upload logo (PNG, JPG, SVG)
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onLogoPick} />
        </Field>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit">Save Changes</Button>
        {saved && (
          <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
            Saved.
          </span>
        )}
      </div>
    </form>
  );
}
