import { createSlice } from '@reduxjs/toolkit'

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

export default loginUserSlice.reducer