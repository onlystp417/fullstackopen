import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../schema'

const Books = (props) => {
  const { data, loading, error } = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if(loading) return <div>Books Loading</div>

  if(error) return <div>{ error.message }</div>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
