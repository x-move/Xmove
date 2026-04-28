'use client'

import { calculateCalories } from '@/lib/calorie-calculator'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function QuestionnairePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    foodPreference: '',
  })

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.gender ||
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.goal ||
      !formData.activityLevel
    ) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    setLoading(true)

    // 🔥 USER CONNECTÉ
    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
      alert('Utilisateur non connecté')
      setLoading(false)
      return
    }

    const genderFixed = formData.gender === 'Homme' ? 'Male' : 'Female'

    const activityFixed =
      formData.activityLevel === 'Faible'
        ? 'Low'
        : formData.activityLevel === 'Moyen'
        ? 'Medium'
        : 'High'

    const result = calculateCalories({
      gender: genderFixed,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      goal: formData.goal,
      activityLevel: activityFixed,
    })

    // 🔥 SAVE PROFILE EN DB
    await supabase.from('profiles').insert({
      user_id: user.id,
      name: user.user_metadata?.name || '',
      email: user.email,
      weight: Number(formData.weight),
      height: Number(formData.height),
      goal: formData.goal,
    })

    // 🔥 SAVE RESULT EN DB
    await supabase.from('results').insert({
      user_id: user.id,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fat: result.fat,
      water: result.water,
    })

    // 🔥 backup local (UX rapide)
    localStorage.setItem('xmove_profile', JSON.stringify(formData))
    localStorage.setItem('xmove_result', JSON.stringify(result))

    setLoading(false)
    router.push('/calories-result')
  }

  return (
    <div className="px-5 py-8 max-w-md mx-auto min-h-screen">

      <div className="rounded-[2rem] bg-black text-white p-6 mb-6 shadow-xl">
        <p className="text-sm text-red-500 font-semibold">X-Move</p>
        <h1 className="text-3xl font-bold">Ton profil</h1>
        <p className="text-white/60 text-sm mt-1">
          Personnalise ton programme fitness
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        <div className="flex flex-col gap-3">
          <Label>Genre</Label>
          <div className="flex gap-3">
            {['Homme', 'Femme'].map((option) => (
              <Button
                key={option}
                type="button"
                variant={formData.gender === option ? 'default' : 'outline'}
                onClick={() => handleChange('gender', option)}
                className="flex-1"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Âge</Label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
          />
        </div>

        <div>
          <Label>Taille (cm)</Label>
          <Input
            type="number"
            value={formData.height}
            onChange={(e) => handleChange('height', e.target.value)}
          />
        </div>

        <div>
          <Label>Poids (kg)</Label>
          <Input
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
          />
        </div>

        <div>
          <Label>Objectif</Label>
          <select
            value={formData.goal}
            onChange={(e) => handleChange('goal', e.target.value)}
            className="bg-card border rounded-2xl px-3 py-3"
          >
            <option value="">Choisir</option>
            <option value="lose">Perte de poids</option>
            <option value="maintain">Maintien</option>
            <option value="gain">Prise de muscle</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <Label>Niveau d'activité</Label>
          {['Faible', 'Moyen', 'Élevé'].map((option) => (
            <Button
              key={option}
              type="button"
              variant={formData.activityLevel === option ? 'default' : 'outline'}
              onClick={() => handleChange('activityLevel', option)}
              className="justify-start"
            >
              {option}
            </Button>
          ))}
        </div>

        <Button type="submit" disabled={loading} className="h-12 mt-2">
          {loading ? 'Enregistrement...' : 'Calculer mon plan'}
        </Button>

      </form>
    </div>
  )
}