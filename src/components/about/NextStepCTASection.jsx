// src/components/about/NextStepCTASection.jsx
import { Link } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlinePhone } from "react-icons/hi2";
import AboutSplitSection from "./AboutSplitSection";

/**
 * Next step split section CTA.
 */
const NextStepCTASection = () => {
  const buttons = (
    <>
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 px-6 py-3 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors text-sm shadow-sm"
      >
        <HiOutlineMagnifyingGlass className="text-lg" />
        Browse Jobs
      </Link>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3 border border-orange-500 hover:bg-orange-50 text-orange-500 font-bold rounded-xl transition-colors text-sm shadow-sm"
      >
        <HiOutlinePhone className="text-lg" />
        Contact Us
      </Link>
    </>
  );

  return (
    <AboutSplitSection
      eyebrowText="JOIN OUR MISSION"
      headingParts={{ normal: "Ready to Take", highlighted: "the Next Step?" }}
      paragraph="Whether you're a newcomer looking for opportunities or an employer ready to build an inclusive team, Newcomer Jobline is here to support your journey."
      buttons={buttons}
      image="/aboutus/ready.webp"
      altText="4 professionals in meeting room with Stronger Together wall text"
      isCreamBg={false}
    />
  );
};

export default NextStepCTASection;
