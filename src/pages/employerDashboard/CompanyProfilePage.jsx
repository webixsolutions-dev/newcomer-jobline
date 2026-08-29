import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import CompanyProfileForm from "../../components/employerDashboard/CompanyProfileForm";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function CompanyProfilePage() {
  const { companyProfile, updateCompanyProfile } = useEmployerData();

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading="Company Profile"
        subtitle="How your organization appears to candidates across Newcomer Jobline."
      />
      <CompanyProfileForm profile={companyProfile} onSave={updateCompanyProfile} />
    </div>
  );
}
