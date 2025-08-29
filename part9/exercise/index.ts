import express, { Request, Response } from 'express'
import { bmiCalculator } from './bmiCalculator'
import { calculateExercises } from './calculateExercises'
import qs from 'qs'
const app = express()

app.use(express.json())

app.set('query parser',
  (str: string) => qs.parse(str, { /* custom options */ }))

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).send('Invalid or missing parameters')
  } else {
    const bmi = bmiCalculator(height, weight)
    return res.send(bmi)
  }
})

type ExercisesRequestBody = {
  daily_exercises: number[]
  target: number
}

// Request<Params, ResBody, ReqBody, ReqQuery>
app.post('/exercises',  (req: Request<{}, {}, ExercisesRequestBody>, res: Response) => {
  try {
    const { daily_exercises, target } = req.body
    const result = calculateExercises(daily_exercises, target)
  
    res.status(200).send(result)
  } catch (_err) {
    res.status(400).send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})