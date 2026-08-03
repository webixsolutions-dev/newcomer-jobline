import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import ContactInfoCard from "../components/contact/ContactInfoCard"
import ContactForm from "../components/contact/ContactForm"
import MapPlaceholder from "../components/contact/MapPlaceholder"
import FAQSection from "../components/common/FAQSection"
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineClock } from "react-icons/hi2"

const contactInfo = [
  {
    icon: HiOutlineEnvelope,
    title: "Email Us",
    lines: ["hello@newcomerjobline.com", "We reply within 1 business day"],
    tone: "gold",
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    lines: ["+1 (416) 555-0198", "Mon - Fri, 9am - 5pm ET"],
    tone: "teal",
  },
  {
    icon: HiOutlineMapPin,
    title: "Visit Our Office",
    lines: ["123 Main Street, Suite 200", "Toronto, ON, Canada"],
    tone: "navy",
  },
  {
    icon: HiOutlineClock,
    title: "Business Hours",
    lines: ["Monday - Friday: 9am - 5pm", "Saturday - Sunday: Closed"],
    tone: "gold",
  },
]

const contactFaqs = [
  {
    question: "How quickly will I hear back after submitting the form?",
    answer: "Our team typically responds within 1 business day, Monday through Friday.",
  },
  {
    question: "Can I schedule an in-person appointment?",
    answer: "Yes, you can request an in-person appointment at our Toronto office by mentioning it in your message.",
  },
  {
    question: "Do you offer support in languages other than English?",
    answer: "Yes, our team includes multilingual staff and we can connect you with language support resources.",
  },
]

const ContactUs = () => {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We're Here to Support Your Journey"
        highlight="Support"
        subtitle="Have a question about jobs, employers, or partnerships? Our team is ready to help."
        crumb="Contact Us"
      />

      <section className="py-20 sm:py-24 bg-white">
        <Container className="flex flex-col gap-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <ContactInfoCard key={info.title} {...info} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapPlaceholder />
              <div className="rounded-2xl bg-navy-50 border border-navy-100 p-6">
                <h4 className="font-bold text-navy-900 mb-2">Prefer Social Media?</h4>
                <p className="text-sm text-navy-500 leading-relaxed">
                  Follow us for job alerts, newcomer resources, and community events happening
                  across Canada.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FAQSection items={contactFaqs} eyebrow="Support" title="Common Questions" highlight="Questions" />
    </>
  )
}

export default ContactUs
