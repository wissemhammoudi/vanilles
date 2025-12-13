"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function ProductDetails({ productId }: { productId: string }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addItem } = useCart()

  const product = {
    name: "Linen Midi Dress",
    price: 89.0,
    description:
      "Elegant midi dress crafted from premium European linen. Features a relaxed fit, V-neckline, and subtle pleating at the waist. Perfect for warm weather occasions.",
    fabric: "100% European Linen",
    care: "Machine wash cold, hang dry",
    images: [
      "/elegant-beige-linen-midi-dress-on-model.jpg",
      "/linen-dress-detail-view.jpg",
      "/linen-dress-back-view.jpg",
      "/linen-dress-styled-look.jpg",
    ],
  }

  const sizes = ["XS", "S", "M", "L", "XL"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: productId,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[0],
      })
    }

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[3/4] bg-muted rounded overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-foreground" : "border-transparent hover:border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-serif mb-4 text-balance">{product.name}</h1>
          <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Select Size</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 border rounded-md transition-colors ${
                    selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-4">Quantity</h3>
            <div className="flex items-center gap-2 border border-border rounded-md w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-muted transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-muted transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <Button size="lg" className="mb-8" onClick={handleAddToCart} disabled={addedToCart}>
            {addedToCart ? (
              <>
                <Check className="mr-2 w-5 h-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 w-5 h-5" />
                Add to Cart
              </>
            )}
          </Button>

          <div className="pt-8 border-t border-border space-y-4">
            <div>
              <h4 className="font-medium mb-2">Fabric Details</h4>
              <p className="text-sm text-muted-foreground">{product.fabric}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Care Instructions</h4>
              <p className="text-sm text-muted-foreground">{product.care}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
