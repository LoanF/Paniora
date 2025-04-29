import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type Product, ProductType } from "./types"
import { Leaf, Plane, Factory } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryIcon(type: string) {
  switch (type) {
    case ProductType.LOCAL:
      return Leaf
    case ProductType.IMPORTED:
      return Plane
    case ProductType.INDUSTRIAL:
      return Factory
    default:
      return Leaf
  }
}

export function getTypeColor(type: string) {
  switch (type) {
    case ProductType.LOCAL:
      return "bg-green-500"
    case ProductType.IMPORTED:
      return "bg-yellow-500"
    case ProductType.INDUSTRIAL:
      return "bg-orange-500"
    default:
      return "bg-gray-500"
  }
}

export function calculateScore(basketItems: Product[]) {
  if (basketItems.length === 0) {
    return { total: 0, details: {} }
  }

  // Calculer le pourcentage de chaque catégorie
  const categoryCount = {
    [ProductType.LOCAL]: 0,
    [ProductType.IMPORTED]: 0,
    [ProductType.INDUSTRIAL]: 0,
  }

  basketItems.forEach((item) => {
    if (Object.values(ProductType).includes(item.type as ProductType)) {
      categoryCount[item.type as ProductType]++
    }
  })

  const totalItems = basketItems.length

  const categoryPercentage = {
    local: Math.round((categoryCount[ProductType.LOCAL] / totalItems) * 100),
    imported: Math.round((categoryCount[ProductType.IMPORTED] / totalItems) * 100),
    industrial: Math.round((categoryCount[ProductType.INDUSTRIAL] / totalItems) * 100),
  }

  // Calculer l'empreinte carbone moyenne (convertir de string à nombre)
  const totalCarbonFootprint = basketItems.reduce((sum, item) => {
    const carbonValue = Number.parseFloat(item.carbonFootprint.split(" ")[0])
    return sum + carbonValue
  }, 0)

  const avgCarbonFootprint = totalCarbonFootprint / totalItems

  // Calculer le score final (0-100)
  // Favoriser les produits locaux, pénaliser les produits industriels et importés
  const localBonus = categoryPercentage.local * 0.7
  const importedPenalty = categoryPercentage.imported * 0.3
  const industrialPenalty = categoryPercentage.industrial * 0.4
  const carbonPenalty = Math.min(20, avgCarbonFootprint * 10)

  let totalScore = 50 + localBonus - importedPenalty - industrialPenalty - carbonPenalty

  // Limiter le score entre 0 et 100
  totalScore = Math.max(0, Math.min(100, Math.round(totalScore)))

  return {
    total: totalScore,
    details: categoryPercentage,
  }
}

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Fonction pour extraire le nombre de l'empreinte carbone
export function extractCarbonValue(carbonFootprint: string): number {
  return Number.parseFloat(carbonFootprint.split(" ")[0])
}

// Fonction pour extraire le prix en nombre
export function extractPriceValue(price: string): number {
  return Number.parseFloat(price.replace("€", "").trim())
}
