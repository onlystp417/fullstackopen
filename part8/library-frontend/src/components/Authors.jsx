import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../schema'
import AuthorForm from './AuthorForm'

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
    if(loading) {
    return <div>Books Loading...</div>
  }

  if(error) {
    return <div>{ error.message }</div>
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AuthorForm authors={data.allAuthors} />
    </>
  )
}

export default Authors
