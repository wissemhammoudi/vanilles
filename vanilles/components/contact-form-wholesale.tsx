"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Send } from "lucide-react"

export function ContactFormWholesale() {
  const [businessType, setBusinessType] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [contactName, setContactName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [website, setWebsite] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const webhookUrl  = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Webhook URL is not defined")
  }
  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  // Clear error message after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const payload = {
        businessName,
        contactName,
        email,
        phone,
        businessType,
        address,
        city,
        country,
        website,
        message,
        formType: "wholesale",
      }

      const response = await fetch(
        webhookUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setSuccess(true)
      setBusinessName("")
      setContactName("")
      setEmail("")
      setPhone("")
      setBusinessType("")
      setAddress("")
      setCity("")
      setCountry("")
      setWebsite("")
      setMessage("")
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Business Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your store/business name"
            required
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Contact Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Contact Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your full name"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="Enter your business email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {/* Business Type - Single row */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Business Type <span className="text-red-500">*</span>
        </label>
        <Select onValueChange={setBusinessType} value={businessType} required>
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="retail">Retail Store</SelectItem>
            <SelectItem value="boutique">Boutique</SelectItem>
            <SelectItem value="online">Online Store</SelectItem>
            <SelectItem value="department">Department Store</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Business Address <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="Enter your business address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* City */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            City <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your city"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Website (Optional)</label>
        <Input
          type="url"
          placeholder="https://www.yourstore.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="h-11"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Tell us about your business <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder="Please tell us about your business, target audience, and why you'd like to partner with us..."
          rows={6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Feedback Messages - Will auto-dismiss after 3 seconds */}
      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
          <p className="text-green-700 dark:text-green-400 text-center">
            ✓ Your wholesale application has been submitted successfully! We'll get back to you within 2-3 business days.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
          <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full h-12 text-base" 
        disabled={loading}
      >
        {loading ? (
          "Submitting Application..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Wholesale Application
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        All fields marked with * are required. We typically respond within 2-3 business days.
      </p>
    </form>
  )
}