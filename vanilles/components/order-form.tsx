"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

interface OrderFormProps {
  product: {
    name: string
    price: number
    size: string
    image: string
  }
  onBack: () => void
}

export function OrderForm({ product, onBack }: OrderFormProps) {
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
    // Here you would handle the order submission
    console.log("[v0] Order submitted:", { ...formData, product })
    alert("Order submitted successfully! We will contact you soon.")
  }

  return (
    <div className="py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to product
      </button>

      <h1 className="text-4xl font-serif mb-8">Complete Your Order</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="border border-border rounded-lg p-6 mb-6">
            <h3 className="font-medium mb-4">Order Summary</h3>
            <div className="flex gap-4">
              <div className="relative w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="font-medium mb-2">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">Size: {product.size}</p>
                <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            Confirm Order
          </Button>
        </form>
      </div>
    </div>
  )
}
