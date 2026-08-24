// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Link, useLocation } from "react-router-dom";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { HiBriefcase, HiUser } from "react-icons/hi";
import { useAuth } from "../../dashboard/auth/AuthContext";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Browse Jobs", to: "/jobs" },
  { label: "Employers", to: "/employers" },
  { label: "Resources", to: "/resources" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, role, logout } = useAuth();
  const { pathname } = useLocation();
  const isPostJobActive = pathname === "/post-job";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-card" : "border-b border-navy-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logo.png"
            alt="Newcomer Jobline"
            className="h-10 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-0">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-navy-900"
                    : "text-navy-500 hover:text-navy-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-4 right-4 -bottom-[1px] h-[3px] rounded-full bg-gold-500"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Post a Job — active-state driven by useLocation, same underline pattern as NavLinks */}
          <div className="relative">
            <Link
              to="/post-job"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-full text-sm transition-all duration-200 shadow-soft"
            >
              <HiBriefcase className="text-base" />
              Post a Job
            </Link>
            {isPostJobActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-[1px] h-[3px] rounded-full bg-gold-500"
              />
            )}
          </div>

          {/* Sign In / Sign Out */}
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-full text-sm border-2 border-navy-900 transition-all duration-200"
            >
              <HiUser className="text-base" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-navy-50 text-navy-900 font-bold rounded-full text-sm border-2 border-navy-900 transition-all duration-200"
            >
              <HiUser className="text-base" />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-full bg-navy-50 text-navy-700"
        >
          <HiBars3 className="text-2xl" />
        </button>
      </div>

      {/* Mobile drawer */}
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
                <img src="/logo.png" alt="Newcomer Jobline" className="h-9 w-auto" />
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
                          isActive
                            ? "bg-navy-900 text-white"
                            : "text-navy-700 hover:bg-navy-50"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-5 border-t border-navy-100 flex flex-col gap-3">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-white text-navy-900 font-bold rounded-xl border-2 border-navy-900 text-sm"
                  >
                    <HiUser className="text-base" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-navy-900 font-bold rounded-xl border-2 border-navy-900 text-sm"
                  >
                    <HiUser className="text-base" />
                    Sign In
                  </Link>
                )}
                <Link
                  to="/post-job"
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-xl text-sm transition-colors ${
                    isPostJobActive
                      ? "bg-navy-900 text-white"
                      : "bg-gold-500 hover:bg-gold-400 text-navy-900"
                  }`}
                >
                  <HiBriefcase className="text-base" />
                  Post a Job
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;