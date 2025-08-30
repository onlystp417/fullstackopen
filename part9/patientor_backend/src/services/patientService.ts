import { NonSensitivePatient } from "../types";
import { patients } from "../data/entries";

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