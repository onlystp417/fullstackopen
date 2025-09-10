import { z } from 'zod'
export interface Diagnote {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Entry {}

export const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
})

export type NewPatient = z.infer<typeof PatientSchema>

export interface Patient extends NewPatient {
  id: string,
  entries?: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>