import { Link } from 'react-router-dom';
import { HiOutlineChat } from 'react-icons/hi';

const SupportCTA = () => {
  return (
    <section className="bg-gray-50 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between border border-gray-200">
      <div className="flex items-center mb-6 md:mb-0">
        <div className="bg-white p-4 rounded-full shadow-sm mr-6">
          <HiOutlineChat className="text-3xl text-teal-700" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-navy-900 mb-1">
            Need more help?
          </h2>
          <p className="text-navy-500">
            Our team is here to support you on your journey.
          </p>
        </div>
      </div>
      
      <Link 
        to="/contactus"
        className="inline-flex items-center justify-center px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
      >
        Contact Us
      </Link>
    </section>
  );
};

export default SupportCTA;