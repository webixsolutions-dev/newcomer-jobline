import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import DashboardTopBanner from "../../dashboard/components/layout/DashboardTopBanner";
import { inputClass, inputStyle } from "../../dashboard/components/ui/Primitives";
import { EmptyState } from "../../dashboard/components/ui/DataStates";
import ApplicantListItem from "../../components/employerDashboard/ApplicantListItem";
import ApplicantProfileDrawer from "../../components/employerDashboard/ApplicantProfileDrawer";
import { EMPLOYER_PIPELINE_STAGES, EMPLOYER_STAGE_LABELS } from "../../data/pipelineStages";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function AllApplicantsPage() {
  const {
    applicants,
    jobPostings,
    advanceApplicantStage,
    rejectApplicant,
    updateApplicantStage,
    viewApplicantResume,
  } = useEmployerData();

  const [jobFilter, setJobFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const filtered = useMemo(() => {
    return applicants
      .filter((a) => jobFilter === "all" || a.jobId === jobFilter)
      .filter((a) => stageFilter === "all" || a.stage === stageFilter)
      .filter((a) => !search || a.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
  }, [applicants, jobFilter, stageFilter, search]);

  return (
    <div className="space-y-6">
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        heading="All Applicants"
        subtitle="Review and manage candidates across all your job postings."
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <select
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value)}
          className={`${inputClass} lg:max-w-xs`}
          style={inputStyle}
        >
          <option value="all">All job postings</option>
          {jobPostings.map((p) => (
            <option key={p.id} value={p.id}>{p.jobTitle}</option>
          ))}
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className={`${inputClass} lg:max-w-xs`}
          style={inputStyle}
        >
          <option value="all">All stages</option>
          {EMPLOYER_PIPELINE_STAGES.map((s) => (
            <option key={s} value={s}>{EMPLOYER_STAGE_LABELS[s]}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <FiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name…"
            className={`${inputClass} pl-9`}
            style={inputStyle}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={applicants.length === 0 ? "No applicants yet" : "No applicants match your filters"}
          description={
            applicants.length === 0
              ? "Once candidates apply to your jobs, they'll show up here."
              : "Try adjusting your filters or search term."
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
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

      <ApplicantProfileDrawer
        applicant={selectedApplicant}
        open={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        onStageChange={updateApplicantStage}
        onViewResume={viewApplicantResume}
      />
    </div>
  );
}
