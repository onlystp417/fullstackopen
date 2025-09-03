import { NonSensitivePatient, NewPatient } from "../types"
import { patients } from "../data/entries"
import { v4 as uuid } from 'uuid'

export function getPatient(): NonSensitivePatient[] {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  })
}

export function createPatient(payload: NewPatient): NewPatient {
  const id: string = uuid()
  const newPaitient = { id, ...payload }
  patients.push(newPaitient)
  return newPaitient
}