"use client"

import { useState } from "react"
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

export function ContactForm() {
  const [reason, setReason] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Webhook URL is not defined")
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const payload = {
        name,
        email,
        phone,
        reason,
        message,
        formType: "contact", 
      }

      const response = await fetch(webhookUrl,
            {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setSuccess(true)
      setName("")
      setEmail("")
      setPhone("")
      setReason("")
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
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone Number</label>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Reason - Fixed to match other fields */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Reason for Contact <span className="text-red-500">*</span>
          </label>
          <Select onValueChange={setReason} value={reason} required>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Information Request">Information Request</SelectItem>
              <SelectItem value="Order Issue">Order Issue</SelectItem>
              <SelectItem value="Complaint / Claim">Complaint / Claim</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Message <span className="text-red-500">*</span>
        </label>
        <Textarea
          placeholder={
            reason === "Complaint / Claim"
              ? "Please describe the issue with your order in detail..."
              : "Tell us how we can help you..."
          }
          rows={6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Feedback Messages */}
      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-700 dark:text-green-400 text-center">
            ✓ Your message has been sent successfully! We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
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
          "Sending Message..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        We respect your privacy and will never share your information.
      </p>
    </form>
  )
}