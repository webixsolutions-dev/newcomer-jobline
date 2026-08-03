import Container from "./Container"
import SectionHeading from "./SectionHeading"
import Accordion from "./Accordion"

const FAQSection = ({ items, eyebrow = "FAQ", title = "Frequently Asked Questions", highlight = "Asked" }) => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container className="flex flex-col gap-12 max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} />
        <Accordion items={items} />
      </Container>
    </section>
  )
}

export default FAQSection
