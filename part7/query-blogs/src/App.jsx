import { useState, useEffect, useMemo } from 'react'
import { useNotification, useNotificationDispatch } from './contexts/notificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [desc, setDesc] = useState(true)
  const notify = useNotification()
  const dispatchNotify = useNotificationDispatch()
  const queryClient = useQueryClient()

  const activeStyle = { backgroundColor: '#292e2a', color: 'white' }

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(!userInfo) return
    setUser(userInfo)
  }, [])

  const { data: blogs = [] } = useQuery({ // data 改名稱為 blogs，並且預設值為 []
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    isLoading: () => (<div> Loading Blogs ...</div>)
  })

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: newBlog => {
      const notes = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], notes.concat(newBlog))
      handleNotify('SUCCESS', `Blog ${newBlog.title} created`)
    },
    onError: exception => {
      handleNotify('ERROR', exception.message)
    }
  })

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
      handleNotify('ERROR', 'User name and Password required')

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      handleNotify('SUCCESS', 'Login Success')
    } catch(exception) {
      handleNotify('ERROR', exception.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const handleUpdateBlog = async (newBlog) => {
    try {
      await blogService.update(newBlog)
      const data = await blogService.getAll()
      // setBlogs(data)
    } catch(exception) {
      handleNotify('ERROR', exception.response.data.error)
    }
  }

  const handleRemoveBlog = async (blog) => {
    try {
      await blogService.remove(blog.id, user.token)
      const data = await blogService.getAll()
      // setBlogs(data)
      handleNotify('SUCCESS', `Delete blog: ${blog.title}`)
    } catch(exception) {
      handleNotify('ERROR', exception.response.data.error)
    }
  }

  const handleNotify = ( type, message ) => {
    dispatchNotify({ type, payload: message })
    setTimeout(() => {
      dispatchNotify({ type: 'RESET' })
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
      <Notification message={ notify.message } type={ notify.type }/>
      {
        !user
          ? <LoginForm onLogin={ handleLogin } />
          : <>
            {user && loggedTemplate() }
            <hr />
            <Togglable buttonLable="Add blog">
              <BlogForm onCreateBlog={ createBlogMutation.mutate } />
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