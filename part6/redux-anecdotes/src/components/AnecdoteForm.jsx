import { useState } from 'react'
import PropTypes from 'prop-types'

const AnecdoteForm = ({ onCreate }) => {
  const [anecdoteName, setAnecdoteName] = useState('')

  const addAnecdote = e => {
    e.preventDefault()
    onCreate(anecdoteName)
    setAnecdoteName('')
  }

  return (
    <form onSubmit={ addAnecdote }>
      <div>
        <input
          name="name"
          onChange={e => setAnecdoteName(e.target.value)}
          value={anecdoteName} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

AnecdoteForm.propTypes = {
  onCreate: PropTypes.func
}

export default AnecdoteForm