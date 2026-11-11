import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { SparkIcon } from '@/components/shared/logo'
import { GlobalReach } from '@/components/sections/global-reach'

const STATEMENT_WORDS = [
  'In', 'a', 'world', 'shaped', 'by', 'constant', 'noise,', '{icon}', 'we', 'choose', 'clarity.',
  'We', 'focus', 'on', 'long-term', 'intelligence', 'not', 'short-term', 'decisions.',
] as const

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'end 0.5'],
  })

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto">
      <p
        ref={textRef}
        className="heading-section max-w-3xl"
      >
        {STATEMENT_WORDS.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            range={[index / STATEMENT_WORDS.length, (index + 1) / STATEMENT_WORDS.length]}
          />
        ))}
      </p>

      <GlobalReach />
      </div>
    </section>
  )
}

interface WordProps {
  word: string
  progress: MotionValue<number>
  range: [number, number]
}

function Word({ word, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.25, 1])

  if (word === '{icon}') {
    return (
      <motion.span
        style={{ opacity }}
        className="mr-2 inline-flex size-[0.9em] translate-y-[0.1em] items-center justify-center rounded-[0.28em] bg-primary text-primary-foreground"
      >
        <SparkIcon className="size-[0.55em]" />
      </motion.span>
    )
  }

  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}
