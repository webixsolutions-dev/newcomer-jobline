import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { Card, Button } from "../../dashboard/components/ui/Primitives";
import { EmptyState } from "../../dashboard/components/ui/DataStates";
import EmployerStatCardRow from "../../components/employerDashboard/EmployerStatCardRow";
import JobPostingCard from "../../components/employerDashboard/JobPostingCard";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function EmployerOverviewPage() {
  const {
    jobPostings,
    applicants,
    closeJobPosting,
    deleteJobPosting,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData();

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const recentApplicants = useMemo(
    () =>
      [...applicants]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .slice(0, 6),
    [applicants]
  );

  const activePostings = useMemo(
    () =>
      jobPostings
        .filter((p) => p.status === "Active")
        .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
        .slice(0, 4),
    [jobPostings]
  );

  const hasPostings = jobPostings.length > 0;

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading="Overview"
        subtitle="Your hiring activity at a glance."
      />

      {hasPostings ? (
        <>
          <EmployerStatCardRow />

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>
                Recent Applicants
              </h2>
              <Link
                to="/employer-dashboard/applicants"
                className="text-sm font-medium"
                style={{ color: "var(--color-secondary)" }}
              >
                View All Applicants →
              </Link>
            </div>
            {recentApplicants.length === 0 ? (
              <EmptyState title="No applicants yet" description="Candidates who apply will appear here." />
            ) : (
              <div className="space-y-3">
                {recentApplicants.map((a) => (
                  <ApplicantListItem
                    key={a.id}
                    applicant={a}
                    onAdvance={advanceApplicantStage}
                    onReject={rejectApplicant}
                    onViewProfile={setSelectedApplicant}
                  />
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold" style={{ color: "var(--color-primary)" }}>
                Your Active Job Postings
              </h2>
              <Link
                to="/employer-dashboard/job-postings"
                className="text-sm font-medium"
                style={{ color: "var(--color-secondary)" }}
              >
                View All Postings →
              </Link>
            </div>
            {activePostings.length === 0 ? (
              <EmptyState
                title="No active postings"
                description="Publish a job to start receiving applicants."
                action={
                  <Link to="/employer-dashboard/post-a-job">
                    <Button>Post a Job</Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-3">
                {activePostings.map((p) => (
                  <JobPostingCard
                    key={p.id}
                    posting={p}
                    onClose={closeJobPosting}
                    onDelete={deleteJobPosting}
                    compact
                  />
                ))}
              </div>
            )}
          </Card>
        </>
      ) : (
        <Card className="p-10 text-center">
          <EmptyState
            title="Welcome to your employer dashboard"
            description="You haven't posted any jobs yet. Create your first listing to start attracting newcomer talent."
            action={
              <Link to="/employer-dashboard/post-a-job">
                <Button>Post Your First Job →</Button>
              </Link>
            }
          />
        </Card>
      )}

      <ApplicantProfileDrawer
        applicant={selectedApplicant}
        open={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        onStageChange={updateApplicantStage}
        onNotesChange={updateApplicantNotes}
      />
    </div>
  );
}
