import express, { Request, Response } from 'express'
import { NonSensitivePatient, NewPatient } from '../types'
import { getPatient, createPatient } from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.status(200).send(getPatient())
})

router.post('/', (req: Request<{}, {}, NewPatient>, res: Response) => {
  const result = createPatient(req.body)
  res.status(201).send(result)
})

export default router