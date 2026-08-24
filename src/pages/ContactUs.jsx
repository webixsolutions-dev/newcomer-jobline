// src/pages/ContactUs.jsx
import { useRef } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactInfoCardsRow from "../components/contact/ContactInfoCardsRow";
import ContactFormSection from "../components/contact/ContactFormSection";
import SupportOptionsGrid from "../components/contact/SupportOptionsGrid";
import ContactFAQSection from "../components/contact/ContactFAQSection";
import NextStepMiniCTA from "../components/contact/NextStepMiniCTA";
import FinalCTABand from "../components/contact/FinalCTABand";

/**
 * Module 4: Contact Us page (/contact)
 * Composes all contact sub-sections.
 */
const ContactUs = () => {
  const formRef = useRef(null);

  return (
    <>
      <ContactHero formRef={formRef} />
      <ContactInfoCardsRow />
      <ContactFormSection formRef={formRef} />
      <SupportOptionsGrid formRef={formRef} />
      <ContactFAQSection />
      <NextStepMiniCTA />
      <FinalCTABand />
    </>
  );
};

export default ContactUs;
