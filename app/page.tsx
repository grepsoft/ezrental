import BrowseItems from '@/components/browse-items'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Hero from '@/components/hero'
import HowItWorks from '@/components/how-it-works'
import MaxWContainer from '@/components/max-w-container'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header */}
      <Header />

      {/* hero */}
      <Hero />
      <MaxWContainer>

        {/* how it works */}
        <HowItWorks />

        <div className="py-4"></div>
        <h3 className="mb-16 mt-16 text-center text-xl sm:text-4xl px-2 py-8 sm:py-16 bg-primary">
          Why buy when you can rent! Choose from thousand of items available to rent.
        </h3>

        {/* browse the items*/}
        <BrowseItems />

        <div className="py-4"></div>
        <h3 className="mt-16 mb-16 text-center text-xl sm:text-4xl px-2 py-4 sm:py-16 bg-primary">
          Ready to make money? <Link className='font-bold' href='/my-listings'>Start now &rarr;</Link>
        </h3>

      </MaxWContainer>

      {/* footer */}
      <Footer />
    </div>
  )
}
