/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../schema'

const AuthorForm = ({ authors }) => {
  const [id, setId] = useState('')
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  const submitAuthor = async e => {
    e.preventDefault()
    const { data } = await updateAuthor({ variables: { id, born } })
    if(!data.editAuthor) {
      console.log(new Error('Author Not Found'))
    }
    setId('')
    setBorn('')
  }

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={ submitAuthor }>
        <div>
          <label htmlFor="name">Author: </label>
          <select name="name" id="name" onChange={({ target }) => setId(target.value)}>
            <option value="">--Choose an author--</option>
            {authors.map(author => (
              <option value={author.id} key={author.id}>{ author.name }</option>
            ))}
          </select>
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