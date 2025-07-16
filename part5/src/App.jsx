import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

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

  const handleLogout = () => {
    setUser(null)
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
          onSetUser={ setUser }
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