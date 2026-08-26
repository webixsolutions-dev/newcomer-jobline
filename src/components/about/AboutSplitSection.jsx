// src/components/about/AboutSplitSection.jsx
import { motion } from "framer-motion";

/**
 * Reusable split layout section for About Us page.
 * Keeps layout code DRY.
 * 
 * Props:
 * - eyebrowText: string
 * - headingParts: { normal: string, highlighted: string }
 * - paragraph: string
 * - buttons: ReactNode
 * - image: string (optional) – local path like "/images/about-us/hero.jpg"
 * - altText: string
 * - isReverse: boolean (image left instead of right)
 * - compact: boolean – tighter vertical padding for compact sections (e.g., Our Story)
 */
const AboutSplitSection = ({
  eyebrowText,
  headingParts,
  paragraph,
  buttons,
  image,
  altText,
  isReverse = false,
  compact = false,
}) => {
  // Light blue‑gray gradient background
  const bgClass = "bg-gradient-to-r from-[#EAF1F7] to-[#F5F8FA]";
  // Padding: default generous for hero, tighter for compact sections
  const paddingClass = compact ? "py-10 lg:py-14" : "py-16 lg:py-24";

  return (
    <section className={`relative overflow-hidden w-full ${bgClass} ${paddingClass}`}>
      {/* Full‑bleed image on the right (or left when reversed) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`
          absolute inset-y-0 ${isReverse ? "left-0" : "right-0"} w-full lg:w-[70%]
          overflow-hidden
        `}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#E2E8F0] flex items-center justify-center">
          {image ? (
            <>
              <img
                src={image}
                alt={altText}
                className={`w-full h-full object-cover ${isReverse ? "object-left" : "object-right"}`}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {/* Soft gradient fade overlay to blend the image into the background */}
              {!isReverse ? (
                <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#EAF1F7] via-[#EAF1F7]/70 to-transparent z-10 pointer-events-none" />
              ) : (
                <div className="absolute inset-y-0 right-0 w-[30%] bg-gradient-to-l from-[#F5F8FA] via-[#F5F8FA]/70 to-transparent z-10 pointer-events-none" />
              )}
            </>
          ) : (
            // Visible placeholder while the real asset is missing
            <div className="text-center text-[#94A3B8] text-sm font-medium px-4">
              Image placeholder – replace with <code>/images/about-us/hero.jpg</code>
            </div>
          )}
        </div>
      </motion.div>

      {/* Text column – constrained to the site container so it keeps normal padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col justify-center gap-5 py-6 lg:py-0 ${isReverse ? "lg:ml-auto w-full lg:w-[45%]" : "w-full lg:w-[45%]"}`}
        >
          {eyebrowText && (
            <span className="text-orange-500 font-bold uppercase tracking-wider text-xs sm:text-sm relative pb-1.5 w-fit">
              {eyebrowText}
              <span className="absolute bottom-0 left-0 w-8 h-[2px] bg-orange-500"></span>
            </span>
          )}

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-navy-900 font-heading">
            {headingParts.normal}{" "}
            <span className="text-teal-700">{headingParts.highlighted}</span>
          </h2>

          <p className="text-navy-500 text-base sm:text-lg leading-relaxed max-w-xl">
            {paragraph}
          </p>

          {buttons && <div className="flex flex-wrap gap-4 mt-4">{buttons}</div>}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSplitSection;
