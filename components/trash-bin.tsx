"use client"

import { Trash2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { getCategoryIcon, getTypeColor } from "@/lib/utils"
import { motion } from "framer-motion"

interface TrashBinProps {
  items: Product[]
  disabled: boolean
}

export default function TrashBin({ items, disabled }: TrashBinProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-red-100 p-4 rounded-t-lg flex items-center justify-center">
        <Trash2 className="w-6 h-6 mr-2 text-red-600" />
        <h2 className="text-lg font-semibold text-red-700">Produits rejetés</h2>
      </div>

      <div className={`flex-1 bg-white p-4 rounded-b-lg shadow-md border-2 border-t-0 border-red-100 flex flex-col`}>
        <div className="text-sm font-medium text-center mb-2">
          {items.length} {items.length > 1 ? "articles" : "article"}
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 p-8">
            <p>Glissez les produits vers la gauche pour les rejeter</p>
          </div>
        ) : (
          <ul className="space-y-2 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            {items.map((item, index) => {
              const Icon = getCategoryIcon(item.type)
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded opacity-60"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${getTypeColor(item.type)}`}
                    >
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm">{item.price}</span>
                </motion.li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
