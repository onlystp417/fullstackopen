import { useState } from 'react'

import Statistics from './components/Statistics'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function setToComment(comment)  {
    return () => {
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
  }


  return (
    <>
      <h3>give feedback</h3>
      <button onClick={setToComment('good')}>good</button>
      <button onClick={setToComment('neutral')}>neutral</button>
      <button onClick={setToComment('bad')}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}
