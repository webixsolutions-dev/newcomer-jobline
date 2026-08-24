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
          className="relative rounded-2xl overflow-hidden border border-[#D4E8EB] bg-[#EAF2F4] shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.1fr] xl:grid-cols-[2fr_1.1fr] items-stretch">
            
            {/* ── Left Part: Icon + Text + Buttons ── */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 p-6 sm:p-10 z-20">
              
              {/* Icon + Text Row */}
              <div className="flex items-center gap-5">
                {/* User icon inside soft blue circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4E8EB] text-teal-800 flex-shrink-0 shadow-sm">
                  <HiOutlineUsers className="text-2.5xl" />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-xl sm:text-2.5xl font-extrabold text-navy-950 font-heading leading-tight">
                    Ready to Hire Newcomer Talent?
                  </h2>
                  <p className="text-navy-600 text-xs sm:text-sm max-w-md leading-relaxed">
                    Post your job today and connect with thousands of skilled newcomers across Canada.
                  </p>
                </div>
              </div>

              {/* Buttons Row */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/post-job"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F17B0D] hover:bg-[#D96B07] text-white font-bold rounded-xl transition-all duration-200 shadow-sm text-xs sm:text-sm"
                >
                  <HiBriefcase className="text-base" />
                  Post a Job
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent text-navy-900 border border-navy-500 hover:bg-[#D4E8EB]/50 font-bold rounded-xl transition-all duration-200 text-xs sm:text-sm"
                >
                  Contact Sales
                </Link>
              </div>

            </div>

            {/* ── Right Part: Image with Faded Left Edge ── */}
            <div className="relative h-48 sm:h-56 lg:h-[180px] xl:h-auto min-h-[160px] w-full overflow-hidden">
              {/* Left-edge gradient fade blending image with background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#EAF2F4] via-[#EAF2F4]/10 to-transparent z-10 hidden xl:block w-32" />
              
              <img
                src="/employers/ready.webp"
                alt="Diverse business team collaborating around a table"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmployersHireCTABand;
