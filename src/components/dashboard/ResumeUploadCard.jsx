import { useRef, useState } from "react";
import { HiOutlineDocumentArrowUp, HiOutlineDocument, HiOutlineTrash } from "react-icons/hi2";
import Button from "../common/Button";

/**
 * Click/drag resume upload card — stores filename only (frontend mock).
 */
const ResumeUploadCard = ({ filename, onUpload, onRemove }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    const allowed = [".pdf", ".doc", ".docx"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) return;
    onUpload(file.name);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div>
      {!filename ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragOver
              ? "border-teal-500 bg-teal-50/50"
              : "border-navy-200 bg-navy-50/40 hover:border-gold-500 hover:bg-white"
          }`}
        >
          <HiOutlineDocumentArrowUp className="mb-3 text-3xl text-teal-700" />
          <p className="text-sm font-semibold text-navy-900">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-xs text-navy-500">PDF or DOC up to 5 MB</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-2xl border border-navy-100 bg-navy-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <HiOutlineDocument className="text-xl" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-navy-900">{filename}</p>
              <p className="text-xs text-navy-500">Resume on file</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
              Replace
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={HiOutlineTrash}
              onClick={onRemove}
              className="!text-red-600 hover:!bg-red-50"
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
};

export default ResumeUploadCard;
