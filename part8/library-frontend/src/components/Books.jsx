import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../schema'
import BookTable from './BookTalble'

const Books = (props) => {
  const [ genre, setGenre ] = useState('')
  const { data, loading, error } = useQuery(ALL_BOOKS, { variables: { genre } })

  if (!props.show) {
    return null
  }

  if(loading) return <div>Books Loading</div>

  if(error) return <div>{ error.message }</div>

  return (
    <div>
      <h2>books</h2>

      <span>Filtered by: </span>

      <select name="genre" id="genre" value={genre} onChange={e => setGenre(e.target.value)}>
        <option
          value=""
          key=""
          onChange={e => setGenre(e.target.value)}>All</option>
        {data.allGenres.map(genre => (
          <option
            value={genre}
            key={genre}
          >{genre}</option>
        ))}
      </select>

      <BookTable books={data.allBooks} />
    </div>
  )
}

export default Books
