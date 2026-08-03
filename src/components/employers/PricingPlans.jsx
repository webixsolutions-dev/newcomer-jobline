import { motion } from "framer-motion"
import { HiCheck, HiOutlineStar } from "react-icons/hi2"
import Container from "../common/Container"
import SectionHeading from "../common/SectionHeading"
import Button from "../common/Button"
import { pricingPlans } from "../../data/content"

const PricingPlans = () => {
  return (
    <section className="py-20 sm:py-28 bg-navy-50/50">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Simple Pricing"
          title="Plans for Every Hiring Need"
          highlight="Hiring Need"
          subtitle="Whether you're hiring once or building an ongoing pipeline, we have a plan for you."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col gap-6 rounded-3xl p-8 ${
                plan.highlighted
                  ? "bg-navy-900 text-white shadow-soft lg:-translate-y-4"
                  : "bg-white border border-navy-100 shadow-card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-navy-900 shadow-soft">
                  <HiOutlineStar /> Most Popular
                </span>
              )}
              <div>
                <h3 className={`text-lg font-bold ${plan.highlighted ? "text-white" : "text-navy-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlighted ? "text-navy-300" : "text-navy-500"}`}>
                  {plan.description}
                </p>
              </div>
              <div className="flex items-end gap-1">
                <span className={`text-4xl font-extrabold ${plan.highlighted ? "text-gold-400" : "text-navy-900"}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm mb-1 ${plan.highlighted ? "text-navy-300" : "text-navy-400"}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <HiCheck
                      className={`mt-0.5 shrink-0 ${plan.highlighted ? "text-gold-400" : "text-teal-600"}`}
                    />
                    <span className={plan.highlighted ? "text-navy-100" : "text-navy-600"}>{f}</span>
                  </div>
                ))}
              </div>
              <Button variant={plan.highlighted ? "primary" : "outline"} fullWidth>
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default PricingPlans
