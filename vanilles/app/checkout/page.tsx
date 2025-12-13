"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    clearCart()
    alert("Order submitted successfully! We will contact you soon.")
    router.push("/")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <Link href="/cart" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to cart
          </Link>

          <h1 className="text-4xl font-serif mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif mb-6">Shipping Information</h2>
                </div>

                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requests or notes"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Complete Order
                </Button>
              </form>
            </div>

            <div>
              <div className="border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          Size: {item.size} × {item.quantity}
                        </p>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
