import { useState } from 'react'

const BlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = e => {
    e.preventDefault()
    onCreateBlog({ title, url, author })
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form type="submit" onSubmit={ handleCreate }>
        <div>
          <span>Title: </span>
          <input
            type="text"
            name="title"
            value={ title }
            onChange={ ({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
          <span>Author: </span>
          <input
            type="text"
            name="author"
            value={ author }
            onChange={ ({ target }) => setAuthor(target.value) }
          />
        </div>
        <div>
          <span>URL: </span>
          <input
            type="text"
            name="url"
            value={ url }
            onChange={ ({ target }) => setUrl(target.value) }
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm