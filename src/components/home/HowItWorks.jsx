// src/components/home/HowItWorks.jsx
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { howItWorks } from "../../data/content";

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Simple Process"
          title="How Newcomer Jobline Works"
          highlight="Works"
          subtitle="From your first login to your first day of work, we're with you every step of the way."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center text-center gap-3"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <step.icon className="w-8 h-8" />
              </div>

              {/* Step Number */}
              <span className="text-sm font-bold text-amber-500">
                Step {i + 1}
              </span>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-lg">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-4">
          <a
            href="/browse-jobs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Get Started Today →
          </a>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;