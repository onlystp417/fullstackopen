export interface Diagnote {
  code: string
  name: string
  latin?: string
}

type Gender = 'female' | 'male' | 'other'

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>

export type NewPatient = Omit<Patient, 'id'>