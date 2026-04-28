'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Apple, Flame } from 'lucide-react'

const meals = [
  {
    id: 1,
    time: 'Petit-déjeuner',
    icon: '🌅',
    items: [{ name: "Flocons d’avoine avec fruits rouges", calories: 350, protein: 12 }],
    totalCalories: 350,
  },
  {
    id: 2,
    time: 'Déjeuner',
    icon: '🍽️',
    items: [
      { name: 'Salade de poulet grillé', calories: 420, protein: 35 },
      { name: 'Riz complet', calories: 215, protein: 5 },
    ],
    totalCalories: 635,
  },
  {
    id: 3,
    time: 'Collation',
    icon: '🥜',
    items: [{ name: 'Barre protéinée', calories: 200, protein: 20 }],
    totalCalories: 200,
  },
]

export default function FoodPage() {
  const [dailyTarget, setDailyTarget] = useState(2500)

  useEffect(() => {
    const saved = localStorage.getItem('xmove_result')
    if (saved) {
      const data = JSON.parse(saved)
      setDailyTarget(data.calories || 2500)
    }
  }, [])

  const totalCalories = meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
  const remainingCalories = dailyTarget - totalCalories
  const progress = Math.min((totalCalories / dailyTarget) * 100, 100)

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-5 pt-8 pb-32 max-w-md mx-auto font-mono">
      <section className="mb-8">
        <p className="text-2xl font-black font-sans">X-Move Nutrition 🍎</p>
        <h1 className="text-[42px] leading-[1.05] font-black uppercase font-sans mt-5">
          Suivi alimentaire
        </h1>
        <p className="text-lg text-black/70 mt-4">
          Garde le contrôle sur tes calories et tes repas.
        </p>
      </section>

      <Card className="bg-[#faf9f6] text-black border border-gray-300 rounded-3xl p-6 mb-6 shadow-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-black">Résumé du jour</h2>
          <Apple className="w-7 h-7 text-[#9b000b]" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-sm text-black/60 mb-1">Consommées</p>
            <p className="text-4xl font-serif text-black">{totalCalories}</p>
            <p className="text-xs text-black/50">calories</p>
          </div>

          <div>
            <p className="text-sm text-black/60 mb-1">Restantes</p>
            <p className="text-4xl font-serif text-[#9b000b]">{remainingCalories}</p>
            <p className="text-xs text-black/50">calories</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-[#b0000c] h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-black/70">
          <Flame className="w-4 h-4 text-[#9b000b]" />
          Objectif : {dailyTarget} kcal / jour
        </div>
      </Card>

      <div className="flex flex-col gap-5 mb-6">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-6 shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center text-3xl">
                  {meal.icon}
                </div>

                <div>
                  <p className="text-3xl font-black text-black">{meal.time}</p>
                  <p className="text-lg text-black/70">
                    {meal.items.length} aliment{meal.items.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <p className="text-3xl font-black text-[#8b000b]">
                {meal.totalCalories} cal
              </p>
            </div>

            <div className="flex flex-col gap-5 mb-8">
              {meal.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-lg">
                  <div>
                    <p className="text-black">{item.name}</p>
                    <p className="text-base text-black/70">{item.protein}g protéines</p>
                  </div>
                  <p className="text-black">{item.calories}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 h-12 rounded-full bg-[#334155] text-white hover:bg-[#1f2937]">
                Modifier
              </Button>
              <Button className="flex-1 h-12 rounded-full bg-[#334155] text-white hover:bg-[#1f2937]">
                Supprimer
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full h-16 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white text-lg font-black shadow-lg">
        <Plus className="w-6 h-6 mr-2" />
        Ajouter un repas
      </Button>
    </div>
  )
}