import { useState, useEffect, useMemo } from 'react'
import { useNotification, useNotificationDispatch } from './contexts/notificationContext'
import { useBlogsQuery, useBlogsMutation } from './hooks/useBlogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [desc, setDesc] = useState(true)
  const notify = useNotification()
  const onNotify = useNotificationDispatch()
  const { data: blogs = [] } = useBlogsQuery()
  const { createBlog, updataBlog, deleteBlog } = useBlogsMutation()

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return
    setUser(userInfo)
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
      onNotify('ERROR', 'User name and Password required')

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      onNotify('SUCCESS', 'Login Success')
    } catch(exception) {
      onNotify('ERROR', exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
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
      <Notification message={ notify.message } type={ notify.type }/>
      {
        !user
          ? <LoginForm onLogin={ handleLogin } />
          : <>
            {user && loggedTemplate() }
            <hr />
            <Togglable buttonLable="Add blog">
              <BlogForm onCreateBlog={ createBlog.mutate } />
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
                onUpdateBlog={ updataBlog.mutate }
                onRemoveBlog={ deleteBlog.mutate }
              />) }
            </div>
          </>
      }
    </div>
  )
}

export default App