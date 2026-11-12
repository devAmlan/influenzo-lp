import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'For Brands', href: '#for-brands' },
  { label: 'For Creators', href: '#for-creators' },
  { label: 'Our Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

export function Navbar() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      {/* keeps the page content where it was now that the bar is fixed */}
      <div aria-hidden="true" className="h-24" />
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 py-4"
      >
        <div className="container mx-auto">
          <div
            className={cn(
              'flex flex-wrap items-center justify-between rounded-2xl border px-3 py-2 transition-colors duration-300 sm:px-4',
              scrolled || menuOpen
                ? 'border-white/30 bg-white/10 shadow-[inset_0_1px_0_rgb(255_255_255/0.4)] backdrop-blur-2xl'
                : 'border-transparent',
            )}
          >
            <Logo className="text-xl sm:text-2xl" />

            <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-8">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-sm transition-colors hover:text-coral-600">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button className="h-10 rounded-xl px-3.5 text-xs shadow-lg shadow-primary/30 sm:h-11 sm:px-5 sm:text-sm md:h-12">
                Book a Call
              </Button>
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex size-10 items-center justify-center rounded-xl hover:bg-white/10 sm:size-11 lg:hidden"
              >
                {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  id="mobile-menu"
                  aria-label="Mobile"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 flex basis-full flex-col border-t border-white/10 pt-2 lg:hidden"
                >
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-2 py-3 text-base transition-colors hover:bg-white/10 hover:text-coral-600"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  )
}
