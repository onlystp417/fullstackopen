import { useState, useEffect, useMemo } from 'react'
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
  const [desc, setDesc] = useState(true)

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return

    setUser(userInfo)

    blogService
      .getAll()
      .then(data => { setBlogs(data) })
  }, [])

  const blogsForUI = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      return desc
        ? b.likes - a.likes // desc
        : a.likes - b.likes // asc
    })
    return sorted.map(blog => ({ ...blog, user }))
  }, [blogs, user, desc])

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
      handleNotify('', exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    // window.location.reload()
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
      handleNotify('', exception.response.data.error)
    }
  }

  const handleUpdateBlog = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      const data = await blogService.getAll()
      setBlogs(data)
    } catch(exception) {
      handleNotify('', exception.response.data.error)
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id, user.token)
      const data = await blogService.getAll()
      setBlogs(data)
      handleNotify('success', `Delete blog: ${blog.title}`)
    } catch(exception) {
      handleNotify('', exception.response.data.error)
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

  const handleDesc = (sortType) => {
    sortType === 'desc' ? setDesc(true) : setDesc(false)
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
            <div style={{ display: 'flex',  justifyContent: 'space-between' }}>
              <h2>Blogs</h2>
              <div>
                <button onClick={ () => handleDesc('desc') } style={ desc ? activeStyle : null }>▼</button>
                <button onClick={ () => handleDesc('asc') } style={ desc ? null : activeStyle }>▲</button>
              </div>
            </div>
            <div>
              { blogsForUI.map(blog => <Blog
                key={ blog.id }
                blog={ blog }
                onUpdateBlog={ handleUpdateBlog }
                onRemoveBlog={ handleRemoveBlog }
              />) }
            </div>
          </>
      }
    </div>
  )
}

export default App