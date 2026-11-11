import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  description?: string
  /**
   * `split` (default): title left, description right, gradient divider underneath.
   * `stacked`: title above description, for use inside panels/columns.
   */
  variant?: 'split' | 'stacked'
  /** Optional action (e.g. a button) rendered under the description. */
  children?: ReactNode
  className?: string
}

/**
 * The one heading block used by every section, so all headings share the same size
 * (`heading-section`), spacing, colors and animation.
 */
export function SectionHeading({
  title,
  description,
  variant = 'split',
  children,
  className,
}: SectionHeadingProps) {
  const isSplit = variant === 'split'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      <div
        className={cn(
          'flex flex-col gap-6',
          isSplit && 'md:flex-row md:items-end md:justify-between md:gap-12',
        )}
      >
        <h2 className={cn('heading-section', isSplit ? 'max-w-xl' : 'max-w-3xl')}>{title}</h2>
        {(description || children) && (
          <div className={cn(isSplit && 'md:max-w-sm')}>
            {description && (
              <p className="max-w-md text-sm text-foreground/75 md:text-base">{description}</p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
        )}
      </div>

      {isSplit && (
        <div className="relative mt-8 border-b border-border md:mt-10">
          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 h-1 w-1/3 max-w-xs bg-linear-to-r from-lavender-200 via-lavender-400 to-coral-300"
          />
        </div>
      )}
    </motion.div>
  )
}
