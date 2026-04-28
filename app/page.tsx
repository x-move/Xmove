'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, Apple, Dumbbell } from 'lucide-react'

export default function HomePage() {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const savedResult = localStorage.getItem('xmove_result')
    if (savedResult) setResult(JSON.parse(savedResult))
  }, [])

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-7 pt-10 pb-28 max-w-md mx-auto font-mono">

      {/* HERO */}
      <section className="mb-10">
        <p className="text-3xl font-black mb-6 font-sans">
          X-Move by benz
        </p>

        <h1 className="text-[48px] leading-[1.05] font-black uppercase font-sans">
          Votre coach bien-être personnel.
        </h1>

        <p className="text-[20px] mt-8 text-black/80">
          Calories, nutrition, sport et produits fitness réunis dans une seule app.
        </p>

        <p className="text-[20px] font-bold text-[#8a7a43] mt-6">
          🔥 Jour 1 — Continue comme ça !
        </p>

        <Link href="/questionnaire">
          <Button className="w-full h-16 mt-8 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white text-lg font-black shadow-lg uppercase">
            Calculer mes calories
          </Button>
        </Link>
      </section>

      {/* OBJECTIF */}
      {result && (
        <Card className="bg-[#faf9f6] text-black border border-gray-300 rounded-2xl p-6 mb-6 shadow-none">
          <h2 className="text-xl font-bold mb-6 text-black">
            🔥 Ton objectif du jour
          </h2>

          <div className="flex items-end gap-3">
            <p className="text-[70px] leading-none font-serif text-black">
              {result.calories}
            </p>
            <p className="text-[30px] font-serif text-black mb-2">
              kcal
            </p>
          </div>

          <p className="text-base text-black/70 mt-4">
            Objectif calorique personnalisé
          </p>
        </Card>
      )}

      {/* FEATURES */}
      <div className="grid grid-cols-3 gap-3 mb-6">

        <Link href="/calories-result">
          <Card className="h-32 bg-[#faf9f6] text-black border border-gray-300 rounded-2xl flex flex-col items-center justify-center">
            <Zap className="w-8 h-8 text-[#9b000b] mb-2" />
            <p className="text-sm font-semibold text-black">Calories</p>
          </Card>
        </Link>

        <Link href="/food">
          <Card className="h-32 bg-[#faf9f6] text-black border border-gray-300 rounded-2xl flex flex-col items-center justify-center">
            <Apple className="w-8 h-8 text-[#9b000b] mb-2" />
            <p className="text-sm font-semibold text-black">Nutrition</p>
          </Card>
        </Link>

        <Link href="/sport">
          <Card className="h-32 bg-[#faf9f6] text-black border border-gray-300 rounded-2xl flex flex-col items-center justify-center">
            <Dumbbell className="w-8 h-8 text-[#9b000b] mb-2" />
            <p className="text-sm font-semibold text-black">Sport</p>
          </Card>
        </Link>

      </div>

      {/* PROGRAMME */}
      <Card className="bg-[#faf9f6] text-black border border-gray-300 rounded-2xl p-6">
        <h2 className="text-2xl font-black mb-4 text-black">
          Programme personnalisé
        </h2>

        <p className="text-base text-black/80 leading-snug">
          Réponds à quelques questions et obtiens un objectif adapté à ton profil.
        </p>

        <Link href="/questionnaire">
          <Button className="w-full h-14 mt-6 rounded-2xl bg-black text-white hover:bg-black/90">
            Commencer
          </Button>
        </Link>
      </Card>

    </div>
  )
}