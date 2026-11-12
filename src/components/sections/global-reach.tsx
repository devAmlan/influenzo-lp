import { motion } from 'motion/react'
import { UserRound } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'
import { WORLD_ROWS } from '@/lib/world-dots'

const GRID_STEP = 2.6
const LAT_MAX = 80
const MAP_WIDTH = WORLD_ROWS[0].length
const MAP_HEIGHT = WORLD_ROWS.length

interface ClientPin {
  name: string
  lng: number
  lat: number
}

// TODO: replace the placeholder avatars with real client photos
const CLIENT_PINS: ClientPin[] = [
  { name: 'North America client', lng: -105, lat: 48 },
  { name: 'South America client', lng: -62, lat: -8 },
  { name: 'Europe client', lng: 14, lat: 52 },
  { name: 'Oceania client', lng: 140, lat: -26 },
]

const STATS = [
  { value: '600', label: 'International clients' },
  { value: '40', label: 'Countries served' },
  { value: '50+', label: 'Projects delivered' },
  { value: '10+', label: 'AI systems built' },
] as const

function toPercent(pin: ClientPin): { left: string; top: string } {
  const col = (pin.lng + 180) / GRID_STEP
  const row = (LAT_MAX - pin.lat) / GRID_STEP
  return {
    left: `${(col / MAP_WIDTH) * 100}%`,
    top: `${(row / MAP_HEIGHT) * 100}%`,
  }
}

export function GlobalReach() {
  return (
    <div id="case-studies" className="mt-12 md:mt-16">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-linear-to-br from-lavender-300 via-lavender-400 to-lavender-600 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-6 lg:p-14 text-ink [--foreground:var(--ink)]">
          <WorldMap />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeading
              variant="stacked"
              title="We Work For Clients Around The World"
              description="Our global footprint is a testament to our unwavering dedication to providing exceptional services and innovative solutions to businesses, irrespective of geographical boundaries."
            />

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-foreground/70">{stat.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight md:text-5xl">{stat.value}</dd>
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

function WorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full"
    >
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        role="img"
        aria-label="World map showing where our clients are"
        className="w-full fill-white/55"
      >
        {WORLD_ROWS.flatMap((row, y) =>
          Array.from(row).map((cell, x) =>
            cell === '#' ? <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.36} /> : null,
          ),
        )}
      </svg>

      {CLIENT_PINS.map((pin, index) => (
        <motion.span
          key={pin.name}
          role="img"
          aria-label={pin.name}
          style={toPercent(pin)}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-lavender-100 text-lavender-700 shadow-md sm:size-11 lg:size-12"
        >
          <UserRound className="size-1/2" aria-hidden="true" />
        </motion.span>
      ))}
    </motion.div>
  )
}
