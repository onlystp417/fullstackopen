import { NewPatient, Gender } from "../types"

export const validPatientEntry = (object: unknown): NewPatient => {
    
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    }
  }

  throw new Error('Incorrect data: some fields are missing')
}

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth')
  }

  return dateOfBirth
}

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }

  return ssn
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation')
  }

  return occupation
}

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String

const isGender = (param: string): param is Gender =>
  Object.values(Gender).map(v => v.toString()).includes(param)