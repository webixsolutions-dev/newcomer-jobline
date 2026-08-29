import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { Button } from "../../dashboard/components/ui/Primitives";
import { EmptyState } from "../../dashboard/components/ui/DataStates";
import JobPostingsFilterBar from "../../components/employerDashboard/JobPostingsFilterBar";
import JobPostingCard from "../../components/employerDashboard/JobPostingCard";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function JobPostingsPage() {
  const { jobPostings, closeJobPosting, deleteJobPosting } = useEmployerData();
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return jobPostings
      .filter((p) => statusFilter === "All" || p.status === statusFilter)
      .filter((p) => !search || p.jobTitle.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  }, [jobPostings, statusFilter, search]);

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading="Job Postings"
        subtitle="Manage all your active, draft, and closed listings."
        action={
          <Link to="/employer-dashboard/post-a-job">
            <Button>
              <FiPlus size={15} /> Post a Job
            </Button>
          </Link>
        }
      />

      <JobPostingsFilterBar
        status={statusFilter}
        onStatusChange={setStatusFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {filtered.length === 0 ? (
        <EmptyState
          title={jobPostings.length === 0 ? "No job postings yet" : "No postings match your filters"}
          description={
            jobPostings.length === 0
              ? "Create your first job posting to start hiring."
              : "Try adjusting your search or status filter."
          }
          action={
            <Link to="/employer-dashboard/post-a-job">
              <Button>Post a Job</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <JobPostingCard
              key={p.id}
              posting={p}
              onClose={closeJobPosting}
              onDelete={deleteJobPosting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
