import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineMapPin,
  HiOutlineTag,
  HiOutlineClock,
  HiOutlineBanknotes,
  HiCheckCircle,
} from "react-icons/hi2"
import Input from "../common/Input"
import Select from "../common/Select"
import Textarea from "../common/Textarea"
import Button from "../common/Button"
import { categories, jobTypes } from "../../data/jobs"

const PostJobForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-teal-100 bg-teal-50 p-12"
      >
        <HiCheckCircle className="text-6xl text-teal-600" />
        <h3 className="text-2xl font-bold text-navy-900">Job Posted Successfully!</h3>
        <p className="text-navy-500 max-w-md">
          Your job listing is now live and visible to thousands of newcomer job seekers across
          Canada. We'll notify you when candidates apply.
        </p>
        <Button variant="teal" onClick={() => setSubmitted(false)}>
          Post Another Job
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8 shadow-card"
    >
      <div className="flex items-center gap-3 border-b border-navy-100 pb-6">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-3 flex-1">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                step >= s ? "bg-gold-500 text-navy-900" : "bg-navy-50 text-navy-400"
              }`}
            >
              {s}
            </div>
            <span className={`text-sm font-semibold ${step >= s ? "text-navy-900" : "text-navy-400"}`}>
              {s === 1 ? "Job Details" : "Description & Review"}
            </span>
            {s === 1 && <div className="flex-1 h-0.5 bg-navy-100 mx-2" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Job Title" icon={HiOutlineBriefcase} placeholder="e.g. Warehouse Associate" required />
            <Input label="Company Name" icon={HiOutlineBuildingOffice2} placeholder="e.g. Maple Logistics Inc." required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Location" icon={HiOutlineMapPin} placeholder="City, Province" required />
            <Select label="Job Category" icon={HiOutlineTag} options={categories.slice(1)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Employment Type" icon={HiOutlineClock} options={jobTypes.slice(1)} />
            <Input label="Salary Range (Optional)" icon={HiOutlineBanknotes} placeholder="e.g. $19 - $23 / hr" />
          </div>
          <Button type="button" variant="secondary" fullWidth onClick={() => setStep(2)} className="mt-2">
            Continue to Description
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-5"
        >
          <Textarea
            label="Job Description"
            placeholder="Describe the role, responsibilities, and what makes your workplace newcomer-friendly..."
            rows={6}
            required
          />
          <Textarea
            label="Requirements & Qualifications"
            placeholder="List required skills, certifications, or language proficiency..."
            rows={4}
          />
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="submit" variant="primary" fullWidth>
              Publish Job Listing
            </Button>
          </div>
        </motion.div>
      )}
    </motion.form>
  )
}

export default PostJobForm
