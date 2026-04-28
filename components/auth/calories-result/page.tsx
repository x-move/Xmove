'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CaloriesResultPage() {
  const [data, setData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem('xmove_result')
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-md mx-auto flex flex-col gap-6">
      
      <h1 className="text-3xl font-bold text-center">Your Results</h1>

      <Card className="p-6 flex flex-col gap-4 text-center">
        <h2 className="text-xl font-semibold">Daily Calories</h2>
        <p className="text-4xl font-bold text-primary">{data.calories} kcal</p>
      </Card>

      <Card className="p-6 flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Macros</h2>

        <div className="flex justify-between">
          <span>Protein</span>
          <span>{data.protein} g</span>
        </div>

        <div className="flex justify-between">
          <span>Carbs</span>
          <span>{data.carbs} g</span>
        </div>

        <div className="flex justify-between">
          <span>Fat</span>
          <span>{data.fat} g</span>
        </div>
      </Card>

      <Button
        className="w-full mt-4"
        onClick={() => router.push('/')}
      >
        Back to Home
      </Button>

    </div>
  )
}