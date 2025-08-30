import express, { Response } from 'express'
import { NonSensitivePatient  } from '../types'
import { getPatient } from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.status(200).send(getPatient())
})

export default router