import { useEffect } from 'react'
import { useNotification } from '../contexts/notificationContext'
import { useAuth, useAuthDispatch, useLogout } from '../contexts/authContext'
import { Outlet, useNavigate } from 'react-router'
import Notification from './Notification'
import Header from './Header'

const Home = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  const authDispatch = useAuthDispatch()
  const logout = useLogout()
  const notify = useNotification()

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.getItem('user'))
    if(userInfo)
      authDispatch({ type: 'SET', payload: userInfo })
    else
      navigate('/login')
  }, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <Notification message={ notify.message } type={ notify.type }/>
      <Header logout={ handleLogout } auth={ auth } />
      <Outlet />
    </div>
  )
}

export default Home