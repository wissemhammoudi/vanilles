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

export function ContactForm() {
  const [reason, setReason] = useState("")

  return (
    <form className="space-y-6">
      {/* Name */}
      <Input placeholder="Your name" required />

      {/* Email */}
      <Input type="email" placeholder="Your email" required />

      {/* Reason */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Reason for contact
        </label>
        <Select onValueChange={setReason} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="question">General question</SelectItem>
            <SelectItem value="order">Order issue</SelectItem>
            <SelectItem value="reclamation">Reclamation / Complaint</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <Textarea
        placeholder={
          reason === "reclamation"
            ? "Please describe the issue with your order..."
            : "Write your message here..."
        }
        rows={6}
        required
      />

      {/* Submit */}
      <Button type="submit" className="w-full">
        Send message
      </Button>
    </form>
  )
}
