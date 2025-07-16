import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return

    setUser(userInfo)

    blogService
      .getAll()
      .then(data => setBlogs(data))
  }, [])

  const handleLogin = async e => {
    e.preventDefault()

    if(!password || !userName)
      alert('User name and Password needed.')

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      setUser(data) 
      setUserName('')
      setPassword('')
    } catch(exception) {
      alert(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    const { title, author, url } = newBlog
    if(!title || !author || !url)
      alert('Blog imformation are required')

    try {
      const data = await blogService.create(newBlog, user.token)
      setBlogs(blogs.concat([data]))
    } catch(exception) {
      alert(exception)
    }
  }

  return (
    <div>
      {
        !user ?
        <LoginForm
          password={ password }
          userName={ userName }
          onSetPassword = { setPassword }
          onSetUserName = { setUserName }
          onLogin={ handleLogin }
        />
        : <div>
          {user && (
            <p>
              { `${user?.name} logged in ` }
              <button onClick={ handleLogout }>log out</button>
            </p>
          )}
          <hr />
          <BlogForm onCreateBlog={ handleCreateBlog } />
          <hr />
          <Blog blogs={ blogs } />
        </div>
      }
    </div>
  )
}

export default App