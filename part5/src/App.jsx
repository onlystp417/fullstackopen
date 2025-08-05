import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSortedBlogs } from './hooks'

import { fetchBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogsReducer'
import { setLoginUser, login, logout } from './reducers/loginUserReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [desc, setDesc] = useState(true)
  const blogs = useSelector(state => state.blogs)
  const loginUser = useSelector(state => state.loginUser)
  const dispatch = useDispatch()

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return

    dispatch(setLoginUser(userInfo))
    dispatch(fetchBlogs())
  }, [])

  const blogsForUI = useSortedBlogs(blogs, desc, loginUser)

  const handleDesc = (sortType) => {
    sortType === 'desc' ? setDesc(true) : setDesc(false)
  }

  const loggedTemplate = () => (
    <p>
      { `${loginUser.name} logged in ` }
      <button onClick={ () => dispatch(logout) }>log out</button>
    </p>
  )

  return (
    <div>
      <Notification />
      {
        !loginUser.token
          ? <LoginForm onLogin={ e => dispatch(login(e)) } />
          : <>
            {loginUser.token && loggedTemplate() }
            <hr />
            <Togglable buttonLable="Add blog">
              <BlogForm onCreateBlog={ dispatch(createBlog) } />
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
                onUpdateBlog={ e => dispatch(updateBlog(e)) }
                onRemoveBlog={ e => dispatch(deleteBlog(e)) }
              />) }
            </div>
          </>
      }
    </div>
  )
}

export default App