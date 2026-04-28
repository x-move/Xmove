'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dumbbell, Zap, Clock } from 'lucide-react'

const workoutCategories = {
  Débutant: [
    { name: 'Entraînement à la maison', duration: 20, difficulty: 'Facile', icon: '🏠' },
    { name: 'Marche & footing', duration: 30, difficulty: 'Facile', icon: '🚶' },
    { name: 'Étirements', duration: 15, difficulty: 'Facile', icon: '🤸' },
  ],
  Intermédiaire: [
    { name: 'HIIT cardio', duration: 30, difficulty: 'Moyen', icon: '🏃' },
    { name: 'Musculation', duration: 45, difficulty: 'Moyen', icon: '💪' },
    { name: 'Cyclisme', duration: 60, difficulty: 'Moyen', icon: '🚴' },
  ],
  Avancé: [
    { name: 'CrossFit', duration: 60, difficulty: 'Difficile', icon: '⚡' },
    { name: 'Entraînement marathon', duration: 90, difficulty: 'Difficile', icon: '🏅' },
    { name: 'Powerlifting', duration: 75, difficulty: 'Difficile', icon: '🏋️' },
  ],
}

export default function SportPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof workoutCategories>('Débutant')

  const featuredWorkout = {
    name: 'Full Body Training',
    description: 'Programme complet pour renforcer tout le corps',
    duration: 45,
    difficulty: 'Intermédiaire',
    icon: '💪',
    exercises: [
      { name: 'Échauffement', duration: 5 },
      { name: 'Squats', sets: 4, reps: 8 },
      { name: 'Pompes', sets: 3, reps: 12 },
      { name: 'Deadlift', sets: 3, reps: 5 },
      { name: 'Étirements', duration: 5 },
    ],
  }

  const startWorkout = (workout: any) => {
    localStorage.setItem('xmove_active_workout', JSON.stringify(workout))
    alert(`${workout.name} lancé 🔥`)
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-black px-5 pt-8 pb-32 max-w-md mx-auto font-mono">
      <section className="mb-8">
        <p className="text-2xl font-black font-sans">X-Move Sport 🏋️</p>
        <h1 className="text-[42px] leading-[1.05] font-black uppercase font-sans mt-5">
          Entraînement
        </h1>
        <p className="text-lg text-black/70 mt-4">
          Choisis ton niveau et commence maintenant.
        </p>
      </section>

      <Card className="bg-[#faf9f6] text-black border border-gray-300 rounded-[2rem] p-6 mb-6 shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
        <p className="text-sm text-[#9b000b] font-black mb-2">Workout du jour</p>

        <h2 className="text-3xl font-black text-black mb-3">
          {featuredWorkout.icon} {featuredWorkout.name}
        </h2>

        <p className="text-black/70 text-base mb-5">
          {featuredWorkout.description}
        </p>

        <div className="flex gap-4 mb-5 text-sm text-black/70">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#9b000b]" />
            {featuredWorkout.duration} min
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-[#9b000b]" />
            {featuredWorkout.difficulty}
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {featuredWorkout.exercises.map((ex, i) => (
            <div
              key={i}
              className="flex justify-between text-base bg-black/5 p-3 rounded-2xl text-black"
            >
              <span>{ex.name}</span>
              <span className="font-semibold">
                {'duration' in ex ? `${ex.duration} min` : `${ex.sets}x${ex.reps}`}
              </span>
            </div>
          ))}
        </div>

        <Button
          onClick={() => startWorkout(featuredWorkout)}
          className="w-full h-14 rounded-2xl bg-[#b0000c] hover:bg-[#9b000b] text-white font-black"
        >
          <Dumbbell className="w-5 h-5 mr-2" />
          Lancer le workout
        </Button>
      </Card>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(Object.keys(workoutCategories) as Array<keyof typeof workoutCategories>).map(
          (level) => (
            <Button
              key={level}
              variant="outline"
              onClick={() => setActiveTab(level)}
              className={`rounded-full whitespace-nowrap border-gray-300 ${
                activeTab === level
                  ? 'bg-[#b0000c] text-white border-[#b0000c]'
                  : 'bg-[#faf9f6] text-black hover:bg-black/5'
              }`}
            >
              {level}
            </Button>
          )
        )}
      </div>

      <div className="flex flex-col gap-4">
        {workoutCategories[activeTab].map((workout, idx) => (
          <Card
            key={idx}
            className="bg-[#faf9f6] text-black border border-gray-200 rounded-[2rem] p-5 shadow-[0_12px_35px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-black/5 rounded-3xl flex items-center justify-center text-2xl">
                  {workout.icon}
                </div>

                <div>
                  <h3 className="font-black text-lg text-black">{workout.name}</h3>
                  <div className="flex gap-3 text-sm text-black/60 mt-1">
                    <span>{workout.duration} min</span>
                    <span>{workout.difficulty}</span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => startWorkout(workout)}
                className="rounded-full bg-[#334155] text-white hover:bg-[#1f2937]"
              >
                Start
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}