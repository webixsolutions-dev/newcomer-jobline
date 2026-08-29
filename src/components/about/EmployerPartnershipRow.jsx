// src/components/about/EmployerPartnershipRow.jsx
import { Link } from "react-router-dom";
import { FaUserGroup, FaQuoteLeft } from "react-icons/fa6";
import { HiOutlineBriefcase } from "react-icons/hi2";

/**
 * Split row below support process:
 * Left: "Partnering with Employers" tinted card.
 * Right: Testimonial card (Priya S.).
 */
const EmployerPartnershipRow = () => {
  return (
    <section className="pb-16 bg-white">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left: Employer Card */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-8 flex flex-col justify-between hover:shadow-card transition-shadow duration-300">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal-700 mb-6 shadow-sm">
                <FaUserGroup className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 font-heading mb-4 relative pb-2 w-fit">
                Partnering with Employers
                <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-teal-600"></span>
              </h3>
              <p className="text-navy-600 text-sm sm:text-base leading-relaxed mb-8">
                We work with inclusive employers across Canada who are committed to
                building diverse teams and supporting newcomer talent. Post your
                jobs and connect with motivated, skilled professionals ready to contribute.
              </p>
            </div>
            <Link
              to="/employers"
              className="w-full sm:w-fit inline-flex items-center justify-center gap-2 px-6 py-3 border border-orange-500 hover:bg-orange-50 text-orange-500 font-bold rounded-xl transition-colors text-sm shadow-sm"
            >
              <HiOutlineBriefcase className="text-lg" />
              For Employers
            </Link>
          </div>

          {/* Right: Testimonial Card */}
          <div className="bg-white border border-navy-100 rounded-2xl p-6 sm:p-8 hover:shadow-card transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-6 items-center h-full">
              
              {/* Left Column: Text & Meta */}
              <div className="flex flex-col justify-center text-left">
                <FaQuoteLeft className="text-teal-700 text-3xl mb-4" />
                <p className="text-navy-800 leading-relaxed text-sm sm:text-base mb-4 font-medium">
                  Newcomer Jobline helped me find a job that matches my skills and
                  goals. The support and resources gave me the confidence I needed to succeed in Canada.
                </p>
                
                {/* Horizontal line separator */}
                <div className="w-10 h-[2px] bg-navy-200/80 mb-3" />
                
                <div>
                  <h4 className="font-bold text-teal-700 text-base">Priya S.</h4>
                  <span className="text-navy-500 text-sm">Marketing Coordinator, Toronto</span>
                </div>
              </div>

              {/* Right Column: Large Circle Photo */}
              <div className="flex justify-center md:justify-end shrink-0">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-navy-100/50 shadow-md bg-navy-50">
                  <img
                    src="/aboutus/girl.webp"
                    alt="Priya S."
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EmployerPartnershipRow;
