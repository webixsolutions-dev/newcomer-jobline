// src/components/layout/Footer.jsx
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import DecorativeShape from "../common/DecorativeShape";

const QUICK_LINKS = [
  { label: "Browse Jobs", to: "/jobs" },
  { label: "For Employers", to: "/employers" },
  { label: "Resources", to: "/resources" },
  { label: "Career Support", to: "/resources" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const JOB_SEEKER_LINKS = [
  { label: "Create Account", to: "/login" },
  { label: "Search Jobs", to: "/jobs" },
  { label: "Resume Tips", to: "/resources" },
  { label: "Interview Tips", to: "/resources" },
  { label: "Settlement Resources", to: "/resources" },
  { label: "Success Stories", to: "/about" },
];

const EMPLOYER_LINKS = [
  { label: "Post a Job", to: "/post-job" },
  { label: "Why Hire Newcomers", to: "/employers" },
  { label: "Employer Resources", to: "/employers" },
  { label: "Diversity & Inclusion", to: "/employers" },
  { label: "Success Stories", to: "/about" },
  { label: "Contact Sales", to: "/contact" },
];

const SOCIALS_NAVY = [
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const FooterLinkCol = ({ title, links }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-sm font-bold text-navy-900">{title}</h4>
    {links.map((link) => (
      <Link
        key={link.label}
        to={link.to}
        className="text-sm text-navy-500 hover:text-teal-700 transition-colors"
      >
        {link.label}
      </Link>
    ))}
  </div>
);

/* ── Footer ───────────────────────────────────────────────────────────────── */
const Footer = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-navy-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 relative z-10">
        
        {/* Main grid: brand | Quick Links | Job Seekers | Employers | Contact Us */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-8 pb-10 border-b border-navy-200">
          
          {/* ── Brand column ── */}
          <div className="flex flex-col gap-5 pr-4">
            <img src="/logo.png" alt="Newcomer Jobline" className="h-12 w-auto object-contain object-left" />
            <p className="text-sm text-navy-500 leading-relaxed">
              Connecting newcomers with inclusive employers, career support, and resources across Canada.
            </p>

            {/* Social icons */}
            <div>
              <p className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-2">
                {SOCIALS_NAVY.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors text-sm"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <FooterLinkCol title="Quick Links" links={QUICK_LINKS} />

          {/* ── Job Seekers ── */}
          <FooterLinkCol title="Job Seekers" links={JOB_SEEKER_LINKS} />

          {/* ── Employers ── */}
          <FooterLinkCol title="Employers" links={EMPLOYER_LINKS} />

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-navy-900">Contact Us</h4>
            <div className="flex items-start gap-3 text-sm text-navy-500">
              <HiOutlineMapPin className="text-teal-700 text-lg mt-0.5 shrink-0" />
              <span>
                35 Toronto Street, Suite 200<br />
                Toronto, ON M5C 2C3, Canada
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm text-navy-500">
              <HiOutlinePhone className="text-teal-700 text-lg shrink-0" />
              <a href="tel:+14165550198" className="hover:text-teal-700 transition-colors">
                +1 (416) 555-0198
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-navy-500">
              <HiOutlineEnvelope className="text-teal-700 text-lg shrink-0" />
              <a href="mailto:info@newcomerjobline.ca" className="hover:text-teal-700 transition-colors">
                info@newcomerjobline.ca
              </a>
            </div>
            <div className="flex items-start gap-3 text-sm text-navy-500">
              <HiOutlineClock className="text-teal-700 text-lg shrink-0" />
              <span>Mon – Fri: 9:00 AM – 5:00 PM ET</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-navy-500">
          <p>© 2025 Newcomer Jobline. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-navy-900 transition-colors">Privacy Policy</a>
              <span className="text-navy-200">|</span>
              <a href="#" className="hover:text-navy-900 transition-colors">Terms of Use</a>
              <span className="text-navy-200">|</span>
              <a href="#" className="hover:text-navy-900 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
