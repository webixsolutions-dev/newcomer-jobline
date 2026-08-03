import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiArrowUpRight,
} from "react-icons/hi2"
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6"
import logo from "../../assets/logo.png"

const footerLinks = {
  "Job Seekers": [
    { label: "Browse Jobs", to: "/browse-jobs" },
    { label: "Career Resources", to: "/browse-jobs" },
    { label: "Create Profile", to: "/browse-jobs" },
  ],
  Employers: [
    { label: "Post a Job", to: "/post-job" },
    { label: "Employer Hub", to: "/employers" },
    { label: "Pricing", to: "/employers" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ],
}

const socials = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: FaLinkedinIn, href: "#" },
  { icon: FaInstagram, href: "#" },
]

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200 pt-20 pb-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-4 flex flex-col gap-5">
            <img src={logo} alt="Newcomer Jobline" className="h-12 w-auto bg-white/95 rounded-lg p-1.5 w-fit" />
            <p className="text-sm leading-relaxed text-navy-300 max-w-sm">
              Newcomer Jobline connects newcomers and immigrants with welcoming employers,
              helping build careers and stronger communities together.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ y: -4, backgroundColor: "#F5A623", color: "#0B2545" }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="flex flex-col gap-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h4>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-navy-300 hover:text-gold-400 transition-colors w-fit flex items-center gap-1 group"
                  >
                    {link.label}
                    <HiArrowUpRight className="text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h4>
            <div className="flex items-start gap-3 text-sm">
              <HiOutlineMapPin className="text-gold-400 text-lg mt-0.5 shrink-0" />
              <span className="text-navy-300">123 Main Street, Suite 200, Toronto, ON</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <HiOutlinePhone className="text-gold-400 text-lg mt-0.5 shrink-0" />
              <span className="text-navy-300">+1 (416) 555-0198</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <HiOutlineEnvelope className="text-gold-400 text-lg mt-0.5 shrink-0" />
              <span className="text-navy-300">hello@newcomerjobline.com</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-navy-400">
          <p>&copy; {new Date().getFullYear()} Newcomer Jobline. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gold-400 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gold-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
