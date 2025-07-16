import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(!user) return

    blogService
      .getAll()
      .then(data => setBlogs(data))
  }, [user])

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
    setUser(null)
    window.localStorage.removeItem('user')
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
          <Blog blogs={ blogs } />
        </div>
      }
    </div>
  )
}

export default App