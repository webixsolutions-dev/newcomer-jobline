import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { Card } from "../../dashboard/components/ui/Primitives";
import JobPostingForm from "../../components/postJob/JobPostingForm";
import { useEmployerData } from "../../context/EmployerDataContext";

function postingToFormValues(posting) {
  if (!posting) return null;
  return {
    jobTitle: posting.jobTitle,
    companyName: posting.companyName,
    location: posting.location,
    jobCategory: posting.jobCategory,
    employmentType: posting.employmentType,
    salaryRange: posting.salaryRange || "",
    jobDescription: posting.jobDescription,
  };
}

export default function PostJobDashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const { getJobPosting, createJobPosting, updateJobPosting, companyProfile } = useEmployerData();

  const existing = editId ? getJobPosting(editId) : null;
  const isEditing = Boolean(existing);

  const initialValues = useMemo(() => {
    if (existing) return postingToFormValues(existing);
    return {
      jobTitle: "",
      companyName: companyProfile.name,
      location: companyProfile.location || "",
      jobCategory: "",
      employmentType: "",
      salaryRange: "",
      jobDescription: "",
    };
  }, [existing, companyProfile]);

  function handleSubmit(form, status) {
    if (isEditing) {
      updateJobPosting(editId, form, status);
    } else {
      createJobPosting(form, status);
    }
    navigate("/employer-dashboard/job-postings");
  }

  function handleSaveDraft(form) {
    if (isEditing) {
      updateJobPosting(editId, form, "Draft");
    } else {
      createJobPosting(form, "Draft");
    }
    navigate("/employer-dashboard/job-postings");
  }

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading={isEditing ? "Edit Job Posting" : "Post a New Job"}
        subtitle={
          isEditing
            ? "Update your listing details below."
            : "Fill in the details to publish a new job listing."
        }
      />

      <Card className="p-4 sm:p-6">
        <JobPostingForm
          key={editId || "new"}
          initialValues={initialValues}
          dashboardMode
          hideSuccessState
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </Card>
    </div>
  );
}
