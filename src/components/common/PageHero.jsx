// src/components/common/PageHero.jsx
import { motion } from "framer-motion"
import { HiChevronRight, HiHome } from "react-icons/hi2"
import { Link } from "react-router-dom"
import Container from "./Container"

/**
 * Reusable inner-page hero banner with breadcrumb, used on About, Contact, Post a Job, Browse Jobs, Employers.
 */
const PageHero = ({ eyebrow, title, highlight, subtitle, crumb, children }) => {
  const renderTitle = () => {
    if (!highlight) return title
    const parts = title.split(highlight)
    return (
      <>
        {parts[0]}
        <span className="text-amber-400">{highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 sm:pb-24 min-h-[400px] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      {/* Animated Orbs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"
        animate={{ 
          y: [0, 20, 0],
          x: [0, -10, 0]
        }}
        transition={{ 
          duration: 9, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        aria-hidden
      />

      <Container className="relative flex flex-col items-start text-left gap-5">
        {/* Breadcrumb - Left Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-300"
        >
          <Link to="/" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
            <HiHome /> Home
          </Link>
          <HiChevronRight className="text-gray-500" />
          <span className="text-amber-400">{crumb}</span>
        </motion.div>

        {/* Eyebrow - Left Aligned */}
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-300 backdrop-blur-sm border border-white/10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {eyebrow}
          </motion.span>
        )}

        {/* Title - Left Aligned */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white text-left"
        >
          {renderTitle()}
        </motion.h1>

        {/* Subtitle - Left Aligned */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed text-left"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Children - Left Aligned */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  )
}

export default PageHero