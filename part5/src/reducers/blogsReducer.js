import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notifyWithTimeout } from './notificationReducer'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    apendBlog: (state, action) => state.concat(action.payload),
    replaceBlog: (state, action) => state.map(blog => blog.id === action.payload.id ? action.payload : blog),
    removeBlog: (state, action) => state.filter(blog => blog.id !== action.payload.id)
  }
})

const { setBlogs, apendBlog, replaceBlog, removeBlog } = blogsSlice.actions

// Thunk actions
export const fetchBlogs = () => async dispatch => {
  try {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  } catch (error) {
    dispatch(notifyWithTimeout({ type: '', message: error.response?.data?.error || 'Fetch blogs failed' }))
  }
}

export const createBlog = (newBlog, token) => async dispatch => {
  try {
    const blog = await blogService.create(newBlog, token)
    dispatch(apendBlog(blog))
    dispatch(notifyWithTimeout({ type: 'success', message: `Blog ${blog.title} created` }))
  } catch (error) {
    dispatch(notifyWithTimeout({ type: '', message: error.response?.data?.error || 'Create blog failed' }))
  }
}

export const updateBlog = (blog) => async dispatch => {
  try {
    const updated = await blogService.update(blog)
    dispatch(replaceBlog(updated))
  } catch (error) {
    dispatch(notifyWithTimeout({ type: '', message: error.response?.data?.error || 'Update blog failed' }))
  }
}

export const deleteBlog = ({ id, loginUser, title }) => async dispatch => {
  try {
    await blogService.remove(id, loginUser.token)
    dispatch(removeBlog({ id }))
    dispatch(notifyWithTimeout({ type: 'success', message: `Delete blog: ${title}` }))
  } catch (error) {
    dispatch(notifyWithTimeout({ type: '', message: error.response?.data?.error || 'Delete blog failed' }))
  }
}

export default blogsSlice.reducer