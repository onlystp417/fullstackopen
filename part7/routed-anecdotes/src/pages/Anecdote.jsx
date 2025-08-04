import { useParams } from "react-router"
import { useContext } from "react"
import AnecdoteContext from "../context/AnexdoteContext"

const Anecdote = () => {
  const { id } = useParams()
  const { anecdotes } = useContext(AnecdoteContext)
  const currentAnecdote = anecdotes.find(anecdote => anecdote.id === id)

  return (
    <>
      <h2>{currentAnecdote.content} by {currentAnecdote.author}</h2>
      <p>has {currentAnecdote.votes} votes</p>
    </>
  )
}

export default Anecdote