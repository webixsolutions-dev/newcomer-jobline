import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import BrowseJobsPage from "../pages/BrowseJobsPage"
import JobDetailPage from "../pages/JobDetailPage"
import PostJob from "../pages/PostJob"
import Employers from "../pages/Employers"
import AboutUs from "../pages/AboutUs"
import ContactUs from "../pages/ContactUs"
import ApplyNow from "../pages/ApplyNow"
import Resources from "../pages/Resources"

// Dashboard: auth + role gating
import LoginPage from "../dashboard/pages/LoginPage"
import ProtectedRoute from "../dashboard/auth/ProtectedRoute"
import { SeekerDashboardShell, RecruiterDashboardShell } from "../dashboard/routes/DashboardShells"

// Dashboard: job seeker
import SeekerDashboardHome from "../dashboard/components/seeker/DashboardHome"
import MyApplications from "../dashboard/components/seeker/MyApplications"
import SavedJobs from "../dashboard/components/seeker/SavedJobs"
import SeekerProfileSettings from "../dashboard/components/seeker/ProfileSettings"

// Dashboard: recruiter
import RecruiterDashboardHome from "../dashboard/components/recruiter/DashboardHome"
import MyJobs from "../dashboard/components/recruiter/MyJobs"
import PostEditJob from "../dashboard/components/recruiter/PostEditJob"
import Applicants from "../dashboard/components/recruiter/Applicants"
import CompanyProfile from "../dashboard/components/recruiter/CompanyProfile"

// Dashboard: shared
import NotificationsList from "../dashboard/components/shared/NotificationsList"
import { mockSeekerNotifications, mockRecruiterNotifications } from "../dashboard/mock/notifications"

const AppRoutes = () => {
  return (
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
        <Route path="Apply-now" element={<ApplyNow />} />
        <Route path="resources" element={<Resources />} />
      </Route>

      {/* Dashboard sign-in (mock — picks a role, no backend yet) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Job seeker dashboard (removed per request, redirect to home) */}
      <Route path="/dashboard/seeker/*" element={<Navigate to="/" replace />} />

      {/* Recruiter dashboard (removed per request, redirect to home) */}
      <Route path="/dashboard/recruiter/*" element={<Navigate to="/" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
