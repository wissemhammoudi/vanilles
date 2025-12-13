import { ProductCard } from "@/components/product-card"

const allProducts = [
  {
    id: "1",
    name: "Linen Midi Dress",
    price: 89.0,
    image: "/elegant-beige-linen-midi-dress-on-model.jpg",
    gender: "Women",
    category: "Dresses",
    collection: "Collection 2025",
  },
  {
    id: "2",
    name: "Silk Blouse",
    price: 65.0,
    image: "/white-silk-blouse-minimalist-fashion.jpg",
    gender: "Women",
    category: "Tops",
    collection: "Essentials",
  },
  {
    id: "3",
    name: "Wide Leg Trousers",
    price: 79.0,
    image: "/beige-wide-leg-trousers-elegant.jpg",
    gender: "Women",
    category: "Bottoms",
    collection: "Best Sellers",
  },
  {
    id: "4",
    name: "Cotton Knit Cardigan",
    price: 72.0,
    image: "/cream-cotton-cardigan-minimalist.jpg",
    gender: "Women",
    category: "Knitwear",
    collection: "Nouveautés",
  },
  {
    id: "5",
    name: "Pleated Maxi Skirt",
    price: 85.0,
    image: "/ivory-pleated-maxi-skirt-elegant.jpg",
    gender: "Women",
    category: "Bottoms",
    collection: "Collection 2025",
  },
  {
    id: "6",
    name: "Cashmere Turtleneck",
    price: 98.0,
    image: "/beige-cashmere-turtleneck-sweater.jpg",
    gender: "Women",
    category: "Knitwear",
    collection: "Best Sellers",
  },
  {
    id: "7",
    name: "Linen Pants",
    price: 75.0,
    image: "/white-linen-pants-minimalist.jpg",
    gender: "Men",
    category: "Bottoms",
    collection: "Essentials",
  },
  {
    id: "8",
    name: "Silk Slip Dress",
    price: 92.0,
    image: "/champagne-silk-slip-dress-elegant.jpg",
    gender: "Women",
    category: "Dresses",
    collection: "En Promos",
  },
  {
    id: "9",
    name: "Cotton Shirt",
    price: 68.0,
    image: "/beige-cotton-shirt-men-minimalist.jpg",
    gender: "Men",
    category: "Shirts",
    collection: "Essentials",
  },
  {
    id: "10",
    name: "Wool Blazer",
    price: 145.0,
    image: "/cream-wool-blazer-men-elegant.jpg",
    gender: "Men",
    category: "Outerwear",
    collection: "Collection 2025",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
