import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

/**
 * Placeholder for the future Employer Dashboard module.
 * Recruiters are redirected here from the Job Seeker dashboard guard.
 */
const EmployerDashboardPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-navy-50/30 px-4">
    <div className="max-w-md rounded-2xl border border-navy-100 bg-white p-10 text-center shadow-card">
      <img src="/logo.png" alt="Newcomer Jobline" className="mx-auto mb-6 h-10 w-auto" />
      <h1 className="font-heading text-2xl font-extrabold text-navy-900">
        Employer Dashboard
      </h1>
      <p className="mt-3 text-sm text-navy-500">
        The employer workspace is coming in a future module. You'll be able to post jobs,
        manage applicants, and update your company profile here.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button as={Link} to="/">
          Back to Home
        </Button>
        <Button as={Link} to="/post-job" variant="outline">
          Post a Job
        </Button>
      </div>
    </div>
  </div>
);

export default EmployerDashboardPage;
