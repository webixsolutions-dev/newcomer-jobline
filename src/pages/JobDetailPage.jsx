// src/pages/JobDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";

/**
 * Placeholder detail page for individual job postings.
 */
const JobDetailPage = () => {
  const { jobId } = useParams();

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col items-center justify-center p-4 pt-[72px]">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-card text-center max-w-lg w-full border border-navy-100">
        <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚀</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-heading mb-3">
          Job Detail Page
        </h1>
        <p className="text-navy-500 mb-2">
          You are viewing job ID: <span className="font-bold text-navy-900">{jobId}</span>
        </p>
        <p className="text-navy-500 mb-8">
          The full job description and application flow will be built out in a future module.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-xl transition-colors"
        >
          <HiOutlineArrowLeft className="text-lg" />
          Back to Browse Jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetailPage;
