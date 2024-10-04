import StatisticLine from "./StatisticLine";

export default function Statistics({ good, neutral, bad }) {
  const GOOD_SCORE = 1;
  const NEUTRAL_SCORE = 0;
  const BAD_SCORE = -1;

  const template = getAll() ?
    (
      <>
        <h3>statistics</h3>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={getAll()} />
            <StatisticLine text="average" value={getAverage()} />
            <StatisticLine text="positive" value={getPositive()} />  
          </tbody>
        </table>
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