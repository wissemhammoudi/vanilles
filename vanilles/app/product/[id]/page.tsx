import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { ProductRecommendations } from "@/components/product-recommendations"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-20">
        <ProductDetails productId={params.id} />
        <ProductRecommendations />
      </main>
      <Footer />
    </>
  )
}
