import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdotes } from './reducers/filterReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'

const App = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => anecdotesForUI(state))
  const dispatch = useDispatch()

  function anecdotesForUI(state) {
    const filteredAnecdotes = state.anecdotes
      .filter(anecdote => {
        const regex = new RegExp(filter, "i")
        return regex.test(anecdote.content)
      })
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter
        onFilter={keyword => dispatch(filterAnecdotes(keyword))}
      />
      <AnecdoteList
        anecdotes={ anecdotes }
      />
      <AnecdoteForm />
    </div>
  )
}

export default App