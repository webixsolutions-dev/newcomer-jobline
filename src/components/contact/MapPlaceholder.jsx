// src/components/contact/MapPlaceholder.jsx
import { HiMapPin } from "react-icons/hi2";
import { FaBusSimple } from "react-icons/fa6";

/**
 * Static placeholder box styled to look like an embedded map.
 * Local image placeholder approach with a light gray/beige fallback.
 */
const MapPlaceholder = () => {
  return (
    <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-navy-100 bg-[#EAE8E3]">
      {/* 
        Map static image layer.
        Will use the fallback background color until the image is placed in public/images/
      */}
      <div className="absolute inset-0">
        <img
          src="/images/contact-map-placeholder.jpg"
          alt="Map showing Toronto office location near Dundas Station"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </div>

      {/* CSS-drawn map elements layered on top for a convincing look without an image if needed */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Decorative street lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-full h-4 bg-white transform -rotate-12 absolute" />
          <div className="h-full w-4 bg-white transform rotate-12 absolute" />
        </div>

        {/* Map pin */}
        <div className="relative z-10 flex flex-col items-center -mt-10">
          <HiMapPin className="text-5xl text-teal-700 drop-shadow-md" />
          <div className="w-4 h-1.5 bg-black/20 rounded-full blur-[2px] mt-1" />
        </div>

        {/* Street Labels */}
        <span className="absolute top-1/2 left-1/4 transform -translate-y-12 -rotate-12 text-navy-500 font-bold text-xs tracking-wider uppercase">
          Yonge St
        </span>
        <span className="absolute top-1/2 right-1/4 transform translate-y-12 rotate-12 text-navy-500 font-bold text-xs tracking-wider uppercase">
          Dundas St E
        </span>
        <span className="absolute bottom-12 left-12 transform -rotate-70 text-navy-400 font-bold text-[10px] tracking-wider uppercase">
          Bay St
        </span>

        {/* Transit Stop */}
        <div className="absolute bottom-16 right-16 flex items-center gap-1.5 bg-white/90 px-2 py-1 rounded shadow-sm">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-teal-600 text-white">
            <FaBusSimple className="text-[10px]" />
          </div>
          <span className="text-[10px] font-bold text-navy-900">Dundas Station</span>
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
