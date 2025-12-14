"use client"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Define types for your filter options
interface FilterOptions {
  genders: string[];
  categories: string[];
  collections: string[];
  colors: string[];
  sizes: string[];
}

export function ShopFilters() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])

  // State for your dynamic options
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    genders: [],
    categories: [],
    collections: [],
    colors: [],
    sizes: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch options from your API route
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const response = await fetch('/api/filter-options');
        
        if (!response.ok) {
          throw new Error('Failed to fetch filter options');
        }
        
        const data = await response.json();
        setFilterOptions(data);
      } catch (error) {
        console.error("Failed to fetch filter options:", error);
        setError(error instanceof Error ? error.message : 'Failed to load filters');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFilterOptions();
  }, []);

  // Render loading state
  if (isLoading) {
    return <div className="space-y-8">Loading filters...</div>;
  }

  // Render error state
  if (error) {
    return <div className="space-y-8 text-red-500">Error: {error}</div>;
  }

  // Helper function to render a filter section
  const renderFilterSection = (
    title: string,
    items: string[],
    selectedItems: string[],
    onSelectionChange: (items: string[]) => void
  ) => {
    if (items.length === 0) return null;
    
    return (
      <div>
        <h3 className="font-medium mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox
                id={`${title.toLowerCase()}-${item}`}
                checked={selectedItems.includes(item)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectionChange([...selectedItems, item])
                  } else {
                    onSelectionChange(selectedItems.filter((i) => i !== item))
                  }
                }}
              />
              <Label 
                htmlFor={`${title.toLowerCase()}-${item}`}
                className="text-sm cursor-pointer"
              >
                {item}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {renderFilterSection("Gender", filterOptions.genders, selectedGender, setSelectedGender)}
      {renderFilterSection("Category", filterOptions.categories, selectedCategories, setSelectedCategories)}
      {renderFilterSection("Collections", filterOptions.collections, selectedCollections, setSelectedCollections)}
      {renderFilterSection("Color", filterOptions.colors, selectedColors, setSelectedColors)}
      {renderFilterSection("Size", filterOptions.sizes, selectedSizes, setSelectedSizes)}
    </div>
  )
}