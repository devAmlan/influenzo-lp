import { AudienceSection } from '@/components/shared/audience-section'

const BENEFITS = [
  {
    title: 'Right Creators',
    description: 'Discover creators who match your brand, audience and campaign goals.',
  },
  {
    title: 'Campaign Strategy',
    description: 'Get creative concepts and campaign plans built around your objectives.',
  },
  {
    title: 'Content That Connects',
    description: 'Create engaging UGC, influencer content and brand integrations.',
  },
  {
    title: 'End-to-End Execution',
    description: 'We manage collaborations, deliverables and campaign coordination.',
  },
] as const

export function ForBrands() {
  return (
    <AudienceSection
      id="for-brands"
      title="For Brands: Campaigns That Drive Real Impact"
      description="We turn your marketing goals into creator-powered campaigns that connect with the right audience."
      panelLabel="For Brands"
      panelText="Make your brand impossible to ignore."
      ctaLabel="Build a Campaign"
      benefits={BENEFITS}
      variant="dark"
    />
  )
}
