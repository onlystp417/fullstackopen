import { useContext } from 'react'
import { useNavigate } from 'react-router'
import AnecdoteContext from "../context/AnexdoteContext"
import { useField } from '../hooks'

const CreateNew = () => {
  const { addNew } = useContext(AnecdoteContext)
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      id: Date.now(),
      content: content.value,
      author: content.value,
      info: content.value,
      votes: 0
    })
    navigate('/', { state: { content: content.value } } )
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default CreateNew