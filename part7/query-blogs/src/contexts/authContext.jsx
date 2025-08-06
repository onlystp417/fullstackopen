import { createContext, useContext, useReducer } from 'react'
import { useNotificationDispatch } from '../contexts/notificationContext'
import loginService from '../services/login'

const authReducer = (state, action) => {
  if(action.type === 'SET') {
    return action.payload
  } else if(action.type === 'RESET') {
    window.localStorage.removeItem('user')
    return null
  }
}

const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [auth, dispatchAuth] = useReducer(authReducer, null)

  return (
    <AuthContext.Provider value={[auth, dispatchAuth]}>
      { props.children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const [auth] = useContext(AuthContext)
  return auth
}

export function useAuthDispatch() {
  const [, dispatchAuth] = useContext(AuthContext)
  return dispatchAuth
}

export function useLogin() {
  const [, dispatchAuth] = useContext(AuthContext)
  const notificationDispatch = useNotificationDispatch()

  return async loginInfo => {
    const { password, userName } = loginInfo

    if(!password || !userName)
      notificationDispatch('ERROR', 'User name and Password required')

    try {
      const data = await loginService.login({ password, userName })
      window.localStorage.setItem('user', JSON.stringify(data))
      dispatchAuth({ type: 'SET', payload: data })
      notificationDispatch('SUCCESS', 'Login Success')
    } catch(exception) {
      notificationDispatch('ERROR', exception.response.data.error)
    }
  }
}

export function useLogout() {
  const [, dispatchAuth] = useContext(AuthContext)
  return () => {
    window.localStorage.removeItem('user')
    dispatchAuth({ type: 'RESET' })
  }
}