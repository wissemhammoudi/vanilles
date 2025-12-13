import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-2 text-balance">{product.name}</h3>
          <p className="text-muted-foreground">${product.price.toFixed(2)}</p>
        </div>
      </Card>
    </Link>
  )
}
