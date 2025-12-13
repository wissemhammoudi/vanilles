"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-3xl font-serif mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">Add some beautiful pieces to get started</p>
              <Link href="/shop">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <h1 className="text-4xl font-serif mb-12">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-6 border border-border rounded-lg p-6">
                  <div className="relative w-32 h-40 bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Size: {item.size}</p>
                    <p className="text-lg font-medium mb-4">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center gap-2 border border-border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors ml-auto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full mt-3 bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
