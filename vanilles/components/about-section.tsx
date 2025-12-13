import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">About Vanilles by Hiba</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          We are a modern clothing brand dedicated to creating elegant, minimalist pieces that celebrate feminine grace.
          Our philosophy centers on timeless design, premium quality, and the belief that simplicity is the ultimate
          form of sophistication.
        </p>
        <Link href="/about">
          <Button variant="outline" size="lg" className="group bg-transparent">
            Our Story
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
