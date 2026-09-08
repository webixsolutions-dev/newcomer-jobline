import { Link } from 'react-router-dom';
import { 
  HiOutlineClipboardList, 
  HiOutlineDocumentText, 
  HiOutlineUsers, 
  HiOutlineHome, 
  HiOutlineBookOpen, 
  HiOutlineHeart 
} from "react-icons/hi";

const categories = [
  {
    title: "Job Search",
    desc: "Tips and tools to find the right job in Canada.",
    img: "/resources/resource_job_search.webp",
    icon: HiOutlineClipboardList,
    link: "#"
  },
  {
    title: "Resume & Cover Letter",
    desc: "Guides and templates to create a strong application.",
    img: "/resources/resource_resume_cover_letter.webp",
    icon: HiOutlineDocumentText,
    link: "#"
  },
  {
    title: "Interview Preparation",
    desc: "Practice and advice to ace your interviews.",
    img: "/resources/resource_interview_preparation.webp",
    icon: HiOutlineUsers,
    link: "#"
  },
  {
    title: "Settlement in Canada",
    desc: "Helpful information for settling in your new home.",
    img: "/resources/resource_settlement_in_canada.webp",
    icon: HiOutlineHome,
    link: "#"
  },
  {
    title: "Skills & Training",
    desc: "Programs and resources to upskill and grow.",
    img: "/resources/resource_skills_training.webp",
    icon: HiOutlineBookOpen,
    link: "#"
  },
  {
    title: "Health & Well-being",
    desc: "Support for your physical and mental well-being.",
    img: "/resources/resource_health_wellbeing.webp",
    icon: HiOutlineHeart,
    link: "#"
  }
];

const PopularCategories = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-navy-900 font-heading">
          Popular Resource Categories
        </h2>
        <Link to="#" className="text-teal-700 font-bold hover:text-teal-800 flex items-center transition-colors">
          View all categories <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            to={category.link}
            className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300"
          >
            <div className="h-48 w-full overflow-hidden bg-gray-50 relative">
              <img 
                src={category.img} 
                alt={category.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center h-10 w-10 bg-teal-50 rounded-full text-teal-700">
                  <category.icon className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 group-hover:text-teal-700 transition-colors">
                  {category.title}
                </h3>
              </div>
              <p className="text-navy-500 leading-relaxed text-sm">
                {category.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;