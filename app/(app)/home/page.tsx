'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Flame, Apple, Zap, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const caloriesBurned = 1200
  const caloriesTarget = 2500
  const caloriesRemaining = caloriesTarget - caloriesBurned
  const percentageCompleted = (caloriesBurned / caloriesTarget) * 100

  const mealsSuggestions = [
    { name: 'Grilled Chicken Breast', calories: 165, protein: 31 },
    { name: 'Brown Rice Bowl', calories: 215, protein: 5 },
    { name: 'Greek Salad', calories: 150, protein: 8 },
  ]

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Sunday, April 27, 2025</p>
      </div>

      {/* Daily Calorie Tracker */}
      <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-primary/40 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Today&apos;s Progress</h2>
          <Flame className="w-6 h-6 text-primary" />
        </div>

        {/* Calorie display */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Consumed</p>
            <p className="text-3xl font-bold text-foreground">{caloriesBurned}</p>
            <p className="text-xs text-muted-foreground">cal</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">of</p>
            <p className="text-2xl font-bold text-primary">{caloriesTarget}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Remaining</p>
            <p className="text-3xl font-bold text-secondary">{caloriesRemaining}</p>
            <p className="text-xs text-muted-foreground">cal</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted/40 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
            style={{ width: `${percentageCompleted}%` }}
          />
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="bg-card border-border rounded-2xl p-4 text-center">
          <Apple className="w-5 h-5 text-secondary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">Protein</p>
          <p className="text-lg font-bold text-foreground">156g</p>
        </Card>
        <Card className="bg-card border-border rounded-2xl p-4 text-center">
          <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">Carbs</p>
          <p className="text-lg font-bold text-foreground">280g</p>
        </Card>
        <Card className="bg-card border-border rounded-2xl p-4 text-center">
          <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
          <p className="text-xs text-muted-foreground mb-1">Fats</p>
          <p className="text-lg font-bold text-foreground">65g</p>
        </Card>
      </div>

      {/* Meal Suggestions */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Meal Suggestions</h3>
        <div className="flex flex-col gap-3">
          {mealsSuggestions.map((meal) => (
            <Card key={meal.name} className="bg-card border-border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{meal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {meal.calories} cal • {meal.protein}g protein
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                >
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-card border border-border text-foreground hover:bg-muted rounded-lg h-24 flex flex-col items-center justify-center gap-2">
          <Apple className="w-6 h-6" />
          <span className="text-xs font-medium">Log Meal</span>
        </Button>
        <Button className="bg-card border border-border text-foreground hover:bg-muted rounded-lg h-24 flex flex-col items-center justify-center gap-2">
          <Zap className="w-6 h-6" />
          <span className="text-xs font-medium">Log Workout</span>
        </Button>
      </div>
    </div>
  )
}
