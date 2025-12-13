"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    orderNumber: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="order">Order Status</SelectItem>
            <SelectItem value="reclamation">Reclamation / Complaint</SelectItem>
            <SelectItem value="return">Return / Exchange</SelectItem>
            <SelectItem value="wholesale">Wholesale Partnership</SelectItem>
            <SelectItem value="product">Product Information</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(formData.subject === "reclamation" || formData.subject === "order" || formData.subject === "return") && (
        <div>
          <Label htmlFor="orderNumber">Order Number (Optional)</Label>
          <Input
            id="orderNumber"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            placeholder="e.g., VH-2025-001"
            className="mt-2"
          />
        </div>
      )}

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="mt-2"
          placeholder="Please provide as much detail as possible..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Send Message
      </Button>
    </form>
  )
}
