import { useEffect, useState } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

interface ProcessStep {
  id: string
  number: string
  title: string
  headline: string
  description: string
}

/** Keep in sync with the `step-progress` duration in index.css. */
const AUTO_ADVANCE_MS = 5000

const STEPS: ProcessStep[] = [
  {
    id: 'understand',
    number: '01',
    title: 'Understand',
    headline: 'Every campaign starts with listening.',
    description: 'We understand your goals, audience, expectations and requirements.',
  },
  {
    id: 'strategise',
    number: '02',
    title: 'Strategise',
    headline: 'A plan built around your goals.',
    description: 'We build the campaign or creator growth strategy around those objectives.',
  },
  {
    id: 'match',
    number: '03',
    title: 'Match',
    headline: 'The right people, the right fit.',
    description: 'We identify the right creators, brands, formats and opportunities.',
  },
  {
    id: 'execute',
    number: '04',
    title: 'Execute',
    headline: 'From first shoot to final delivery.',
    description: 'We coordinate collaborations, content creation, shoots and campaign delivery.',
  },
]

export function Process() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = STEPS[activeIndex]

  // Auto-advance; selecting a step changes activeIndex, which restarts this timer.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % STEPS.length)
    }, AUTO_ADVANCE_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex])

  return (
    <section id="process" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="How We Make It Happen"
          description="From the first conversation to the final deliverable."
        />

        <div role="tablist" aria-label="Our process" className="mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <StepTab
              key={step.id}
              step={step}
              active={index === activeIndex}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>

        <div
          id={`panel-${activeStep.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeStep.id}`}
          aria-live="polite"
          className="mt-3 flex min-h-48 flex-col justify-between gap-8 rounded-3xl border border-border bg-card p-6 sm:p-8 md:mt-4 lg:flex-row lg:items-end lg:p-10"
        >
          <div key={activeStep.id} className="fade-swap max-w-2xl">
            <h3 className="text-3xl leading-tight font-medium tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {activeStep.headline}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg lg:text-xl">
              {activeStep.description}
            </p>
          </div>
          <span
            key={`${activeStep.id}-number`}
            aria-hidden="true"
            className="fade-swap text-7xl leading-none font-medium tracking-[-0.06em] text-lavender-400 sm:text-8xl"
          >
            {activeStep.number}
          </span>
        </div>
      </div>
    </section>
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
        'relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors duration-500 sm:px-6 sm:py-5',
        active ? 'border-transparent text-ink' : 'border-border bg-card hover:bg-muted',
      )}
    >
      {/* gradient lives on its own layer so it can fade (gradients can't be transitioned) */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-linear-to-br from-lavender-200 via-lavender-400 to-lavender-600 transition-opacity duration-500',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
      <span className="relative text-lg font-medium tracking-tight sm:text-xl">{step.title}</span>
      <span
        className={cn(
          'relative text-sm transition-colors duration-500',
          active ? 'text-ink/70' : 'text-muted-foreground',
        )}
      >
        ({step.number})
      </span>
      {active && (
        // key restarts the progress animation whenever a different step becomes active
        <span key={step.id} aria-hidden="true" className="step-progress absolute inset-x-0 bottom-0 h-1 bg-ink/80" />
      )}
    </button>
  )
}
