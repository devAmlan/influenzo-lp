import { ArrowUp } from 'lucide-react'
import { FadeIn } from '@/components/shared/fade-in'
import { SparkIcon } from '@/components/shared/logo'
import { SocialIcon } from '@/components/shared/social-icon'
import type { SocialIconName } from '@/components/shared/social-icon'

interface SocialLink {
  label: string
  href: string
  icon: SocialIconName
}

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'X', href: '#', icon: 'x' },
]

const FOOTER_LINKS = [
  { label: 'For Brands', href: '#for-brands' },
  { label: 'For Creators', href: '#for-creators' },
  { label: 'Our Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
] as const

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 text-center text-[24vw] leading-none font-medium tracking-[-0.06em] text-ink/[0.04] select-none sm:top-0 lg:text-[20vw]"
      >
        Influenzo
      </span>

      <div className="container relative mx-auto pt-20 pb-8 md:pt-28">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-2xl bg-lavender-500 text-white shadow-lg shadow-lavender-500/30 md:size-20 md:rounded-3xl">
            <SparkIcon className="size-8 md:size-10" />
          </span>
          <h2 className="heading-section mt-8">Stay connected with Influenzo</h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Creator news, campaign wins and updates, all in one place.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 md:mt-14">
          <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="group flex items-center gap-3 rounded-2xl bg-surface-alt/70 py-2 pr-2 pl-5 text-sm shadow-sm ring-1 ring-border transition-transform hover:-translate-y-0.5 md:text-base"
                >
                  {social.label}
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors group-hover:bg-coral-500 md:size-10">
                    <SocialIcon name={social.icon} className="size-4 md:size-[18px]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-border pt-8 md:mt-24 lg:flex-row lg:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-coral-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Influenzo. All rights reserved.
          </p>
          <a href="#top" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-coral-600">
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
