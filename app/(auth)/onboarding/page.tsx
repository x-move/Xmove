'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    title: 'Track Your Fitness',
    description: 'Log your workouts and monitor your progress with detailed analytics and insights.',
    icon: '💪',
  },
  {
    title: 'Smart Nutrition',
    description: 'Get personalized meal plans and track your daily nutrition intake with precision.',
    icon: '🥗',
  },
  {
    title: 'Achieve Your Goals',
    description: 'Meet your fitness goals with guided workouts and nutrition recommendations.',
    icon: '🎯',
  },
]

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    }
  }

  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const slide = slides[current]
  const isLast = current === slides.length - 1

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-12 max-w-md mx-auto">
      {/* Slide Content */}
      <div className="flex flex-col items-center gap-8 text-center flex-1 justify-center">
        {/* Icon */}
        <div className="text-6xl">{slide.icon}</div>

        {/* Text */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{slide.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{slide.description}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'bg-primary w-6' : 'bg-muted w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 w-full">
        <Button
          variant="outline"
          onClick={prev}
          disabled={current === 0}
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {isLast ? (
          <Link href="/signup" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg">
              Get Started
            </Button>
          </Link>
        ) : (
          <Button
            onClick={next}
            className="flex-1 bg-primary hover:bg-primary/90 rounded-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
