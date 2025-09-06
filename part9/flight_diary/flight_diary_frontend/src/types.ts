export interface DiaryInterface {
  id: string
  date: string
  weather: string
  visibility: string
  comment?: string
}

export interface NewDiary extends Omit<DiaryInterface, 'id'>