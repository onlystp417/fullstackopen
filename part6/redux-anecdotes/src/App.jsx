import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdotes, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [anecdoteName, setAnecdoteName] = useState('')

  const vote = id => {
    dispatch(voteAnecdotes(id))
  }

  const addAnecdote = e => {
    e.preventDefault()
    dispatch(createAnecdote(anecdoteName))
    setAnecdoteName('')
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
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
    </div>
  )
}

export default App