"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Store, Package, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

export default function WholesalePage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    address: "",
    city: "",
    country: "",
    website: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Wholesale form submitted:", formData)
    // Here you would typically send this data to your backend
    alert("Thank you for your interest! We will contact you shortly.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif mb-6 text-balance">Become a Wholesale Partner</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our network of retail partners and bring Vanilles by Hiba's elegant collections for men and women to
              your customers
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center p-6 rounded-lg border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Competitive Pricing</h3>
              <p className="text-sm text-muted-foreground">Special wholesale rates for bulk orders</p>
            </div>

            <div className="text-center p-6 rounded-lg border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Quality Products</h3>
              <p className="text-sm text-muted-foreground">Premium collections for men and women</p>
            </div>

            <div className="text-center p-6 rounded-lg border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Growing Brand</h3>
              <p className="text-sm text-muted-foreground">Partner with an emerging fashion brand</p>
            </div>

            <div className="text-center p-6 rounded-lg border border-border bg-card">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Dedicated Support</h3>
              <p className="text-sm text-muted-foreground">Personal account manager for partners</p>
            </div>
          </div>

          {/* Wholesale Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-serif mb-6">Partner Application Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Your store name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="business@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange as any}
                    required
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail Store</option>
                    <option value="boutique">Boutique</option>
                    <option value="online">Online Store</option>
                    <option value="department">Department Store</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="address">Business Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.yourstore.com"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Tell us about your business *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please tell us about your business, target audience, and why you'd like to partner with Vanilles by Hiba..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Application
                </Button>
              </form>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-6">
              All fields marked with * are required. We typically respond within 2-3 business days.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
