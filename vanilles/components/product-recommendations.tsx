import { ProductCard } from "@/components/product-card"

const recommendations = [
  {
    id: "2",
    name: "Silk Blouse",
    price: 65.0,
    image: "/white-silk-blouse-minimalist-fashion.jpg",
  },
  {
    id: "3",
    name: "Wide Leg Trousers",
    price: 79.0,
    image: "/beige-wide-leg-trousers-elegant.jpg",
  },
  {
    id: "4",
    name: "Cotton Knit Cardigan",
    price: 72.0,
    image: "/cream-cotton-cardigan-minimalist.jpg",
  },
  {
    id: "5",
    name: "Pleated Maxi Skirt",
    price: 85.0,
    image: "/ivory-pleated-maxi-skirt-elegant.jpg",
  },
]

export function ProductRecommendations() {
  return (
    <section className="py-20 px-4 md:px-8 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif mb-12 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
