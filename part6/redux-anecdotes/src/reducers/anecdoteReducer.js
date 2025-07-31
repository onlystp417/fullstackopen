import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote: (state, action) => {
      const id = action.payload.id
      return state.map(anecdote => (
        anecdote.id === id
        ? action.payload
        : anecdote
      ))
    },
    createAnecdote: (state, action) => {
      return state.concat(action.payload)
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { updateAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer