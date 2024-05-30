import { useState } from 'react'

export default function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const GOOD_SCORE = 1;
  const NEUTRAL_SCORE = 0;
  const BAD_SCORE = -1;

  const setToComment = (comment) => () => {
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

  function getAll() {
    return good + neutral + bad;
  }

  function getAverage() {
    return (good * GOOD_SCORE + neutral * NEUTRAL_SCORE + bad * BAD_SCORE) / getAll()
  }

  function getPositive() {
    return good / getAll() * 100
  }

  return (
    <>
      <h3>give feedback</h3>
      <button onClick={setToComment('good')}>good</button>
      <button onClick={setToComment('neutral')}>neutral</button>
      <button onClick={setToComment('bad')}>bad</button>
      <h3>statistics</h3>
      <p>good { good }</p>
      <p>neutral { neutral }</p>
      <p>bad { bad }</p>
      <p>all { getAll() }</p>
      <p>average { getAll() ? getAverage() : '' }</p>
      <p>positive { getAll() ? getPositive() : ''  } %</p>
    </>
  )
}
