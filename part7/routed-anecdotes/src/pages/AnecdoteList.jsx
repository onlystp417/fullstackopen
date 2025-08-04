import { useContext } from "react"
import AnecdoteContext from "../context/AnexdoteContext"
import { Link } from "react-router"

const AnecdoteList = () => {
  const { anecdotes } = useContext(AnecdoteContext)

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes?.map(anecdote => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{ anecdote.content }</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList