import { motion } from 'motion/react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

const OTHER_POINTS = [
  'Fake followers',
  'Vague contracts',
  'Hidden fees',
  'Slow replies',
  'Reach without results',
  'Late creator payments',
  'One-size briefs',
  'Guesswork reporting',
] as const

const ROTATIONS = [-5, 4, -3, 6, -6, 3, -4, 5] as const
const OUR_TONES = ['violet', 'ink', 'light', 'ink', 'violet', 'light', 'ink', 'light'] as const

const OUR_CLASSES = {
  ink: 'bg-ink text-white',
  violet: 'bg-lavender-700 text-white',
  light: 'bg-white/80 text-foreground',
} as const

const OUR_POINTS = [
  'Vetted creators',
  'Written agreements',
  'Clear pricing',
  'Fast replies',
  'Results you can see',
  'On-time payments',
  'Tailored briefs',
  'Clear reporting',
] as const

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="Built Different from Typical Influencer Agencies"
          description="Every creator is vetted, every deal is in writing, and every result is reported."
        />

        <div className="relative mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          <ComparisonCard title="Other Agencies" points={OTHER_POINTS} variant="other" />
          <ComparisonCard title="Influenzo" points={OUR_POINTS} variant="ours" />

          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background text-sm font-semibold shadow-lg md:flex"
          >
            VS
          </span>
        </div>
      </div>
    </section>
  )
}

interface ComparisonCardProps {
  title: string
  points: readonly string[]
  variant: 'other' | 'ours'
}

function ComparisonCard({ title, points, variant }: ComparisonCardProps) {
  const isOurs = variant === 'ours'

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10',
        isOurs
          ? 'bg-linear-to-br from-lavender-200 via-lavender-400 to-lavender-600'
          : 'border border-border bg-card',
      )}
    >
      {isOurs && (
        <>
          <div aria-hidden="true" className="absolute -top-16 -right-10 size-64 rounded-full bg-white/50 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-20 -left-10 size-64 rounded-full bg-lavender-700/50 blur-3xl" />
        </>
      )}

      <h3 className="relative text-2xl font-medium tracking-tight sm:text-3xl">{title}</h3>

      <ul className="relative mt-8 flex flex-wrap justify-center gap-x-3 gap-y-4 py-4">
        {points.map((point, index) => (
          <motion.li
            key={point}
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[index % ROTATIONS.length] }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 + index * 0.06, ease: 'easeOut' }}
            className={cn(
              'rounded-full px-5 py-3 text-base leading-none font-medium whitespace-nowrap sm:px-6 sm:py-3.5 sm:text-lg',
              isOurs ? OUR_CLASSES[OUR_TONES[index % OUR_TONES.length]] : 'bg-muted text-muted-foreground',
            )}
          >
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
