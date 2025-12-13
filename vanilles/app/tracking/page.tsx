"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Package, CheckCircle2, Truck, MapPin, Clock } from "lucide-react"

// Mock order data - in production, this would come from a database
const orderDatabase: Record<
  string,
  {
    id: string
    status: "processing" | "shipped" | "in_transit" | "delivered"
    orderDate: string
    estimatedDelivery: string
    items: { name: string; quantity: number }[]
    shippingAddress: string
    trackingNumber: string
  }
> = {
  VH001: {
    id: "VH001",
    status: "delivered",
    orderDate: "2024-01-10",
    estimatedDelivery: "2024-01-15",
    items: [{ name: "Elegant Blazer", quantity: 1 }],
    shippingAddress: "123 Rue de Paris, Tunis, Tunisia",
    trackingNumber: "VH001",
  },
  VH002: {
    id: "VH002",
    status: "in_transit",
    orderDate: "2024-01-12",
    estimatedDelivery: "2024-01-18",
    items: [{ name: "Minimalist Dress", quantity: 2 }],
    shippingAddress: "456 Avenue Habib Bourguiba, Sousse, Tunisia",
    trackingNumber: "VH002",
  },
  VH003: {
    id: "VH003",
    status: "processing",
    orderDate: "2024-01-14",
    estimatedDelivery: "2024-01-20",
    items: [{ name: "Classic Trousers", quantity: 1 }],
    shippingAddress: "789 Rue de la Liberté, Sfax, Tunisia",
    trackingNumber: "VH003",
  },
}

const statusConfig = {
  processing: {
    label: "Processing",
    icon: Package,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Your order is being prepared",
  },
  shipped: {
    label: "Shipped",
    icon: CheckCircle2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Your order has been shipped",
  },
  in_transit: {
    label: "In Transit",
    icon: Truck,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Your order is on its way",
  },
  delivered: {
    label: "Delivered",
    icon: MapPin,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Your order has been delivered",
  },
}

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("")
  const [searchedOrder, setSearchedOrder] = useState<(typeof orderDatabase)[string] | null>(null)
  const [error, setError] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSearchedOrder(null)

    const order = orderDatabase[trackingId.toUpperCase()]
    if (order) {
      setSearchedOrder(order)
    } else {
      setError("Order not found. Please check your tracking ID and try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Track Your Order</h1>
            <p className="text-muted-foreground">Enter your order tracking ID to see the delivery status</p>
          </div>

          <Card className="p-8 mb-12">
            <form onSubmit={handleSearch} className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter tracking ID (e.g., VH001)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Track Order</Button>
            </form>
          </Card>

          {error && (
            <Card className="p-6 border-destructive/50 bg-destructive/5">
              <p className="text-destructive text-center">{error}</p>
            </Card>
          )}

          {searchedOrder && (
            <div className="space-y-8">
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif mb-2">Order #{searchedOrder.id}</h2>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {new Date(searchedOrder.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig[searchedOrder.status].bgColor}`}
                  >
                    {(() => {
                      const StatusIcon = statusConfig[searchedOrder.status].icon
                      return <StatusIcon className={`w-5 h-5 ${statusConfig[searchedOrder.status].color}`} />
                    })()}
                    <span className={`font-medium ${statusConfig[searchedOrder.status].color}`}>
                      {statusConfig[searchedOrder.status].label}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>Estimated delivery: {new Date(searchedOrder.estimatedDelivery).toLocaleDateString()}</span>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {searchedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between py-2 border-b border-border">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">Qty: {item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-muted-foreground">{searchedOrder.shippingAddress}</p>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">{statusConfig[searchedOrder.status].description}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/30">
                <h3 className="font-medium mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        searchedOrder.status === "processing" ||
                        searchedOrder.status === "shipped" ||
                        searchedOrder.status === "in_transit" ||
                        searchedOrder.status === "delivered"
                          ? "bg-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Package
                        className={`w-4 h-4 ${
                          searchedOrder.status === "processing" ||
                          searchedOrder.status === "shipped" ||
                          searchedOrder.status === "in_transit" ||
                          searchedOrder.status === "delivered"
                            ? "text-background"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(searchedOrder.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        searchedOrder.status === "shipped" ||
                        searchedOrder.status === "in_transit" ||
                        searchedOrder.status === "delivered"
                          ? "bg-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 ${
                          searchedOrder.status === "shipped" ||
                          searchedOrder.status === "in_transit" ||
                          searchedOrder.status === "delivered"
                            ? "text-background"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Order Shipped</p>
                      <p className="text-sm text-muted-foreground">
                        {searchedOrder.status !== "processing" ? "Shipped" : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        searchedOrder.status === "in_transit" || searchedOrder.status === "delivered"
                          ? "bg-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <Truck
                        className={`w-4 h-4 ${
                          searchedOrder.status === "in_transit" || searchedOrder.status === "delivered"
                            ? "text-background"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">In Transit</p>
                      <p className="text-sm text-muted-foreground">
                        {searchedOrder.status === "in_transit" || searchedOrder.status === "delivered"
                          ? "On the way"
                          : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        searchedOrder.status === "delivered" ? "bg-foreground" : "bg-muted"
                      }`}
                    >
                      <MapPin
                        className={`w-4 h-4 ${
                          searchedOrder.status === "delivered" ? "text-background" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-muted-foreground">
                        {searchedOrder.status === "delivered"
                          ? new Date(searchedOrder.estimatedDelivery).toLocaleDateString()
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="font-medium mb-3">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, please contact our customer support team.
            </p>
            <Button variant="outline" asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
