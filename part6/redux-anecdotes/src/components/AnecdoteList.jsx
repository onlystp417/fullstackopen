import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import { updateAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => anecdotesForUI(state))

  useEffect(() => {
    fetchAnecdotes()
  }, [])

  const handleVote = async anecdote => {
    const data = await anecdoteService.updateOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(updateAnecdote(data))
    dispatch(notifyWithTimeout(`You voted ${anecdote.content}`))
  }

  function anecdotesForUI(state) {
    const filteredAnecdotes = state.anecdotes
      .filter(anecdote => {
        const regex = new RegExp(filter, "i")
        return regex.test(anecdote.content)
      })
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
}

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList