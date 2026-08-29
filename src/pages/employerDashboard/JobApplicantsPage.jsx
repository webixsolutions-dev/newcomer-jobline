import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { EmptyState } from "../../dashboard/components/ui/DataStates";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function JobApplicantsPage() {
  const { jobId } = useParams();
  const {
    getJobPosting,
    getApplicantsForJob,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    updateApplicantNotes,
  } = useEmployerData();

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const posting = getJobPosting(jobId);
  const applicants = getApplicantsForJob(jobId);

  if (!posting) {
    return (
      <EmptyState
        title="Job posting not found"
        description="This listing may have been deleted."
        action={
          <Link to="/employer-dashboard/job-postings" className="text-sm font-medium" style={{ color: "var(--color-secondary)" }}>
            ← Back to Job Postings
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/employer-dashboard/job-postings"
        className="inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "var(--color-secondary)" }}
      >
        <FiArrowLeft size={14} /> Back to Job Postings
      </Link>

      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading={`${posting.jobTitle} — Applicants`}
        subtitle={`${applicants.length} candidate${applicants.length !== 1 ? "s" : ""} applied to this role.`}
      />

      {applicants.length === 0 ? (
        <EmptyState
          title="No applicants yet"
          description="Candidates who apply to this posting will appear here."
        />
      ) : (
        <div className="space-y-3">
          {applicants.map((a) => (
            <ApplicantListItem
              key={a.id}
              applicant={a}
              showJobTitle={false}
              onAdvance={advanceApplicantStage}
              onReject={rejectApplicant}
              onViewProfile={setSelectedApplicant}
            />
          ))}
        </div>
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
