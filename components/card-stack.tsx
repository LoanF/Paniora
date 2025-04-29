"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, type PanInfo } from "framer-motion"
import { ShoppingCart, Trash2 } from "lucide-react"
import type { Product } from "@/lib/types"
import { getCategoryIcon, getTypeColor, extractCarbonValue } from "@/lib/utils"

interface CardStackProps {
  currentProduct: Product
  nextProducts: Product[]
  onAddToBasket: (product: Product) => void
  onReject: (product: Product) => void
  remainingCards: number
  isTransitioning: boolean
}

export default function CardStack({
  currentProduct,
  nextProducts,
  onAddToBasket,
  onReject,
  remainingCards,
  isTransitioning,
}: CardStackProps) {
  const controls = useAnimation()
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  // Réinitialiser l'animation lorsque la carte change
  useEffect(() => {
    controls.set({ x: 0, opacity: 1 })
  }, [currentProduct, controls])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      // Glissé vers la droite (panier)
      controls
        .start({
          x: 500,
          opacity: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setIsDragging(false)
          onAddToBasket(currentProduct)
        })
    } else if (info.offset.x < -threshold) {
      // Glissé vers la gauche (poubelle)
      controls
        .start({
          x: -500,
          opacity: 0,
          transition: { duration: 0.3 },
        })
        .then(() => {
          setIsDragging(false)
          onReject(currentProduct)
        })
    } else {
      // Retour à la position initiale
      controls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      })
      setDirection(null)
      setIsDragging(false)
    }
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      setDirection("right")
    } else if (info.offset.x < -50) {
      setDirection("left")
    } else {
      setDirection(null)
    }
  }

  const Icon = getCategoryIcon(currentProduct.type)
  const carbonValue = extractCarbonValue(currentProduct.carbonFootprint)
  const carbonColor = carbonValue < 0.5 ? "bg-green-500" : carbonValue < 0.8 ? "bg-yellow-500" : "bg-red-500"

  return (
    <div className="relative w-full max-w-xs" ref={constraintsRef}>
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2 z-30 pointer-events-none">
        <div
          className={`p-2 rounded-full bg-red-100 transition-opacity ${direction === "left" ? "opacity-100" : "opacity-30"}`}
        >
          <Trash2 className="w-6 h-6 text-red-500" />
        </div>
        <div
          className={`p-2 rounded-full bg-green-100 transition-opacity ${direction === "right" ? "opacity-100" : "opacity-30"}`}
        >
          <ShoppingCart className="w-6 h-6 text-green-500" />
        </div>
      </div>

      {/* Carte principale (produit actuel) */}
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-grab active:cursor-grabbing z-20"
        drag={isTransitioning ? false : "x"}
        dragConstraints={constraintsRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={controls}
        whileTap={{ scale: 1.05 }}
        initial={{ x: 0, opacity: 1 }}
      >
        <div className="p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full mb-4 overflow-hidden">
            <div className={`w-full h-full flex items-center justify-center ${getTypeColor(currentProduct.type)}`}>
              <span className="text-white font-bold text-2xl">{currentProduct.name.charAt(0)}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-1">{currentProduct.name}</h3>

          <div className="flex items-center mb-2">
            <span className={`text-sm px-2 py-1 rounded text-white ${getTypeColor(currentProduct.type)}`}>
              {currentProduct.type.charAt(0).toUpperCase() + currentProduct.type.slice(1)}
            </span>
            <span className="text-sm ml-2 text-gray-600">{currentProduct.origin}</span>
          </div>

          <div className="flex justify-between w-full mt-4">
            <div className="text-gray-600">
              <div className="text-sm">Empreinte</div>
              <div className="font-medium">{currentProduct.carbonFootprint}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">Prix</div>
              <div className="font-bold text-lg">{currentProduct.price}</div>
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="text-sm text-gray-500">Empreinte carbone</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
              <div
                className={`h-2.5 rounded-full ${carbonColor}`}
                style={{ width: `${Math.min(100, carbonValue * 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-right mt-1 text-gray-500">{currentProduct.carbonFootprint}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-500">
            Glissez vers la <span className="font-medium text-green-600">droite</span> pour acheter ou vers la{" "}
            <span className="font-medium text-red-600">gauche</span> pour rejeter
          </p>
        </div>
      </motion.div>

      <div className="mt-4 text-center text-sm text-gray-500">
        {remainingCards > 0 ? `${remainingCards} produits restants` : "Dernier produit"}
      </div>
    </div>
  )
}
