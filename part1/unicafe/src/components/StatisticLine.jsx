export default function StatisticLine({ text, value }) {
  return (
    <p>{ text } { value } { text === 'positive' ? '%' : '' }</p>
  )
}
