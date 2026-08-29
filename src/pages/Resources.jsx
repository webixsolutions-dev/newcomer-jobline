// src/pages/Resources.jsx
// Placeholder page — will be built in a future module
import { Link } from "react-router-dom";
import { HiOutlineBookOpen } from "react-icons/hi";

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-[72px] px-4">
      <div className="text-center max-w-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 mx-auto mb-6">
          <HiOutlineBookOpen className="text-3xl text-teal-700" />
        </div>
        <h1 className="text-3xl font-extrabold text-navy-900 font-heading mb-3">
          Career Resources
        </h1>
        <p className="text-navy-500 mb-8">
          Resume tips, interview prep, settlement support, and more — coming
          soon in the next module.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full text-sm transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Resources;
