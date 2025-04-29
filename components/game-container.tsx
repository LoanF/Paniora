"use client"

import { useState, useEffect } from "react"
import CardStack from "./card-stack"
import Basket from "./basket"
import TrashBin from "./trash-bin"
import ScoreDisplay from "./score-display"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { shuffle } from "@/lib/utils"
import { calculateScore } from "@/lib/utils"
import productsData from "@/lib/data.json"

export default function GameContainer() {
  const [gameProducts, setGameProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [basketItems, setBasketItems] = useState<Product[]>([])
  const [rejectedItems, setRejectedItems] = useState<Product[]>([])
  const [score, setScore] = useState({ total: 0, details: {} })
  const [gameCompleted, setGameCompleted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Charger et mélanger les produits
    const shuffledProducts = shuffle(productsData as Product[])
    setGameProducts(shuffledProducts)
    setIsLoading(false)
  }, [])

  const handleAddToBasket = (product: Product) => {
    setIsTransitioning(true)
    setBasketItems((prev) => [...prev, product])

    // Délai pour permettre l'animation de se terminer avant de passer à la carte suivante
    setTimeout(() => {
      moveToNextCard()
      setIsTransitioning(false)
    }, 300)
  }

  const handleReject = (product: Product) => {
    setIsTransitioning(true)
    setRejectedItems((prev) => [...prev, product])

    // Délai pour permettre l'animation de se terminer avant de passer à la carte suivante
    setTimeout(() => {
      moveToNextCard()
      setIsTransitioning(false)
    }, 300)
  }

  const moveToNextCard = () => {
    if (currentIndex < gameProducts.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // Fin du jeu
      completeGame()
    }
  }

  const handleRemoveFromBasket = (productId: number) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const resetGame = () => {
    setGameProducts(shuffle([...(productsData as Product[])]))
    setCurrentIndex(0)
    setBasketItems([])
    setRejectedItems([])
    setScore({ total: 0, details: {} })
    setGameCompleted(false)
    setGameStarted(true)
  }

  const completeGame = () => {
    const newScore = calculateScore(basketItems)
    setScore(newScore)
    setGameCompleted(true)
  }

  const startGame = () => {
    setGameStarted(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 flex flex-col items-center">
        <TrashBin items={rejectedItems} disabled={gameCompleted || !gameStarted} />
      </div>

      <div className="md:col-span-1 flex flex-col items-center justify-center">
        {!gameStarted ? (
          <div className="text-center">
            <p className="mb-4 text-gray-700">
              Faites glisser les produits vers le panier pour les acheter ou vers la poubelle pour les rejeter.
            </p>
            <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
              Commencer le jeu
            </Button>
          </div>
        ) : gameCompleted ? (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Jeu terminé !</h2>
            <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
              Rejouer
            </Button>
          </div>
        ) : (
          <CardStack
            key={currentIndex} // Forcer le remontage du composant à chaque changement d'index
            currentProduct={gameProducts[currentIndex]}
            nextProducts={gameProducts.slice(currentIndex + 1, currentIndex + 4)}
            onAddToBasket={handleAddToBasket}
            onReject={handleReject}
            remainingCards={gameProducts.length - currentIndex - 1}
            isTransitioning={isTransitioning}
          />
        )}

        {gameCompleted && (
          <div className="mt-8 w-full">
            <ScoreDisplay score={score} />
          </div>
        )}
      </div>

      <div className="md:col-span-1 flex flex-col items-center">
        <Basket items={basketItems} onRemoveItem={handleRemoveFromBasket} disabled={gameCompleted || !gameStarted} />
      </div>
    </div>
  )
}
