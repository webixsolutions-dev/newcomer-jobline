import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineBriefcase, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash, HiOutlineArrowLeft } from "react-icons/hi2";
import { useAuth } from "../auth/AuthContext";
import Logo from "../../components/common/Logo";

export default function LoginPage() {
  const { login, signIn } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("seeker");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const nextRole = role === "seeker" ? "job_seeker" : "recruiter";

    if (email && password) {
      try {
        await signIn(email, password);
        setLoading(false);
        navigate("/", { replace: true });
        return;
      } catch (err) {
        console.warn("Backend auth failed, trying mock role fallback:", err);
        if (err.message.includes("credentials") || err.message.includes("password") || err.message.includes("user")) {
          setErrorMsg(err.message);
          setLoading(false);
          return;
        }
      }
    }

    login(nextRole);
    setLoading(false);
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#eef2f7] px-4 py-12 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/herohome.webp')",
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/80 via-[#0B2545]/60 to-[#0B2545]/80" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(11,37,69,0.14)] border border-[#d5dfeb] p-8 sm:p-10">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#4f739f] hover:text-[#0B2545] transition-colors mb-6"
          >
            <HiOutlineArrowLeft className="text-base" />
            Back to home
          </Link>

          {/* Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <img src="/logo.png" alt="Newcomer Jobline Logo" className="h-10 w-auto" />
            </Link>
            <h1 className="text-3xl font-extrabold font-heading text-[#0B2545]">
              Welcome back
            </h1>
            <p className="text-[#4f739f] text-sm mt-2">
              Log in to manage your applications and saved jobs.
            </p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-1.5 bg-[#eef2f7] rounded-xl p-1.5 mb-6">
            <button
              type="button"
              onClick={() => setRole("seeker")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === "seeker"
                  ? "bg-[#0B2545] text-white shadow-md"
                  : "text-[#4f739f] hover:text-[#0B2545]"
              }`}
            >
              <HiOutlineUser className="text-base" />
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("employer")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === "employer"
                  ? "bg-[#0B2545] text-white shadow-md"
                  : "text-[#4f739f] hover:text-[#0B2545]"
              }`}
            >
              <HiOutlineBriefcase className="text-base" />
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 bg-red-50 text-red-800 rounded-xl border border-red-100 text-xs font-semibold">
                {errorMsg}
              </div>
            )}
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#4f739f] mb-1.5">
                Email address <span className="text-[#F5A623]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#7f9abd]">
                  <HiOutlineEnvelope className="text-lg" />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#d5dfeb] rounded-xl py-3 pl-11 pr-4 text-sm text-[#0B2545] placeholder-[#7f9abd] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-[#4f739f] mb-1.5">
                Username <span className="text-[#F5A623]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#7f9abd]">
                  <HiOutlineUser className="text-lg" />
                </span>
                <input
                  type="text"
                  placeholder="your.username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border border-[#d5dfeb] rounded-xl py-3 pl-11 pr-4 text-sm text-[#0B2545] placeholder-[#7f9abd] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#4f739f] mb-1.5">
                Password <span className="text-[#F5A623]">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#7f9abd]">
                  <HiOutlineLockClosed className="text-lg" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-[#d5dfeb] rounded-xl py-3 pl-11 pr-12 text-sm text-[#0B2545] placeholder-[#7f9abd] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#7f9abd] hover:text-[#0B2545] transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="text-lg" />
                  ) : (
                    <HiOutlineEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#d5dfeb] bg-white text-[#F5A623] focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-[#4f739f]">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#F5A623] hover:text-[#dc8113] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 bg-[#F5A623] hover:bg-[#dc8113] text-[#0B2545] font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-sm text-sm sm:text-base flex items-center justify-center gap-2 group"
            >
              Log In
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </form>

          {/* Sign up */}
          <p className="text-center text-sm text-[#4f739f] mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#F5A623] hover:text-[#dc8113] transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
