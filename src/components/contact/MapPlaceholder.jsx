// src/components/contact/MapPlaceholder.jsx

const OFFICE_ADDRESS =
  "250 Yonge Street, Suite 2201, Toronto, ON M5B 2L7, Canada";

const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  OFFICE_ADDRESS
)}&z=16&output=embed`;

const MAP_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  OFFICE_ADDRESS
)}`;

/**
 * Embedded map for the Toronto office (Dundas Station area).
 */
const MapPlaceholder = () => {
  return (
    <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-navy-100 bg-navy-50">
      <iframe
        title="Map showing Toronto office location near Dundas Station"
        src={MAP_EMBED_URL}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        href={MAP_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm border border-navy-100 hover:bg-white transition-colors"
      >
        Open in Maps
      </a>
    </div>
  );
};

export default MapPlaceholder;
