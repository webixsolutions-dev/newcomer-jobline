const STATUS_STYLES = {
  Applied: "bg-teal-50 text-teal-700 border-teal-100",
  "In Review": "bg-orange-50 text-orange-700 border-orange-100",
  Interview: "bg-teal-700 text-white border-teal-700",
  Offer: "bg-green-50 text-green-700 border-green-100",
  "Not Selected": "bg-navy-50 text-navy-500 border-navy-100",
};

/**
 * Colored status pill for job applications.
 */
const ApplicationStatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Applied;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${style}`}
    >
      {status}
    </span>
  );
};

export default ApplicationStatusBadge;
