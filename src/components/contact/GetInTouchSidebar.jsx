// src/components/contact/GetInTouchSidebar.jsx
import {
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import MapPlaceholder from "./MapPlaceholder";

/**
 * Sidebar for the Contact section, displaying contact channels and map placeholder.
 */
const GetInTouchSidebar = () => {
  return (
    <div className="flex flex-col p-6 sm:p-8 bg-white rounded-2xl border border-navy-100 shadow-card">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <HiOutlineChatBubbleOvalLeftEllipsis className="text-2xl" />
        </div>
        <h3 className="font-bold text-navy-900 text-xl font-heading">
          Get in Touch
        </h3>
      </div>
      <p className="text-navy-500 text-sm leading-relaxed mb-6">
        We're here to support you on your career journey. Reach out to us through
        any of the options below.
      </p>

      <div className="flex flex-col gap-5 mb-8">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white mt-1">
            <HiOutlinePhone className="text-lg" />
          </div>
          <div>
            <a
              href="tel:16475550198"
              className="font-bold text-teal-700 hover:text-teal-800 transition-colors block mb-0.5"
            >
              1-647-555-0198
            </a>
            <span className="text-navy-500 text-sm">
              Monday to Friday, 9:00 AM – 5:00 PM ET
            </span>
          </div>
        </div>

        <div className="h-px bg-navy-100 w-full ml-14" />

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white mt-1">
            <HiOutlineEnvelope className="text-lg" />
          </div>
          <div>
            <a
              href="mailto:info@newcomerjobline.ca"
              className="font-bold text-teal-700 hover:text-teal-800 transition-colors block mb-0.5"
            >
              info@newcomerjobline.ca
            </a>
            <span className="text-navy-500 text-sm">
              We aim to reply within 1 business day.
            </span>
          </div>
        </div>

        <div className="h-px bg-navy-100 w-full ml-14" />

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white mt-1">
            <HiOutlineMapPin className="text-lg" />
          </div>
          <div>
            <span className="font-bold text-teal-700 block mb-0.5 whitespace-pre-line">
              {"250 Yonge Street, Suite 2201\nToronto, ON M5B 2L7, Canada"}
            </span>
            <span className="text-navy-500 text-sm">
              Near Dundas Station
            </span>
          </div>
        </div>

        <div className="h-px bg-navy-100 w-full ml-14" />

        {/* Hours */}
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-700 text-white mt-1">
            <HiOutlineClock className="text-lg" />
          </div>
          <div>
            <span className="font-bold text-teal-700 block mb-0.5">
              Business Hours
            </span>
            <span className="text-navy-500 text-sm">
              Monday to Friday, 9:00 AM – 5:00 PM ET
            </span>
          </div>
        </div>
      </div>

      <MapPlaceholder />
    </div>
  );
};

export default GetInTouchSidebar;
