// src/components/contact/ContactForm.jsx
import { useState } from "react";
import { HiPaperAirplane, HiCheckCircle } from "react-icons/hi2";

/**
 * Contact form with client-side required-field validation and a placeholder submit handler.
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email Address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Placeholder for API call
    console.log("Submitting contact form:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col p-6 sm:p-8 sm:px-10 bg-white rounded-2xl border border-navy-100 shadow-card">
      <div className="mb-8">
        <p className="text-teal-700 font-bold tracking-widest uppercase text-xs font-heading mb-2">
          CONTACT US
        </p>
        <h2 className="text-3xl font-extrabold text-navy-900 font-heading mb-3">
          Send Us a Message
        </h2>
        <p className="text-navy-500 text-sm sm:text-base leading-relaxed">
          Have a question or need support? Fill out the form below and our team
          will get back to you as soon as possible.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-8 text-center flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center">
            <HiCheckCircle className="text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-navy-900 font-heading">
            Message Sent!
          </h3>
          <p className="text-navy-500">
            Thank you for reaching out, {formData.fullName}. We've received your
            message and will get back to you shortly.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({ fullName: "", email: "", subject: "", message: "" });
            }}
            className="mt-4 px-6 py-2 bg-navy-900 text-white rounded-full font-bold hover:bg-navy-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullName" className="font-bold text-navy-900 text-sm">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.fullName ? "border-red-300" : "border-navy-200 focus:border-teal-500"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-bold text-navy-900 text-sm">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.email ? "border-red-300" : "border-navy-200 focus:border-teal-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="font-bold text-navy-900 text-sm">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is your message about?"
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all ${
                errors.subject ? "border-red-300" : "border-navy-200 focus:border-teal-500"
              }`}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="font-bold text-navy-900 text-sm">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us how we can help you..."
              rows={5}
              className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all resize-y ${
                errors.message ? "border-red-300" : "border-navy-200 focus:border-teal-500"
              }`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all duration-200 shadow-soft w-full sm:w-auto ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <HiPaperAirplane className="text-xl -mt-0.5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-2 mt-4 text-teal-700">
            <HiCheckCircle className="text-lg" />
            <span className="text-sm font-medium text-navy-700">
              We usually respond within 1 business day.
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
