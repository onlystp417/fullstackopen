import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { notifyWithTimeout } from './notificationReducer'

const initialState = {
  id: '',
  name: '',
  token: '',
  userName: ''
}

const loginUserSlice = createSlice({
  name: 'loginUser',
  initialState,
  reducers: {
    setLoginUser: (state, action) => action.payload,
    resetLoginUser: () => initialState
  }
})

export const { setLoginUser, resetLoginUser } = loginUserSlice.actions

export const login = loginInfo => async dispatch => {
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

export const logout = () => async dispatch => {
  window.localStorage.removeItem('user')
  dispatch(resetLoginUser())
}

export default loginUserSlice.reducer