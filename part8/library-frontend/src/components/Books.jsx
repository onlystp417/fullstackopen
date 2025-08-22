import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../schema'

const Books = (props) => {
  const { data, loading, error } = useQuery(ALL_BOOKS)
  const [ genre, setGenre ] = useState('')
  const [ books, setBooks ] = useState([])
  const [ genres, setGenres ] = useState([])

  useEffect(() => {
    if(!data) return
    const allGenres = data.allBooks.reduce((accu, curr) => {
      curr.genres.forEach(currGenre => {
        if(!accu.includes(currGenre)) accu.push(currGenre)
      })
      return accu
    }, [])
    setGenres(allGenres)
  }, [data])

  useMemo(() => {
    if(!data) return
    let filteredBooks
    if (!genre) {
      filteredBooks = data.allBooks
    } else {
      filteredBooks = data.allBooks.filter(book => {
        return book.genres.find(currGenre => currGenre === genre)
      })
    }
    setBooks(filteredBooks)
  }, [data, genre])

  if (!props.show) {
    return null
  }

  if(loading) return <div>Books Loading</div>

  if(error) return <div>{ error.message }</div>

  return (
    <div>
      <h2>books</h2>

      <span>Filtered by: </span>

      <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
        <option
          value=""
          key=""
          onChange={e => setGenre(e.target.value)}>All</option>
        {genres.map(genre => (
          <option
            value={genre}
            key={genre}
          >{genre}</option>
        ))}
      </select>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
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
