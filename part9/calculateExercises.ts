type Rating = 1 | 2 | 3

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: string
  target: number
  average: number
}

function calculateExercises (records: number[], target: number): ExerciseResult {
  if (target <= 0)
    throw new Error('Target must be a positive number.')

  const periodLength = records.length

  const { trainingDays, trainingHours } = records.reduce((accu, curr) => {
    if (curr > 0) {
      accu.trainingDays += 1
      accu.trainingHours += curr
    }
    return accu
  }, { trainingDays: 0, trainingHours: 0 })

  const average = !periodLength ? 0 : (trainingHours/periodLength)
  
  const targetRatio = average / target
  
  let rating: Rating, ratingDescription: string, success = false

  if (targetRatio >= 1) {
    rating = 3
    ratingDescription = 'Gold!'
    success = true
  } else if (targetRatio >= 0.75) {
    rating = 2
    ratingDescription = 'Not bad!'
  } else {
    rating = 1
    ratingDescription = 'Put in a bit more effort!'
  }


  return {
    periodLength,
    trainingDays,
    rating,
    ratingDescription,
    target,
    success,
    average
  }
}

console.log(calculateExercises([], 2))