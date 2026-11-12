import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AudienceBenefit {
  title: string
  description: string
}

interface AudienceSectionProps {
  id: string
  title: string
  description: string
  panelLabel: string
  panelText: string
  ctaLabel: string
  benefits: readonly AudienceBenefit[]
  variant: 'dark' | 'violet'
  /** Puts the panel on the right on desktop. */
  reverse?: boolean
}

export function AudienceSection({
  id,
  title,
  description,
  panelLabel,
  panelText,
  ctaLabel,
  benefits,
  variant,
  reverse = false,
}: AudienceSectionProps) {
  const isViolet = variant === 'violet'

  return (
    <section id={id} className="scroll-mt-4 py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading title={title} description={description} />

        <div className="mt-12 grid gap-4 md:mt-16 md:gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={cn(
              'relative flex flex-col justify-between gap-10 overflow-hidden rounded-3xl p-6 sm:p-8 lg:col-span-2 lg:p-10',
              reverse && 'lg:order-2',
              isViolet
                ? 'bg-linear-to-br from-lavender-200 via-lavender-400 to-lavender-600 text-ink'
                : 'bg-ink text-white',
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                'absolute -top-16 -right-10 size-64 rounded-full blur-3xl',
                isViolet ? 'bg-white/40' : 'bg-lavender-700/50',
              )}
            />
            <div className="relative">
              <span
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase',
                  isViolet ? 'bg-ink text-white' : 'bg-white/15 text-white',
                )}
              >
                {panelLabel}
              </span>
              <p className="mt-6 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{panelText}</p>
            </div>
            <Button
              variant={isViolet ? 'ghost' : 'default'}
              className={cn(
                'relative h-12 w-fit rounded-xl px-6 text-sm',
                isViolet && 'bg-ink text-white shadow-lg shadow-ink/30 hover:bg-ink/85 hover:text-white',
              )}
            >
              {ctaLabel}
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </motion.div>

          <ul className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:col-span-3">
            {benefits.map((benefit, index) => (
              <motion.li
                key={benefit.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: 'easeOut' }}
                className="rounded-3xl border border-border bg-card p-6 sm:p-8"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-lavender-700 text-sm font-medium text-white">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
                  {benefit.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
