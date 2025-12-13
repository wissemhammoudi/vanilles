import { Hero } from "@/components/hero"
import { NewCollection } from "@/components/new-collection"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewCollection />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
