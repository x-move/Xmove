'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Flame, Droplets, Beef, Wheat, Scale } from 'lucide-react'

export default function CaloriesResultPage() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('xmove_result')
    if (saved) setData(JSON.parse(saved))
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    )
  }

  return (
    <div className="min-h-screen px-5 py-8 max-w-md mx-auto flex flex-col gap-6">
      <div className="rounded-[2rem] bg-black text-white p-7 shadow-xl">
        <p className="text-sm text-red-500 font-semibold">X-Move Plan</p>
        <h1 className="text-3xl font-bold mt-1">Ton plan quotidien</h1>
        <p className="text-white/60 text-sm mt-2">
          Objectifs nutritionnels personnalisés selon ton profil.
        </p>
      </div>

      <Card className="p-6 text-center">
        <Flame className="mx-auto text-primary w-8 h-8 mb-3" />
        <p className="text-sm text-muted-foreground">Objectif calorique</p>
        <h2 className="text-6xl font-bold text-primary mt-2">
          {data.calories}
        </h2>
        <p className="text-sm text-muted-foreground">calories par jour</p>
      </Card>

      <div>
        <h2 className="text-lg font-bold mb-3">Macronutriments</h2>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <Beef className="text-primary w-5 h-5 mb-2" />
            <p className="text-xs text-muted-foreground">Protéines</p>
            <strong>{data.protein}g</strong>
          </Card>

          <Card className="p-4">
            <Wheat className="text-primary w-5 h-5 mb-2" />
            <p className="text-xs text-muted-foreground">Glucides</p>
            <strong>{data.carbs}g</strong>
          </Card>

          <Card className="p-4">
            <Scale className="text-primary w-5 h-5 mb-2" />
            <p className="text-xs text-muted-foreground">Lipides</p>
            <strong>{data.fat}g</strong>
          </Card>

          <Card className="p-4">
            <Droplets className="text-primary w-5 h-5 mb-2" />
            <p className="text-xs text-muted-foreground">Eau</p>
            <strong>{data.water} ml</strong>
          </Card>
        </div>
      </div>

      <Button onClick={() => router.push('/food')} className="h-12">
        Voir mon plan alimentaire
      </Button>

      <Button variant="outline" onClick={() => router.push('/questionnaire')} className="h-12">
        Recalculer
      </Button>
    </div>
  )
}