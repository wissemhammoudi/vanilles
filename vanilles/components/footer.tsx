import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-lg mb-4">Vanilles by Hiba</h3>
            <p className="text-sm text-muted-foreground">Elegant, minimalist fashion for men and women</p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shop" className="hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-foreground transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="hover:text-foreground transition-colors">
                  Wholesale Partners
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/tracking" className="hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/vanillesbyhiba"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@vanillesbyhiba.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vanilles by Hiba. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
