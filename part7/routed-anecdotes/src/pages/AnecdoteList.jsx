import { useState, useEffect, useContext } from "react"
import AnecdoteContext from "../context/AnexdoteContext"
import { Link, useLocation } from "react-router"

const AnecdoteList = () => {
  const location = useLocation()
  const [ notify, setNotify ] = useState('')
  const { anecdotes } = useContext(AnecdoteContext)
  const invisible = { display: 'none' }

  useEffect(() => {
    const { state } = location
    if(!state)
      return
    setNotify(`"${state.content}" succesfully created!`)
    setTimeout(() => { setNotify('') }, 5000)
  }, [location])

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
      <p style={ notify ? null : invisible }>{ notify }</p>
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