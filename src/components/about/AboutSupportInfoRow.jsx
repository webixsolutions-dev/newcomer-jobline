// src/components/about/AboutSupportInfoRow.jsx
import { ABOUT_SUPPORT_INFO } from "../../data/aboutSupportInfo";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

/**
 * 3-column row below the CTA with vertical dividers.
 * Contains Mentorship, Employer value, and Contact details.
 * (Page content, NOT the shared Footer).
 */
const AboutSupportInfoRow = () => {
  return (
    <section className="py-16 bg-white border-t border-navy-100">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-navy-100">
          
          {/* Loop through first two (Community and Employers) */}
          {ABOUT_SUPPORT_INFO.map((col, idx) => {
            const Icon = col.icon;
            return (
              <div
                key={col.title}
                className={`flex flex-col items-center lg:items-start text-center lg:text-left ${
                  idx > 0 ? "pt-10 lg:pt-0 lg:pl-10" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-50 text-navy-800 mb-5 shadow-sm">
                  <Icon className="text-xl" />
                </div>
                <h4 className="font-bold text-navy-900 text-lg mb-2 font-heading">
                  {col.title}
                </h4>
                <p className="text-navy-500 text-sm leading-relaxed max-w-sm">
                  {col.description}
                </p>
              </div>
            );
          })}

          {/* Third Column: Get in Touch Contact Info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0 lg:pl-10">
            <h4 className="font-bold text-navy-900 text-lg mb-5 font-heading">
              Get in Touch
            </h4>
            
            <div className="flex flex-col gap-4 text-sm text-navy-600">
              {/* Mail */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <HiOutlineEnvelope className="text-teal-700 text-lg shrink-0" />
                <a
                  href="mailto:info@newcomerjobline.ca"
                  className="hover:text-teal-700 transition-colors font-semibold"
                >
                  info@newcomerjobline.ca
                </a>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <HiOutlinePhone className="text-teal-700 text-lg shrink-0" />
                <a
                  href="tel:4165550198"
                  className="hover:text-teal-700 transition-colors font-semibold"
                >
                  (416) 555-0198
                </a>
              </div>
              
              {/* Address */}
              <div className="flex items-start gap-3 justify-center lg:justify-start">
                <HiOutlineMapPin className="text-teal-700 text-lg mt-0.5 shrink-0" />
                <span className="text-left">
                  100 Queen Street West, Suite 2500<br />
                  Toronto, ON M5H 2N2, Canada
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSupportInfoRow;
