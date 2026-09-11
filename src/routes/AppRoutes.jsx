import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProtectedRoute from "../dashboard/auth/ProtectedRoute";
import { SeekerDashboardShell } from "../dashboard/routes/DashboardShells";
import EmployerDashboardShell from "../dashboard/routes/EmployerDashboardShell";

// Lazy load secondary marketing pages
const BrowseJobsPage = lazy(() => import("../pages/BrowseJobsPage"));
const JobDetailPage = lazy(() => import("../pages/JobDetailPage"));
const PostJob = lazy(() => import("../pages/PostJob"));
const Employers = lazy(() => import("../pages/Employers"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Resources = lazy(() => import("../pages/Resources"));

// Auth Page
const LoginPage = lazy(() => import("../dashboard/pages/LoginPage"));
const SignupPage = lazy(() => import("../dashboard/pages/SignupPage"));

// Job Seeker Dashboard pages
const SeekerDashboardHome = lazy(() => import("../dashboard/components/seeker/DashboardHome"));
const MyApplications = lazy(() => import("../dashboard/components/seeker/MyApplications"));
const SavedJobs = lazy(() => import("../dashboard/components/seeker/SavedJobs"));
const ProfileSettings = lazy(() => import("../dashboard/components/seeker/ProfileSettings"));
const NotificationsList = lazy(() => import("../dashboard/components/shared/NotificationsList"));

// Employer Dashboard pages
const EmployerOverviewPage = lazy(() => import("../pages/employerDashboard/EmployerOverviewPage"));
const JobPostingsPage = lazy(() => import("../pages/employerDashboard/JobPostingsPage"));
const PostJobDashboardPage = lazy(() => import("../pages/employerDashboard/PostJobDashboardPage"));
const JobApplicantsPage = lazy(() => import("../pages/employerDashboard/JobApplicantsPage"));
const AllApplicantsPage = lazy(() => import("../pages/employerDashboard/AllApplicantsPage"));
const CompanyProfilePage = lazy(() => import("../pages/employerDashboard/CompanyProfilePage"));
const EmployerSettingsPage = lazy(() => import("../pages/employerDashboard/EmployerSettingsPage"));

function SeekerNotificationsPage() {
  return <NotificationsList source={[]} />;
}

// Loading Fallback spinner
const RouteLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-navy-50/20">
    <div className="w-10 h-10 border-4 border-navy-200 border-t-teal-600 rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        {/* Marketing site */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<BrowseJobsPage />} />
          <Route path="jobs/:jobId" element={<JobDetailPage />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="employers" element={<Employers />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="Apply-now" element={<Navigate to="/jobs" replace />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* Dashboard sign-in */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/sign-in" element={<Navigate to="/login" replace />} />

        {/* Job Seeker Dashboard */}
        <Route
          path="/dashboard/seeker"
          element={
            <ProtectedRoute role="job_seeker">
              <SeekerDashboardShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<SeekerDashboardHome />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="notifications" element={<SeekerNotificationsPage />} />
          <Route path="profile" element={<ProfileSettings />} />
        </Route>
        <Route path="/dashboard" element={<Navigate to="/dashboard/seeker" replace />} />

        {/* Employer Dashboard */}
        <Route
          path="/employer-dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <EmployerDashboardShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/employer-dashboard/overview" replace />} />
          <Route path="overview" element={<EmployerOverviewPage />} />
          <Route path="job-postings" element={<JobPostingsPage />} />
          <Route path="post-a-job" element={<PostJobDashboardPage />} />
          <Route path="job-postings/:jobId/applicants" element={<JobApplicantsPage />} />
          <Route path="applicants" element={<AllApplicantsPage />} />
          <Route path="company-profile" element={<CompanyProfilePage />} />
          <Route path="settings" element={<EmployerSettingsPage />} />
        </Route>

        {/* Legacy recruiter routes → employer dashboard */}
        <Route path="/dashboard/recruiter/*" element={<Navigate to="/employer-dashboard/overview" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
