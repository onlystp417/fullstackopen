import { useState, useMemo } from "react"
import { ME, ALL_BOOKS } from "../schema"
import { useQuery } from "@apollo/client"

const Recommendation = props => {
  const [recommendation, setRecommendation] = useState([])
  const { data: meData, loading: meLoading, error: meError } = useQuery(ME)
  const { data: booksData, loading: booksLoading, error: booksError } = useQuery(ALL_BOOKS)

  useMemo(() => {
    if(!booksData) return
    const filtered = booksData.allBooks.filter(book => book.genres.includes(meData.me.favoriteGenre))
    setRecommendation(filtered)
  }, [booksData, meData])

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
          {recommendation.map((a) => (
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