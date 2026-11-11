import { motion } from 'motion/react'
import { ArrowUpRight, Clock, UserRound, WandSparkles } from 'lucide-react'
import { SectionHeading } from '@/components/shared/section-heading'
import { Button } from '@/components/ui/button'

interface TeamMember {
  name: string
  role: string
  department: string
  joined: string
  localTime: string
  projects: number
  status: string
}

// TODO: replace placeholder details and photos with the real team
const TEAM: TeamMember[] = [
  {
    name: 'Team Member One',
    role: 'Founder & CEO',
    department: 'Strategy',
    joined: '12th Jan, 2023',
    localTime: '10.30 AM Local time',
    projects: 32,
    status: 'Online now',
  },
  {
    name: 'Team Member Two',
    role: 'Head of Engineering',
    department: 'Engineering',
    joined: '30th Mar, 2023',
    localTime: '10.30 AM Local time',
    projects: 28,
    status: 'Last seen 2m ago',
  },
]

export function Team() {
  return (
    <section id="team" className="py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          title="The People Behind Influenzo"
          description="A small, focused team that cares about clarity, craft and real outcomes."
        >
          <Button className="h-11 rounded-xl px-6">
            Work with us
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </SectionHeading>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-2 lg:gap-6">
          {TEAM.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TeamCardProps {
  member: TeamMember
  index: number
}

function TeamCard({ member, index }: TeamCardProps) {
  const details = [
    { label: 'Role', value: member.role },
    { label: 'Department', value: member.department, icon: WandSparkles },
    { label: 'Joined', value: member.joined },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex flex-col gap-5 rounded-3xl border border-border bg-card p-3 sm:flex-row sm:p-3.5">
        {/* TODO: replace with the member's photo */}
        <div className="relative aspect-[4/4.4] w-full shrink-0 overflow-hidden rounded-2xl bg-linear-to-b from-lavender-200 via-lavender-400 to-lavender-600 sm:aspect-auto sm:w-[38%]">
          <div aria-hidden="true" className="absolute -top-8 left-1/4 size-40 rounded-full bg-white/50 blur-2xl" />
          <div aria-hidden="true" className="absolute -right-10 -bottom-10 size-48 rounded-full bg-lavender-700/50 blur-3xl" />
          <UserRound
            className="absolute bottom-0 left-1/2 size-4/5 -translate-x-1/2 translate-y-6 text-white/70"
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 sm:py-2 sm:pr-2">
          <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">{member.name}</h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Button className="h-10 rounded-full px-5">Send Message</Button>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" aria-hidden="true" />
              {member.localTime}
            </span>
          </div>

          <dl className="mt-auto flex flex-col gap-2.5 rounded-2xl border border-border p-4 text-sm sm:text-base">
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <dt className="font-medium">{label}</dt>
                <dd className="flex items-center gap-1.5">
                  {Icon && <Icon className="size-4 text-lavender-700" aria-hidden="true" />}
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* footer strip tucked under the card */}
      <div className="-mt-6 flex items-center justify-between rounded-b-3xl bg-card px-6 pt-9 pb-3 text-sm text-muted-foreground">
        <span>{member.projects} Projects finished</span>
        <span>{member.status}</span>
      </div>
    </motion.article>
  )
}
