"use client"

import { useDrag } from "react-dnd"
import type { Product } from "@/lib/types"
import { getCategoryIcon } from "@/lib/utils"

interface ProductItemProps {
  product: Product
  onAddToBasket: (product: Product) => void
  disabled: boolean
}

export default function ProductItem({ product, onAddToBasket, disabled }: ProductItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PRODUCT",
    item: product,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: !disabled,
  }))

  const Icon = getCategoryIcon(product.category)

  return (
    <div
      ref={drag}
      className={`p-2 bg-white rounded border cursor-grab shadow-sm transition-all
        ${isDragging ? "opacity-50" : "opacity-100"}
        ${disabled ? "cursor-not-allowed opacity-60" : "hover:shadow-md"}
      `}
      onClick={() => !disabled && onAddToBasket(product)}
    >
      <div className="flex items-center mb-1">
        <Icon className="w-4 h-4 mr-1 text-gray-600" />
        <span className="text-sm font-medium truncate">{product.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">{product.weight}</span>
        <span className="text-xs font-semibold">{product.price}€</span>
      </div>
    </div>
  )
}
