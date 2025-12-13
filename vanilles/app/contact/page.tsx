import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-20">
          <h1 className="text-5xl md:text-6xl font-serif text-pretty mb-8">Contact Us</h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            Whether you have a question about our collection, need help with your order, or want to submit a
            reclamation, we're here to help. Fill out the form below and our team will get back to you as soon as
            possible.
          </p>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@vanillesbyhiba.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        contact@vanillesbyhiba.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        +123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        123 Fashion Street
                        <br />
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="text-xl font-serif mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="text-xl font-serif mb-4">Follow Us</h3>
                <a
                  href="https://instagram.com/vanillesbyhiba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@vanillesbyhiba</span>
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
