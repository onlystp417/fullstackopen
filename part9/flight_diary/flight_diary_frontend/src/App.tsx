import { useState, useEffect } from 'react'
import Diary from "./components/Diary"
import DiaryForm from './components/DiaryForm'
import type { DiaryInterface } from './types'
import { getDiaries } from './services/diaries'

function App() {
  const [diaries, setDiaries] = useState<DiaryInterface[]>([])

  useEffect(() => {
    getDiaries().then(data => setDiaries(data))
  }, [])

  function refetchDiaries () {
    getDiaries().then(data => setDiaries(data))
  }

  return (
    <>
      <h1>Flight Diaries</h1>
      <DiaryForm refecth={refetchDiaries} />
      {
        diaries.map(diary => (
          <Diary diary={ diary } />
        ))
      }
    </>
  )
}

export default App
