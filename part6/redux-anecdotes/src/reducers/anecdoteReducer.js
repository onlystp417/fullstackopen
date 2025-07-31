import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

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

export const fetchAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const { updateAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer