"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check, Plus, Minus, Loader } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
interface Product {
  id: string
  name: string
  price: number
  image: string
  gender: string
  category: string
  collection: string
  color: string
}

export function ProductDetails({ productId }: { productId: string }) {
  const [selectedSize, setSelectedSize] = useState<string>("M")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  // Fetch product data
  const fetchProduct = useCallback(async () => {
    if (!productId || productId.trim() === "" || productId === "undefined") {
      setError("Invalid product ID")
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      console.log(`Fetching product with ID: ${productId}`)
      const response = await fetch(`/api/products?id=${encodeURIComponent(productId)}`)
      
      console.log(`Response status: ${response.status}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Product not found")
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to fetch product (Status: ${response.status})`)
      }

      const data = await response.json()
      console.log("Product data received:", data)
      
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid product data received")
      }

      setProduct(data)
    } catch (err) {
      console.error("Error fetching product:", err)
      setError(err instanceof Error ? err.message : "Failed to load product")
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }, [productId])

  useEffect(() => {
    fetchProduct()
  }, [fetchProduct])

  // Handle add to cart - Add multiple items based on quantity
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size")
      return
    }

    if (!product) {
      alert("Product information is not available")
      return
    }

    try {
      // Add the item multiple times based on quantity
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
      
      // Reset after 2 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add item to cart")
    }
  }

  // Product images array
  const productImages = product?.image 
    ? [
        product.image,
        product.image,
        product.image,
        product.image
      ]
    : ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]

  const sizes = ["XS", "S", "M", "L", "XL"]

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {error?.includes("not found") ? "Product Not Found" : "Error"}
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The product could not be loaded"}
          </p>
          <Button onClick={fetchProduct}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded overflow-hidden border-2 ${
                  selectedImage === index ? "border-black" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.category && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {product.category}
              </span>
            )}
            {product.gender && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {product.gender}
              </span>
            )}
            {product.color && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {product.color}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-fit">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="w-full mb-6"
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            {addedToCart ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </>
            )}
          </Button>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="text-gray-600 space-y-1">
              {product.collection && (
                <li><strong>Collection:</strong> {product.collection}</li>
              )}
              <li><strong>Color:</strong> {product.color || "Not specified"}</li>
              <li><strong>Gender:</strong> {product.gender || "Unisex"}</li>
              <li><strong>Category:</strong> {product.category || "General"}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}