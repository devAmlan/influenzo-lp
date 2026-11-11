import { MotionConfig } from 'motion/react'
import { About } from '@/components/sections/about'
import { Footer } from '@/components/sections/footer'
import { Faq } from '@/components/sections/faq'
import { Team } from '@/components/sections/team'
import { WhyChooseUs } from '@/components/sections/why-choose-us'
import { Services } from '@/components/sections/services'
import { Process } from '@/components/sections/process'
import { Hero } from '@/components/sections/hero'
import { Navbar } from '@/components/sections/navbar'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main id="top" className="min-h-screen">
        <div className="bg-surface">
          <div className="container mx-auto pb-8 md:pb-12">
            <Navbar />
            <Hero />
          </div>
        </div>
        <About />
        <Process />
        <Services />
        <WhyChooseUs />
        <Team />
        <Faq />
      </main>
      <Footer />
    </MotionConfig>
  )
}
