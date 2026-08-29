import DashboardTopBanner from "../../components/dashboard/DashboardTopBanner";
import StatCardRow from "../../components/dashboard/StatCardRow";
import ProfileCompletenessBar from "../../components/dashboard/ProfileCompletenessBar";
import RecommendedJobsSection from "../../components/dashboard/RecommendedJobsSection";

const OverviewPage = () => (
  <div className="space-y-6">
    <DashboardTopBanner
      eyebrow="Newcomer Jobline Dashboard"
      title="Overview"
      subtitle="Your job search at a glance."
    />
    <StatCardRow />
    <ProfileCompletenessBar />
    <RecommendedJobsSection />
  </div>
);

export default OverviewPage;
