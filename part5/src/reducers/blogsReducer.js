import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    createBlogs: (state, action) => state.concat(action.payload),
    updateBlogs: (state, action) => state.map(blog => blog.id === action.payload.id ? action.payload : blog),
    deleteBlog: (state, action) => state.filter(blog => blog.id !== action.payload.id)
  }
})

export const { setBlogs, createBlogs, updateBlogs, deleteBlog } = blogsSlice.actions

export default blogsSlice.reducer