import { ProductDetails } from "@/components/product-details"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p>No product ID provided</p>
        </div>
      </div>
    )
  }

  return <ProductDetails productId={id} />
}