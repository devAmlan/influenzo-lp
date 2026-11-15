import { Hand, Heart, Sparkles, Star, Zap } from 'lucide-react'
import { useRef, useState } from 'react'
import { DraggableCapsule } from '@/components/shared/draggable-capsule'
import type { CapsulePosition } from '@/components/shared/draggable-capsule'

interface SpringControl {
  key: 'stiffness' | 'damping' | 'elastic'
  label: string
  hint: string
  min: number
  max: number
  step: number
}

const CONTROLS: readonly SpringControl[] = [
  { key: 'stiffness', label: 'Stiffness', hint: 'Higher = snappier bounce back from walls', min: 100, max: 800, step: 10 },
  { key: 'damping', label: 'Damping', hint: 'Lower = more wobble, higher = settles quietly', min: 5, max: 50, step: 1 },
  { key: 'elastic', label: 'Elastic', hint: 'How far it can be pulled past a wall (0 to 1)', min: 0, max: 1, step: 0.05 },
]

interface MultiCapsule {
  text: string
  position: CapsulePosition
  tilt: number
  className: string
  icon: React.ReactNode
}

const MULTI_CAPSULES: readonly MultiCapsule[] = [
  { text: 'Throw me', position: { x: 24, y: 28 }, tilt: -4, className: '', icon: <Hand className="size-4" /> },
  { text: 'Catch me', position: { x: 150, y: 120 }, tilt: 3, className: 'border-transparent bg-lavender-700 text-white', icon: <Zap className="size-4" /> },
  { text: 'Squish me', position: { x: 40, y: 220 }, tilt: 5, className: 'border-transparent bg-lavender-300 text-ink', icon: <Heart className="size-4" /> },
  { text: 'Bounce me', position: { x: 180, y: 270 }, tilt: -3, className: 'border-transparent bg-ink text-white', icon: <Sparkles className="size-4" /> },
  { text: 'Stack me', position: { x: 90, y: 150 }, tilt: 2, className: '', icon: <Star className="size-4" /> },
]

/** Demo page for DraggableCapsule: open the site with `?demo=capsule`. */
export function CapsuleDemo() {
  const [spring, setSpring] = useState({ stiffness: 320, damping: 22, elastic: 0.3 })
  const [lastDrop, setLastDrop] = useState<CapsulePosition | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto flex flex-col gap-16">
        <section aria-labelledby="demo-single">
          <h1 id="demo-single" className="heading-section">Draggable capsule</h1>
          <p className="mt-3 max-w-xl text-foreground/75">
            Grab it, drag it, throw it at a wall. Tune the spring with the sliders below.
          </p>

          <DraggableCapsule
            text="Drag me around"
            icon={<Hand className="size-4" />}
            containerClassName="mt-8 min-h-80"
            stiffness={spring.stiffness}
            damping={spring.damping}
            elastic={spring.elastic}
            onDragEnd={setLastDrop}
          />

          <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
            {lastDrop ? `Released at x ${Math.round(lastDrop.x)}, y ${Math.round(lastDrop.y)}` : 'Not moved yet'}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {CONTROLS.map((control) => (
              <label key={control.key} className="flex flex-col gap-2 text-sm">
                <span className="flex justify-between font-medium">
                  {control.label}
                  <span className="text-muted-foreground">{spring[control.key]}</span>
                </span>
                <input
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={spring[control.key]}
                  onChange={(event) =>
                    setSpring((current) => ({ ...current, [control.key]: Number(event.target.value) }))
                  }
                  className="accent-primary"
                />
                <span className="text-muted-foreground">{control.hint}</span>
              </label>
            ))}
          </div>
        </section>

        <section aria-labelledby="demo-multi">
          <h2 id="demo-multi" className="heading-section">Many capsules, one box</h2>
          <p className="mt-3 max-w-xl text-foreground/75">
            Capsules share one container. Each keeps inside the walls, and you can use the arrow keys after focusing one.
          </p>

          <div
            ref={boardRef}
            className="relative mt-8 h-[28rem] rounded-3xl border border-dashed border-foreground/15 bg-card/40"
          >
            {MULTI_CAPSULES.map((capsule) => (
              <DraggableCapsule
                key={capsule.text}
                text={capsule.text}
                icon={capsule.icon}
                constraintsRef={boardRef}
                initialPosition={capsule.position}
                tilt={capsule.tilt}
                className={capsule.className}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
