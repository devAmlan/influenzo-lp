import { motion } from 'motion/react'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'For Brands', href: '#for-brands' },
  { label: 'For Creators', href: '#for-creators' },
  { label: 'Our Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center justify-between py-6"
    >
      <Logo />
      <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="text-sm transition-colors hover:text-coral-600">
            {link.label}
          </a>
        ))}
      </nav>
      <Button className="h-11 rounded-xl px-5 text-sm shadow-lg shadow-primary/30 md:h-12">
        Book a Call
      </Button>
    </motion.header>
  )
}
