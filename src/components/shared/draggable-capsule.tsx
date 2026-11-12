import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { KeyboardEvent, ReactNode, RefObject } from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** Keyboard nudge distance in px (arrow keys). */
const KEY_STEP = 32
/** Higher = less squash/stretch per px/s of velocity. */
const STRETCH_DIVISOR = 7000
const MAX_STRETCH = 0.22
const MAX_TILT = 9
/** Springs that smooth the velocity-driven squash, stretch and tilt (independent of the user spring). */
const SQUASH_SPRING = { stiffness: 450, damping: 26 } as const

const VARIANTS = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  lifted: { scale: 1.07 },
} as const

const SHADOW_VARIANTS = {
  rest: { opacity: 0 },
  hover: { opacity: 0.35 },
  lifted: { opacity: 1 },
} as const

/** Shared stacking counter: the capsule touched last always sits above the others in a shared box. */
let topLayer = 1

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

interface Range {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

/** Range the pill's x/y may take so it stays inside the container, whatever its layout position. */
function getRange(
  container: HTMLElement | null,
  capsule: HTMLElement | null,
  x: MotionValue<number>,
  y: MotionValue<number>,
): Range | null {
  if (!container || !capsule) return null
  const box = container.getBoundingClientRect()
  const rect = capsule.getBoundingClientRect()
  return {
    minX: x.get() + (box.left - rect.left),
    maxX: x.get() + (box.right - rect.right),
    minY: y.get() + (box.top - rect.top),
    maxY: y.get() + (box.bottom - rect.bottom),
  }
}

export interface CapsulePosition {
  x: number
  y: number
}

export interface DraggableCapsuleProps {
  text: string
  /** Optional icon shown before the text. */
  icon?: ReactNode
  /** Classes for the capsule itself (merged over the defaults, so colours and sizes can be overridden). */
  className?: string
  /** Classes for the built-in container. Ignored when `constraintsRef` is passed. */
  containerClassName?: string
  /**
   * Share one container between several capsules: pass the container's ref and the capsule
   * renders without its own box. When omitted, the capsule renders inside its own bounded box.
   */
  constraintsRef?: RefObject<HTMLElement | null>
  /**
   * Pixel offset from the container's top-left corner. When set, the capsule is absolutely positioned
   * there. When omitted it sits in normal layout flow (centred inside its own container).
   */
  initialPosition?: CapsulePosition
  /** Resting rotation in degrees, added to the velocity-driven tilt. */
  tilt?: number
  /**
   * Spring stiffness used when the capsule bounces back from a wall.
   * Higher = snappier return. Typical range 150 to 600.
   */
  stiffness?: number
  /**
   * Spring damping used when the capsule bounces back from a wall.
   * Lower = more wobble, higher = settles without overshoot. Typical range 10 to 40.
   */
  damping?: number
  /**
   * How far (0 to 1) the capsule may be pulled past a wall while held, as a fraction of the overshoot.
   * 0 = hard wall, 0.3 = gentle rubber-band, 0.6+ = very stretchy.
   */
  elastic?: number
  onDragStart?: () => void
  onDragEnd?: (position: CapsulePosition) => void
}

/**
 * A pill you can grab, throw and release inside a bounded box.
 *
 * Physics:
 * - Dragging and release momentum come from Motion's `drag`; the pill stays inside the container
 *   (`dragConstraints`) and is pulled past a wall by `elastic` while held.
 * - When thrown into a wall it bounces back using a spring (`stiffness` / `damping`).
 * - Squash & stretch, and a small tilt, are derived from the pill's live velocity and smoothed with springs,
 *   so they work for both dragging and the momentum after release.
 * - With reduced motion enabled there is no momentum, elasticity, squash or lift animation.
 */
export function DraggableCapsule({
  text,
  icon,
  className,
  containerClassName,
  constraintsRef,
  initialPosition,
  tilt = 0,
  stiffness = 320,
  damping = 22,
  elastic = 0.3,
  onDragStart,
  onDragEnd,
}: DraggableCapsuleProps) {
  const reduceMotion = useReducedMotion()
  const ownContainerRef = useRef<HTMLDivElement>(null)
  const capsuleRef = useRef<HTMLDivElement>(null)
  const boundsRef: RefObject<HTMLElement | null> = constraintsRef ?? ownContainerRef

  // Motion values: position and its derived effects never touch React state while dragging.
  const x = useMotionValue(initialPosition?.x ?? 0)
  const y = useMotionValue(initialPosition?.y ?? 0)
  const layer = useMotionValue(0)
  const velocityX = useVelocity(x)
  const velocityY = useVelocity(y)

  const stretchX = useTransform([velocityX, velocityY], ([vx, vy]: number[]) =>
    clamp(1 + (Math.abs(vx) - Math.abs(vy) * 0.6) / STRETCH_DIVISOR, 1 - MAX_STRETCH, 1 + MAX_STRETCH),
  )
  const stretchY = useTransform([velocityX, velocityY], ([vx, vy]: number[]) =>
    clamp(1 + (Math.abs(vy) - Math.abs(vx) * 0.6) / STRETCH_DIVISOR, 1 - MAX_STRETCH, 1 + MAX_STRETCH),
  )
  const scaleX = useSpring(stretchX, SQUASH_SPRING)
  const scaleY = useSpring(stretchY, SQUASH_SPRING)
  const tiltFromVelocity = useTransform(velocityX, [-3000, 3000], [-MAX_TILT, MAX_TILT])
  const smoothTilt = useSpring(tiltFromVelocity, SQUASH_SPRING)
  const rotate = useTransform(smoothTilt, (value) => value + tilt)

  // Keep the pill inside when the container is resized (or the layout reflows).
  useEffect(() => {
    const container = boundsRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      const range = getRange(container, capsuleRef.current, x, y)
      if (!range) return
      const targetX = clamp(x.get(), range.minX, Math.max(range.minX, range.maxX))
      const targetY = clamp(y.get(), range.minY, Math.max(range.minY, range.maxY))
      const spring = { type: 'spring', stiffness, damping } as const
      if (Math.abs(targetX - x.get()) > 0.5) animate(x, targetX, spring)
      if (Math.abs(targetY - y.get()) > 0.5) animate(y, targetY, spring)
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [boundsRef, x, y, stiffness, damping])

  // Stop the page selecting text while a capsule is being dragged.
  const previousUserSelect = useRef('')
  const handleDragStart = (): void => {
    topLayer += 1
    layer.set(topLayer)
    previousUserSelect.current = document.body.style.userSelect
    document.body.style.userSelect = 'none'
    onDragStart?.()
  }
  const handleDragEnd = (): void => {
    document.body.style.userSelect = previousUserSelect.current
    onDragEnd?.({ x: x.get(), y: y.get() })
  }
  useEffect(
    () => () => {
      document.body.style.userSelect = previousUserSelect.current
    },
    [],
  )

  // Keyboard users can nudge the pill with the arrow keys.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const step: Record<string, CapsulePosition> = {
      ArrowLeft: { x: -KEY_STEP, y: 0 },
      ArrowRight: { x: KEY_STEP, y: 0 },
      ArrowUp: { x: 0, y: -KEY_STEP },
      ArrowDown: { x: 0, y: KEY_STEP },
    }
    const delta = step[event.key]
    const range = getRange(boundsRef.current, capsuleRef.current, x, y)
    if (!delta || !range) return
    event.preventDefault()
    const spring = { type: 'spring', stiffness, damping } as const
    animate(x, clamp(x.get() + delta.x, range.minX, Math.max(range.minX, range.maxX)), spring)
    animate(y, clamp(y.get() + delta.y, range.minY, Math.max(range.minY, range.maxY)), spring)
  }

  const capsule = (
    <motion.div
      ref={capsuleRef}
      role="group"
      aria-label={`${text} (draggable, use arrow keys to move)`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      drag
      dragConstraints={boundsRef}
      dragElastic={reduceMotion ? 0 : elastic}
      dragMomentum={!reduceMotion}
      dragTransition={{ bounceStiffness: stiffness, bounceDamping: damping, power: 0.35, timeConstant: 320 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      variants={VARIANTS}
      initial="rest"
      animate="rest"
      whileHover={reduceMotion ? undefined : 'hover'}
      whileTap={reduceMotion ? undefined : 'lifted'}
      whileDrag={reduceMotion ? undefined : 'lifted'}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{
        x,
        y,
        zIndex: layer,
        rotate: reduceMotion ? tilt : rotate,
        scaleX: reduceMotion ? 1 : scaleX,
        scaleY: reduceMotion ? 1 : scaleY,
      }}
      className={cn(
        'relative inline-flex cursor-grab touch-none items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-base font-medium text-foreground shadow-sm select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 active:cursor-grabbing',
        initialPosition && 'absolute top-0 left-0',
        className,
      )}
    >
      {/* lifted shadow: fades in (opacity only) while the pill is held */}
      <motion.span
        aria-hidden="true"
        variants={SHADOW_VARIANTS}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full shadow-2xl shadow-ink/50"
      />
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{text}</span>
    </motion.div>
  )

  if (constraintsRef) return capsule

  return (
    <div
      ref={ownContainerRef}
      className={cn(
        'relative flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-foreground/15 bg-card/40 p-4',
        containerClassName,
      )}
    >
      {capsule}
    </div>
  )
}
