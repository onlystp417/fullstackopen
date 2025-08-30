import express, { Response } from 'express'
import { Diagnote } from '../types'
import { getDiagnotes } from '../services/diagnoteService'

const router = express.Router()

router.get('/', (_req, res: Response<Diagnote[]>) => {
  res.status(200).send(getDiagnotes())
})

// router.post('/', (_req: Request, res: Response) => {
//   // const diagnoseBody = req.body
//   res.status(201).send('create diagnotes')
// })

export default router