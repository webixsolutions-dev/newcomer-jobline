import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiUser, FiBriefcase, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../auth/AuthContext";
import Logo from "../../components/common/Logo";

const ROLES = [
  {
    id: "job_seeker",
    icon: FiUser,
    title: "Job Seeker",
    description: "Track applications, save jobs, and manage your profile.",
    cta: "Continue as Job Seeker",
  },
  {
    id: "recruiter",
    icon: FiBriefcase,
    title: "Recruiter",
    description: "Post jobs, review applicants, and manage your company.",
    cta: "Continue as Recruiter",
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSelect(roleId) {
    login(roleId);
    const from = location.state?.from;
    const defaultPath = roleId === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker";
    const matchesRole = from && from.startsWith(roleId === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker");
    navigate(matchesRole ? from : defaultPath, { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12" style={{ background: "var(--color-bg)" }}>
      <div className="mb-8">
        <Logo />
      </div>

      <div className="w-full max-w-2xl text-center">
        <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--color-primary)" }}>
          Sign in to your dashboard
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--color-text-muted)" }}>
          This is a preview build, so there's no password to remember — just choose how you'd like to continue.
        </p>
      </div>

      <div className="mt-8 grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
        {ROLES.map(({ id, icon: Icon, title, description, cta }) => (
          <button
            key={id}
            onClick={() => handleSelect(id)}
            className="flex flex-col items-start gap-3 rounded-[var(--radius-lg)] border bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-lg"
              style={{ background: "var(--color-secondary-light)", color: "var(--color-secondary)" }}
            >
              <Icon />
            </div>
            <div>
              <p className="font-bold" style={{ color: "var(--color-primary)" }}>{title}</p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>{description}</p>
            </div>
            <span
              className="mt-2 inline-flex items-center gap-2 rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold"
              style={{ background: "var(--color-accent)", color: "var(--color-primary)" }}
            >
              {cta}
            </span>
          </button>
        ))}
      </div>

      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "var(--color-text-muted)" }}
      >
        <FiArrowLeft size={14} /> Back to Newcomer Jobline
      </Link>
    </div>
  );
}
