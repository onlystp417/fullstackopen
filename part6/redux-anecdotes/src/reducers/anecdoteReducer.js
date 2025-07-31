import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    replaceAnecdote: (state, action) => {
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

const { replaceAnecdote, apendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const fetchAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

export const createAnecdote = anecdoteName => {
  return async dispatch => {
    const data = await anecdoteService.createOne(anecdoteName)
    dispatch(apendAnecdote(data))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const data = await anecdoteService.updateOne(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch(replaceAnecdote(data))
  }
}

export default anecdoteSlice.reducer