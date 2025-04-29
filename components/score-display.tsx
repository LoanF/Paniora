"use client"

import { Award, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ScoreDisplayProps {
  score: {
    total: number
    details: Record<string, any>
  }
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-green-500"
    if (score >= 40) return "text-yellow-500"
    if (score >= 20) return "text-orange-500"
    return "text-red-500"
  }

  const getFeedback = (score: number) => {
    if (score >= 80) return "Excellent ! Vous privilégiez les circuits courts."
    if (score >= 60) return "Très bien ! Votre panier est plutôt écologique."
    if (score >= 40) return "Pas mal, mais vous pourriez faire mieux."
    if (score >= 20) return "Attention à l'impact environnemental de vos choix."
    return "Essayez de privilégier davantage les produits locaux."
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Award className="w-5 h-5 mr-2 text-yellow-500" />
        Résultat
      </h3>

      <div className="flex justify-center mb-4">
        <div className={`text-4xl font-bold ${getScoreColor(score.total)}`}>{score.total}/100</div>
      </div>

      <p className="text-center mb-4">{getFeedback(score.total)}</p>

      <div className="space-y-2">
        <h4 className="text-sm font-medium flex items-center">
          Détails de votre score
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 ml-1 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Le score est calculé selon la proportion de produits locaux dans votre panier, ainsi que l'impact
                  environnemental de chaque produit.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h4>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-green-50 p-2 rounded">
            <span className="font-medium">Produits locaux:</span> {score.details.local || 0}%
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <span className="font-medium">Importés:</span> {score.details.imported || 0}%
          </div>
          <div className="bg-orange-50 p-2 rounded">
            <span className="font-medium">Industriels:</span> {score.details.industrial || 0}%
          </div>
        </div>
      </div>
    </div>
  )
}
