"use client"

import { ShoppingBasket, X } from "lucide-react"
import type { Product } from "@/lib/types"
import { getCategoryIcon, getTypeColor } from "@/lib/utils"
import { motion } from "framer-motion"

interface BasketProps {
  items: Product[]
  onRemoveItem: (id: number) => void
  disabled: boolean
}

export default function Basket({ items, onRemoveItem, disabled }: BasketProps) {
  const totalPrice = items
    .reduce((sum, item) => {
      const price = Number.parseFloat(item.price.replace("€", "").trim())
      return sum + price
    }, 0)
    .toFixed(2)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-green-100 p-4 rounded-t-lg flex items-center justify-center">
        <ShoppingBasket className="w-6 h-6 mr-2 text-green-600" />
        <h2 className="text-lg font-semibold text-green-700">Mon panier</h2>
      </div>

      <div className={`flex-1 bg-white p-4 rounded-b-lg shadow-md border-2 border-t-0 border-green-100 flex flex-col`}>
        <div className="text-sm font-medium text-center mb-2">
          {items.length} {items.length > 1 ? "articles" : "article"}
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 p-8">
            <p>Glissez les produits vers la droite pour les ajouter au panier</p>
          </div>
        ) : (
          <>
            <ul className="space-y-2 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar mb-3">
              {items.map((item, index) => {
                const Icon = getCategoryIcon(item.type)
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${getTypeColor(item.type)}`}
                      >
                        <Icon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{item.price}</span>
                      {!disabled && (
                        <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ul>
            <div className="border-t pt-2 flex justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-bold">{totalPrice} €</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
