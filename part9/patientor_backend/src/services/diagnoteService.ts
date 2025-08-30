import { diagnotes } from '../data/entries'
import { Diagnote } from '../types'

export function getDiagnotes(): Diagnote[] {
  return diagnotes
}
