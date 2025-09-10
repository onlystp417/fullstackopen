import express, { Request, Response } from 'express'
import { NonSensitivePatient, NewPatient, Patient } from '../types'
import { getPatients, getPatient, createPatient } from '../services/patientService'
import { newPatientParse, errorMiddleware } from '../middlewares'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.status(200).send(getPatients())
})

router.get('/:id', (req: Request, res: Response<Patient>) => {
  res.status(200).send(getPatient(req.params.id))
})

router.post('/', newPatientParse, (req: Request<{}, {}, NewPatient>, res: Response<Patient>) => {
  const result = createPatient(req.body)
  res.status(201).json(result)
})


router.use(errorMiddleware)

export default router