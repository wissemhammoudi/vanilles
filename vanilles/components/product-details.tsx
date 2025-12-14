"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check, Plus, Minus, Loader } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface Product {
  id: string
  name: string
  price: number
  image: string
  gender: string
  category: string
  collection: string
  color: string
  description?: string
  fabric?: string
  care?: string
}

export function ProductDetails({ productId }: { productId: string }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()
  
  // Product images (if you want multiple images, store them in your sheet)
  const productImages = product?.image 
    ? [product.image, "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
    : ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]

  const sizes = ["XS", "S", "M", "L", "XL"]

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products?id=${productId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found')
          }
          throw new Error('Failed to fetch product')
        }
        
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }
    
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }
    
    if (!product) return

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image,
      })
    }

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
          <span className="ml-3 text-muted-foreground">Loading product...</span>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive mb-2">Product Not Found</h2>
          <p className="text-muted-foreground">
            {error || "The product you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {productImages.map((image, index) => (
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
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-serif mb-4 text-balance">{product.name}</h1>
          <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>

          {/* Product description - you might want to add this to your sheet */}
          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description || "Elegant product crafted from premium materials. Features a relaxed fit and perfect for various occasions."}
          </p>

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-muted rounded-full text-sm">{product.category}</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">{product.gender}</span>
              <span className="px-3 py-1 bg-muted rounded-full text-sm">{product.color}</span>
              {product.collection && (
                <span className="px-3 py-1 bg-muted rounded-full text-sm">{product.collection}</span>
              )}
            </div>
          </div>

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
              <p className="text-sm text-muted-foreground">
                {product.fabric || "100% Premium materials"}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Care Instructions</h4>
              <p className="text-sm text-muted-foreground">
                {product.care || "Machine wash cold, hang dry"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}