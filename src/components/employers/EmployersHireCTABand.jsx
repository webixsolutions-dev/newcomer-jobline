import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiBriefcase } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";

/**
 * Employers CTA Band with horizontal layout, light blue background,
 * and 10% left/right margins.
 */
const EmployersHireCTABand = () => {
  return (
    <section className="py-12 sm:py-16 bg-white w-full">
      <div className="mx-4 sm:mx-[5%] lg:mx-[10%]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-md min-h-[180px] flex items-center bg-[#076474]"
        >
          {/* ── Background Hero Image (Desktop only) ── */}
          <div className="absolute inset-0 w-full h-full hidden lg:block">
            <img
              src="/employers/ready.webp"
              alt="Diverse business team collaborating around a table"
              className="w-full h-full object-cover object-right"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          {/* Mobile Background: Textured overlay */}
          <div className="absolute inset-0 w-full h-full lg:hidden block opacity-15">
            <img
              src="/employers/ready.webp"
              alt="Diverse business team collaborating around a table"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* ── Content overlay ── */}
          <div className="w-full relative z-20 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Part: Icon + Text */}
              <div className="col-span-1 lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* User icon inside soft blue circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white border border-white/20 flex-shrink-0 shadow-sm">
                  <HiOutlineUsers className="text-2.5xl" />
                </div>
                
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl sm:text-2.5xl font-extrabold text-white font-heading leading-tight">
                    Ready to Hire Newcomer Talent?
                  </h2>
                  <p className="text-teal-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Post your job today and connect with thousands of skilled newcomers across Canada.
                  </p>
                </div>
              </div>

              {/* Buttons Row */}
              <div className="col-span-1 lg:col-span-4 flex flex-wrap gap-3 lg:justify-end shrink-0">
                <Link
                  to="/post-job"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F17B0D] hover:bg-[#D96B07] text-white font-bold rounded-xl transition-all duration-200 shadow-sm text-xs sm:text-sm"
                >
                  <HiBriefcase className="text-base" />
                  Post a Job
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white border border-white/30 hover:bg-white/20 font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm"
                >
                  Contact Sales
                </Link>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmployersHireCTABand;

