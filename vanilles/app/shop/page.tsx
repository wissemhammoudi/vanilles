import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-pretty mb-12">Shop Collection</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ShopFilters />
            </aside>
            <div className="flex-1">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
