import { FiBriefcase, FiUsers, FiCalendar, FiCheckCircle } from "react-icons/fi";
import StatCard from "../../dashboard/components/ui/StatCard";
import StatCardRow from "../../dashboard/components/layout/StatCardRow";
import { useEmployerData } from "../../context/EmployerDataContext";

export default function EmployerStatCardRow() {
  const { stats } = useEmployerData();

  return (
    <StatCardRow>
      <StatCard icon={FiBriefcase} label="Active Job Postings" value={stats.activePostings} />
      <StatCard icon={FiUsers} label="Total Applicants" value={stats.totalApplicants} tone="accent" />
      <StatCard icon={FiCalendar} label="Interviews Scheduled" value={stats.interviewsScheduled} />
      <StatCard icon={FiCheckCircle} label="Positions Filled" value={stats.positionsFilled} />
    </StatCardRow>
  );
}
