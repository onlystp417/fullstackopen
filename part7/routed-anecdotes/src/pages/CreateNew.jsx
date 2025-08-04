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

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={content.value}
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            value={author.value}
            type={author.type}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            value={info.value}
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew