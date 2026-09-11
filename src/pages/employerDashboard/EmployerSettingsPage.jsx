import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { Card, Button } from "../../dashboard/components/ui/Primitives";
import { useAuth } from "../../dashboard/auth/AuthContext";

export default function EmployerSettingsPage() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="space-y-6">
      <DashboardTopBanner eyebrow="Newcomer Jobline Dashboard" heading="Settings" subtitle="Review your connected employer account." />
      <Card className="space-y-4 p-6">
        <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Account</h2>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--color-border)" }}>
          <p className="text-xs font-semibold uppercase" style={{ color: "var(--color-text-muted)" }}>Email address</p>
          <p className="mt-1 font-medium" style={{ color: "var(--color-primary)" }}>{profile?.email || "Not available"}</p>
        </div>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Contact support to change protected account details or request account deletion.</p>
      </Card>
      <Card className="space-y-4 p-6">
        <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>Session</h2>
        <Button variant="outline" onClick={handleSignOut}><FiLogOut size={15} /> Sign Out</Button>
      </Card>
    </div>
  );
}
