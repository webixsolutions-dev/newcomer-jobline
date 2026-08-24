// src/components/home/SuccessStories.jsx
import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";

const STORIES = [
  {
    name: "Fatima A.",
    role: "Marketing Coordinator, Toronto, ON",
    quote:
      '"Newcomer Jobline helped me find the right opportunities and connect with employers who value newcomers. I\'m grateful for the support I received."',
    img: "/fatima.webp",
  },
  {
    name: "David L.",
    role: "IT Support Specialist, Vancouver, BC",
    quote:
      '"The resources and job listings were exactly what I needed to start my career in Canada. Highly recommended for newcomers!"',
    img: "/david.webp",
  },
];

const SuccessStories = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 font-heading">
            Success <span className="text-teal-700">Stories</span>
          </h2>
          <div className="w-10 h-1 bg-gold-500 rounded-full mt-3" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col gap-4 p-6 rounded-2xl border border-navy-100 bg-white shadow-card"
            >
              {/* Quote icon */}
              <FaQuoteRight className="absolute top-5 right-5 text-2xl text-gold-400" />

              {/* Profile row */}
              <div className="flex items-center gap-4">
                <img
                  src={story.img}
                  alt={story.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-navy-100"
                />
                <div>
                  <p className="font-bold text-navy-900 text-base">
                    {story.name}
                  </p>
                  <p className="text-teal-700 text-sm font-semibold">
                    {story.role}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-navy-500 text-sm leading-relaxed">
                {story.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
