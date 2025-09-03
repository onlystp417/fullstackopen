import express, { Request, Response } from 'express'
import { NonSensitivePatient } from '../types'
import { getPatient, createPatient } from '../services/patientService'
import { validPatientEntry } from '../utils/typeValidate'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.status(200).send(getPatient())
})

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient = validPatientEntry(req.body)
    const result = createPatient(newPatient)
    res.status(201).json(result)
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) errorMessage += ' Error: ' + error.message
    res.status(400).send(errorMessage);
  }
})

export default router