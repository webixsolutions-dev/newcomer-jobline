import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"

// Lazy load secondary marketing pages
const BrowseJobsPage = lazy(() => import("../pages/BrowseJobsPage"))
const JobDetailPage = lazy(() => import("../pages/JobDetailPage"))
const PostJob = lazy(() => import("../pages/PostJob"))
const Employers = lazy(() => import("../pages/Employers"))
const AboutUs = lazy(() => import("../pages/AboutUs"))
const ContactUs = lazy(() => import("../pages/ContactUs"))
const ApplyNow = lazy(() => import("../pages/ApplyNow"))
const Resources = lazy(() => import("../pages/Resources"))

// Auth Page
const LoginPage = lazy(() => import("../dashboard/pages/LoginPage"))

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
          <Route path="Apply-now" element={<ApplyNow />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* Dashboard sign-in */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirects */}
        <Route path="/dashboard/seeker/*" element={<Navigate to="/" replace />} />
        <Route path="/dashboard/recruiter/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
