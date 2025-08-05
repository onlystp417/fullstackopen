import { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { notifyWithTimeout } from './reducers/notificationReducer'
import { setBlogs, createBlogs, updateBlogs, deleteBlog } from './reducers/blogsReducer'
import { setLoginUser, resetLoginUser } from './reducers/loginUserReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [desc, setDesc] = useState(true)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const loginUser = useSelector(state => state.loginUser)

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return

    dispatch(setLoginUser(userInfo))

    blogService
      .getAll()
      .then(data => { dispatch(setBlogs(data)) })
  }, [])

  const blogsForUI = useMemo(() => {
    const sorted = [...blogs].sort((a, b) => {
      return desc
        ? b.likes - a.likes // desc
        : a.likes - b.likes // asc
    })
    return sorted.map(blog => ({ ...blog, loginUser }))
  }, [blogs, loginUser, desc])

  const handleLogin = async (loginInfo) => {
    const { password, userName } = loginInfo

    if(!password || !userName)
      dispatch(notifyWithTimeout({ type: '', message: 'User name and Password required' }))

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      dispatch(setLoginUser(data))
      dispatch(notifyWithTimeout({ type: 'success', message: 'Login Success' }))
    } catch(exception) {
      dispatch(notifyWithTimeout({ type: '', message: exception.response.data.error }))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(resetLoginUser())
  }

  const handleCreateBlog = async (newBlog) => {
    const { title, author, url } = newBlog
    if(!title || !author || !url)
      return dispatch(notifyWithTimeout({ type: '', message: 'Blog imformation are required' }))

    try {
      const data = await blogService.create(newBlog, loginUser.token)
      dispatch(createBlogs(data))
      dispatch(notifyWithTimeout({ type: 'success', message: `Blog ${data.title} created` }))
    } catch(exception) {
      dispatch(notifyWithTimeout({ type: '', message: exception.response.data.error }))
    }
  }

  const handleUpdateBlog = async (newBlog) => {
    try {
      const data = await blogService.update(newBlog)
      dispatch(updateBlogs(data))
    } catch(exception) {
      dispatch(notifyWithTimeout({ type: '', message: exception.response.data.error }))
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id, loginUser.token)
      dispatch(deleteBlog(blog))
      dispatch(notifyWithTimeout({ type: 'success', message: `Delete blog: ${blog.title}` }))
    } catch(exception) {
      dispatch(notifyWithTimeout({ type: '', message: exception.response.data.error }))
    }
  }

  const handleDesc = (sortType) => {
    sortType === 'desc' ? setDesc(true) : setDesc(false)
  }

  const loggedTemplate = () => (
    <p>
      { `${loginUser.name} logged in ` }
      <button onClick={ handleLogout }>log out</button>
    </p>
  )

  return (
    <div>
      <Notification />
      {
        !loginUser.token
          ? <LoginForm onLogin={ handleLogin } />
          : <>
            {loginUser.token && loggedTemplate() }
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