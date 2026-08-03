import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Field, TagInput, inputClass, inputStyle } from "../ui/Primitives";
import { jobCategories, mockJobs } from "../../mock/jobs";

const EMPLOYMENT_TYPES = [
  ["full_time", "Full-time"], ["part_time", "Part-time"], ["contract", "Contract"],
  ["temporary", "Temporary"], ["internship", "Internship"], ["seasonal", "Seasonal"],
];
const SALARY_PERIODS = [["hourly", "Hourly"], ["weekly", "Weekly"], ["monthly", "Monthly"], ["yearly", "Yearly"]];

const empty = {
  title: "", category_name: "", description: "",
  location_province: "", location_city: "", is_remote: false,
  employment_type: "full_time",
  salary_min: "", salary_max: "", salary_currency: "CAD", salary_period: "yearly",
  skills: [],
};

export default function PostEditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? mockJobs.find((j) => j.id === id) : null;
  const [form, setForm] = useState(existing ? { ...empty, ...existing } : empty);
  const [submitted, setSubmitted] = useState(false);

  const salaryError = form.salary_min !== "" && form.salary_max !== "" && Number(form.salary_max) < Number(form.salary_min);
  const canSubmit = form.title && form.category_name && form.description && form.employment_type && !salaryError
    && (form.is_remote || (form.location_province && form.location_city));

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <h2 className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
          {id ? "Job updated" : "Job submitted for review"}
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {id
            ? "Your changes have been saved."
            : "It'll go live once it passes review — and once your company is verified, if it isn't yet."}
        </p>
        <Button className="mt-5" onClick={() => navigate("/dashboard/recruiter/jobs")}>Back to My Jobs</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--color-primary)" }}>
          {id ? "Edit job" : "Post a job"}
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          {id ? "Update this listing." : "Fill in the details — you can edit this anytime."}
        </p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <Card className="space-y-5 p-6">
          <Field label="Job title" required>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} style={inputStyle} placeholder="Front Desk Receptionist" />
          </Field>

          <Field label="Category" required hint="Sector → category">
            <select value={form.category_name} onChange={(e) => update("category_name", e.target.value)} className={inputClass} style={inputStyle}>
              <option value="">Select a category</option>
              {jobCategories.map((sector) => (
                <optgroup key={sector.sector} label={sector.sector}>
                  {sector.categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Description" required>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} className={inputClass} style={inputStyle} placeholder="Describe the role, responsibilities, and requirements." />
          </Field>

          <Field label="Employment type" required>
            <select value={form.employment_type} onChange={(e) => update("employment_type", e.target.value)} className={inputClass} style={inputStyle}>
              {EMPLOYMENT_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
        </Card>

        <Card className="space-y-5 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Location</h2>
          <label className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text)" }}>
            <input type="checkbox" checked={form.is_remote} onChange={(e) => update("is_remote", e.target.checked)} />
            This is a remote position
          </label>
          {!form.is_remote && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Province" required>
                <input value={form.location_province} onChange={(e) => update("location_province", e.target.value)} className={inputClass} style={inputStyle} />
              </Field>
              <Field label="City" required>
                <input value={form.location_city} onChange={(e) => update("location_city", e.target.value)} className={inputClass} style={inputStyle} />
              </Field>
            </div>
          )}
        </Card>

        <Card className="space-y-5 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Salary</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Minimum" required>
              <input type="number" min="0" value={form.salary_min} onChange={(e) => update("salary_min", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field label="Maximum" required>
              <input type="number" min="0" value={form.salary_max} onChange={(e) => update("salary_max", e.target.value)} className={inputClass} style={inputStyle} />
            </Field>
            <Field label="Period" required>
              <select value={form.salary_period} onChange={(e) => update("salary_period", e.target.value)} className={inputClass} style={inputStyle}>
                {SALARY_PERIODS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </Field>
          </div>
          {salaryError && (
            <p className="text-sm font-medium" style={{ color: "var(--status-rejected-text)" }}>
              Maximum salary must be greater than or equal to minimum salary.
            </p>
          )}
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Currency: CAD</p>
        </Card>

        <Card className="space-y-3 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Skills</h2>
          <TagInput tags={form.skills} onChange={(skills) => update("skills", skills)} />
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={!canSubmit}>{id ? "Save changes" : "Submit for review"}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/recruiter/jobs")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
