import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import {
  IntegrationMockup,
  ProductMockup,
  StrategyMockup,
} from '@/components/sections/service-mockups'

interface Service {
  number: string
  title: string
  description: string
}

const MOCKUPS: readonly ReactNode[] = [<StrategyMockup />, <ProductMockup />, <IntegrationMockup />]

const SERVICES: readonly Service[] = [
  {
    number: '01',
    title: 'Influencer Marketing',
    description:
      'We plan and execute influencer campaigns that connect brands with relevant creators across Instagram, YouTube and other digital platforms.',
  },
  {
    number: '02',
    title: 'Talent Management',
    description:
      'We help creators build their personal brands, manage collaborations, negotiate deals and develop long-term opportunities.',
  },
  {
    number: '03',
    title: 'UGC Content Creation',
    description:
      'We connect brands with UGC creators to produce relatable, platform-native videos, product demonstrations, testimonials and creative ad assets.',
  },
  {
    number: '04',
    title: 'Content Strategy & Personal Branding',
    description:
      'We help creators identify their niche, develop content pillars, build a consistent voice and create a sustainable content roadmap.',
  },
  {
    number: '05',
    title: 'Influencer Advertising Shoots',
    description:
      'From concept development and creator selection to shoots and final deliverables, we handle the creative process.',
  },
  {
    number: '06',
    title: 'Brand IPs & Long-term Partnerships',
    description:
      'We conceptualise creator-led shows, branded content series, recurring collaborations and digital properties that build long-term audience connections.',
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="What We Do"
          description="We help creators grow and brands reach the right audience."
        />

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-x-6 md:gap-y-16">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: 'easeOut' }}
            >
              {MOCKUPS[index % MOCKUPS.length]}
              <h3 className="mt-6 text-2xl font-medium tracking-tight">
                <span className="mr-2 text-base text-lavender-300">{service.number}.</span>
                {service.title}
              </h3>
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
