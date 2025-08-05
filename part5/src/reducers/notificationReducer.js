import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: '',
  message: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotify: (state, action) => action.payload,
    resetNotify: () => initialState
  }
})

export const notifyWithTimeout = notify => {
  return dispatch => {
    dispatch(setNotify(notify))
    setTimeout(() => {
      dispatch(resetNotify())
    }, 2000)
  }
}

export const { setNotify, resetNotify } = notificationSlice.actions

export default notificationSlice.reducer