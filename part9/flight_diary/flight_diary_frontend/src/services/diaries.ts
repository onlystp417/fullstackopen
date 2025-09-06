import axios from "axios"
import type { DiaryInterface, NewDiary } from "../types"

const baseUrl = 'http://localhost:3000'

export async function getDiaries() {
  const res = await axios.get<DiaryInterface[]>(`${baseUrl}/api/diaries`)
  return res.data
}

export async function createDiary(newDiary: NewDiary) {
  const res = await axios.post<DiaryInterface>(`${baseUrl}/api/diaries`, newDiary)
  return res.data
}