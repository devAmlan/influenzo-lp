import { AudienceSection } from '@/components/shared/audience-section'

const BENEFITS = [
  {
    title: 'Creator Growth',
    description: 'Build your personal brand with the right content strategy and positioning.',
  },
  {
    title: 'Brand Collaborations',
    description: 'Get connected with brands and opportunities that match your niche.',
  },
  {
    title: 'Talent Management',
    description: 'Get support with negotiations, partnerships and collaboration management.',
  },
  {
    title: 'Monetise Your Influence',
    description: 'Explore paid partnerships, UGC projects and long-term opportunities.',
  },
] as const

export function ForCreators() {
  return (
    <AudienceSection
      id="for-creators"
      title="For Creators: Turn Your Influence into Opportunity"
      description="We help creators build their presence, unlock brand opportunities and grow their creator journey."
      panelLabel="For Creators"
      panelText="You create. We'll help you grow."
      ctaLabel="Grow With Us"
      benefits={BENEFITS}
      variant="violet"
      reverse
    />
  )
}
