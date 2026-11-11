import { motion } from 'motion/react'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'

interface SplitTextProps {
  lines: readonly string[]
  delay?: number
  stagger?: number
  className?: string
}

// Reveals text word by word, each word sliding up from behind a mask.
export function SplitText({ lines, delay = 0, stagger = 0.07, className }: SplitTextProps) {
  let wordIndex = 0

  return (
    <>
      {lines.map((line) => (
        <span key={line} aria-hidden="true" className={cn('block', className)}>
          {line.split(' ').map((word) => {
            const wordDelay = delay + wordIndex * stagger
            const key = `${line}-${wordIndex++}`
            return (
              <Fragment key={key}>
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: wordDelay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              </span>
              {' '}
              </Fragment>
            )
          })}
        </span>
      ))}
      <span className="sr-only">{lines.join(' ')}</span>
    </>
  )
}
