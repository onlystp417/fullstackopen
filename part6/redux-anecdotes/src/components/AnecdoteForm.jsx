import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const AnecdoteForm = () => {
  const [anecdoteName, setAnecdoteName] = useState('')
  const dispatch = useDispatch()

  async function addAnecdote(e) {
    e.preventDefault()
    await dispatch(createAnecdote(anecdoteName))
    setAnecdoteName('')
    dispatch(notifyWithTimeout('Add anecdote successfully!'))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ addAnecdote }>
        <div>
          <input
            name="name"
            onChange={e => setAnecdoteName(e.target.value)}
            value={anecdoteName} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

AnecdoteForm.propTypes = {
  onCreate: PropTypes.func
}

export default AnecdoteForm