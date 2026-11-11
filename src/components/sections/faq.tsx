import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { SectionHeading } from '@/components/shared/section-heading'
import { cn } from '@/lib/utils'

interface FaqItem {
  id: string
  question: string
  answer: string
}

// Order alternates brand / creator questions so each column holds both.
const FAQS: FaqItem[] = [
  {
    id: 'choosing-creators',
    question: 'How do you choose creators for my brand?',
    answer:
      'We start with your audience and goals, then check each creator’s followers, engagement and past brand work before we shortlist. You approve every creator before we contact them.',
  },
  {
    id: 'joining',
    question: 'How do I join Influenzo as a creator?',
    answer:
      'Apply with your channel links and a short intro. We review your content and audience, and if there is a fit we set up a call.',
  },
  {
    id: 'brand-cost',
    question: 'How much does a campaign cost?',
    answer:
      'It depends on the number of creators, the content you need and how long the campaign runs. After a short call we send a written quote that lists every fee before you commit.',
  },
  {
    id: 'creator-fees',
    question: 'Do I pay to work with Influenzo?',
    answer:
      'You see our fee in writing before you accept any campaign, so you know exactly what you will earn.',
  },
  {
    id: 'timeline',
    question: 'How long until my campaign goes live?',
    answer:
      'Most campaigns go live within a few weeks of the signed brief. The exact date depends on the creators, the content you need and how fast you approve it.',
  },
  {
    id: 'payments',
    question: 'When do creators get paid?',
    answer:
      'Payment dates are written into every agreement before work starts, so creators know when the money arrives.',
  },
  {
    id: 'results',
    question: 'How will I know the campaign worked?',
    answer:
      'You get a report for every campaign with reach, engagement and sales, plus our recommendation for what to run next.',
  },
  {
    id: 'exclusivity',
    question: 'Can I work with other brands or agencies?',
    answer:
      'Terms differ by campaign. Any exclusivity is written into the agreement, so you always know what you have agreed to.',
  },
]

const COLUMNS: FaqItem[][] = [FAQS.filter((_, i) => i % 2 === 0), FAQS.filter((_, i) => i % 2 === 1)]

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="Questions Brands and Creators Ask Us"
          description="Straight answers on how Influenzo works, what it costs and how creators get paid."
        />

        {/* two independent columns so opening an item never stretches its neighbor */}
        <div className="mt-12 grid items-start gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {COLUMNS.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4 md:gap-6">
              {column.map((item) => (
                <FaqCard
                  key={item.id}
                  item={item}
                  open={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface FaqCardProps {
  item: FaqItem
  open: boolean
  onToggle: () => void
}

function FaqCard({ item, open, onToggle }: FaqCardProps) {
  const uid = useId()
  const buttonId = `${uid}-button`
  const panelId = `${uid}-panel`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'rounded-3xl border bg-card transition-colors duration-300',
        open ? 'border-lavender-300' : 'border-transparent hover:border-lavender-200',
      )}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
        >
          <span className="text-lg font-medium tracking-tight sm:text-xl">{item.question}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-lavender-700 text-white"
          >
            <ChevronDown className="size-5" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mx-5 border-t border-border sm:mx-6" />
            <p className="p-5 pt-4 text-sm leading-relaxed text-foreground/75 sm:p-6 sm:pt-5 md:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
