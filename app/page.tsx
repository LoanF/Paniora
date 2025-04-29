"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import GameContainer from "@/components/game-container"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-2">Panier Écologique</h1>
        <p className="text-center text-gray-600 mb-8">
          Choisissez les produits écologiques pour votre panier hebdomadaire
        </p>

        <DndProvider backend={HTML5Backend}>
          <GameContainer />
        </DndProvider>

        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Pourquoi privilégier les circuits courts ?</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Réduction de l'empreinte carbone liée au transport</li>
            <li>Soutien à l'économie locale et aux petits producteurs</li>
            <li>Produits plus frais et souvent de meilleure qualité</li>
            <li>Moins d'emballages et de traitements de conservation</li>
            <li>Meilleure traçabilité des produits</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
