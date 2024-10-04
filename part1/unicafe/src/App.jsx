import { useState } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function setToComment(comment)  {
    switch(comment) {
      case 'good':
        setGood(good + 1)
        break
      case 'neutral':
        setNeutral(neutral + 1)
        break
      case 'bad':
        setBad(bad + 1)
        break
      default:
        return
    }
  }


  return (
    <>
      <h3>give feedback</h3>
      <Button setToComment={setToComment} text="good" />
      <Button setToComment={setToComment} text="neutral" />
      <Button setToComment={setToComment} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}
