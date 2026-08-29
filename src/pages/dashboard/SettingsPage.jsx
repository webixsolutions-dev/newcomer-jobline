import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAuth } from "../../dashboard/auth/AuthContext";
import { useDashboardData } from "../../context/DashboardDataContext";

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-navy-900">{label}</p>
        {description && <p className="mt-0.5 text-xs text-navy-500">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-teal-700" : "bg-navy-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

const SettingsPage = () => {
  const { logout } = useAuth();
  const { profile } = useDashboardData();
  const navigate = useNavigate();

  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState("");
  const [accountSaved, setAccountSaved] = useState(false);
  const [notifyJobs, setNotifyJobs] = useState(true);
  const [notifyStatus, setNotifyStatus] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  function handleAccountSave(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 2000);
    setPassword("");
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  function handleDeleteAccount() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Settings"
        subtitle="Manage your account preferences and notifications."
      />

      <Card hover={false} className="space-y-4">
        <h2 className="font-heading text-lg font-bold text-navy-900">Account</h2>
        <form onSubmit={handleAccountSave} className="space-y-4 max-w-md">
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="New password"
            type="password"
            placeholder="Leave blank to keep current"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Save Changes
            </Button>
            {accountSaved && (
              <span className="text-sm font-semibold text-teal-700">Saved!</span>
            )}
          </div>
        </form>
      </Card>

      <Card hover={false} className="space-y-5">
        <h2 className="font-heading text-lg font-bold text-navy-900">Notifications</h2>
        <Toggle
          label="Email me about new job matches"
          description="Get notified when jobs match your skills and location."
          checked={notifyJobs}
          onChange={setNotifyJobs}
        />
        <Toggle
          label="Email me application status updates"
          description="Stay informed when employers review your applications."
          checked={notifyStatus}
          onChange={setNotifyStatus}
        />
      </Card>

      <Card hover={false} className="space-y-3">
        <h2 className="font-heading text-lg font-bold text-navy-900">Resume & Documents</h2>
        <p className="text-sm text-navy-500">
          Manage your resume and cover letter on your profile page.
        </p>
        <Button as={Link} to="/dashboard/profile" variant="outline" size="sm">
          Go to My Profile
        </Button>
      </Card>

      <Card hover={false} className="space-y-4 border-red-100">
        <h2 className="font-heading text-lg font-bold text-red-700">Danger Zone</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
          {!deleteConfirm ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirm(true)}
              className="!border-red-500 !text-red-600 hover:!bg-red-50"
            >
              Delete Account
            </Button>
          ) : (
            <div className="rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="mb-3 text-sm font-semibold text-red-800">
                Are you sure? This will sign you out and remove your local session.
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteAccount}
                  className="!border-red-600 !text-red-700 hover:!bg-red-600 hover:!text-white"
                >
                  Yes, delete my account
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
