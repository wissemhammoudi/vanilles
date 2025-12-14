"use client"
import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gender: string;
  category: string;
  collection: string;
  color?: string;
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products from API...');
        const response = await fetch('/api/products');
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          // Get the actual error message from the API
          const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
          console.error('API Error Response:', errorData);
          throw new Error(errorData.error || errorData.message || 'Failed to fetch products');
        }
        
        const data = await response.json();
        console.log('Products received:', data.length);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error instanceof Error ? error.message : 'Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading products: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}