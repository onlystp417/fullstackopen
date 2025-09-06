import axios from "axios"
import type { DiaryInterface } from "../types"

const baseUrl = 'http://localhost:3000'

export async function getDiaries() {
  const res = await axios.get<DiaryInterface[]>(`${baseUrl}/api/diaries`)
  return res.data
}