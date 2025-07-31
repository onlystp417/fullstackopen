import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdotes: (state, action) => {
      const id = action.payload
      return state.map(anecdote => (
        anecdote.id === id
        ? { ...anecdote, vote: anecdote.vote + 1 }
        : anecdote
      ))
    },
    createAnecdote: (state, action) => {
      return state.concat(action.payload)
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { voteAnecdotes, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer