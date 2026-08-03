import { useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiOutlineFaceFrown } from "react-icons/hi2"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import SearchBar from "../components/jobs/SearchBar"
import FilterSidebar from "../components/jobs/FilterSidebar"
import JobCard from "../components/jobs/JobCard"
import Pagination from "../components/jobs/Pagination"
import { jobs, categories, jobTypes, experienceLevels } from "../data/jobs"

const PAGE_SIZE = 6

const BrowseJobs = () => {
  const routerLocation = useLocation()
  const [keyword, setKeyword] = useState(routerLocation.state?.keyword || "")
  const [location, setLocation] = useState(routerLocation.state?.location || "")
  const [filters, setFilters] = useState({
    category: categories[0],
    type: jobTypes[0],
    experience: experienceLevels[0],
  })
  const [page, setPage] = useState(1)

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesKeyword =
        !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase())
      const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())
      const matchesCategory = filters.category === categories[0] || job.category === filters.category
      const matchesType = filters.type === jobTypes[0] || job.type === filters.type
      return matchesKeyword && matchesLocation && matchesCategory && matchesType
    })
  }, [keyword, location, filters])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE))
  const paginated = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      <PageHero
        eyebrow="Job Board"
        title="Browse Newcomer-Friendly Jobs"
        highlight="Jobs"
        subtitle="Search hundreds of opportunities from employers who are ready to welcome newcomers like you."
        crumb="Browse Jobs"
      >
        <div className="max-w-3xl mx-auto">
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            location={location}
            setLocation={setLocation}
            onSearch={() => setPage(1)}
            light
          />
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 bg-navy-50/30">
        <Container className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-navy-500">
                Showing <span className="font-bold text-navy-900">{filteredJobs.length}</span> job
                {filteredJobs.length !== 1 ? "s" : ""}
              </p>
            </div>

            {paginated.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={page + keyword + location + JSON.stringify(filters)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {paginated.map((job, i) => (
                    <JobCard key={job.id} job={job} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-navy-100 bg-white py-20 text-center"
              >
                <HiOutlineFaceFrown className="text-4xl text-navy-300" />
                <p className="font-semibold text-navy-700">No jobs match your search</p>
                <p className="text-sm text-navy-400">Try adjusting your filters or keywords.</p>
              </motion.div>
            )}

            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </Container>
      </section>
    </>
  )
}

export default BrowseJobs
