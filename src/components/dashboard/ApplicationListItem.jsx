import { useState } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import Button from "../common/Button";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Single application row for My Applications page.
 */
const ApplicationListItem = ({ application, onWithdraw }) => {
  const [confirming, setConfirming] = useState(false);

  function handleWithdraw() {
    onWithdraw(application.id);
    setConfirming(false);
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h3 className="font-bold text-navy-900">{application.title}</h3>
            <ApplicationStatusBadge status={application.status} />
          </div>
          <p className="text-sm font-semibold text-navy-700">{application.company}</p>
          <div className="mt-1 flex items-center gap-1 text-xs text-navy-500">
            <HiOutlineMapPin className="text-sm" />
            {application.location}
          </div>
          <p className="mt-2 text-xs text-navy-400">
            Applied {formatDate(application.dateApplied)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          {!confirming ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirming(true)}
              className="!text-red-600 hover:!bg-red-50"
            >
              Withdraw Application
            </Button>
          ) : (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-right">
              <p className="mb-2 text-xs font-semibold text-red-800">
                Withdraw this application?
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWithdraw}
                  className="!border-red-500 !text-red-600 hover:!bg-red-600 hover:!text-white"
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationListItem;
