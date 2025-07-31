import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotify: (state, action) => action.payload
  }
})

export const notifyWithTimeout = message => {
  return dispatch => { // passed in by the middleware of component's dispatching
    dispatch(setNotify(message))
    setTimeout(() => {
      dispatch(setNotify(''))
    }, 2000)
  }
}

export const { setNotify } = notificationSlice.actions

export default notificationSlice.reducer