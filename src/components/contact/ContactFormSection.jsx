// src/components/contact/ContactFormSection.jsx
import ContactForm from "./ContactForm";
import GetInTouchSidebar from "./GetInTouchSidebar";

/**
 * Two-column layout containing the ContactForm and GetInTouchSidebar.
 * Has an id="contact-form" for anchor scrolling.
 */
const ContactFormSection = ({ formRef }) => {
  return (
    <section
      ref={formRef}
      id="contact-form"
      className="py-16 sm:py-24 bg-navy-50/40 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form */}
          <ContactForm />

          {/* Right Column: Sidebar */}
          <GetInTouchSidebar />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
