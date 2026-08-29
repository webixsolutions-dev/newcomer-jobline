// src/components/postJob/JobPostingForm.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiBold,
  HiListBullet,
  HiNumberedList,
  HiLink,
} from "react-icons/hi2";
import { HiOutlineDocumentAdd } from "react-icons/hi";

const JOB_CATEGORIES = [
  "Administration & Office",
  "Customer Service",
  "Technology & IT",
  "Skilled Trades",
  "Healthcare Support",
  "Hospitality & Tourism",
  "Finance & Accounting",
  "Education & Training",
  "Sales & Marketing",
  "Logistics & Transportation",
  "Manufacturing",
  "Retail",
  "Other",
];

const EMPLOYMENT_TYPES = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Internship / Co-op",
  "Casual / On-Call",
];

const INITIAL_FORM = {
  jobTitle: "",
  companyName: "",
  location: "",
  jobCategory: "",
  employmentType: "",
  salaryRange: "",
  jobDescription: "",
};

/**
 * Fully controlled job posting form.
 * Validates required fields on submit.
 * Pass dashboardMode + callbacks to use inside the employer dashboard.
 */
const JobPostingForm = ({
  initialValues = null,
  dashboardMode = false,
  heading = "Create Your Job Posting",
  subheading = "Fill in the details below to reach qualified newcomer candidates across Canada.",
  onSubmit,
  onSaveDraft,
  hideSuccessState = false,
}) => {
  const [form, setForm] = useState(initialValues ?? INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sync when editing an existing posting
  useEffect(() => {
    if (initialValues) setForm(initialValues);
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const required = [
      "jobTitle",
      "companyName",
      "location",
      "jobCategory",
      "employmentType",
      "jobDescription",
    ];
    required.forEach((key) => {
      if (!form[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (dashboardMode && onSubmit) {
      onSubmit(form, "Active");
      return;
    }
    // ── TODO: replace with API call ──
    console.log("[PostJob] Submit payload:", form);
    setSubmitted(true);
  };

  const handleSaveDraft = () => {
    if (dashboardMode && onSaveDraft) {
      onSaveDraft(form);
      return;
    }
    // ── TODO: replace with localStorage / API integration ──
    console.log("[PostJob] Draft saved:", form);
    alert("Draft saved! (stub — will integrate with API or localStorage)");
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
  };

  // ── Success State ──
  if (submitted && !hideSuccessState) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-navy-100 shadow-card p-10 flex flex-col items-center text-center gap-5"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
          <HiOutlineCheckCircle className="text-5xl text-teal-700" />
        </div>
        <h3 className="text-2xl font-extrabold text-navy-900 font-heading">
          Job Post Submitted!
        </h3>
        <p className="text-navy-500 max-w-sm leading-relaxed">
          Your job posting has been received. Our team will review it and your
          listing will go live shortly.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full transition-all duration-200 shadow-soft text-sm"
        >
          Post Another Job
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-navy-100 shadow-card p-6 sm:p-8"
    >
      {/* Heading */}
      {!dashboardMode && (
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-heading">
            {heading}
          </h2>
          <p className="text-navy-400 text-sm mt-2">{subheading}</p>
          <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Job Title */}
          <Field
            label="Job Title"
            required
            error={errors.jobTitle}
          >
            <input
              type="text"
              value={form.jobTitle}
              onChange={handleChange("jobTitle")}
              placeholder="e.g., Customer Service Representative"
              className={fieldCls(errors.jobTitle)}
            />
          </Field>

          {/* Company Name */}
          <Field
            label="Company Name"
            required
            error={errors.companyName}
          >
            <input
              type="text"
              value={form.companyName}
              onChange={handleChange("companyName")}
              placeholder="e.g., ABC Technologies Inc."
              className={fieldCls(errors.companyName)}
            />
          </Field>

          {/* Location */}
          <Field
            label="Location"
            required
            error={errors.location}
          >
            <div className={`relative`}>
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 text-lg" />
              <input
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="City, Province or Remote"
                className={`${fieldCls(errors.location)} pl-10`}
              />
            </div>
          </Field>

          {/* Job Category */}
          <Field
            label="Job Category"
            required
            error={errors.jobCategory}
          >
            <select
              value={form.jobCategory}
              onChange={handleChange("jobCategory")}
              className={fieldCls(errors.jobCategory)}
            >
              <option value="">Select a category</option>
              {JOB_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          {/* Employment Type */}
          <Field
            label="Employment Type"
            required
            error={errors.employmentType}
          >
            <select
              value={form.employmentType}
              onChange={handleChange("employmentType")}
              className={fieldCls(errors.employmentType)}
            >
              <option value="">Select employment type</option>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          {/* Salary Range (Optional) */}
          <Field
            label="Salary Range"
            sublabel="Optional"
            error={errors.salaryRange}
          >
            <div className="relative">
              <HiOutlineCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 text-lg" />
              <input
                type="text"
                value={form.salaryRange}
                onChange={handleChange("salaryRange")}
                placeholder="e.g., $50,000 - $60,000 CAD"
                className={`${fieldCls()} pl-10`}
              />
            </div>
          </Field>
        </div>

        {/* ── Job Description (full-width) ── */}
        <div className="mt-5">
          <Field
            label="Job Description"
            required
            error={errors.jobDescription}
          >
            {/* Toolbar (placeholder buttons — non-functional styling) */}
            <div className="border border-navy-100 rounded-t-xl px-3 py-2 bg-navy-50/40 flex items-center gap-1">
              {[
                { Icon: HiBold, label: "Bold" },
                { Icon: HiListBullet, label: "Bullet list" },
                { Icon: HiNumberedList, label: "Numbered list" },
                { Icon: HiLink, label: "Link" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  className="flex h-7 w-7 items-center justify-center rounded text-navy-500 hover:bg-navy-100 hover:text-navy-900 transition-colors text-sm"
                >
                  <Icon />
                </button>
              ))}
            </div>
            <textarea
              rows={7}
              value={form.jobDescription}
              onChange={handleChange("jobDescription")}
              placeholder="Describe the role, key responsibilities, required qualifications, and what makes your organization a great place to work."
              className={`${fieldCls(errors.jobDescription)} rounded-t-none border-t-0 resize-none`}
            />
            <p className="text-xs text-navy-400 mt-1.5 flex items-center gap-1">
              <HiOutlineDocumentText className="text-sm" />
              Be clear and inclusive to attract qualified newcomer candidates.
            </p>
          </Field>
        </div>

        {/* ── Actions ── */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-full transition-all duration-200 shadow-soft text-sm sm:text-base"
          >
            <HiOutlineDocumentAdd className="text-lg" />
            {dashboardMode ? "Publish Job" : "Continue to Next Step"}
          </button>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent text-navy-900 border-2 border-navy-200 hover:border-navy-400 font-bold rounded-full transition-all duration-200 text-sm sm:text-base"
          >
            Save as Draft
          </button>
        </div>

        {/* Security note */}
        <p className="flex items-center gap-2 text-xs text-navy-400 mt-4">
          <HiOutlineLockClosed className="text-sm flex-shrink-0" />
          Your information is secure and will not be shared.
        </p>
      </form>
    </motion.div>
  );
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

/** Base field classes — red border on error */
const fieldCls = (error = "") =>
  [
    "w-full px-3 py-2.5 rounded-xl border text-sm text-navy-900 placeholder-navy-300",
    "outline-none transition-colors bg-white",
    "focus:border-teal-600 focus:ring-2 focus:ring-teal-100",
    error ? "border-red-400 bg-red-50/30" : "border-navy-100",
  ].join(" ");

/** Form field wrapper with label + optional error message */
const Field = ({ label, sublabel, required, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-navy-700 uppercase tracking-wider">
      {label}{" "}
      {required && <span className="text-gold-600">*</span>}
      {sublabel && (
        <span className="normal-case font-normal text-navy-400 ml-1">
          ({sublabel})
        </span>
      )}
    </label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export default JobPostingForm;
