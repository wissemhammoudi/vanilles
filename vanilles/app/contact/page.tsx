import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          {/* Header Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help with any questions about our collection, orders, or concerns. 
              Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            
          <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border p-6 md:p-8 shadow-sm">
                <div className="mb-8">
                  <h2 className="text-3xl font-serif mb-3">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and our team will respond within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
            
            {/* Left Column - Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-serif mb-6 pb-2 border-b">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a
                        href="mailto:contact@vanillesbyhiba.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        contact@vanillesbyhiba.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Address</p>
                      <p className="text-muted-foreground">
                        123 Fashion Street<br />
                        Paris, France 75001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xl font-serif mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xl font-serif mb-4">Connect With Us</h3>
                <a
                  href="https://www.instagram.com/_vanilles_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/30 rounded-lg group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    @_vanilles_
                  </span>
                </a>
              </div>
            </div>


          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}