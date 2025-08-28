import express, { Request, Response } from 'express'
import { bmiCalculator } from './bmiCalculator'
const qs = require('qs')
const app = express()

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

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})