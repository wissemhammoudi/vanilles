"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src="https://scontent-pmo1-1.cdninstagram.com/v/t51.2885-19/544343237_17971667408928199_2180486212949407659_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4zNjcuYzIifQ&_nc_ht=scontent-pmo1-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2QFgF9CqNNkGZi1aiRG_1Ll742BlffIcJ3BUayKBHCtPNSfoUFUtYiMvbPhx0pqRSiM&_nc_ohc=ifdWzSrnpSUQ7kNvwGQ_bYJ&_nc_gid=06ltWdyOeknlZwfF6qpl2g&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfljoS5YGK5qhaaLWsNrmIPJPUDhvW62ijdb8XkPdSILZA&oe=694276F3&_nc_sid=7a9f4b"
                alt="Vanilles by Hiba"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="text-xl font-serif">Vanilles by Hiba</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-sm hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/wholesale" className="text-sm hover:text-primary transition-colors">
              Wholesale
            </Link>
            <Link href="/tracking" className="text-sm hover:text-primary transition-colors">
              Track Order
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-sm hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/tracking" className="text-sm hover:text-primary transition-colors">
                Track Order
              </Link>
              <Link href="/wholesale" className="text-sm hover:text-primary transition-colors">
                Wholesale
              </Link>
              <Link href="/about" className="text-sm hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
