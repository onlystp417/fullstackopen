import { useDispatch } from 'react-redux'
import { notifyWithTimeout } from '../reducers/notificationReducer'
import { voteAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch()

  const handleVote = anecdote => {
    dispatch(voteAnecdotes(anecdote.id))
    dispatch(notifyWithTimeout(`You voted ${anecdote.content}`))
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