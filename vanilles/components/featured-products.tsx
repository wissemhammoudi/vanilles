import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Linen Midi Dress",
    price: 89.0,
    image: "/elegant-beige-linen-midi-dress-on-model.jpg",
    gender: "Women",
  },
  {
    id: "2",
    name: "Silk Blouse",
    price: 65.0,
    image: "/white-silk-blouse-minimalist-fashion.jpg",
    gender: "Women",
  },
  {
    id: "7",
    name: "Linen Pants",
    price: 75.0,
    image: "/white-linen-pants-minimalist.jpg",
    gender: "Men",
  },
  {
    id: "9",
    name: "Cotton Shirt",
    price: 68.0,
    image: "/beige-cotton-shirt-men-minimalist.jpg",
    gender: "Men",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center">Featured Pieces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
