import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { NavLink, Link } from "react-router-dom"
import { HiBars3, HiXMark } from "react-icons/hi2"
import Button from "../common/Button"
import logo from "../../assets/logo.png"
import { useAuth } from "../../dashboard/auth/AuthContext"

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Browse Jobs", to: "/browse-jobs" },
  { label: "Post a Job", to: "/post-job" },
  { label: "Employers", to: "/employers" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isAuthenticated, role } = useAuth()
  const dashboardPath = role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => (document.body.style.overflow = "")
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-card py-2" 
          : "bg-white lg:bg-transparent py-4" // White on mobile, transparent on desktop
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Newcomer Jobline" className="h-10 sm:h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                  isActive
                    ? scrolled || window.innerWidth < 1024
                      ? "text-navy-900"
                      : "text-white"
                    : scrolled || window.innerWidth < 1024
                    ? "text-navy-500 hover:text-navy-900"
                    : "text-navy-100 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-0.5 h-[3px] rounded-full bg-gold-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            as={Link}
            to={isAuthenticated ? dashboardPath : "/login"}
            variant={scrolled ? "ghost" : "outlineLight"}
            size="sm"
          >
            {isAuthenticated ? "My Dashboard" : "Sign In"}
          </Button>
          <Button as={Link} to="/post-job" variant="primary" size="sm">
            Post a Job
          </Button>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className={`lg:hidden flex items-center justify-center h-11 w-11 rounded-full transition-colors ${
            scrolled ? "text-navy-900 bg-navy-50" : "text-navy-900 bg-navy-50" // Always dark on mobile
          }`}
        >
          <HiBars3 className="text-2xl" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-navy-100">
                <img src={logo} alt="Newcomer Jobline" className="h-9 w-auto" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-navy-50 text-navy-700"
                >
                  <HiXMark className="text-xl" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1 overflow-y-auto">
                {LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                          isActive ? "bg-navy-900 text-white" : "text-navy-700 hover:bg-navy-50"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-5 border-t border-navy-100 flex flex-col gap-3">
                <Button
                  as={Link}
                  to={isAuthenticated ? dashboardPath : "/login"}
                  variant="outline"
                  fullWidth
                  onClick={() => setOpen(false)}
                >
                  {isAuthenticated ? "My Dashboard" : "Sign In"}
                </Button>
                <Button as={Link} to="/post-job" variant="primary" fullWidth onClick={() => setOpen(false)}>
                  Post a Job
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar