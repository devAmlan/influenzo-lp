import { motion } from 'motion/react'
import { SplitText } from '@/components/shared/split-text'
import { SparkIcon } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const HEADING_LINES = ['Influencer Management', 'Without the Back-and-Forth'] as const

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export function Hero() {
  return (
    <section className="flex flex-col items-center pt-6 text-center md:pt-10">
      <motion.p {...fadeUp(0.05)} className="flex items-center gap-2 text-xs">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-coral-500" />
        Influencer management for brands and creators
      </motion.p>

      <h1 className="mt-5 max-w-5xl text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
        <SplitText lines={HEADING_LINES} delay={0.25} />
      </h1>

      <motion.p {...fadeUp(1.0)} className="mt-6 max-w-xl text-base text-foreground/80 md:text-lg lg:text-xl">
        We match brands with the right creators, run the campaign, and report the results. Creators get fair deals and a team that handles the rest.
      </motion.p>

      <motion.form
        {...fadeUp(1.15)}
        onSubmit={(event) => event.preventDefault()}
        className="mt-8 flex w-full max-w-md items-center gap-2 rounded-2xl border border-border bg-muted/60 p-1 shadow-sm"
      >
        <Input
          type="email"
          required
          aria-label="Email address"
          placeholder="Your email address"
          className="h-11 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0"
        />
        <Button type="submit" className="h-11 rounded-xl px-5 shadow-md">
          Start a Campaign
        </Button>
      </motion.form>

      <HeroPreview />
    </section>
  )
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
      className="relative mt-12 flex h-72 w-full items-center justify-center overflow-hidden rounded-3xl bg-linear-to-br from-lavender-300 via-lavender-400 to-lavender-600 sm:h-96 md:h-[28rem]"
    >
      {/* soft glow blobs */}
      <div aria-hidden="true" className="absolute -top-16 -left-10 size-72 rounded-full bg-lavender-200/60 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-10 -bottom-20 size-80 rounded-full bg-lavender-600/60 blur-3xl" />
      <div aria-hidden="true" className="absolute bottom-0 left-1/3 size-56 rounded-full bg-coral-300/50 blur-3xl" />

      {/* TODO: replace with real images (flower illustrations) */}
      <ImagePlaceholder className="bottom-4 left-4 size-24 sm:size-36 md:size-44" />
      <ImagePlaceholder className="top-4 right-4 size-20 sm:size-32 md:size-40" />

      <div className="relative flex items-center gap-2">
        <span className="flex size-12 items-center justify-center rounded-full border border-white/70 bg-white/20 text-white backdrop-blur-md md:size-14">
          <SparkIcon className="size-5" />
        </span>
        <motion.span
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-12 w-52 items-center rounded-full border border-white/70 bg-white/20 px-5 text-left text-sm text-white backdrop-blur-md sm:w-72 md:h-14"
        >
          Generating....
        </motion.span>
      </div>
    </motion.div>
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
        'absolute flex items-center justify-center rounded-2xl border border-dashed border-white/60 bg-white/10 text-xs text-white/80',
        className,
      )}
    >
      Image
    </div>
  )
}
