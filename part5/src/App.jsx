import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifyType, setNotifyType] = useState('')
  const [notifyMsg, setNotifyMsg] = useState('')

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return

    setUser(userInfo)

    blogService
      .getAll()
      .then(data => setBlogs(data))
  }, [])

  const handleLogin = async (loginInfo) => {
    const { password, userName } = loginInfo

    if(!password || !userName)
      handleNotify('', 'User name and Password required')

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      handleNotify('success', 'Login Success')
    } catch(exception) {
      handleNotify('', exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    const { title, author, url } = newBlog
    if(!title || !author || !url)
      return handleNotify('', 'Blog imformation are required')

    try {
      const data = await blogService.create(newBlog, user.token)
      setBlogs(blogs.concat([data]))
      handleNotify('success', `Blog ${data.title} created`)
    } catch(exception) {
      alert(exception)
      handleNotify('', exception)
    }
  }

  const handleNotify = ( type, msg ) => {
    setNotifyMsg(msg)
    setNotifyType(type)
    setTimeout(() => {
      setNotifyMsg('')
      setNotifyType('type')
    }, 3000)
  }

  const loggedTemplate = () => (
    <p>
      { `${user?.name} logged in ` }
      <button onClick={ handleLogout }>log out</button>
    </p>
  )

  return (
    <div>
      <Notification message={ notifyMsg } type={ notifyType }/>
      {
        !user
          ? <LoginForm onLogin={ handleLogin } />
          : <>
            {user && loggedTemplate() }
            <hr />
            <Togglable buttonLable="Add blog">
              <BlogForm onCreateBlog={ handleCreateBlog } />
            </Togglable>
            <hr />
            <Blog blogs={ blogs } />
          </>
      }
    </div>
  )
}

export default App