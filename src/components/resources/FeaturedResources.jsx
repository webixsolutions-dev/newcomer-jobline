import { Link } from 'react-router-dom';

const featuredArticles = [
  {
    title: "How to Write a Canadian Resume",
    desc: "Learn the format, key sections, and tips to create a resume that stands out to Canadian employers.",
    img: "/resources/featured_canadian_resume.webp",
    link: "#"
  },
  {
    title: "Interview Tips for Newcomers",
    desc: "Prepare with confidence. Get practical tips for different types of interviews and common questions.",
    img: "/resources/featured_interview_tips.webp",
    link: "#"
  },
  {
    title: "Living in Canada: What You Need to Know",
    desc: "Find essential information on housing, banking, transportation, and everyday life in Canada.",
    img: "/resources/featured_living_in_canada.webp",
    link: "#"
  },
  {
    title: "Free Training & Certification Programs",
    desc: "Explore free or low-cost training programs to build new skills and boost your career.",
    img: "/resources/featured_training_certification_programs.webp",
    link: "#"
  }
];

const FeaturedResources = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-navy-900 font-heading">
          Featured Resources
        </h2>
        <Link to="#" className="text-teal-700 font-bold hover:text-teal-800 flex items-center transition-colors">
          View all resources <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        {featuredArticles.map((article, index) => (
          <div 
            key={index}
            className="flex flex-col md:flex-row bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 md:items-center md:pr-8"
          >
            <div className="w-full md:w-72 h-48 md:h-auto bg-gray-50 flex-shrink-0">
              <img 
                src={article.img} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-navy-900 mb-2">
                {article.title}
              </h3>
              <p className="text-navy-500">
                {article.desc}
              </p>
            </div>

            <div className="px-6 pb-6 md:p-0 flex-shrink-0">
              <Link 
                to={article.link}
                className="inline-flex items-center px-6 py-2 border border-gray-300 text-navy-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Read More <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedResources;