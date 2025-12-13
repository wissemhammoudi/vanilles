import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-20">
          <h1 className="text-5xl md:text-6xl font-serif text-pretty mb-8">About Vanilles by Hiba</h1>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Vanilles by Hiba was born from a passion for timeless elegance and minimalist design. We believe that
                true beauty lies in simplicity, and every piece we create reflects this philosophy.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Our collections are carefully curated to bring you feminine, sophisticated pieces that effortlessly
                blend comfort with style. Each garment is designed with attention to detail and crafted from premium
                fabrics.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src="/elegant-fashion-designer-studio-with-natural-light.jpg" alt="Designer workspace" fill className="object-cover" />
            </div>
          </div>

          <div className="border-t border-border pt-16">
            <h2 className="text-3xl font-serif mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-serif mb-4">Elegance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Timeless designs that transcend trends and celebrate feminine grace
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif mb-4">Simplicity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Clean lines and minimalist aesthetics that speak volumes through subtlety
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif mb-4">Quality</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Premium fabrics and meticulous craftsmanship in every single piece
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <Image src="/fashion-designer-hiba-portrait-in-elegant-studio.jpg" alt="Hiba, Designer" fill className="object-cover" />
            </div>
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif mb-4">Meet Hiba</h3>
              <p className="text-muted-foreground leading-relaxed">
                With years of experience in fashion design and a deep appreciation for minimalist aesthetics, Hiba
                creates collections that empower women to feel confident and beautiful in their everyday lives.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
