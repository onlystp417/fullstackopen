import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import { updateAnecdote, fetchAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => anecdotesForUI(state))
  
  useEffect(() => {
    dispatch(fetchAnecdotes())
  }, [])
  

  const handleVote = async anecdote => {
    dispatch(updateAnecdote(anecdote))
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