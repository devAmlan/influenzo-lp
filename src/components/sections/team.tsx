import { motion } from 'motion/react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

const TEAM_POINTS = [
  {
    title: 'Where we started',
    text: 'Our journey in digital marketing dates back to 2020, across meme marketing, influencer marketing, content strategy and brand collaborations.',
  },
  {
    title: 'How we have worked',
    text: 'We have worked with established agencies and on independent freelance projects, with hands-on exposure to campaign planning, creator management, content development and brand partnerships.',
  },
  {
    title: 'What that gives you',
    text: 'An understanding of both the operational and creative sides of influencer marketing, from finding the right creators to running campaigns that match brand objectives.',
  },
] as const

const TEAM_STAT_LABEL = 'Hands-on in digital marketing since'
const TEAM_STAT_VALUE = '2020'
const TEAM_HEADLINE = 'Meaningful partnerships between brands and creators.'
const TEAM_SUPPORT =
  'INFLUENZO brings together that industry experience and a focused approach to building them.'

const TEAM_FOCUS = [
  { label: 'MemeMarketing', className: 'bg-tag-pink' },
  { label: 'InfluencerMarketing', className: 'bg-tag-sky' },
  { label: 'ContentStrategy', className: 'bg-tag-mint' },
  { label: 'BrandCollaborations', className: 'bg-tag-amber' },
] as const

export function Team() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="The People Behind Influenzo"
          description="Built on experience. Driven by a deeper understanding of the creator economy."
        />

        <div className="mt-12 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex flex-col justify-between gap-12 overflow-hidden rounded-3xl bg-linear-to-br from-lavender-200 via-lavender-400 to-lavender-600 p-6 text-ink sm:p-8 lg:col-span-2 lg:p-10"
          >
            <div aria-hidden="true" className="absolute -top-16 -right-10 size-64 rounded-full bg-white/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-10 size-64 rounded-full bg-lavender-700/50 blur-3xl" />

            <div className="relative">
              <p className="text-sm font-medium">{TEAM_STAT_LABEL}</p>
              <p className="mt-2 text-7xl leading-none font-medium tracking-[-0.06em] sm:text-8xl">
                {TEAM_STAT_VALUE}
              </p>
            </div>

            <div className="relative">
              <p className="text-2xl leading-tight font-medium tracking-[-0.03em] sm:text-3xl">{TEAM_HEADLINE}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/75 md:text-base">{TEAM_SUPPORT}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            className="flex flex-col rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-3 lg:p-10"
          >
            <ol className="divide-y divide-border">
              {TEAM_POINTS.map((point, index) => (
                <li key={point.title} className="flex gap-5 py-6 first:pt-0 last:pb-6">
                  <span className="mt-1 text-sm font-medium text-lavender-400">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight">{point.title}</h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-foreground/75">{point.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul aria-label="Areas of experience" className="mt-auto flex flex-wrap gap-2 border-t border-border pt-6">
              {TEAM_FOCUS.map((focus) => (
                <li
                  key={focus.label}
                  className={cn('rounded-full px-4 py-2 text-sm font-medium text-ink', focus.className)}
                >
                  #{focus.label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
