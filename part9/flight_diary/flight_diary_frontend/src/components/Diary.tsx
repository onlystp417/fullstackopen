import type { DiaryInterface } from "../types"

interface DiaryProps {
  diary: DiaryInterface
}

const Diary = (props: DiaryProps) => {
  return (
    <div>
      <h3>{ props.diary.date }</h3>
      <p>Weather: { props.diary.weather }</p>
      <p>Visibility: { props.diary.visibility }</p>
    </div>
  )
}

export default Diary