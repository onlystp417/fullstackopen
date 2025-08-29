import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.use(express.json())

// app.set('query parser',
//   (str: string) => qs.parse(str, { /* custom options */ }))

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})