import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdotes, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList
        anecdotes={ anecdotes }
        onVote={ id => dispatch(voteAnecdotes(id)) }
      />
      <AnecdoteForm
        onCreate={value => dispatch(createAnecdote(value) )}
      />
    </div>
  )
}

export default App