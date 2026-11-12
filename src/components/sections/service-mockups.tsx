import { cn } from '@/lib/utils'

interface Hill {
  className: string
}

interface GlassCardProps {
  /** Sharp "scenery" shapes behind the glass; they get blurred where the panel covers them. */
  hills: Hill[]
}

/**
 * Purple scene with a large frosted-glass panel inset in it. Everything behind the
 * panel is blurred, while the parts peeking out around it stay sharp.
 */
function GlassCard({ hills }: GlassCardProps) {
  return (
    <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl bg-linear-to-b from-lavender-100 via-lavender-300 to-lavender-500">
      {/* TODO: optional background image slot (replaces the hills) */}
      <div aria-hidden="true" className="absolute -top-8 left-1/4 size-56 rounded-full bg-white/50 blur-3xl" />

      {hills.map((hill, index) => (
        <div
          key={index}
          aria-hidden="true"
          className={cn('absolute rounded-[100%] bg-linear-to-b', hill.className)}
        />
      ))}

      {/* hairline guides running past the panel edges */}
      <div aria-hidden="true" className="absolute inset-y-0 left-[8%] w-px bg-white/25" />
      <div aria-hidden="true" className="absolute inset-y-0 right-[8%] w-px bg-white/25" />
      <div aria-hidden="true" className="absolute inset-x-0 top-[8%] h-px bg-white/25" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[8%] h-px bg-white/25" />

      {/* the glass */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-3xl border border-white/30 bg-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.4)] backdrop-blur-2xl"
      />
    </div>
  )
}

export function StrategyMockup() {
  return (
    <GlassCard
      hills={[
        { className: '-bottom-[12%] -left-[20%] h-[48%] w-[80%] from-lavender-500 to-lavender-700' },
        { className: '-right-[25%] -bottom-[14%] h-[42%] w-[85%] from-lavender-400 to-lavender-600' },
        { className: 'top-[38%] -left-[12%] h-[22%] w-[34%] from-lavender-600 to-lavender-700' },
        { className: 'top-[44%] -right-[10%] h-[18%] w-[30%] from-lavender-500 to-lavender-700' },
      ]}
    />
  )
}

export function ProductMockup() {
  return (
    <GlassCard
      hills={[
        { className: '-bottom-[10%] left-[10%] h-[44%] w-[90%] from-lavender-400 to-lavender-700' },
        { className: 'top-[30%] -left-[18%] h-[30%] w-[40%] from-lavender-600 to-lavender-700' },
        { className: 'top-[26%] -right-[14%] h-[26%] w-[36%] from-lavender-500 to-lavender-600' },
      ]}
    />
  )
}

export function IntegrationMockup() {
  return (
    <GlassCard
      hills={[
        { className: '-bottom-[16%] -left-[10%] h-[50%] w-[120%] from-lavender-500 to-lavender-700' },
        { className: 'top-[34%] -left-[16%] h-[26%] w-[34%] from-lavender-500 to-lavender-700' },
        { className: 'top-[30%] -right-[16%] h-[30%] w-[36%] from-lavender-600 to-lavender-700' },
      ]}
    />
  )
}
