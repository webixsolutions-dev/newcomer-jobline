import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  Archive,
  UtensilsCrossed,
  MessageCircle,
  Wrench,
  Heart,
  Briefcase,
  Settings,
  ShoppingBag,
  ArrowRight,
} from "lucide-react"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"

const categories = [
  { icon: Archive, label: "Warehouse & Logistics", count: "210+ jobs" },
  { icon: UtensilsCrossed, label: "Hospitality & Food Service", count: "180+ jobs" },
  { icon: MessageCircle, label: "Customer Service", count: "150+ jobs" },
  { icon: Wrench, label: "Skilled Trades", count: "130+ jobs" },
  { icon: Heart, label: "Healthcare Support", count: "95+ jobs" },
  { icon: Briefcase, label: "Administration", count: "120+ jobs" },
  { icon: Settings, label: "Manufacturing", count: "160+ jobs" },
  { icon: ShoppingBag, label: "Retail", count: "90+ jobs" },
]

const CategoryGrid = () => {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/50">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading
            eyebrow="Explore Opportunities"
            title="Popular Job Categories"
            highlight="Categories"
            align="left"
            className="mx-0"
          />
          <Link
            to="/browse-jobs"
            className="flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 shrink-0"
          >
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to="/browse-jobs"
                className="group flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 h-full shadow-card hover:border-gold-300 hover:shadow-soft transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                  <cat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm sm:text-base">{cat.label}</h3>
                  <p className="text-xs sm:text-sm text-navy-400 mt-1">{cat.count}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CategoryGrid
