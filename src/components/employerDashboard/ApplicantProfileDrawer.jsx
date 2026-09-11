import { FiX, FiFileText, FiMail, FiPhone } from "react-icons/fi";
import { Button } from "../../dashboard/components/ui/Primitives";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import { EMPLOYER_PIPELINE_STAGES, EMPLOYER_STAGE_LABELS } from "../../data/pipelineStages";

export default function ApplicantProfileDrawer({ applicant, open, onClose, onStageChange, onViewResume }) {

  if (!open || !applicant) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} aria-hidden="true" />
      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-xl sm:max-w-lg"
        role="dialog"
        aria-label={`Profile for ${applicant.name}`}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-4 sm:px-6"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div>
            <h2 className="text-lg font-bold" style={{ color: "var(--color-primary)" }}>
              {applicant.name}
            </h2>
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {applicant.headline}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--color-bg)" }}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <ApplicationStatusBadge stage={applicant.stage} />
            <select
              value={applicant.stage}
              onChange={(e) => onStageChange(applicant.id, e.target.value)}
              className="rounded-[var(--radius-md)] border px-3 py-1.5 text-sm outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-primary)" }}
            >
              {EMPLOYER_PIPELINE_STAGES.map((s) => (
                <option key={s} value={s}>
                  {EMPLOYER_STAGE_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Contact
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--color-primary)" }}>
              <li className="flex items-center gap-2">
                <FiMail size={14} style={{ color: "var(--color-secondary)" }} />
                {applicant.email}
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={14} style={{ color: "var(--color-secondary)" }} />
                {applicant.phone}
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Resume
            </h3>
            <Button variant="outline" onClick={() => onViewResume(applicant.id)}>
              <FiFileText size={14} /> View Resume — {applicant.resumeFilename}
            </Button>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(applicant.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Work Experience
            </h3>
            <ul className="space-y-4">
              {(applicant.experience || []).map((exp, i) => (
                <li key={i} className="text-sm">
                  <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{exp.title}</p>
                  <p style={{ color: "var(--color-text-muted)" }}>{exp.company}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {exp.startDate} — {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="mt-1" style={{ color: "var(--color-text)" }}>{exp.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Education
            </h3>
            <ul className="space-y-3">
              {(applicant.education || []).map((edu, i) => (
                <li key={i} className="text-sm">
                  <p className="font-semibold" style={{ color: "var(--color-primary)" }}>{edu.degree}</p>
                  <p style={{ color: "var(--color-text-muted)" }}>{edu.institution || edu.school}{edu.field ? ` · ${edu.field}` : ""}</p>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </aside>
    </>
  );
}
