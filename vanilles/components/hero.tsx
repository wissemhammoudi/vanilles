import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/elegant-woman-wearing-minimalist-beige-dress-in-na.jpg"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-balance text-foreground">
          Timeless Elegance,
          <br />
          Effortless Style
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover our curated collection of minimalist pieces for men and women
        </p>
        <Link href="/shop">
          <Button size="lg" className="group">
            Explore Collection
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
