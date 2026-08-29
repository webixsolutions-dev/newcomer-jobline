import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { Card, Button, Field, inputClass, inputStyle } from "../../dashboard/components/ui/Primitives";
import DeleteAccountSection from "../../dashboard/components/shared/DeleteAccountSection";
import { useAuth } from "../../dashboard/auth/AuthContext";

export default function EmployerSettingsPage() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(profile?.email || "");
  const [password, setPassword] = useState("");
  const [accountSaved, setAccountSaved] = useState(false);
  const [notifyOnApply, setNotifyOnApply] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);

  function handleAccountSave(e) {
    e.preventDefault();
    setAccountSaved(true);
    setTimeout(() => setAccountSaved(false), 3000);
  }

  function handleNotifSave(e) {
    e.preventDefault();
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  }

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading="Settings"
        subtitle="Manage your employer account preferences."
      />

      <form onSubmit={handleAccountSave} className="space-y-6">
        <Card className="space-y-4 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Account</h2>
          <Field label="Email address">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              style={inputStyle}
            />
          </Field>
          <Field label="New password" hint="Leave blank to keep your current password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="••••••••"
            />
          </Field>
          <div className="flex items-center gap-3">
            <Button type="submit">Save account changes</Button>
            {accountSaved && (
              <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
                Saved.
              </span>
            )}
          </div>
        </Card>
      </form>

      <form onSubmit={handleNotifSave}>
        <Card className="space-y-4 p-6">
          <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Notifications</h2>
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm" style={{ color: "var(--color-text)" }}>
              Email me when a candidate applies
            </span>
            <input
              type="checkbox"
              checked={notifyOnApply}
              onChange={(e) => setNotifyOnApply(e.target.checked)}
              className="h-4 w-4 rounded"
            />
          </label>
          <label className="flex items-center justify-between gap-4">
            <span className="text-sm" style={{ color: "var(--color-text)" }}>
              Email me a weekly applicant summary
            </span>
            <input
              type="checkbox"
              checked={weeklySummary}
              onChange={(e) => setWeeklySummary(e.target.checked)}
              className="h-4 w-4 rounded"
            />
          </label>
          <div className="flex items-center gap-3">
            <Button type="submit">Save notification preferences</Button>
            {notifSaved && (
              <span className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
                Saved.
              </span>
            )}
          </div>
        </Card>
      </form>

      <Card className="space-y-4 p-6">
        <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Session</h2>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Sign out of your employer account on this device.
        </p>
        <Button variant="outline" onClick={handleSignOut}>
          <FiLogOut size={15} /> Sign Out
        </Button>
      </Card>

      <DeleteAccountSection
        title="Delete company account"
        description="Permanently remove your company account, all job postings, and applicant data."
      />
    </div>
  );
}
