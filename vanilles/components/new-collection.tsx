import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function NewCollection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-accent">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
          <span className="text-sm font-medium text-primary">New Arrivals</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Spring/Summer 2024</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Soft silhouettes and delicate fabrics for the warmer months ahead
        </p>
        <Link href="/shop">
          <Button variant="outline" size="lg" className="group bg-transparent">
            View Collection
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
