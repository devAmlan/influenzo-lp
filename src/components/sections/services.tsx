import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import {
  IntegrationMockup,
  ProductMockup,
  StrategyMockup,
} from '@/components/sections/service-mockups'

interface Service {
  title: string
  description: string
  mockup: ReactNode
}

const SERVICES: Service[] = [
  {
    title: 'Campaign Management',
    description:
      'From the first brief to the publish date, we handle outreach, contracts and content review so your team can stay on your product.',
    mockup: <StrategyMockup />,
  },
  {
    title: 'Creator Management',
    description:
      'We pitch creators to the right brands, negotiate fair rates and chase payments, so they can spend their time creating.',
    mockup: <ProductMockup />,
  },
  {
    title: 'Performance Reporting',
    description:
      'See reach, engagement and sales for every post in one report, with a clear recommendation for what to run next.',
    mockup: <IntegrationMockup />,
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="Campaigns for Brands, Careers for Creators"
          description="We run influencer campaigns for brands and handle the business side for creators, so both get better partnerships with less admin."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
            >
              {service.mockup}
              <h3 className="mt-6 text-2xl font-medium tracking-tight">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
