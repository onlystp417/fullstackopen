import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, setAnecdotes } from '../reducers/anecdoteReducer'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'
import PropTypes from 'prop-types'

const AnecdoteForm = () => {
  const [anecdoteName, setAnecdoteName] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(data => dispatch(setAnecdotes(data)))
  }, [])

  const addAnecdote = async e => {
    e.preventDefault()
    const data = await anecdoteService.createOne(anecdoteName)
    dispatch(createAnecdote(data))
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