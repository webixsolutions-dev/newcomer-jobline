// src/components/jobs/SuccessStoriesCarousel.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa6";
import { SUCCESS_STORIES } from "../../data/successStories";

/**
 * 2-up testimonial carousel with dot indicators.
 */
const SuccessStoriesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Group into pairs (2-up)
  const groupedStories = [];
  for (let i = 0; i < SUCCESS_STORIES.length; i += 2) {
    groupedStories.push(SUCCESS_STORIES.slice(i, i + 2));
  }

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden">
      <div className="container-app">
        
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading leading-tight mb-4">
            Success Stories from Newcomers
          </h2>
          <p className="text-navy-500 text-base sm:text-lg max-w-2xl mx-auto">
            Real stories from newcomers who found meaningful jobs and built successful careers in Canada.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {groupedStories[activeIndex]?.map((story, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-6 p-8 bg-white rounded-2xl border border-navy-100 shadow-sm hover:shadow-card transition-shadow duration-300"
                >
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-navy-50">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <FaQuoteLeft className="text-teal-700/20 text-3xl mb-3" />
                    <p className="text-navy-700 leading-relaxed text-sm sm:text-base mb-6 flex-1 italic">
                      "{story.quote}"
                    </p>
                    <div>
                      <h4 className="font-bold text-teal-700">{story.name}</h4>
                      <span className="text-navy-500 text-sm">{story.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {groupedStories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-gold-500"
                  : "w-2 bg-navy-200 hover:bg-navy-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStoriesCarousel;
