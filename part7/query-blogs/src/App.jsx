import { useState, useEffect, useMemo } from 'react'
import { useNotification } from './contexts/notificationContext'
import { useAuth, useAuthDispatch, useLogin, useLogout } from './contexts/authContext'
import { useBlogsQuery, useBlogsMutation } from './hooks/useBlogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [desc, setDesc] = useState(true)
  const auth = useAuth()
  const authDispatch = useAuthDispatch()
  const login = useLogin()
  const logout = useLogout()
  const notify = useNotification()
  const { data: blogs } = useBlogsQuery()
  const { createBlog, updataBlog, deleteBlog } = useBlogsMutation()

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(userInfo)
      authDispatch({ type: 'SET', payload: userInfo })
  }, [])

  const blogsForUI = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      return desc
        ? b.likes - a.likes // desc
        : a.likes - b.likes // asc
    })
    return sorted.map(blog => ({ ...blog, user: auth }))
  }, [blogs, auth, desc])


  const handleDesc = (sortType) => {
    sortType === 'desc' ? setDesc(true) : setDesc(false)
  }

  const loggedTemplate = () => (
    <p>
      { `${auth?.name} logged in ` }
      <button onClick={ logout }>log out</button>
    </p>
  )

  return (
    <div>
      <Notification message={ notify.message } type={ notify.type }/>
      {
        !auth
          ? <LoginForm onLogin={ e => login(e) } />
          : <>
            {auth && loggedTemplate() }
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