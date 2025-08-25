import { useEffect } from "react"
import { ME, ALL_BOOKS } from "../schema"
import { useQuery, useLazyQuery } from "@apollo/client"

const Recommendation = props => {
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME)
  const [ getBooks, { data: booksData, loading: booksLoading, error: booksError }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(!meData) return
    getBooks({
      variables: { genre: meData.me.favoriteGenre }
    })
  }, [meData])

  if (!props.show) {
  return null
}

  if(booksLoading || meLoading) return <div>Recommendation Loading</div>
  if(meError) return <div>{ meError.message } </div>
  if(booksError) return <div>{ booksError.message } </div>

  return (
    <div>
      <h2>Recommendation Books for {meData.me.username}</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.allBooks.map((a) => (
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

export default Recommendation