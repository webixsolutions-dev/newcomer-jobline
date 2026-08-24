// src/components/common/DecorativeShape.jsx
import { motion } from "framer-motion";

/**
 * Reusable decorative background shape (SVG blob/curve).
 * Positioned via props so it doesn't interfere with content.
 */
const DecorativeShape = ({
  color = "text-teal-50",
  position = "bottom-left",
  size = "w-64 h-64",
  className = "",
  path,
  viewBox = "0 0 200 200",
}) => {
  // Default position classes
  const posClasses = {
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
  };

  const selectedPos = posClasses[position] || position;

  // Default curve path if none provided
  const defaultPath =
    "M45.7,-76.4C58.9,-69.1,69,-54.6,76.5,-39.8C83.9,-25,88.7,-9.9,86.2,4.3C83.6,18.5,73.6,31.7,63.1,43.2C52.6,54.7,41.5,64.4,28.2,71.2C14.9,78,0.4,81.8,-13.7,81.1C-27.8,80.3,-41.5,74.9,-53.4,66.1C-65.3,57.3,-75.4,45.2,-81.4,31.2C-87.4,17.2,-89.3,1.4,-85.4,-12.8C-81.5,-27,-71.8,-39.7,-59.5,-47.9C-47.2,-56.1,-32.3,-59.9,-18.8,-63.3C-5.3,-66.6,6.9,-69.6,20.5,-73.4C34.1,-77.2,49.1,-81.9,45.7,-76.4Z";

  return (
    <div
      aria-hidden="true"
      className={`absolute z-0 pointer-events-none overflow-hidden ${selectedPos} ${className}`}
    >
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewBox={viewBox}
        className={`${size} ${color} fill-current`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path || defaultPath}
          transform="translate(100 100)"
        />
      </motion.svg>
    </div>
  );
};

export default DecorativeShape;
