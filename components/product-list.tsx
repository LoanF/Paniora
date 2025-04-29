"use client"

import { useMemo } from "react"
import { type Product, ProductCategory } from "@/lib/types"
import ProductItem from "./product-item"

interface ProductListProps {
  category: ProductCategory
  products: Product[]
  onAddToBasket: (product: Product) => void
  disabled: boolean
}

export default function ProductList({ category, products, onAddToBasket, disabled }: ProductListProps) {
  const categoryInfo = useMemo(() => {
    const info = {
      [ProductCategory.LOCAL]: {
        title: "Produits locaux",
        description: "Produits cultivés à moins de 50km",
        color: "bg-green-100",
      },
      [ProductCategory.IMPORTED]: {
        title: "Produits importés",
        description: "Produits venant de l'étranger",
        color: "bg-yellow-100",
      },
      [ProductCategory.INDUSTRIAL]: {
        title: "Produits industriels",
        description: "Produits transformés industriellement",
        color: "bg-orange-100",
      },
      [ProductCategory.HOMEMADE]: {
        title: "Produits faits maison",
        description: "Produits préparés par des artisans locaux",
        color: "bg-blue-100",
      },
    }
    return info[category]
  }, [category])

  return (
    <div className={`p-3 rounded-lg ${categoryInfo.color}`}>
      <h3 className="font-medium mb-1">{categoryInfo.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{categoryInfo.description}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} onAddToBasket={onAddToBasket} disabled={disabled} />
        ))}
      </div>
    </div>
  )
}
