import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../schema'

const initialBook = {
    title: '',
    author: '',
    published: null,
    genre: '',
    genres: [],
  }

const NewBook = (props) => {
  const [newBook, setNewBook] = useState(initialBook)
  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS}
    ]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('add book...')
    createBook({ variables: { ...newBook} })
    setNewBook(initialBook)
  }

  const addGenre = () => {
    setNewBook({
      ...newBook,
      genres: [...newBook.genres, newBook.genre],
      genre: ''
    })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={newBook.title}
            onChange={({ target }) => setNewBook({ ...newBook, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            value={newBook.author}
            onChange={({ target }) => setNewBook({ ...newBook, author: target.value })}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={newBook.published}
            onChange={({ target }) => setNewBook({ ...newBook, published: Number(target.value) })}
          />
        </div>
        <div>
          <input
            value={newBook.genre}
            onChange={({ target }) => setNewBook({ ...newBook, genre: target.value })}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {newBook.genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook