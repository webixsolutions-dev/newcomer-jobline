import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineBriefcase, HiOutlineUser } from "react-icons/hi2";
import { useAuth } from "../auth/AuthContext";

const inputClass = "w-full rounded-xl border border-[#d5dfeb] bg-white px-4 py-3 text-sm text-[#0B2545] outline-none transition focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]";

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("job_seeker");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company_name: "",
    company_website: "",
    company_registration_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const payload = { name: form.name, email: form.email, password: form.password, role };
      if (role === "recruiter") {
        payload.company_name = form.company_name;
        payload.company_website = form.company_website;
        payload.company_registration_number = form.company_registration_number;
      }
      const result = await signUp(payload);
      if (result.confirmationRequired) {
        setMessage("Account created. Check your email to confirm it, then sign in.");
      } else {
        navigate(role === "recruiter" ? "/employer-dashboard/overview" : "/dashboard/seeker", { replace: true });
      }
    } catch (signupError) {
      setError(signupError.message || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#eef2f7] px-4 py-12">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-[#d5dfeb] bg-white p-7 shadow-[0_8px_40px_rgba(11,37,69,0.14)] sm:p-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-[#4f739f] hover:text-[#0B2545]">
          <HiOutlineArrowLeft /> Back to home
        </Link>
        <div className="mb-7 text-center">
          <img src="/logo.png" alt="Newcomer Jobline" className="mx-auto mb-4 h-10 w-auto" />
          <h1 className="text-3xl font-extrabold text-[#0B2545]">Create your account</h1>
          <p className="mt-2 text-sm text-[#4f739f]">Join the Newcomer Jobline network.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-xl bg-[#eef2f7] p-1.5">
          <button type="button" onClick={() => setRole("job_seeker")} className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold ${role === "job_seeker" ? "bg-[#0B2545] text-white" : "text-[#4f739f]"}`}>
            <HiOutlineUser /> Job Seeker
          </button>
          <button type="button" onClick={() => setRole("recruiter")} className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold ${role === "recruiter" ? "bg-[#0B2545] text-white" : "text-[#4f739f]"}`}>
            <HiOutlineBriefcase /> Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name"><input required minLength={2} value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} autoComplete="name" /></Field>
          <Field label="Email address"><input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} autoComplete="email" /></Field>
          <Field label="Password"><input required minLength={8} type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className={inputClass} autoComplete="new-password" /></Field>

          {role === "recruiter" && (
            <div className="grid gap-4 border-t border-[#d5dfeb] pt-4 sm:grid-cols-2">
              <Field label="Company name" className="sm:col-span-2"><input required value={form.company_name} onChange={(e) => update("company_name", e.target.value)} className={inputClass} /></Field>
              <Field label="Company website"><input required type="url" placeholder="https://example.com" value={form.company_website} onChange={(e) => update("company_website", e.target.value)} className={inputClass} /></Field>
              <Field label="Registration number"><input required value={form.company_registration_number} onChange={(e) => update("company_registration_number", e.target.value)} className={inputClass} /></Field>
            </div>
          )}

          {error && <p className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}
          {message && <p className="rounded-xl border border-teal-100 bg-teal-50 p-3 text-sm font-semibold text-teal-800">{message}</p>}

          <button disabled={loading} type="submit" className="flex w-full items-center justify-center rounded-xl bg-[#F5A623] px-6 py-3 font-bold text-[#0B2545] transition hover:bg-[#dc8113] disabled:opacity-60">
            {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#0B2545]/30 border-t-[#0B2545]" /> : "Create Account"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#4f739f]">Already registered? <Link className="font-bold text-[#dc8113]" to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}

function Field({ label, className = "", children }) {
  return <label className={`block ${className}`}><span className="mb-1.5 block text-xs font-semibold text-[#4f739f]">{label} <span className="text-[#F5A623]">*</span></span>{children}</label>;
}
