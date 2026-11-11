import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

const STEPS: ProcessStep[] = [
  {
    id: 'match',
    number: '01',
    title: 'Match',
    description:
      'We learn your brand and audience, then shortlist creators whose followers are real and whose content fits.',
  },
  {
    id: 'plan',
    number: '02',
    title: 'Plan',
    description:
      'We agree on deliverables, dates and fees with every creator, and put it all in writing before work starts.',
  },
  {
    id: 'launch',
    number: '03',
    title: 'Launch',
    description:
      'We brief the creators, review the content before it goes live, and keep every post on schedule.',
  },
  {
    id: 'measure',
    number: '04',
    title: 'Measure',
    description:
      'We track reach, engagement and sales, then send a clear report on what worked and what to repeat.',
  },
]

export function Process() {
  const [activeId, setActiveId] = useState(STEPS[0].id)
  const activeStep = STEPS.find((step) => step.id === activeId) ?? STEPS[0]

  return (
    <section id="process" className="py-8 md:py-16">
      <div className="container mx-auto">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-2">
          <IntroColumn />

          <div className="flex flex-col border-t border-border lg:border-t-0 lg:border-l">
            <div className="flex items-center justify-center gap-4 p-6 sm:gap-6 sm:p-8">
              {/* TODO: replace with real images */}
              <ImagePlaceholder className="h-32 flex-[1.8] rounded-full sm:h-48 lg:h-56" />
              <ImagePlaceholder className="aspect-square flex-1 rounded-full" />
            </div>

            <div className="flex min-h-32 flex-1 items-start justify-end px-6 sm:px-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep.id}
                  id={`panel-${activeStep.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeStep.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-md text-right text-base leading-relaxed md:text-lg"
                >
                  {activeStep.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div role="tablist" aria-label="Our process" className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-4">
              {STEPS.map((step) => (
                <StepTab
                  key={step.id}
                  step={step}
                  active={step.id === activeId}
                  onSelect={() => setActiveId(step.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroColumn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative flex min-h-96 flex-col justify-between overflow-hidden p-6 sm:p-8 lg:min-h-[34rem]"
    >
      {/* decorative shapes */}
      <div aria-hidden="true" className="absolute top-24 left-16 size-56 rotate-45 rounded-3xl bg-lavender-100/40" />
      <div aria-hidden="true" className="absolute top-40 right-0 size-56 rotate-45 rounded-3xl bg-lavender-200/30" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <BrandMark />
          <p className="text-right text-xs tracking-wide uppercase">
            <span className="text-muted-foreground">// </span>How
            <br />
            It Works
          </p>
        </div>
        <div aria-hidden="true" className="mt-8 h-1 w-40 rounded-full bg-linear-to-r from-lavender-200 via-lavender-400 to-coral-300 sm:w-56" />
      </div>

      <div className="relative mt-16">
        <SectionHeading
          variant="stacked"
          title="From First Brief to Final Report"
          description="One team runs every campaign through the same four steps, so you always know what happens next."
        />
      </div>
    </motion.div>
  )
}

function BrandMark() {
  return (
    <span aria-hidden="true" className="grid size-12 grid-cols-2 gap-0.5 text-lavender-700">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="rounded-full bg-current" />
      ))}
    </span>
  )
}

interface StepTabProps {
  step: ProcessStep
  active: boolean
  onSelect: () => void
}

function StepTab({ step, active, onSelect }: StepTabProps) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${step.id}`}
      aria-selected={active}
      aria-controls={`panel-${step.id}`}
      onClick={onSelect}
      className={cn(
        'relative flex items-start justify-center gap-1 px-4 py-6 text-xl font-medium tracking-tight transition-colors sm:text-2xl',
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <sup className="mt-1 text-[0.5em] font-normal">{step.number}</sup>
      {step.title}
      {active && (
        <motion.span
          layoutId="process-tab-indicator"
          className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-lavender-200 via-lavender-400 to-lavender-300"
        />
      )}
    </button>
  )
}

interface ImagePlaceholderProps {
  className?: string
}

function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center border border-dashed border-lavender-500/60 bg-linear-to-br from-lavender-100 to-lavender-300 text-sm text-lavender-700',
        className,
      )}
    >
      Image
    </div>
  )
}
