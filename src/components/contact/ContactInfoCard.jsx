import { motion } from "framer-motion"

const ContactInfoCard = ({ icon: Icon, title, lines = [], tone = "navy", index = 0 }) => {
  const tones = {
    navy: "bg-navy-900 text-white",
    gold: "bg-gold-500 text-navy-900",
    teal: "bg-teal-700 text-white",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${tones[tone]}`}>
        <Icon />
      </div>
      <h3 className="font-bold text-navy-900">{title}</h3>
      <div className="flex flex-col gap-1">
        {lines.map((line) => (
          <p key={line} className="text-sm text-navy-500">
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default ContactInfoCard
