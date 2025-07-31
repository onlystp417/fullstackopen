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
    apendAnecdote: (state, action) => {
      return state.concat(action.payload)
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { updateAnecdote, apendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const fetchAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    console.log(data)
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = anecdoteName => {
  return async dispatch => {
    const data = await anecdoteService.createOne(anecdoteName)
    dispatch(apendAnecdote(data))
  }
}

export default anecdoteSlice.reducer