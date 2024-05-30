
export default function Statistics({ good, neutral, bad }) {
  const GOOD_SCORE = 1;
  const NEUTRAL_SCORE = 0;
  const BAD_SCORE = -1;
  const template = getAll() ?
    (
      <>
        <h3>statistics</h3>
        <p>good { good }</p>
        <p>neutral { neutral }</p>
        <p>bad { bad }</p>
        <p>all { getAll() }</p>
        <p>average { getAverage() }</p>
        <p>positive { getPositive() } %</p>
      </>
    ) :
    <p>No feedback given</p>

  function getAll() {
    return good + neutral + bad;
  }

  function getAverage() {
    return (good * GOOD_SCORE + neutral * NEUTRAL_SCORE + bad * BAD_SCORE) / getAll()
  }

  function getPositive() {
    return good / getAll() * 100
  }

  return template
}