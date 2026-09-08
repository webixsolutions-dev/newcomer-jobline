import { HiOutlineSearch } from "react-icons/hi";

const ResourcesHero = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h4 className="text-orange-500 font-bold tracking-wider uppercase mb-3 text-sm">
              Resources
            </h4>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 font-heading mb-6 leading-tight">
              Helpful Resources <br className="hidden md:block"/>
              <span className="text-teal-700">for Newcomers</span>
            </h1>
            <p className="text-lg text-navy-500 mb-8 max-w-lg leading-relaxed">
              Explore guides, tools, and support to help you succeed in your job search and build a thriving career in Canada. We're here to support you every step of the way.
            </p>
            
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <HiOutlineSearch className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm shadow-sm transition-all"
                placeholder="Search resources..."
              />
            </div>
          </div>

          <div className="relative lg:ml-10">
            <img
              src="/resources/hero_resources_hijab_woman.webp"
              alt="Newcomer professional working on laptop"
              className="w-full h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResourcesHero;