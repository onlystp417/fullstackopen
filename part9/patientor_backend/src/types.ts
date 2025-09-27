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

// Patient

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

// Entry

enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface EntryBase {
  id: string
  date: string
  specialist: string
  description: string
}

interface EntryHospital extends EntryBase {
  type: 'Hospital'
  diagnosisCodes: Array<Diagnote['code']>
  discharge: {
    date: string
    criteria: string
  }
}

interface EntryHealthcare extends EntryBase {
  type: 'OccupationalHealthcare'
  employerName: string
  diagnosisCodes?: Array<Diagnote['code']>
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface EntryHealthcheck extends EntryBase {
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating
}

export type Entry = EntryHospital | EntryHealthcare | EntryHealthcheck