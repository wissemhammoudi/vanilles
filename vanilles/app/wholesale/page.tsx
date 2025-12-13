"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactFormWholesale } from "@/components/contact-form-wholesale"
import { Store, Package, TrendingUp, Users } from "lucide-react"

export default function WholesalePage() {
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
              <ContactFormWholesale />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}