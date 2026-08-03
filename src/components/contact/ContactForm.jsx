import { useState } from "react"
import { motion } from "framer-motion"
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineTag, HiCheckCircle } from "react-icons/hi2"
import { PiPaperPlaneTiltBold } from "react-icons/pi"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import Select from "../common/Select"
import Button from "../common/Button"

const topics = ["General Inquiry", "Job Seeker Support", "Employer Inquiry", "Partnership", "Media"]

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-teal-100 bg-teal-50 p-12 h-full"
      >
        <HiCheckCircle className="text-5xl text-teal-600" />
        <h3 className="text-xl font-bold text-navy-900">Message Sent!</h3>
        <p className="text-navy-500 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 1-2 business days.
        </p>
        <Button variant="teal" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-6 sm:p-8 shadow-card"
    >
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900">Send Us a Message</h3>
        <p className="text-sm text-navy-500 mt-1">We'd love to hear from you. Fill out the form below.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          icon={HiOutlineUser}
          placeholder="Jane Doe"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email Address"
          icon={HiOutlineEnvelope}
          type="email"
          placeholder="jane@example.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <Select
        label="Topic"
        icon={HiOutlineTag}
        options={topics}
        value={form.topic}
        onChange={(e) => setForm({ ...form, topic: e.target.value })}
      />

      <Textarea
        label="Message"
        placeholder="Tell us how we can help..."
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <Button type="submit" variant="primary" size="lg" icon={PiPaperPlaneTiltBold} fullWidth>
        Send Message
      </Button>
    </motion.form>
  )
}

export default ContactForm
