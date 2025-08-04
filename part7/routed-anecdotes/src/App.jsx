import { useState } from 'react'
import Menu from './components/Menu'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import AnecdoteContext from './context/AnexdoteContext'

const initialAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '45742'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '35475'
  }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  // const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <AnecdoteContext.Provider value={{ anecdotes, addNew }}>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
          <Outlet />
        <Footer />
      </div>
    </AnecdoteContext.Provider>
  )
}

export default App
