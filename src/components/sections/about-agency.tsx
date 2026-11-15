import { motion } from 'motion/react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'

const PRINCIPLES = [
  { title: 'Creator-first', description: 'Every decision starts with the creator' },
  { title: 'Transparent', description: 'Clear briefs, clear terms, no surprises' },
  { title: 'End-to-end', description: 'From strategy to final deliverables' },
  { title: 'Long-term', description: 'Partnerships built to last, not one-off posts' },
] as const

export function AboutAgency() {
  return (
    <div id="case-studies" className="mt-12 md:mt-16">
      <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-linear-to-br from-lavender-300 via-lavender-400 to-lavender-600 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-6 lg:p-14 text-ink [--foreground:var(--ink)]">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          src="/about-agency.svg"
          alt="Influenzo at the centre, connecting brands, creators, content and audience"
          className="w-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeading
            variant="stacked"
            title="A New Agency Built Around Creators"
            description="Influenzo is a creator-first agency that connects brands with the right creators. We keep the process simple and transparent, so everyone knows what is happening and why."
          />

          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-foreground/70">{item.description}</dt>
                <dd className="text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</dd>
              </div>
            ))}
          </dl>

          <Button
            variant="ghost"
            className="mt-8 h-12 rounded-xl bg-ink px-6 text-sm text-white shadow-lg shadow-ink/30 hover:bg-ink/85 hover:text-white"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
