import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../schema'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(null)

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  const submitAuthor = e => {
    e.preventDefault()
    const { data } = updateAuthor({ variables: { name, born } })
    if(!data.editAuthor) {
      console.log(new Error('Author Not Found'))
    }
    setName('')
    setBorn(null)
  }

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={ submitAuthor }>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          <label htmlFor="born">Born: </label>
          <input
            id="born"
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.valueAsNumber)} />
        </div>setBorn
        <button type="submit">Update Author</button>
      </form>
    </>
  )
}

export default AuthorForm