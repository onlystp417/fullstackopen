import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    msg: '',
    visible: false
  },
  reducers: {
    setNotify: (state, action) => {
      console.log(state)
      state = action.payload
    }
  }
})

export const { filterAnecdotes } = notificationSlice.actions

export default notificationSlice.reducer