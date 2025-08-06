import { createContext, useContext, useReducer } from 'react'

const authReducer = (state, action) => {
  if(action.type === 'SET') {
    return action.payload
  } else if(action.type === 'RESET') {
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