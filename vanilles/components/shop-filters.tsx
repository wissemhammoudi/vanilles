"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function ShopFilters() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])

  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["Beige", "White", "Cream", "Brown", "Black"]
  const categories = ["Dresses", "Tops", "Bottoms", "Knitwear", "Outerwear", "Shirts", "Suits"]
  const genders = ["Women", "Men"]
  const collections = ["En Promos", "Collection 2025", "Nouveautés", "Best Sellers", "Essentials"]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium mb-4">Gender</h3>
        <div className="space-y-3">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center gap-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={selectedGender.includes(gender)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedGender([...selectedGender, gender])
                  } else {
                    setSelectedGender(selectedGender.filter((g) => g !== gender))
                  }
                }}
              />
              <Label htmlFor={`gender-${gender}`} className="text-sm cursor-pointer">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Category</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category])
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category))
                  }
                }}
              />
              <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Collections</h3>
        <div className="space-y-3">
          {collections.map((collection) => (
            <div key={collection} className="flex items-center gap-2">
              <Checkbox
                id={`collection-${collection}`}
                checked={selectedCollections.includes(collection)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCollections([...selectedCollections, collection])
                  } else {
                    setSelectedCollections(selectedCollections.filter((c) => c !== collection))
                  }
                }}
              />
              <Label htmlFor={`collection-${collection}`} className="text-sm cursor-pointer">
                {collection}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Color</h3>
        <div className="space-y-3">
          {colors.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedColors([...selectedColors, color])
                  } else {
                    setSelectedColors(selectedColors.filter((c) => c !== color))
                  }
                }}
              />
              <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Size</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSizes([...selectedSizes, size])
                  } else {
                    setSelectedSizes(selectedSizes.filter((s) => s !== size))
                  }
                }}
              />
              <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
