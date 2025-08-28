export function bmiCalculator (height: number, weight: number): string {
  const heightInMeter = height / 100
  const bmi = weight / (heightInMeter * heightInMeter)

  if (bmi < 16.0)
    return 'Underweight (Severe thinness)'
  else if (bmi <= 17.0)
    return 'Underweight (Moderate thinness)'
  else if (bmi <= 18.5)
    return 'Underweight (Mild thinness)'
  else if (bmi <= 25)
    return 'Normal range'
  else if (bmi <= 30)
    return 'Overweight (Pre-obese)'
  else if (bmi <= 35)
    return 'Obese (Class I)'
  else if (bmi <= 40)
    return 'Obese (Class II)'
  else
    return 'Obese (Class III)'
}
