export default function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{ text }</td>
      <td>{ value } { text === 'positive' ? '%' : '' }</td>
    </tr>
  )
}
