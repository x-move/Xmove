export function calculateCalories(data: any) {
  const age = Number(data.age)
  const height = Number(data.height)
  const weight = Number(data.weight)

  const activityMultiplier: any = {
    Low: 1.2,
    Medium: 1.55,
    High: 1.725,
  }

  const bmr =
    data.gender === 'Male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161

  const maintenance = bmr * activityMultiplier[data.activityLevel]

  let calories = maintenance

  if (data.goal === 'lose') {
    calories = maintenance - 400
  }

  if (data.goal === 'gain') {
    calories = maintenance + 300
  }

  const protein = weight * 1.8
  const fat = (calories * 0.25) / 9
  const carbs = (calories - protein * 4 - fat * 9) / 4
  const water = weight * 35

  return {
    bmr: Math.round(bmr),
    maintenance: Math.round(maintenance),
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    water: Math.round(water),
  }
}