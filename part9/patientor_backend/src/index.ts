import express from 'express'
import type { Request, Response } from 'express'
import cors from 'cors'
import diagnoteRouter from './routes/diagnotes'
import patientRouter from './routes/patients'
    

const app = express();

app.use(express.json())
app.use(cors())

// app.set('query parser',
//   (str: string) => qs.parse(str, { /* custom options */ }))

app.get('/api/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

app.use('/api/diagnotes', diagnoteRouter)
app.use('/api/patients', patientRouter)

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})